import { Component, computed, inject } from "@angular/core";
import { AssetsStore } from "app/state/assets.store";

@Component({
  selector: "lab-total-amount",
  template: `<a>{{ formatCurrency() }}</a>`,
})
export class TotalAmountComponent {
  private assetsStore = inject(AssetsStore);
  protected totalAmount = this.assetsStore.totalAmount;

  protected formatCurrency = computed(() => {
    const value = this.totalAmount();
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  });
}
