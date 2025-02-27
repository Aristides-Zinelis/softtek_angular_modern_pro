import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Company } from "@domain/company.type";
import { Profile } from "@domain/profile.type";
import { Quote } from "@domain/quote.type";
import { environment } from "environments/environment.development";
import { concatMap, delay, forkJoin, map, Observable, of, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FmpRepository {
  private http = inject(HttpClient);
  private fmp = environment.financialModelingPrep;
  private url = this.fmp.apiUrl;
  private apiKey = this.fmp.apiKey;
  private delayMs = 500;

  private httpParams = new HttpParams().set("apikey", this.apiKey);
  private httpOptions = { params: this.httpParams };

  public getDowJonesCompanies$(): Observable<Company[]> {
    const cacheKey = "dowjones_constituent";
    // Cache the result at local storage
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

  public getProfile$(symbol: string): Observable<Profile> {
    console.log(symbol);
    //return of({} as Profile);
    // cache the result at local storage
    const cacheKey = "profile_" + symbol;
    const stored = localStorage.getItem(cacheKey);
    const cached = stored ? (JSON.parse(stored) as Profile) : null;
    if (cached) {
      return of(cached).pipe(delay(Math.random() * this.delayMs));
    }
    return this.http
      .get<Profile[]>(this.url + "profile/" + symbol, this.httpOptions)
      .pipe(
        map((profiles) => profiles[0]),
        tap((data) => localStorage.setItem(cacheKey, JSON.stringify(data))),
        delay(Math.random() * this.delayMs)
      );
  }

  public getProfiles$(): Observable<Profile[]> {
    return this.getDowJonesCompanies$().pipe(
      map((symbols) => symbols.slice(0, 10)),
      concatMap((companies) => {
        return forkJoin(
          companies.map((company) => this.getProfile$(company.symbol))
        );
      })
    );
  }

  public getQuote$(symbol: string): Observable<Quote> {
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
