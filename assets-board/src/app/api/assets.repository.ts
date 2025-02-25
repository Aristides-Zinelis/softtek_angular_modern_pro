import { Injectable } from "@angular/core";
import { Asset, NULL_ASSET } from "@domain/asset.type";
import { delay, Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AssetsRepository {
  private fakeData = [
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

  public getAll$(): Observable<Asset[]> {
    return of(this.fakeData).pipe(delay(500));
  }

  public getById$(id: number): Observable<Asset> {
    const asset = this.fakeData.find((asset) => asset.id === id);
    return of(asset || NULL_ASSET);
  }

  public update$(asset: Asset): Observable<Asset> {
    const index = this.fakeData.findIndex((a) => a.id === asset.id);
    if (!index) return of(NULL_ASSET);
    this.fakeData[index] = asset;
    return of(asset);
  }

  public post$(asset: Asset): Observable<Asset> {
    const newAsset = { ...asset, id: this.fakeData.length + 1 };
    this.fakeData.push(newAsset);
    return of(newAsset);
  }
}
