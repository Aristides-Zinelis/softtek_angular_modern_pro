import { JsonPipe } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
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
    <pre>{{ savedAssetValue() | json }} </pre>
    <pre>Error: {{ savedAssetError() }} </pre>
  `,
  styles: ``,
})
export default class NewPage {
  private assetService = inject(AssetService);
  protected newAsset = { ...NULL_ASSET };
  private savedAsset = this.assetService.savedAsset;
  protected savedAssetValue = computed(() => this.savedAsset().value);
  protected savedAssetError = computed(() => this.savedAsset().error);
  protected saveAsset() {
    this.assetService.saveAsset(this.newAsset);
  }
}
