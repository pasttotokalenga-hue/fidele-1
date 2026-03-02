import { Component, signal, HostListener, inject, OnInit } from '@angular/core';
import { CarrouselComponent } from '../../components/carrousel/carrousel';
import { ProductCard } from '../../components/product-card/product-card';
import { FormsModule } from '@angular/forms';
import { CategoryCard } from '../../components/category-card/category-card';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';
import { Category } from '../../interfaces/category';
import { error } from 'console';

@Component({
  selector: 'app-home',
  imports: [CarrouselComponent, ProductCard, FormsModule, CategoryCard, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  loading = signal<boolean>(false);


  minValue = 200;
  maxValue = 800;

  isAsideOpen = true;
  isDesktop = false;

  ngOnInit() {

    if (typeof window !== 'undefined') {
      this.isDesktop = window.innerWidth >= 768;
      this.isAsideOpen = this.isDesktop; 
    }

    this.loadData();






  }

  loadData() {
  this.loading.set(true);

  this.productService.getProducts().subscribe({
    next: products => {
      this.products.set(products);
      this.loading.set(false);
    },
    error: () => this.loading.set(false)
  });

  this.categoryService.getCategories().subscribe({
    next: categories => {
      this.categories.set(categories);
    }
  });
}







  toggleAside() {
    this.isAsideOpen = !this.isAsideOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isDesktop = event.target.innerWidth >= 768;
    this.isAsideOpen = this.isDesktop;
  }

}
