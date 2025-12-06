import {
  Component,
  ElementRef,
  ViewChild,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-project',
  standalone: true,
  templateUrl: './project.html',
  styleUrl: './project.scss',
})
export class ProjectComponent {
  blok = input.required<any>();

  selectedImage = signal<string | null>(null);

  @ViewChild('carousel', { static: false })
  carousel!: ElementRef<HTMLDivElement>;

  openImage(src: string) {
    this.selectedImage.set(src);
  }

  closeImage() {
    this.selectedImage.set(null);
  }

  scrollLeft() {
    this.carousel.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.carousel.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  }
}
