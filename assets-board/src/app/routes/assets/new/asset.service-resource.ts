import { inject, Injectable } from '@angular/core';
import { Asset, NULL_ASSET } from '@domain/asset.type';
import { AssetsRepository } from 'app/api/assets.repository';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetServiceCopy {
  private assetRepository = inject(AssetsRepository);


  public saveAsset$(asset: Asset): Observable<Asset> {
    if (asset.name == NULL_ASSET.name) return of(NULL_ASSET);
    console.log('Saving asset', asset);
    return this.assetRepository.post$(asset);
  }
}
