import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[]; // remove, and add list to recipe.service

  constructor(
    private recipeServie: RecipeService,
    private router: Router,
    private route: ActivatedRoute) { } // to connect to recip list

  ngOnInit() {
    this.recipes = this.recipeServie.getRecipes(); // to connect to recip list
  }
  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }


}
