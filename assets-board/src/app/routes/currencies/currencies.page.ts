import { CurrencyPipe } from "@angular/common";
import {
  Component,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  signal,
} from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { OpenExRatesRepository } from "app/api/open-ex-rates.repository";
import CurrencySearchComponent from "./currency-search.component";

@Component({
  selector: "lab-currencies",
  imports: [CurrencySearchComponent, FormsModule, CurrencyPipe],
  template: `<h1>Currencies</h1>
    <lab-currency-search [(currencySymbol)]="currencySymbol" />
    <pre>1 dollar is {{ currencyValue() }} {{ to() }} </pre>
    <pre>1 {{ to() }} is {{ currencyDollarsValue() | currency }}</pre>
    <label for="amount">Amount of {{ to() }}</label>
    <input type="number" placeholder="Amount" [(ngModel)]="amount" />
    <pre>{{ amount() }} {{ to() }} are {{ dollars() | currency }}</pre> `,
})
export default class CurrenciesPage {
  /**
   * The currency symbol to convert to, defaulting to an empty string.
   * This value is bound to the router's query parameters.
   */
  public to = input<string>("");
  private oerRepo = inject(OpenExRatesRepository);
  private router = inject(Router);

  /**
   * The currency symbol, which is linked to the router's query parameters.
   * It defaults to "EUR" if the `to` input is not provided.
   * Can be changed by the user through the `CurrencySearchComponent`.
   */
  protected currencySymbol = linkedSignal({
    source: signal(""),
    computation: () => this.to() || "EUR",
  });

  /**
   * This effect is triggered when the currency symbol changes.
   * It updates the router's query parameters to reflect the new currency symbol.
   */
  private onCurrencySymbolChange = effect(() => {
    const currencySymbol = this.currencySymbol();
    this.router.navigate([], { queryParams: { to: currencySymbol } });
  });

  /**
   * The amount of the currency to convert, defaulting to 19.
   * This value is bound to an input field in the template.
   */
  protected amount = signal<number>(19);

  private dollarsResource = rxResource({
    request: () => this.currencySymbol().toUpperCase(),
    loader: (params) => this.oerRepo.getRateForDollarBySymbol$(params.request),
  });

  /**
   * The dollar rate for the selected currency symbol.
   */
  protected currencyValue = computed(() => this.dollarsResource.value() || 1);

  /**
   * The value of the currency in dollars, ie the inverse of the dollar rate.
   */
  protected currencyDollarsValue = computed(() => 1 / this.currencyValue());

  /**
   * The amount of dollars equivalent to the selected currency amount.
   */
  protected dollars = computed(
    () => this.amount() * this.currencyDollarsValue()
  );
}
