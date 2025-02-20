import { inject, Injectable } from "@angular/core";
import { Asset } from "@domain/asset.type";
import { AssetsRepository } from "app/api/assets.repository";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AssetService {
  private assetsRepository = inject(AssetsRepository);

  public getAssetById$(id: number): Observable<Asset> {
    return this.assetsRepository.getById$(Number.parseInt(id.toString()));
  }

  public updateAsset$(asset: Asset): Observable<Asset> {
    return this.assetsRepository.update$(asset);
  }
}
