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
  imports: [CurrencySearchComponent, FormsModule],
  template: `<h1>Currencies</h1>
    <lab-currency-search [(currencySymbol)]="currencySymbol" />
    <pre>Currency: {{ to() }} at {{ currencyValue() }} $</pre>
    <input type="number" placeholder="Amount" [(ngModel)]="amount" />
    <pre>Converted to {{ dollars() }} dollars</pre> `,
})
export default class CurrenciesPage {
  public to = input<string>("");
  private oerRepo = inject(OpenExRatesRepository);
  private router = inject(Router);

  protected currencySymbol = linkedSignal({
    source: signal(""),
    computation: () => this.to() || "USD",
  });

  private onCurrencySymbolChange = effect(() => {
    const currencySymbol = this.currencySymbol();
    this.router.navigate([], { queryParams: { to: currencySymbol } });
  });
  protected amount = signal<number>(19);
  private dollarsResource = rxResource({
    request: () => this.currencySymbol().toUpperCase(),
    loader: (params) => this.oerRepo.getDollarsForCurrency$(params.request),
  });

  protected currencyValue = computed(() => this.dollarsResource.value());

  protected dollars = computed(() => this.amount() * this.currencyValue());
}
