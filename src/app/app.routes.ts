import {Routes } from '@angular/router';
import { App } from './app';

export const routes: Routes = [

    {
        path:'',
        component : App,
        children : [
            {
                path:"",
                loadComponent : () =>import('./pages/home/home').then(a=> a.Home) 
            },
            {
                path:'cart',
                loadComponent : () =>import('./pages/cart/cart').then(a=> a.Cart) 
            },
            {
                path:'delivery',
                loadComponent : () =>import('./pages/delivery/delivery').then(a=> a.Delivery) 
            },
            {
                path : "login",
                loadComponent : () =>import('./pages/login/login').then(a=> a.Login) 
            },
            {
                path : "signup",
                loadComponent : () =>import('./pages/signup/signup').then(a=> a.Signup) 
            },
            {
                path : "profile",
                loadComponent : () =>import('./pages/profile/profile').then(a=> a.Profile) 
            }
                 
        ]
        
    },


     
     


];
