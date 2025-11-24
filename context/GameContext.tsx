
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserState, Mission, CharacterClass, ClassType } from '../types';
import { CLASSES } from '../constants';
import { db } from '../services/db';
import { useAudio } from '../hooks/useAudio';

type ViewState = 'LANDING' | 'SELECT' | 'DASHBOARD';
type TabState = 'MISSIONS' | 'TREE' | 'SPRITE' | 'PROJECT';

interface GameContextType {
  user: UserState;
  missions: Mission[];
  view: ViewState;
  activeTab: TabState;
  selectedClassData: CharacterClass | null;
  
  // Actions
  startGame: () => void;
  selectClass: (cls: CharacterClass) => void;
  switchTab: (tab: TabState) => void;
  completeMission: (missionId: string, isBoss?: boolean) => void;
  addBadge: (badge: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { playSuccessSound } = useAudio();

  // State
  const [user, setUser] = useState<UserState>(() => db.getUser());
  const [missions, setMissions] = useState<Mission[]>(() => db.getMissions());
  const [view, setView] = useState<ViewState>(() => user.class ? 'DASHBOARD' : 'LANDING');
  const [activeTab, setActiveTab] = useState<TabState>('MISSIONS');

  // Persistence
  useEffect(() => db.saveUser(user), [user]);
  useEffect(() => db.saveMissions(missions), [missions]);

  // Derived Data
  const selectedClassData = CLASSES.find(c => c.id === user.class) || null;

  // Actions
  const startGame = () => setView('SELECT');

  const selectClass = (cls: CharacterClass) => {
    setUser(prev => ({ ...prev, class: cls.id }));
    setView('DASHBOARD');
  };

  const switchTab = (tab: TabState) => setActiveTab(tab);

  const addBadge = useCallback((badge: string) => {
    setUser(prev => {
      if (prev.badges.includes(badge)) return prev;
      return { ...prev, badges: [...prev.badges, badge] };
    });
  }, []);

  const completeMission = useCallback((missionId: string, isBoss = false) => {
    let earnedXp = 0;

    setMissions(prev => {
      const updated = prev.map(m => {
        if (m.id === missionId && !m.completed) {
           earnedXp = m.xp;
           return { ...m, completed: true };
        }
        return m;
      });
      return updated;
    });

    if (earnedXp > 0) {
      playSuccessSound();
      setUser(prev => {
        const newXp = prev.xp + earnedXp;
        const leveledUp = newXp >= prev.maxXp;
        return {
          ...prev,
          xp: newXp,
          level: leveledUp ? prev.level + 1 : prev.level,
          maxXp: leveledUp ? Math.floor(prev.maxXp * 1.5) : prev.maxXp
        };
      });
      
      if (isBoss) {
        addBadge("Boss Slayer");
      }
    }
  }, [playSuccessSound, addBadge]);

  const value = {
    user,
    missions,
    view,
    activeTab,
    selectedClassData,
    startGame,
    selectClass,
    switchTab,
    completeMission,
    addBadge
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within GameProvider");
  return context;
};
