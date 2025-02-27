import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ThemeToggleComponent } from "./theme-toggle.component";
import { TotalAmountComponent } from "./total-amount.component";

@Component({
  selector: "lab-header",
  imports: [RouterLink, ThemeToggleComponent, TotalAmountComponent],
  template: `
    <header>
      <nav>
        <ul>
          <li>
            <a routerLink="/"
              ><strong>{{ title() }}</strong></a
            >
          </li>
        </ul>
        <ul>
          <li>
            <lab-total-amount />
          </li>
          <li>
            <a routerLink="/currencies">Currencies</a>
          </li>
          <li>
            <a routerLink="/stocks">Stocks</a>
          </li>
          <li>
            <lab-theme-toggle />
          </li>
        </ul>
      </nav>
    </header>
  `,
  styles: ``,
})
export class HeaderComponent {
  public title = input.required<string>();
}
