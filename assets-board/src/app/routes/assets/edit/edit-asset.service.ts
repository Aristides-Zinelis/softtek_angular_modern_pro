import { inject, Injectable } from "@angular/core";
import { Asset } from "@domain/asset.type";
import { AssetsRepository } from "app/api/assets.repository";
import { OperationStore } from "app/state/operation.store";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EditAssetService {
  private assetsRepository = inject(AssetsRepository);
  private operationStore = new OperationStore<Asset>((asset) =>
    this.assetsRepository.update$(asset)
  );

  public getAssetById$(id: number): Observable<Asset> {
    return this.assetsRepository.getById$(Number.parseInt(id.toString()));
  }

  public updateAsset(asset: Asset): void {
    return this.operationStore.trigger(asset);
  }
  public updateAssetResult = this.operationStore.result;
}
