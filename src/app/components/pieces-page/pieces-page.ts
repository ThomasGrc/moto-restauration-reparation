import { Component, inject, OnInit, signal } from '@angular/core';
import { StoryblokService } from '../../services/storyblok.service';
import { ProductList } from "../product-list/product-list";
import { Navbar } from "../navbar/navbar";
import { Contact } from "../contact/contact";
import { Separator } from "../separator/separator";

@Component({
  selector: 'app-pieces-page',
  imports: [ProductList, Navbar, Contact, Separator],
  templateUrl: './pieces-page.html',
  styleUrl: './pieces-page.scss',
})
export class PiecesPage implements OnInit {
private readonly sb = inject(StoryblokService);
  public readonly products = signal<any[]>([]);

  async ngOnInit(): Promise<void> {
    try {
      const response: any = await this.sb.getProjects();
      const stories: any[] = response?.data?.stories ?? [];

      this.products.set(stories.filter((s) => s?.content?.component === 'product'));
    } catch (err) {
      console.error('Failed to load Storyblok stories', err);
      this.products.set([]);
    }
  }
}
