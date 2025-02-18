import { CurrencyPipe } from "@angular/common";
import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Asset } from "../../../domain/asset.type";

@Component({
  selector: "lab-assets-list",
  imports: [RouterLink, CurrencyPipe],
  template: `
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
          <td>{{ asset.categoryId }}</td>
          <td style="text-align: right;">{{ asset.quantity }}</td>
          <td style="text-align: right;">{{ asset.value | currency }}</td>
          <td style="text-align: right;">{{
            asset.quantity * asset.value | currency
          }}</td>
        </tr>
        }
      </tbody>
    </table>
  `,
  styles: ``,
})
export class AssetsListComponent {
  public assets = input.required<Asset[]>();
}
