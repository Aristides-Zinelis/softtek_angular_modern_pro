import { Component, inject } from "@angular/core";
import { AssetsStore } from "app/state/assets.store";

@Component({
  selector: "lab-total-amount",
  template: `<a>{{ totalAmount() }}</a>`,
})
export class TotalAmountComponent {
  private assetsStore = inject(AssetsStore);
  protected totalAmount = this.assetsStore.totalAmount;
}
