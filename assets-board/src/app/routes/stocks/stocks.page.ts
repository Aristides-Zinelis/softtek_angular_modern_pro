import { JsonPipe } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { FmpRepository } from "app/api/fmp.repository";

@Component({
  selector: "app-stocks",
  imports: [JsonPipe],
  template: `
    <h2>Stocks</h2>
    <pre>{{ companiesValue() | json }}</pre>
  `,
})
export default class StocksPage {
  private finService = inject(FmpRepository);
  protected companiesValue = computed(() => this.companies.value());
  private companies = rxResource({
    loader: () => this.finService.getProfiles$(),
  });
}
