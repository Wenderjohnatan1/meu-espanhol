export type Country = 'colombia' | 'mexico';

export interface CountryInfo {
  id: Country;
  name: string;
  flag: string;
  accent: string;
  slangExample: string;
  description: string;
  defaultCharacter: string;
  voiceName: string; // Speech synthesis fallback voice hint
}

export interface Phrase {
  id: string;
  category: string;
  spanish: string;
  translation: string;
  country: Country;
  explanation: string;
  difficulty: 'fácil' | 'médio';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  corrections?: {
    original: string;
    corrected: string;
    explanation: string;
  }[];
  localSlangTip?: string;
}

export interface SlangGlossaryItem {
  word: string;
  meaning: string;
  example: string;
}

export interface Story {
  title: string;
  location: string;
  paragraphs: string[];
  translations: string[];
  slangGlossary: SlangGlossaryItem[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface UserError {
  id: string;
  originalText: string;
  correctedText: string;
  explanation: string;
  sourceType: 'chat' | 'pronuncia';
  timestamp: string;
  reviewed: boolean;
}

export interface SRSCard {
  id: string;
  spanish: string;
  translation: string;
  explanation: string;
  dialect: Country;
  intervalMinutes: number;
  easeFactor: number;
  nextReviewDate: string; // ISO date string
  box: number; // SRS box / level
  addedAt: string; // ISO date string
}

export interface UserAccount {
  username: string;
  name: string;
  avatarUrl: string;
  xp: number;
  streak: number;
  lastActive: string; // YYYY-MM-DD
}

