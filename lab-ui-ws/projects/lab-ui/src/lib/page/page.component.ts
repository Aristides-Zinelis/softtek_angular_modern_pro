import { Component, input, InputSignal } from '@angular/core';

/**
 * A page template component.
 * @description used to create a page with a title and subtitle.
 */
@Component({
  selector: 'lab-ui-page',
  imports: [],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent {
  /**
   * The title of the page.
   * @throws Required
   */
  public pageTitle: InputSignal<string> = input.required<string>();

  /**
   * The subtitle of the page.
   * Is optional.
   */
  public pageSubtitle: InputSignal<string | undefined> = input<string>();
}
