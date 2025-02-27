import { CurrencyPipe } from "@angular/common";
import { Component, computed, effect, inject, signal } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { Quote } from "@domain/quote.type";
import { FmpRepository } from "app/api/fmp.repository";

@Component({
  selector: "app-stocks",
  imports: [CurrencyPipe],
  template: `
    <h2>Stocks</h2>
    <ul>
      @for(company of companiesValue(); track company.symbol) {
      <li>{{ company.symbol }} - {{ company.ceo }} </li>
      }
    </ul>
    <h3>Quotes</h3>
    <ul>
      @for(quote of quotes(); track quote.symbol) {
      <li>{{ quote.symbol }} - {{ quote.price | currency }}</li>
      }
    </ul>
  `,
})
export default class StocksPage {
  private finService = inject(FmpRepository);
  protected companiesValue = computed(() => this.companies.value());
  private companies = rxResource({
    loader: () => this.finService.getProfiles$(),
  });

  protected quotes = signal<Quote[]>([]);

  private afterCompanies = effect(() => {
    const companies = this.companiesValue();
    if (!companies) return;
    this.finService
      .getQuotes$(companies.map((c) => c.symbol))
      .subscribe((quote) => this.quotes.update((state) => [...state, quote]));
  });
}
