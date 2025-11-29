import { UserState, Mission } from '../types';
import { INITIAL_MISSIONS } from '../constants';

// --- NoSQL Simulation Layer ---

const COLLECTIONS = {
  USERS: 'mm_users',
  MISSIONS: 'mm_missions',
};

const DEFAULT_USER: UserState = {
  name: 'Novice',
  class: null,
  level: 1,
  xp: 0,
  maxXp: 1000,
  badges: []
};

class LocalDB {
  private get<T>(collection: string): T | null {
    try {
      const data = localStorage.getItem(collection);
      if (!data || data === "undefined") return null;
      return JSON.parse(data);
    } catch (e) {
      console.error(`DB Read Error [${collection}]:`, e);
      return null;
    }
  }

  private save<T>(collection: string, data: T): void {
    try {
      localStorage.setItem(collection, JSON.stringify(data));
    } catch (e) {
      console.error(`DB Write Error [${collection}]:`, e);
    }
  }

  // --- User Repository ---
  
  getUser(): UserState {
    const saved = this.get<UserState>(COLLECTIONS.USERS);
    // Safe Hydration: Merge saved data with defaults to ensure all fields exist
    return saved ? { ...DEFAULT_USER, ...saved } : DEFAULT_USER;
  }

  saveUser(user: UserState): void {
    this.save(COLLECTIONS.USERS, user);
  }

  // --- Missions Repository ---

  getMissions(): Mission[] {
    const saved = this.get<Mission[]>(COLLECTIONS.MISSIONS);
    
    if (!saved || !Array.isArray(saved) || saved.length === 0) {
      return INITIAL_MISSIONS;
    }
    
    // Schema Migration: Check for new missions in INITIAL_MISSIONS that aren't in saved
    const savedIds = new Set(saved.map(m => m.id));
    const newMissions = INITIAL_MISSIONS.filter(m => !savedIds.has(m.id));
    
    return [...saved, ...newMissions];
  }

  saveMissions(missions: Mission[]): void {
    this.save(COLLECTIONS.MISSIONS, missions);
  }

  // --- Reset/Debug ---
  reset(): void {
    try {
      localStorage.removeItem(COLLECTIONS.USERS);
      localStorage.removeItem(COLLECTIONS.MISSIONS);
      window.location.reload();
    } catch (e) {
      console.error("Reset failed", e);
      localStorage.clear();
      window.location.reload();
    }
  }
}

export const db = new LocalDB();