import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[]; // remove, and add list to recipe.service
  subscription: Subscription;
  constructor(
    private recipeServie: RecipeService,
    private router: Router,
    private route: ActivatedRoute) { } // to connect to recip list

  ngOnInit() {
    this.subscription = this.recipeServie.recipeChange
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      )
    this.recipes = this.recipeServie.getRecipes(); // to connect to recip list
  }
  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
