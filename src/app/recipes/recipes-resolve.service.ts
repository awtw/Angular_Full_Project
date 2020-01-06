import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolveService implements Resolve<Recipe[]> {

  constructor(private dataStorageServive: DataStorageService, private recpieService: RecipeService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const recipes = this.recpieService.getRecipes();
    if(recipes.length === 0){
      return this.dataStorageServive.fetchRecipes();
    } else {
      recipes;
    }
  }
}
