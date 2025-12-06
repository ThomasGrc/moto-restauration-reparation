export interface StoryImage {
  id: number;
  filename: string;
  alt: string;
  name: string;
  focus: string;
  title: string;
  source: string;
  copyright: string;
  fieldtype: string;
  meta_data: Record<string, unknown>;
}

export interface StoryContentProject {
  component: 'Project';
  description: string;
  Images: StoryImage[];
  titre: string;
  _uid: string;
  _editable?: string;
}

export interface Story {
component: any;
  id: number;
  name: string;
  slug: string;
  full_slug: string;
  content: StoryContentProject | any; // we only care when it's 'Project'
}

/** Shape sent to <app-project [blok]> */
export interface ProjectBlok {
  name: string;
  description: string;
  Images: StoryImage[];
}