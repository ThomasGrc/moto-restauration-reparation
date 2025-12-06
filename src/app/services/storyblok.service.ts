import { Injectable } from '@angular/core';
import StoryblokClient from 'storyblok-js-client';

@Injectable({ providedIn: 'root' })
export class StoryblokService {
  private sb = new StoryblokClient({
    accessToken: 'qw7HVH2i4P20klT5JY63rwtt',
    cache: { type: 'memory' }
  });

  getProjects() {
    return this.sb.get('cdn/stories', {
      version: 'draft'
    });
  }
}
