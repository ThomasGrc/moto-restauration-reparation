import { Component, inject, OnInit, signal } from '@angular/core';
import { ProjectListComponent } from "../project-list/project-list";
import { StoryblokService } from '../../services/storyblok.service';
import { Navbar } from '../navbar/navbar';
import { Contact } from "../contact/contact";
import { Separator } from "../separator/separator";

@Component({
  selector: 'app-project-page',
  imports: [ProjectListComponent, Navbar, Contact, Separator],
  templateUrl: './project-page.html',
  styleUrl: './project-page.scss',
})
export class ProjectPage implements OnInit {
  private readonly sb = inject(StoryblokService);
  public readonly projects = signal<any[]>([]);

  async ngOnInit(): Promise<void> {
    this.scrollToTop();

    try {
      const response: any = await this.sb.getProjects();
      const stories: any[] = response?.data?.stories ?? [];

      this.projects.set(
        stories.filter((s) => s?.content?.component === 'Project')
      );
    } catch (err) {
      console.error('Failed to load Storyblok stories', err);
      this.projects.set([]);
    }
  }

  private scrollToTop(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // change to 'smooth' if desired
    });
  }
}
