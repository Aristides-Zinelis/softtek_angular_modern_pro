import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "lab-currency-search",
  imports: [FormsModule],
  template: `<input #inputCurrency type="text" placeholder="Your currency" />`,
})
export default class CurrencySearchComponent {}
