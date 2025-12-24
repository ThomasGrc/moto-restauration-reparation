export interface StoryblokAsset {
  id: number;
  filename: string;
  alt?: string;
  title?: string;
  name?: string;
  focus?: string;
  source?: string;
  copyright?: string;
  meta_data?: Record<string, unknown>;
}

export interface StoryblokStoryBase<TContent> {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  full_slug: string;
  created_at: string;
  published_at: string;
  updated_at: string;
  content: TContent;
}

export interface StoryblokResponse<TContentUnion> {
  stories: Array<StoryblokStoryBase<TContentUnion>>;
  cv: number;
  rels: unknown[];
  links: unknown[];
}

/** Content blocks */
export interface ProjectContent {
  component: "Project";
  titre: string;
  description: string;
  Images: StoryblokAsset[];
}

export interface ProductContent {
  component: "product";
  Nom: string;
  Prix: string;        // e.g. "59€" (keep string unless you normalize)
  Description: string;
  condition: string;
  Photos: StoryblokAsset[];
}

export type StoryContent = ProjectContent | ProductContent;
export type Story = StoryblokStoryBase<StoryContent>;
