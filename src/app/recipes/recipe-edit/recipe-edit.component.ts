import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: [ './recipe-edit.component.css' ]
})
export class RecipeEditComponent implements OnInit {
	id: number;
	edithMode = false;
  recipeForm: FormGroup;

	constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {}

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			this.id = +params['id'];
			this.edithMode = params['id'] != null;
			this.initForm();
		});
	}
	private initForm() {
		let recipeName = '';
		let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

		if (this.edithMode) {
			const recipe = this.recipeService.getRecipe(this.id);
			recipeName = recipe.name;
			recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']) {
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
		}

		this.recipeForm = new FormGroup({
			'name': new FormControl(recipeName, Validators.required),
			'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients
		});
	}
	onSubmit() {
    console.log(this.recipeForm);
   if(this.edithMode) {
     this.recipeService.updateRecipe(this.id, this.recipeForm.value);
   } else {
     this.recipeService.addRecipe(this.recipeForm.value);
   }
   this.onCancel();
  }

  get controls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
   ( <FormArray>this.recipeForm.get('ingredients')).push(
     new FormGroup({
       'name': new FormControl(null, Validators.required),
       'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
     })
   )
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    // (<FormArray>this.recipeForm.get('ingredients')).clear();
  }
}
