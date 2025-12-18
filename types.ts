
export interface HeadshotStyle {
  id: string;
  name: string;
  description: string;
  prompt: string;
  icon: string;
  previewUrl: string;
}

export interface GenerationHistory {
  id: string;
  originalImage: string;
  generatedImage: string;
  styleId: string;
  timestamp: number;
}
