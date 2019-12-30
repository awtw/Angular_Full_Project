import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeItem: Recipe;
  id: number;
  constructor(
    private recipeSerive: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipeItem = this.recipeSerive.getRecipe(this.id);
        }
      );
  }

  onAddToShoppingList(){
    this.recipeSerive.addIngredientsToShoppingList(this.recipeItem.ingredients)
  }
  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'],{relativeTo: this.route});
    //the second one is for demostration, you can use complex router setting for higher level

  }



}
