import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./layout/header/header.component";

@Component({
  selector: "lab-root",
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <lab-header [title]="title" />

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  protected title = "assets-board";
}
