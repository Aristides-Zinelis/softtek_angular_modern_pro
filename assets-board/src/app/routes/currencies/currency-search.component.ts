import { Component, model } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "lab-currency-search",
  imports: [FormsModule],
  template: `<input
    #inputCurrency
    type="text"
    placeholder="Your currency"
    [(ngModel)]="currencySymbol" />`,
})
export default class CurrencySearchComponent {
  public currencySymbol = model("");
}
