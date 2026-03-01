import { Component } from '@angular/core';
import { Modal } from '../../components/modal/modal';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [Modal, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {

showProduct = false;

 summonProduct(){

  this.showProduct = true;

 }

 closeProduct(){

  this.showProduct = false;

 }

}
