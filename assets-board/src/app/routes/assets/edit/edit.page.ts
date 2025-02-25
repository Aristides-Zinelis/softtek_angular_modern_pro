import { JsonPipe } from "@angular/common";
import {
  Component,
  computed,
  effect,
  inject,
  input,
  ResourceStatus,
  signal,
} from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { Asset, NULL_ASSET } from "@domain/asset.type";
import { AssetFormComponent } from "./asset-form.component";
import { EditAssetService } from "./edit-asset.service";

@Component({
  selector: "lab-edit",
  imports: [AssetFormComponent, JsonPipe],
  template: `
    <article>
      <header>Editing asset with id: {{ id() }}</header>
      <main>
        <lab-asset-form
          [asset]="assetValue()"
          (updateAsset)="updateAsset($event)">
        </lab-asset-form>
      </main>
      <pre>{{ editResultError() | json }} </pre>
    </article>
  `,
  styles: ``,
})
export default class EditPage {
  public id = input.required<number>();
  private assetService = inject(EditAssetService);
  private router = inject(Router);

  protected assetValue = computed(() => this.asset.value() || NULL_ASSET);
  private editResult = this.assetService.updateAssetResult;

  private editResultEffect = effect(() => {
    if (this.fired() && this.editResult().status === ResourceStatus.Resolved) {
      this.router.navigate(["/"]);
    }
  });

  protected editResultError = computed(() => this.editResult().error);

  private fired = signal(false);
  protected updateAsset = (asset: Asset) => {
    this.fired.set(true);
    this.assetService.updateAsset(asset);
  };

  private asset = rxResource({
    request: () => this.id(),
    loader: (param) => this.assetService.getAssetById$(param.request),
  });
}
