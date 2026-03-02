import { Component } from '@angular/core';
import { Modal } from '../../components/modal/modal';
import { RouterLink } from '@angular/router';
import { StateManagement } from '../../state/state-management';
import { Product } from '../../interfaces/product';


@Component({
  selector: 'app-cart',
  imports: [Modal, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {

  constructor(private basketStates : StateManagement){}

  basket(): any {
    return this.basketStates.basketStates();
  }

 


showProduct = false;

 summonProduct(){

  this.showProduct = true;

 }

 closeProduct(){

  this.showProduct = false;

 }

}
