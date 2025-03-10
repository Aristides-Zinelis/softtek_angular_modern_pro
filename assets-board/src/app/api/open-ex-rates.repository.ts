import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { DollarRate } from "@domain/dollar-rate.type";
import { environment } from "environments/environment";
import { map, Observable } from "rxjs";

const url = "https://openexchangerates.org/api/latest.json";

@Injectable({
  providedIn: "root",
})
export class OpenExRatesRepository {
  private http = inject(HttpClient);
  private httpParams = new HttpParams().set("app_id", environment.apiKey);

  /**
   * Fetches the latest dollar rate for a given currency symbol.
   * @param symbol The currency symbol to fetch the rate for.
   * @returns The latest dollar rate for the given currency symbol.
   */
  public getRateForDollarBySymbol$(symbol: string): Observable<number> {
    const params = this.httpParams
      .set("symbols", symbol)
      .set("show_alternative", "true"); // include Ethereum and other currencies
    return this.http
      .get<DollarRate>(url, { params })
      .pipe(map((data: any) => data.rates[symbol] || 1));
  }
}
