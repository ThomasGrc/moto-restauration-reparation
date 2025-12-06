import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from "./components/home-page/home-page";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HomePage],
  templateUrl: './app.html'
})
export class App  {}
