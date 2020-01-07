import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Setting } from './setting';
import { Recipe } from '../recipes/recipe.model';
import {map, tap, exhaustMap, take} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipesService: RecipeService, private setting: Setting, private authService: AuthService) { }
  storeRecipes(){
    const recipes = this.recipesService.getRecipes();
    this.http
      .put(this.setting.connectString, recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes(){
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
      return this.http.get<Recipe[]>(this.setting.connectString, {
        params: new HttpParams().set('auth', user.token)
      })
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipesService.setRecipes(recipes);
      }));


    }
}
