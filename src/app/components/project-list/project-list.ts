import { Component, computed, input } from "@angular/core";
import { ProjectComponent } from "../project/project";
import { Story } from '../types/types';

@Component({
  selector: 'app-project-list',
  standalone: true,
  templateUrl: './project-list.html',
  styleUrl: './project-list.scss',
  imports: [ProjectComponent],
})
export class ProjectListComponent {
  // Input: raw Storyblok stories array (response.stories)
  projects = input<Story[]>([]);
}