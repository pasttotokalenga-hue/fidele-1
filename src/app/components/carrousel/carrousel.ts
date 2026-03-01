import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.html',
  styleUrls: ['./carrousel.css']
})
export class CarrouselComponent implements AfterViewInit, OnDestroy {
  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;
  private index: number = 0;
  private intervalId: any;

  ngAfterViewInit(): void {
    // Lancement du défilement automatique toutes les 10 secondes
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 10000);
  }

  ngOnDestroy(): void {
    // Nettoyage pour éviter les fuites de mémoire
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private showSlide(i: number): void {
    this.carousel.nativeElement.style.transform = `translateX(-${i * 100}%)`;
  }

  public nextSlide(): void {
    const totalSlides = this.carousel.nativeElement.children.length;
    this.index = (this.index + 1) % totalSlides;
    this.showSlide(this.index);
  }

  public prevSlide(): void {
    const totalSlides = this.carousel.nativeElement.children.length;
    this.index = (this.index - 1 + totalSlides) % totalSlides;
    this.showSlide(this.index);
  }
}
