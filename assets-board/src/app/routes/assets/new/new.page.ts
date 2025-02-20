import { JsonPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { NULL_ASSET } from "@domain/asset.type";
import { AssetFormComponent } from "./asset-form.component";
import { AssetService } from "./asset.service";

@Component({
  selector: "lab-new",
  imports: [AssetFormComponent, JsonPipe],
  providers: [AssetService],
  template: `
    <article>
      <header>Add a new Asset</header>
      <main>
        <lab-asset-form [(asset)]="newAsset" (saveAsset)="saveAsset()">
        </lab-asset-form>
      </main>
    </article>
    <pre>{{ savedAsset() | json }} </pre>
    <pre>{{ savedAssetError() }} </pre>
  `,
  styles: ``,
})
export default class NewPage {
  private assetService = inject(AssetService);
  protected newAsset = { ...NULL_ASSET };
  protected savedAsset = this.assetService.savedAsset;
  protected savedAssetError = this.assetService.savedAssetError;
  protected saveAsset() {
    this.assetService.saveAsset.next(this.newAsset);
  }
}
