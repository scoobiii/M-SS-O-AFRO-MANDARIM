import { LucideIcon } from 'lucide-react';

export enum ClassType {
  ChaosProgrammer = 'CHAOS_PROGRAMMER',
  DataMonk = 'DATA_MONK',
  PixelArtisan = 'PIXEL_ARTISAN',
  QuantumAmbassador = 'QUANTUM_AMBASSADOR',
}

export interface CharacterClass {
  id: ClassType;
  name: string;
  cnName: string;
  description: string;
  skills: string[];
  icon: LucideIcon;
  color: string;
}

export interface Mission {
  id: string;
  title: string;
  xp: number;
  completed: boolean;
  type: 'DAILY' | 'BOSS' | 'STORY';
}

export interface LevelData {
  level: number;
  title: string;
  cnTitle: string;
  description: string;
  boss: string;
  bossCn: string;
}

export interface UserState {
  name: string;
  class: ClassType | null;
  level: number;
  xp: number;
  maxXp: number;
  badges: string[];
}