import { Injectable } from "@angular/core";
import { delay, map, Observable, of } from "rxjs";
import { Asset } from "../../../domain/asset.type";

@Injectable({
  providedIn: "root",
})
export class AssetsService {
  private fakeData: Asset[] = [
    {
      id: 1,
      name: "Bitcoin",
      categoryId: 1,
      quantity: 0.01,
      value: 100000,
    },
    {
      id: 2,
      name: "Flat NY",
      categoryId: 2,
      quantity: 1,
      value: 1000000,
    },
    {
      id: 3,
      name: "Ethereum",
      categoryId: 1,
      quantity: 10,
      value: 2500,
    },
  ];

  public getAssets$(): Observable<Asset[]> {
    return of(this.fakeData).pipe(
      delay(3000),
      map((data) => {
        if (Math.random() < 0.5) {
          throw new Error("No assets found");
        }
        return data;
      })
    );
  }
}
