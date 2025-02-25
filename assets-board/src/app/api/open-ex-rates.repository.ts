import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { map, Observable } from "rxjs";

const url = "https://openexchangerates.org/api/";

@Injectable({
  providedIn: "root",
})
export class OpenExRatesRepository {
  private http = inject(HttpClient);
  private httpParams = new HttpParams().set("app_id", environment.apiKey);

  public getDollarsForCurrency$(symbol: string): Observable<any> {
    return this.http
      .get(url + "latest.json", {
        params: this.httpParams.set("symbols", symbol),
      })
      .pipe(map((data: any) => data.rates[symbol]));
  }
}
