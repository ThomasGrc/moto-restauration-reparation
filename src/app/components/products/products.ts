import { Component, Input, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductContent } from '../types/types';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
   product = input<ProductContent>();

  readonly selectedIndex = signal(0);

  readonly photos = computed(() => this.product()?.Photos ?? []);
  readonly selectedPhoto = computed(() => this.photos()[this.selectedIndex()] ?? null);

  selectPhoto(index: number): void {
    this.selectedIndex.set(index);
    console.log(this.product())
  }

  redirectToLeboncoinProductPage(): void {
    const url = this.product()?.leboncoin_url;
    if (url) {
      window.open(url, '_blank');
    }
  }
}
