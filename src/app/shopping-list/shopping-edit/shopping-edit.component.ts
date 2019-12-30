import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput',{static: true}) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: true }) amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private shoppListService: ShoppingListService) { }

  onAddItem(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.nameInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName,ingAmount);
    this.shoppListService.addIngredient(newIngredient);
    // this.ingredientAdded.emit(newIngredient);
  }

  ngOnInit() {
  }

}
