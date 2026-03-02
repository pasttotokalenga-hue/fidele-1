import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { StateManagement } from '../../state/state-management';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {

  constructor(private basketService : StateManagement){}

  @Input() product!: Product;

  basket: Product[] = [];

addToBasket(product : Product){
  this.basketService.addToBasket(product)
}
  
}
