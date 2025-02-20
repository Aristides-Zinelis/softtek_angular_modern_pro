import { inject, Injectable } from "@angular/core";
import { Asset } from "@domain/asset.type";
import { Category } from "@domain/category.type";
import { AssetsRepository } from "app/api/assets.repository";
import { CategoriesRepositoryService } from "app/api/categories.repository";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AssetsService {
  private assetsRepository = inject(AssetsRepository);
  private categoriesRepository = inject(CategoriesRepositoryService);

  public getAssets$(): Observable<Asset[]> {
    return this.assetsRepository.getAll$();
  }

  public getCategories$(): Observable<Category[]> {
    return this.categoriesRepository.getAll$();
  }
}
