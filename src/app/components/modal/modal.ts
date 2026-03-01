import { Component, } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  imports: [FormsModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {

  qteNumber:number = 0;
  selectedOption:String = "";

incrementQte(){
  
this.qteNumber++

}

decrementQte(){

  if(this.qteNumber==0){
    this.qteNumber;
  }else{

    this.qteNumber--;

  }

  
}


}
