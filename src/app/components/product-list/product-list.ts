import { Component, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from '../products/products';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, Products],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  products = input<any[]>([]);
  index = 0;

  ngOnInit() {
    console.log(this.products());
  }

  next() {
    if (!this.products() || this.products().length === 0) return;
    this.index = (this.index + 1) % this.products().length;
  }

  prev() {
    if (!this.products() || this.products().length === 0) return;
    this.index = (this.index - 1 + this.products().length) % this.products().length;
  }

  go(i: number) {
    if (!this.products() || this.products().length === 0) return;
    this.index = i;
  }
}
