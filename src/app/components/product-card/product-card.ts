import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: Product;

  basket: Product[] = [];

addToBasket(product : Product){

  this.basket.push(product);

  console.log(this.basket);

}
  
}
