import { Component, computed, inject, input } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { Asset, NULL_ASSET } from "@domain/asset.type";
import { AssetFormComponent } from "./asset-form.component";
import { AssetService } from "./asset.service";

@Component({
  selector: "lab-edit",
  imports: [AssetFormComponent],
  template: `
    <article>
      <header>Editing asset with id: {{ id() }}</header>
      <main>
        <lab-asset-form
          [asset]="assetValue()"
          (updateAsset)="updateAsset($event)">
        </lab-asset-form>
      </main>
    </article>
  `,
  styles: ``,
})
export default class EditPage {
  public id = input.required<number>();

  protected assetValue = computed(() => this.asset.value() || NULL_ASSET);

  protected updateAsset = (asset: Asset) => {
    this.assetService.updateAsset$(asset);
    this.router.navigate(["/"]);
  };

  private router = inject(Router);
  private assetService = inject(AssetService);

  private asset = rxResource({
    request: () => this.id(),
    loader: (param) => this.assetService.getAssetById$(param.request),
  });
}
