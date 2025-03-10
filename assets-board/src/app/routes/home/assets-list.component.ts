import { CurrencyPipe, DecimalPipe } from "@angular/common";
import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Category } from "@domain/category.type";
import { Asset } from "../../../domain/asset.type";

@Component({
  selector: "lab-assets-list",
  imports: [RouterLink, CurrencyPipe, DecimalPipe],
  template: `
    <article>
      <header>
        <h2>Assets</h2>
        <p> This is your current portfolio</p>
      </header>
      <table>
        <thead>
          <tr>
            <th>Asset</th>
            <th>Category</th>
            <th style="text-align: right;">Quantity</th>
            <th style="text-align: right;">Value</th>
            <th style="text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          @for (asset of assets(); track $index) {
          <tr>
            <td
              ><a [routerLink]="['assets', 'edit', asset.id]">{{
                asset.name
              }}</a></td
            >
            <td>{{ categoryName(asset) }}</td>
            <td style="text-align: right;">{{
              asset.quantity | number : "1.2-2"
            }}</td>
            <td style="text-align: right;">{{
              asset.value | currency : "USD" : "symbol" : "1.2-2"
            }}</td>
            <td style="text-align: right;">{{
              asset.quantity * asset.value
                | currency : "USD" : "symbol" : "1.0-0"
            }}</td>
          </tr>
          }
        </tbody>
      </table>
    </article>
  `,
  styles: ``,
})
export class AssetsListComponent {
  public assets = input.required<Asset[]>();
  public categories = input.required<Category[]>();
  protected categoryName = (asset: Asset) => {
    const category = this.categories().find(
      (category) => category.id === asset.categoryId
    );
    return category ? category.name : "Unknown";
  };
}
