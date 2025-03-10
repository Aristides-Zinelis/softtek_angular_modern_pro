import { Component, effect, ElementRef, model, viewChild } from "@angular/core";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
} from "rxjs";

@Component({
  selector: "lab-currency-search",
  imports: [],
  template: ` <label for="inputCurrency">Currency symbol</label>
    <input
      #inputCurrency
      type="text"
      placeholder="Your currency"
      [value]="currencySymbol()" />`,
})
export default class CurrencySearchComponent {
  /**
   * The currency symbol, which is an input attribute.
   */
  public currencySymbol = model("");
  private inputCurrencyElement =
    viewChild<ElementRef<HTMLInputElement>>("inputCurrency");

  private onInputElement = effect(() => {
    const element = this.inputCurrencyElement();
    if (!element) return;
    const inputElement = element.nativeElement;
    fromEvent(inputElement, "input")
      .pipe(
        map((event) => (event.target as HTMLInputElement).value),
        debounceTime(300),
        map((value) => value.toUpperCase()),
        filter((value) => value.length === 3),
        distinctUntilChanged()
      )
      .subscribe((currency) => {
        this.currencySymbol.set(currency);
      });
  });
}
