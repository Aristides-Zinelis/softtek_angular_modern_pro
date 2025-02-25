import { inject, Injectable } from "@angular/core";
import { Asset } from "@domain/asset.type";
import { AssetsRepository } from "app/api/assets.repository";
import { OperationStore } from "app/state/operation.store";

@Injectable()
export class NewAssetService {
  private assetRepository = inject(AssetsRepository);

  private operationStore = new OperationStore<Asset>((asset) =>
    this.assetRepository.post$(asset)
  );

  public saveAsset(asset: Asset): void {
    this.operationStore.trigger(asset);
  }

  public savedAsset = this.operationStore.result;
}
