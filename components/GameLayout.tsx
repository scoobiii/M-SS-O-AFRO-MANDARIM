
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { Sidebar } from './Sidebar';
import { DashboardDispatcher } from './Dashboard';
import { LandingScreen } from './LandingScreen';
import { ClassSelector } from './ClassSelector';
import { AIGuideModal } from './CyberGeisha';
import { BossBattle } from './BossBattle';

export const GameLayout: React.FC = () => {
  const { view, completeMission } = useGame();
  const [showOracle, setShowOracle] = useState(false);
  const [inBattle, setInBattle] = useState(false);

  const startBattle = () => setInBattle(true);
  const endBattle = (won: boolean) => {
    setInBattle(false);
    if (won) {
      completeMission('b1', true); // 'b1' is the ID for the Boss Mission
    }
  };

  // View Routing
  if (view === 'LANDING') return <LandingScreen />;
  if (view === 'SELECT') return <ClassSelector />;

  // Main Dashboard Layout
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row relative overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
        <DashboardDispatcher onStartBattle={startBattle} />
      </main>

      {/* Floating Action Button (FAB) for Geisha */}
      <button 
        onClick={() => setShowOracle(!showOracle)}
        className="fixed bottom-6 right-6 p-4 bg-pink-600 hover:bg-pink-500 text-white rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)] z-40 transition-all hover:scale-110 flex items-center justify-center border-2 border-pink-400"
        aria-label="Open AI Guide"
      >
        {showOracle ? <X size={24} /> : <span className="text-2xl">👘</span>}
      </button>

      {/* Modals & Overlays */}
      {showOracle && <AIGuideModal onClose={() => setShowOracle(false)} />}
      {inBattle && <BossBattle onWin={() => endBattle(true)} onFlee={() => endBattle(false)} />}
    </div>
  );
};
