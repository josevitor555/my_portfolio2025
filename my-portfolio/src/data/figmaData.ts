// Figma designs data
export interface FigmaDesign {
  id: number;
  titleKey: string;
  descriptionKey: string;
  views: string;
  likes: string;
  categoryKey: string;
  image: string;
  figmaUrl: string;
  featured: boolean;
  tagKeys: string[];
}
