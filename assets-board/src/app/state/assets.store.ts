import { computed, Injectable, signal } from "@angular/core";
import { Asset } from "@domain/asset.type";

@Injectable({
  providedIn: "root",
})
export class AssetsStore {
  private assets = signal<Asset[]>([]);

  public setAssets(assets: Asset[]) {
    const clonedAssets = JSON.parse(JSON.stringify(assets));
    this.assets.set(clonedAssets);
  }

  public addAsset(asset: Asset) {
    this.assets.update((state) => [...state, asset]);
  }

  public updateAsset(updatedAsset: Asset) {
    this.assets.update((assets) => {
      return assets.map((a) => (a.id === updatedAsset.id ? updatedAsset : a));
    });
  }

  public totalAmount = computed(() => {
    return this.assets().reduce((acc, asset) => {
      return acc + asset.quantity * asset.value;
    }, 0);
  });
}
