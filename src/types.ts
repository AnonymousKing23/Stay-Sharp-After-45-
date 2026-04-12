export type UserRole = 'adult' | 'caregiver';
export type AgeRange = '45-54' | '55-64' | '65-74' | '75+';
export type Goal = 'memory' | 'focus' | 'sleep' | 'stress' | 'routine' | 'healthy-aging';
export type ReminderStyle = 'gentle' | 'strict';
export type ThemePreference = 'light' | 'dark';

export interface UserSettings {
  role: UserRole;
  ageRange: AgeRange;
  goals: Goal[];
  reminderTime: string;
  reminderStyle: ReminderStyle;
  remindersEnabled: boolean;
  theme: ThemePreference;
  onboarded: boolean;
  profilePicture?: string;
  startDate?: string; // ISO date string
}

export interface DailyTask {
  day: number;
  phase: 'foundation' | 'acceleration';
  title: string;
  whyItMatters: string;
  instructions: string[];
  estimatedTime: string;
  pillar: 'sleep' | 'nutrition' | 'movement' | 'mental' | 'stress' | 'social' | 'routine';
}

export interface HabitLog {
  date: string; // ISO date string
  sleep: boolean;
  hydration: boolean;
  movement: boolean;
  brainChallenge: boolean;
  stressManagement: boolean;
  socialConnection: boolean;
  readingLearning: boolean;
  brainFood: boolean;
  notes?: string;
  mood?: number; // 1-5
  energy?: number; // 1-5
  focus?: number; // 1-5
}

export interface SelfAssessment {
  id: string;
  date: string;
  mentalClarity: number;
  memory: number;
  focus: number;
  mood: number;
  energy: number;
  sleepQuality: number;
}

export interface CaregiverNote {
  id: string;
  date: string;
  observation: string;
  category: 'sleep' | 'nutrition' | 'movement' | 'social' | 'brain';
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}
