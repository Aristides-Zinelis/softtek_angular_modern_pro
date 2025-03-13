import { loadRemoteModule } from "@angular-architects/native-federation";
import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./routes/home/home.page"),
  },
  {
    path: "assets/edit/:id",
    loadComponent: () => import("./routes/assets/edit/edit.page"),
  },
  {
    path: "assets/new",
    loadComponent: () => import("./routes/assets/new/new.page"),
  },
  {
    path: "currencies",
    loadComponent: () => import("./routes/currencies/currencies.page"),
  },
  {
    path: "stocks",
    // loadComponent: () => import("./routes/stocks/stocks.page"),
    loadComponent: () =>
      loadRemoteModule({
        remoteEntry: "http://localhost:4201/remoteEntry.js",
        remoteName: "assets-stocks",
        exposedModule: "./StocksPage",
      }).then((m) => m.StocksPageComponent),
  },
];
