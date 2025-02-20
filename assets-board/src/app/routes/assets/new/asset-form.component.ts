import { Component, model, output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Asset } from "@domain/asset.type";

@Component({
  selector: "lab-asset-form",
  imports: [FormsModule],
  template: `
    <form>
      <fieldset>
        <label for="name">Name</label>
        <input [(ngModel)]="asset().name" name="name" />
        <label for="category">Category</label>
        <input
          [(ngModel)]="asset().categoryId"
          name="category"
          type="number"
          min="0" />
        <label for="quantity">Quantity</label>
        <input
          [(ngModel)]="asset().quantity"
          name="quantity"
          type="number"
          min="0" />
        <label for="value">Value</label>
        <input [(ngModel)]="asset().value" name="value" type="number" min="0" />
      </fieldset>
      <button type="submit" (click)="saveAsset.emit()">Save</button>
    </form>
  `,
  styles: ``,
})
export class AssetFormComponent {
  public asset = model.required<Asset>();
  public saveAsset = output<void>();
}
