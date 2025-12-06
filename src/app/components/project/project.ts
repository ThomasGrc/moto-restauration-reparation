import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.html'
})
export class ProjectComponent {
  @Input({ required: true }) blok!: any;
  constructor() {
    console.log(this.blok)
  }
}
