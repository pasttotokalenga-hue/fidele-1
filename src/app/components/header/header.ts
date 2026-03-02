import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { StateManagement } from '../../state/state-management';
import { Product } from '../../interfaces/product';


@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  constructor( private basketState : StateManagement){}
  

  basketStates() : Product[] {

    return this.basketState.basketStates();

  }


  authService = inject(AuthService);
  
  dropdownOpen = false;

  toggleDropdown(){
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.authService.logout();
    this.dropdownOpen = false;
  }
  
}
