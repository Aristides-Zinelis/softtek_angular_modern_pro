import { CurrencyPipe } from "@angular/common";
import { Component, computed, effect, inject, signal } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { Quote } from "@domain/quote.type";
import { FmpRepository } from "app/api/fmp.repository";

@Component({
  selector: "app-stocks",
  imports: [CurrencyPipe],
  template: `
    <article>
      <header>
        <h2>Top 10 older DowJones Stocks companies</h2>
        <p>Appears in seniority order </p>
      </header>
      <ul>
        @for(profile of profiles(); track profile.symbol) {
        <li
          >{{ profile.symbol }} - {{ profile.ceo }} -
          {{ profile.website }}
        </li>
        }
      </ul>
    </article>
    <article>
      <header>
        <h3>Latest Stock Quotes in Dollars</h3>
        <p>Appears in order of retrieval </p>
      </header>
      <ul>
        @for(quote of quotes(); track quote.symbol) {
        <li
          >{{ quote.symbol }} - {{ quote.name }} -
          {{ quote.price | currency }}</li
        >
        }
      </ul>
    </article>
  `,
})
export default class StocksPage {
  private fmpRepository = inject(FmpRepository);
  protected profiles = computed(() => this.profilesResource.value());
  private profilesResource = rxResource({
    loader: () => this.fmpRepository.getProfiles$(),
  });

  protected quotes = signal<Quote[]>([]);

  private afterProfiles = effect(() => {
    const profiles = this.profiles();
    if (!profiles) return;
    // Las cotizaciones llegan de una en una, en orden aleatorio
    // y se van añadiendo a la lista de cotizaciones
    this.fmpRepository
      .getQuotes$(profiles.map((c) => c.symbol))
      .subscribe((quote) => this.quotes.update((state) => [...state, quote]));
  });
}
