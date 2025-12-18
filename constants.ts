
import { HeadshotStyle } from './types';

export const HEADSHOT_STYLES: HeadshotStyle[] = [
  {
    id: 'corporate-grey',
    name: 'Executive Studio',
    description: 'Clean, grey backdrop with soft studio lighting.',
    prompt: 'Transform this person into a high-end corporate executive headshot. They should be wearing a professional blazer or suit. The background should be a clean, slightly textured grey studio backdrop with professional three-point lighting. Preserve the person\'s identity and facial features exactly.',
    icon: 'fa-building',
    previewUrl: 'https://picsum.photos/seed/corp/400/500'
  },
  {
    id: 'modern-tech',
    name: 'Tech Office',
    description: 'Bright, modern workspace with natural depth of field.',
    prompt: 'Transform this person into a modern professional headshot suitable for a tech company. They should be wearing smart casual attire like a sweater or button-down shirt. The background should be a blurred modern tech office with large windows and plants. Maintain identity perfectly.',
    icon: 'fa-laptop-code',
    previewUrl: 'https://picsum.photos/seed/tech/400/500'
  },
  {
    id: 'outdoor-natural',
    name: 'Natural Light',
    description: 'Outdoor setting with soft morning sunlight.',
    prompt: 'Transform this person into a warm, approachable professional headshot. Set the background to a beautiful outdoor garden or park with soft, golden-hour sunlight creating a gentle bokeh effect. Professional but casual attire. Preserve facial features and identity.',
    icon: 'fa-leaf',
    previewUrl: 'https://picsum.photos/seed/nature/400/500'
  },
  {
    id: 'creative-dark',
    name: 'Creative Noir',
    description: 'Moody, dark background with artistic highlights.',
    prompt: 'Transform this person into a creative professional headshot. Use a dark, moody background with dramatic side-lighting. Creative professional attire like a black turtleneck. Maintain identity perfectly.',
    icon: 'fa-palette',
    previewUrl: 'https://picsum.photos/seed/creative/400/500'
  }
];
