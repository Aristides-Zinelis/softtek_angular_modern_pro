import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Company } from "@domain/company.type";
import { MiniProfile, Profile } from "@domain/profile.type";
import { Quote } from "@domain/quote.type";
import { environment } from "environments/environment.development";
import {
  concatMap,
  delay,
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  of,
  tap,
} from "rxjs";

/**
 * Clase que se encarga de acceder a la API de Financial Modeling Prep
 * y obtener información sobre empresas cotizadas y sus acciones.
 */
@Injectable({
  providedIn: "root",
})
export class FmpRepository {
  private http = inject(HttpClient);
  private fmp = environment.financialModelingPrep;
  private url = this.fmp.apiUrl;
  private apiKey = this.fmp.apiKey;
  private delayMs = 5000;

  private httpParams = new HttpParams().set("apikey", this.apiKey);
  private httpOptions = { params: this.httpParams };

  /**
   * Obtiene una lista de empresas cotizadas en el índice Dow Jones
   * @returns Observable de una lista de empresas
   */
  public getDowJonesCompanies$(): Observable<Company[]> {
    const cacheKey = "dowjones_constituent";
    const stored = localStorage.getItem(cacheKey);
    const cached = stored ? (JSON.parse(stored) as Company[]) : [];
    if (cached.length > 0) {
      return of(cached).pipe(delay(Math.random() * this.delayMs));
    }
    const result = this.http
      .get<Company[]>(this.url + cacheKey, this.httpOptions)
      .pipe(
        tap((data) => localStorage.setItem(cacheKey, JSON.stringify(data)))
      );
    return result;
  }

  /**
   * Obtiene una lista de mini-perfiles de las empresas del índice Dow Jones
   * @returns Observable de una lista de perfiles pequeños
   */
  public getProfiles$(): Observable<MiniProfile[]> {
    // Primero obtenemos la lista de empresas
    // nos quedamos con las 10 primeras
    // y luego obtenemos el perfil de cada una de ellas
    // el resultado es una lista que se transforma a una lista de mini-perfiles
    // y se devuelve como observable
    return this.getDowJonesCompanies$().pipe(
      map((allCompanies: Company[]): Company[] =>
        allCompanies
          .sort((a, b) => a.dateFirstAdded.localeCompare(b.dateFirstAdded))
          .slice(0, 10)
      ),
      map((old10Companies: Company[]): string[] =>
        old10Companies.map((company) => company.symbol)
      ),
      concatMap(
        (old10Symbols: string[]): Observable<Profile[]> =>
          forkJoin(old10Symbols.map((symbol) => this.getProfile$(symbol)))
      ),
      map((profiles: Profile[]): MiniProfile[] =>
        profiles.map((profile) => ({
          symbol: profile.symbol,
          ceo: profile.ceo,
          website: profile.website,
        }))
      )
    );
  }

  /**
   * Obtiene el perfil de una empresa cotizada
   * @param symbol El símbolo de la empresa
   * @returns Un observable del perfil de la empresa
   */
  private getProfile$(symbol: string): Observable<Profile> {
    const cacheKey = "profile_" + symbol;
    const stored = localStorage.getItem(cacheKey);
    const cached = stored ? (JSON.parse(stored) as Profile) : null;
    if (cached) {
      return of(cached).pipe(delay(Math.random() * this.delayMs));
    }
    return this.http
      .get<Profile[]>(this.url + "profile/" + symbol, this.httpOptions)
      .pipe(
        map((profiles) => profiles[0]), // podemos recibir más de uno
        tap((data) => localStorage.setItem(cacheKey, JSON.stringify(data))),
        delay(Math.random() * this.delayMs)
      );
  }

  /**
   * Obtiene una lista de cotizaciones de acciones para una lista de empresas
   * @param companies Lista de símbolos de empresas
   * @returns Observable de una lista de cotizaciones
   */
  public getQuotes$(companies: string[]): Observable<Quote> {
    return from(companies).pipe(
      mergeMap((company) => {
        return this.getQuote$(company);
      })
    );
  }

  /**
   * Obtiene la cotización de una acción para una empresa
   * @param symbol El símbolo de la empresa
   * @returns Observable de la cotización
   */
  private getQuote$(symbol: string): Observable<Quote> {
    // cache the result at local storage
    const cacheKey = "quote_" + symbol;
    const stored = localStorage.getItem(cacheKey);
    const cached = stored ? (JSON.parse(stored) as Quote) : null;
    if (cached) {
      return of(cached).pipe(delay(Math.random() * this.delayMs));
    }
    return this.http
      .get<any[]>(this.url + "quote/" + symbol, this.httpOptions)
      .pipe(
        map((quotes) => quotes[0]),
        delay(Math.random() * this.delayMs),
        tap((quote) => localStorage.setItem(cacheKey, JSON.stringify(quote)))
      );
  }

  public getAvailableCommodities$(): Observable<any> {
    return this.http.get(
      this.url + "symbol/available-commodities",
      this.httpOptions
    );
  }

  public getQuoteForCommodity$(symbol: string): Observable<any> {
    return this.http.get(this.url + "quote/" + symbol, this.httpOptions);
  }

  public getProfileForCommodity$(symbol: string): Observable<any> {
    return this.http.get(this.url + "profile/" + symbol, this.httpOptions);
  }
}
