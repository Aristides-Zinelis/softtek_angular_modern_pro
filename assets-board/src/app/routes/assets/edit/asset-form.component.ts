import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Asset } from '@domain/asset.type';

@Component({
  selector: 'lab-asset-form',
  imports: [FormsModule],
  template: `
    <form>
      <legend>{{asset().name}}</legend>
      <fieldset>
        <label for="quantity">Quantity</label>
        <input [(ngModel)]="asset().quantity" name="quantity"  type="number" min="0" />
        <label for="value">Value</label>
        <input [(ngModel)]="asset().value" name="value" type="number" min="0" />
      </fieldset>
      <button type="submit" (click)="update()">Save</button>
    </form>
  `,
  styles: ``
})
export class AssetFormComponent {
  public asset = input.required<Asset>();
  public updateAsset = output<Asset>();
  protected update = () => this.updateAsset.emit(this.asset());
}
