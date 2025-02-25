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
  template: `<input #inputCurrency type="text" placeholder="Your currency" />`,
})
export default class CurrencySearchComponent {
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
