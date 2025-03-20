import { loadRemoteModule } from "@angular-architects/native-federation";
import {
  Component,
  computed,
  inject,
  ResourceStatus,
  viewChild,
  ViewContainerRef,
} from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";
import { LoggerService } from "@lab/logger";
import { PageComponent } from "@lab/ui";
import { AssetsListComponent } from "./assets-list.component";
import { AssetsService } from "./assets.service";

@Component({
  selector: "lab-home",
  imports: [AssetsListComponent, RouterLink, PageComponent],
  template: `
    <lab-ui-page [pageTitle]="'Assets Board'" [pageSubtitle]="'Welcome'">
      @switch(assetsStatus()) { @case('Loading') {
      <aside aria-busy="true">Loading...</aside>
      } @case('Resolved') { @defer(){
      <lab-assets-list [assets]="assets()" [categories]="categories()" />
      } } }
      <footer>
        <p>Add a <a routerLink="/assets/new">new asset</a></p>
      </footer>
    </lab-ui-page>

    <aside #placeholder></aside>
  `,
})
export default class HomePage {
  protected assets = computed(() => this.assetsResource.value() || []);
  protected assetsStatus = computed(
    () => ResourceStatus[this.assetsResource.status()]
  );
  protected assetsError = computed(() => this.assetsResource.error());
  private assetsResource = rxResource({
    loader: () => this.assetsService.getAssets$(),
  });
  protected categories = computed(() => this.categoriesResource.value() || []);
  private categoriesResource = rxResource({
    loader: () => this.categoriesService.getCategories$(),
  });

  private assetsService = inject(AssetsService);

  private categoriesService = inject(AssetsService);

  protected placeholderRef = viewChild("placeholder", {
    read: ViewContainerRef,
  });

  constructor(logger: LoggerService) {
    logger.log("Home page loaded");
    this.loadRemote();
  }

  async loadRemote() {
    const remoteModule = await loadRemoteModule({
      remoteEntry: "http://localhost:4201/remoteEntry.js",
      remoteName: "assets-stocks",
      exposedModule: "./StocksPage",
    });
    this.placeholderRef()?.createComponent(remoteModule.StocksPageComponent);
  }
}
