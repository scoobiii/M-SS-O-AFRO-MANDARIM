
import React, { useState } from 'react';
import { CLASSES } from './constants';
import { CharacterClass } from './types';
import { 
  Shield, 
  Trophy, 
  Scroll, 
  Zap, 
  Terminal as TerminalIcon,
  Palette,
  Github,
  X
} from 'lucide-react';
import { GameProvider, useGame } from './context/GameContext';
import { DashboardDispatcher } from './components/Dashboard';
import { BossBattle } from './components/BossBattle';
import { AIGuideModal } from './components/CyberGeisha';

// --- Screen Components (Small enough to keep here or move to files if needed) ---

const LandingScreen: React.FC = () => {
  const { startGame } = useGame();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://picsum.photos/1920/1080?grayscale&blur=2')] opacity-10 bg-cover bg-center"></div>
      <div className="z-10 animate-fade-in-up">
        <div className="mb-6 inline-block p-4 border-2 border-purple-500 rounded-full bg-slate-900/80 backdrop-blur">
          <TerminalIcon size={48} className="text-purple-400 animate-pulse" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400 font-pixel">
          MISSION MANDARIM
        </h1>
        <h2 className="text-xl md:text-3xl font-light text-slate-300 mb-8 tracking-widest uppercase">
          Techno-Monk of the Future <span className="text-purple-500">技术僧</span>
        </h2>
        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto italic border-l-4 border-emerald-500 pl-4 bg-slate-800/50 p-4 rounded-r-lg">
          "To master global technology, one must master the language that commands the century."
          <br/><span className="text-sm not-italic text-emerald-400 mt-2 block">- The Cyber Oracle</span>
        </p>
        <button 
          onClick={startGame}
          className="px-10 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-sm border-b-4 border-purple-900 hover:border-purple-600 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
        >
          INITIALIZE SYSTEM
        </button>
      </div>
    </div>
  );
};

