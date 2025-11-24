
import { UserState, Mission } from '../types';
import { INITIAL_MISSIONS } from '../constants';

// --- NoSQL Simulation Layer ---

const COLLECTIONS = {
  USERS: 'mm_users',
  MISSIONS: 'mm_missions',
};

class LocalDB {
  private get<T>(collection: string): T | null {
    try {
      const data = localStorage.getItem(collection);
      return data ? JSON.parse(data) : null;
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
    const user = this.get<UserState>(COLLECTIONS.USERS);
    return user || {
      name: 'Novice',
      class: null,
      level: 1,
      xp: 0,
      maxXp: 1000,
      badges: []
    };
  }

  saveUser(user: UserState): void {
    this.save(COLLECTIONS.USERS, user);
  }

  // --- Missions Repository ---

  getMissions(): Mission[] {
    const missions = this.get<Mission[]>(COLLECTIONS.MISSIONS);
    return missions || INITIAL_MISSIONS;
  }

  saveMissions(missions: Mission[]): void {
    this.save(COLLECTIONS.MISSIONS, missions);
  }

  // --- Reset/Debug ---
  reset(): void {
    localStorage.removeItem(COLLECTIONS.USERS);
    localStorage.removeItem(COLLECTIONS.MISSIONS);
    window.location.reload();
  }
}

export const db = new LocalDB();
