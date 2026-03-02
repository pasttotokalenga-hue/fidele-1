import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class StateManagement {

private basketSource = new BehaviorSubject<Product[]>([]);
basket$ = this.basketSource.asObservable();

constructor(){}

addToBasket(product: Product): void {
const currentBasket = this.basketSource.value;
const updateBasket = [...currentBasket, product];
this.basketSource.next(updateBasket);

}


clearBasket():void {
  const updatedBasket : Product[] =[];
  this.basketSource.next(updatedBasket);

}

basketStates(): Product[] {

return this.basketSource.value;

}






}
