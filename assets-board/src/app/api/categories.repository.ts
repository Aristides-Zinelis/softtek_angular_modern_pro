import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Category } from "@domain/category.type";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CategoriesRepositoryService {
  private http = inject(HttpClient);
  private fakeData: Category[] = [
    {
      id: 1,
      name: "Crypto",
      risk: "High",
      liquidity: "High",
    },
    {
      id: 2,
      name: "RealState",
      risk: "Low",
      liquidity: "Low",
    },
  ];

  public getAll$(): Observable<Category[]> {
    return of(this.fakeData);
  }
}
