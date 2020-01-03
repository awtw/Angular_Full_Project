import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChange = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe('Tasty Schnitzel',
    'A super-tasty Schintizel - just awesome',
    'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    [
      new Ingredient('Meat', 1),
      new Ingredient('French Fires', 20)

    ]),
    new Recipe('BIg Fat Burger',
    'What else you need to say ?',
    'https://images.unsplash.com/photo-1547584370-2cc98b8b8dc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
    [
      new Ingredient('Buns', 2),
      new Ingredient('Meat', 3)
    ])
  ];


  constructor(private shoppingListService: ShoppingListService) {

   }
   getRecipes(){
     return this.recipes.slice(); // return new array, copy
   }

   getRecipe(index: number){
    return this.recipes.slice()[index];
   }

   addIngredientsToShoppingList(ingredients: Ingredient[]){
     this.shoppingListService.addIngredients(ingredients);
   }

   addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChange.next(this.recipes.slice());
   }

   updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
     this.recipeChange.next(this.recipes.slice());
   }

   deleteRecipe(index: number){
     this.recipes.splice(index,1);
     this.recipeChange.next(this.recipes.slice());
   }
}
