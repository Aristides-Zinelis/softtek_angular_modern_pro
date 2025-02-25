import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import CurrencySearchComponent from "./currency-search.component";

@Component({
  selector: "lab-currencies",
  imports: [CurrencySearchComponent, FormsModule],
  template: `<h1>Currencies</h1>
    <lab-currency-search />
    <pre>Currency: </pre>
    <input type="number" placeholder="Amount" />
    <pre>Converted to dollars</pre> `,
})
export default class CurrenciesPage {}
