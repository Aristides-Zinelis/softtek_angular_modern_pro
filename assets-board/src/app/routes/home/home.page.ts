import { Component, computed, inject, ResourceStatus } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { AssetsListComponent } from "./assets-list.component";
import { AssetsService } from "./assets.service";

@Component({
  selector: "lab-home",
  imports: [AssetsListComponent],
  template: `<lab-assets-list [assets]="assets()" />`,
  styles: ``,
})
export default class HomePage {
  protected assets = computed(() => this.assetsResource.value() || []);
  protected assetsStatus = computed(
    () => ResourceStatus[this.assetsResource.status()]
  );
  protected assetsError = computed(() => this.assetsResource.error());
  private assetsResource = rxResource({
    loader: () => this.assetsService.getAssets$(),
  });
  private assetsService = inject(AssetsService);
}
