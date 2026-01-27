import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { StoryblokService } from '../../services/storyblok.service';
import { ProductList } from "../product-list/product-list";
import { Navbar } from "../navbar/navbar";
import { Contact } from "../contact/contact";
import { Separator } from "../separator/separator";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-pieces-page',
  imports: [ProductList, Navbar, Contact, Separator],
  templateUrl: './pieces-page.html',
  styleUrl: './pieces-page.scss',
})
export class PiecesPage implements OnInit {
  private readonly sb = inject(StoryblokService);
  public readonly products = signal<any[]>([]);
  private readonly platformId = inject(PLATFORM_ID);

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollToTop();
    }

    try {
      const response: any = await this.sb.getProjects();
      const stories: any[] = response?.data?.stories ?? [];

      this.products.set(
        stories.filter((s) => s?.content?.component === 'product')
      );
    } catch (err) {
      console.error('Failed to load Storyblok stories', err);
      this.products.set([]);
    }
  }

  private scrollToTop(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // or 'smooth' if you prefer
    });
  }
}
