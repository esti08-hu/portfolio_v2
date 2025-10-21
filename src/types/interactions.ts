// Base types for micro-interactions and immersive UI
// T008

export type CursorEffect = 'default' | 'glow' | 'morph';

export interface CursorState {
  position: { x: number; y: number };
  isVisible: boolean;
  effect: CursorEffect;
  trail: Array<{ x: number; y: number; timestamp: number }>;
}

export interface ApiData {
  githubStats: {
    commits: number;
    repos: number;
    languages: string[];
  };
  lastFetched: Date;
  isStale: boolean;
  error: string | null;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  soundEnabled: boolean;
  reducedMotion: boolean;
  animationsEnabled: boolean;
}

export interface InteractionState {
  commandPaletteOpen: boolean;
  searchQuery: string;
  selectedIndex: number;
  sceneLoaded: boolean;
}
