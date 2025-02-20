import { inject, Injectable, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Asset } from "@domain/asset.type";
import { AssetsRepository } from "app/api/assets.repository";
import { catchError, Observable, Subject, switchMap } from "rxjs";

@Injectable()
export class AssetService {
  private assetRepository = inject(AssetsRepository);

  public saveAsset = new Subject<Asset>();

  public savedAsset = toSignal(
    this.saveAsset.pipe(
      switchMap((asset) => this.saveAsset$(asset)),
      catchError((error) => {
        this.savedAssetError.set(error);
        return [];
      })
    )
  );
  public savedAssetError = signal<string>("");

  private saveAsset$(asset: Asset): Observable<Asset> {
    console.log("Saving asset", asset);
    return this.assetRepository.post$(asset);
  }
}
