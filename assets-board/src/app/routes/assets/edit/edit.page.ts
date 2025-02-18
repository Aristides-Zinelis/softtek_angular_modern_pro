import { JsonPipe } from "@angular/common";
import { Component, computed, inject, input } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { AssetsService } from "../../home/assets.service";

@Component({
  selector: "lab-edit",
  imports: [JsonPipe],
  template: `
    <p> Editing asset {{ id() }} </p>
    <pre>{{ asset() | json }}</pre>
  `,
  styles: ``,
})
export default class EditPage {
  public id = input.required<number>();

  protected asset = computed(() => this.assetResource.value());

  private assetsService = inject(AssetsService);
  private assetResource = rxResource({
    request: () => this.id(),
    loader: (param) => this.getAssetById$(param.request),
  });
  private getAssetById$(id: number) {
    return this.assetsService.getAssetById$(id);
  }
}
