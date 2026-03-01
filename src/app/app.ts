import { Component} from '@angular/core';
import { Header } from './components/header/header';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [Header,RouterOutlet], 
  templateUrl: 'app.html'
})
export class App {

  currentRoute ='';

  constructor(private router : Router){

    this.router.events.subscribe(event =>{
      if(event instanceof NavigationEnd){
        this.currentRoute = event.urlAfterRedirects;
      }
    })
  }

}





