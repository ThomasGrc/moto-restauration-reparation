import { Component, inject, OnInit, signal } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { ProjectListComponent } from "../project-list/project-list";
import { StoryblokService } from '../../services/storyblok.service';
import { Contact } from "../contact/contact";
import { Prestations } from "../prestations/prestations";
import { ProductList } from "../product-list/product-list";
import { Menu } from "../menu/menu";

@Component({
  selector: 'app-home-page',
  imports: [Navbar, ProjectListComponent, Contact, Prestations, ProductList, Menu],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  private readonly sb = inject(StoryblokService);

  // Keep stories (full objects) split by component
  public readonly projects = signal<any[]>([]);
  public readonly products = signal<any[]>([]);

  async ngOnInit(): Promise<void> {
    try {
      const response: any = await this.sb.getProjects();
      const stories: any[] = response?.data?.stories ?? [];

      this.projects.set(stories.filter((s) => s?.content?.component === 'Project'));
      this.products.set(stories.filter((s) => s?.content?.component === 'product'));
    } catch (err) {
      console.error('Failed to load Storyblok stories', err);
      this.projects.set([]);
      this.products.set([]);
    }
  }
}