const ClassSelector: React.FC = () => {
  const { selectClass } = useGame();
  return (
    <div className="min-h-screen bg-slate-900 p-8 flex flex-col items-center">
      <h2 className="text-3xl text-emerald-400 font-bold mb-2">CHOOSE YOUR PATH</h2>
      <p className="text-slate-400 mb-8">The Cyber Oracle awaits your decision...</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
        {CLASSES.map((cls) => {
          const Icon = cls.icon;
          return (
            <div 
              key={cls.id}
              onClick={() => selectClass(cls)}
              className={`cursor-pointer group relative bg-slate-800 border-2 ${cls.color.split(' ')[1]} p-6 rounded-lg hover:bg-slate-700 transition-all hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between mb-4">
                <Icon size={40} className={`${cls.color.split(' ')[0]}`} />
                <span className="text-xs font-mono bg-slate-900 px-2 py-1 rounded text-slate-400 border border-slate-700">CLASS_ID: {cls.id}</span>
              </div>
              <h3 className={`text-2xl font-bold ${cls.color.split(' ')[0]} mb-1`}>{cls.name}</h3>
              <h4 className="text-xl text-slate-200 font-pixel mb-3">{cls.cnName}</h4>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">{cls.description}</p>
              <div className="flex flex-wrap gap-2">
                {cls.skills.map(skill => (
                  <span key={skill} className="px-2 py-1 bg-slate-900 rounded text-xs text-emerald-300 border border-emerald-900">
                    {skill}
                  </span>
                ))}
              </div>
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-current ${cls.color.split(' ')[0]}`}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Sidebar: React.FC = () => {
  const { user, selectedClassData, activeTab, switchTab } = useGame();
  
  return (
    <aside className="w-full md:w-80 bg-slate-900 border-r border-slate-800 p-6 flex flex-col">
        <div className="mb-8 text-center">
          <div className={`w-24 h-24 rounded-full border-4 mx-auto mb-4 flex items-center justify-center bg-slate-800 ${selectedClassData?.color.split(' ')[1]}`}>
            {selectedClassData && React.createElement(selectedClassData.icon, { size: 40, className: selectedClassData.color.split(' ')[0] })}
          </div>
          <h2 className="text-2xl font-bold text-white">{selectedClassData?.name}</h2>
          <p className="text-purple-400 font-pixel text-sm">{selectedClassData?.cnName}</p>
        </div>

        <div className="space-y-6 mb-8">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-400">Level {user.level}</span>
              <span className="text-emerald-400">{user.xp} / {user.maxXp} XP</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-purple-500 h-full transition-all duration-500" 
                style={{ width: `${(user.xp / user.maxXp) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-3">Active Badges</h3>
            <div className="flex flex-wrap gap-2">
              <span className="p-2 bg-slate-900 rounded border border-slate-600 text-xs flex items-center gap-1">
                <Shield size={12} className="text-yellow-500" /> Novice
              </span>
              {user.badges.map(b => (
                <span key={b} className="p-2 bg-slate-900 rounded border border-yellow-600/50 text-xs flex items-center gap-1 text-yellow-100">
                  <Trophy size={12} className="text-yellow-400" /> {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        <nav className="space-y-2 mt-auto">
          <button 
            onClick={() => switchTab('MISSIONS')} 
            className={`w-full text-left p-3 rounded flex items-center gap-3 transition-colors ${activeTab === 'MISSIONS' ? 'bg-purple-900/50 text-purple-200 border-l-4 border-purple-500' : 'hover:bg-slate-800'}`}
          >
            <Scroll size={18} /> Daily Missions
          </button>
          <button 
            onClick={() => switchTab('TREE')} 
            className={`w-full text-left p-3 rounded flex items-center gap-3 transition-colors ${activeTab === 'TREE' ? 'bg-purple-900/50 text-purple-200 border-l-4 border-purple-500' : 'hover:bg-slate-800'}`}
          >
            <Zap size={18} /> Skill Tree
          </button>
          <button 
            onClick={() => switchTab('SPRITE')} 
            className={`w-full text-left p-3 rounded flex items-center gap-3 transition-colors ${activeTab === 'SPRITE' ? 'bg-purple-900/50 text-purple-200 border-l-4 border-purple-500' : 'hover:bg-slate-800'}`}
          >
            <Palette size={18} /> Sprite Gen
          </button>
          <div className="border-t border-slate-800 pt-2 mt-2">
            <button 
              onClick={() => switchTab('PROJECT')} 
              className={`w-full text-left p-3 rounded flex items-center gap-3 transition-colors ${activeTab === 'PROJECT' ? 'bg-slate-800 text-slate-200 border-l-4 border-slate-500' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <Github size={18} /> Project Hub
            </button>
          </div>
        </nav>
      </aside>
  );
}

const MainShell: React.FC = () => {
  const { view, completeMission, addBadge } = useGame();
  const [showOracle, setShowOracle] = useState(false);
  const [inBattle, setInBattle] = useState(false);

  const startBattle = () => setInBattle(true);
  const endBattle = (won: boolean) => {
    setInBattle(false);
    if (won) {
      completeMission('b1', true);
    }
  };

  if (view === 'LANDING') return <LandingScreen />;
  if (view === 'SELECT') return <ClassSelector />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row relative">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <DashboardDispatcher onStartBattle={startBattle} />
      </main>

      {/* Floating Geisha Button */}
      <button 
        onClick={() => setShowOracle(!showOracle)}
        className="fixed bottom-6 right-6 p-4 bg-pink-600 hover:bg-pink-500 text-white rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)] z-50 transition-all hover:scale-110 flex items-center justify-center"
      >
        {showOracle ? <X size={24} /> : <span className="text-2xl">👘</span>}
      </button>

      {/* Overlays */}
      {showOracle && <AIGuideModal onClose={() => setShowOracle(false)} />}
      {inBattle && <BossBattle onWin={() => endBattle(true)} onFlee={() => endBattle(false)} />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <GameProvider>
      <MainShell />
    </GameProvider>
  );
};

export default App;
