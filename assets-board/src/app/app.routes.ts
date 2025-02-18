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
];
