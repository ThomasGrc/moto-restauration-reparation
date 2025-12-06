import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryblokService } from './services/storyblok.service';
import { ProjectComponent } from './components/project/project';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProjectComponent],
  templateUrl: './app.html'
})
export class App implements OnInit {
  public projects = signal<any[]>([]);

  constructor(private sb: StoryblokService) { }

  async ngOnInit() {
    const { data } = await this.sb.getProjects();

    // Store the stories array into the `projects` signal so templates can read it
    this.projects.set(data.stories || []);
  }
}
