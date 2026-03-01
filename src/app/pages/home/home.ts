import { Component, signal, HostListener, inject, OnInit } from '@angular/core';
import { CarrouselComponent } from '../../components/carrousel/carrousel';
import { ProductCard } from '../../components/product-card/product-card';
import { FormsModule } from '@angular/forms';
import { CategoryCard } from '../../components/category-card/category-card';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CarrouselComponent, ProductCard, FormsModule, CategoryCard, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  products = signal<any[]>([]);
  categories = signal<any[]>([]);

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
    this.productService.getProducts().subscribe(products => {
      this.products.set(products);
    });
    this.categoryService.getCategories().subscribe(categories => {
      this.categories.set(categories);
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
