import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ThemeToggleComponent } from "./theme-toggle.component";

@Component({
  selector: "lab-header",
  imports: [RouterLink, ThemeToggleComponent],
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
