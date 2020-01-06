import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Setting } from './setting';
import { Recipe } from '../recipes/recipe.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipesService: RecipeService, private setting: Setting) { }
  storeRecipes(){
    const recipes = this.recipesService.getRecipes();
    this.http
      .put(this.setting.connectString, recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes(){
    this.http
      .get<Recipe[]>(this.setting.connectString)
      .pipe(map(recipes => {
        return recipes.map(
          recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          }
        );
      }))
      .subscribe(recipes => {
        this.recipesService.setRecipes(recipes);
      })
  }
}
