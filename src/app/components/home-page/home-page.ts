import { Component, inject, OnInit, signal } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { ProjectListComponent } from "../project-list/project-list";
import { StoryblokService } from '../../services/storyblok.service';
import { Contact } from "../contact/contact";
import { Prestations } from "../prestations/prestations";

@Component({
  selector: 'app-home-page',
  imports: [Navbar, ProjectListComponent, Contact, Prestations],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  private readonly sb: any = inject(StoryblokService);
  public projects = signal<any[]>([]);

  ngOnInit(): void {
    this.sb.getProjects().then((response: any) => {
      this.projects.set(response.data.stories || []);
    });
  }
}
