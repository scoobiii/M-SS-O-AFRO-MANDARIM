
import React from 'react';
import { Sword, Scroll, CheckCircle, Zap, Lock, Palette, Play, Copy, Terminal as TerminalIcon } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { LEVELS, SPRITE_PROMPT } from '../constants';
import { ProjectHub } from './ProjectHub';

// --- Tab: Missions ---
export const MissionsTab: React.FC<{ onStartBattle: () => void }> = ({ onStartBattle }) => {
  const { missions, completeMission } = useGame();

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <header className="flex justify-between items-center mb-8 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Mission Control Center</h1>
          <p className="text-slate-400">Complete tasks to accumulate Mana and XP.</p>
        </div>
        <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
          <span className="text-emerald-400 font-mono font-bold">STREAK: 3 DAYS</span>
        </div>
      </header>

      <div className="space-y-4">
        {missions.map(mission => (
          <div 
            key={mission.id} 
            className={`relative p-6 rounded-lg border-2 transition-all ${mission.completed ? 'bg-slate-900/50 border-slate-800 opacity-60' : 'bg-slate-800 border-slate-600 hover:border-purple-500'}`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                {mission.type === 'BOSS' ? (
                  <div className="bg-red-900/30 p-3 rounded-full border border-red-500/50">
                    <Sword size={24} className="text-red-500" />
                  </div>
                ) : (
                  <div className="bg-blue-900/30 p-3 rounded-full border border-blue-500/50">
                    <Scroll size={24} className="text-blue-400" />
                  </div>
                )}
                <div>
                  <h3 className={`text-lg font-bold ${mission.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                    {mission.title}
                  </h3>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs bg-slate-900 px-2 py-0.5 rounded text-emerald-400">+{mission.xp} XP</span>
                    <span className="text-xs bg-slate-900 px-2 py-0.5 rounded text-purple-400">{mission.type}</span>
                  </div>
                </div>
              </div>
              
              {mission.completed ? (
                <CheckCircle className="text-emerald-500" size={32} />
              ) : mission.type === 'BOSS' ? (
                <button 
                  onClick={onStartBattle}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded shadow-[0_0_15px_rgba(220,38,38,0.4)] animate-pulse"
                >
                  FIGHT BOSS
                </button>
              ) : (
                <button 
                  onClick={() => completeMission(mission.id)}
                  className="px-4 py-2 bg-slate-700 hover:bg-emerald-600 hover:text-white text-slate-300 rounded transition-colors"
                >
                  Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Tab: Skill Tree ---
export const SkillTreeTab: React.FC = () => {
  const { user } = useGame();

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
       <header className="mb-8 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold mb-1">Techno-Monk Path <span className="text-purple-500 text-xl">技术僧之道</span></h1>
          <p className="text-slate-400">Unlock new linguistic and technical realities.</p>
        </header>
        
        <div className="relative p-10 min-h-[600px] bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #4ade80 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          {/* Connector Line */}
          <div className="absolute left-1/2 top-10 bottom-10 w-1 bg-slate-800 -translate-x-1/2"></div>

          <div className="space-y-16 relative z-10">
            {LEVELS.map((lvl, idx) => {
              const isUnlocked = user.level >= lvl.level;
              return (
                <div key={lvl.level} className={`flex items-center gap-6 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                   {/* Text Side */}
                   <div className={`flex-1 text-${idx % 2 === 0 ? 'right' : 'left'}`}>
                      <h3 className={`text-xl font-bold ${isUnlocked ? 'text-emerald-400' : 'text-slate-500'}`}>{lvl.title}</h3>
                      <p className="text-purple-400 font-pixel text-sm">{lvl.cnTitle}</p>
                      <p className="text-xs text-slate-500 mt-1">{lvl.description}</p>
                   </div>
                   
                   {/* Node */}
                   <div className="relative">
                      <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center bg-slate-900 z-20 relative 
                        ${isUnlocked 
                          ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)] text-emerald-400' 
                          : 'border-slate-700 text-slate-700'}`}
                      >
                        {isUnlocked ? <CheckCircle size={24} /> : <Lock size={24} />}
                      </div>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-mono text-slate-600">LVL {lvl.level}</div>
                   </div>

                   {/* Boss Side */}
                   <div className={`flex-1 text-${idx % 2 === 0 ? 'left' : 'right'} opacity-50`}>
                     <div className="inline-block px-3 py-1 rounded bg-red-900/20 border border-red-900/50 text-red-400 text-xs">
                       BOSS: {lvl.bossCn}
                     </div>
                   </div>
                </div>
              );
            })}
          </div>
        </div>
    </div>
  );
};

// --- Tab: Sprite Workshop ---
export const SpriteWorkshopTab: React.FC = () => {
  const copyPrompt = () => {
    navigator.clipboard.writeText(SPRITE_PROMPT);
    alert('Sprite Prompt copied to clipboard!');
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
       <header className="mb-8 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold mb-1">Pixel Artisan Workshop <span className="text-pink-500 text-xl">像素工坊</span></h1>
          <p className="text-slate-400">Generate assets for your missions.</p>
        </header>

        <div className="bg-slate-800 border-2 border-pink-500/50 rounded-lg p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Palette size={100} />
          </div>
          
          <h3 className="text-xl font-bold text-pink-400 mb-4 flex items-center gap-2">
            <Play size={20} /> Vex GBA Sprite Prompt
          </h3>
          
          <div className="bg-black p-4 rounded border border-slate-700 font-mono text-sm text-green-400 mb-4 whitespace-pre-wrap leading-relaxed shadow-inner">
            {SPRITE_PROMPT}
          </div>

          <div className="flex gap-4">
            <button 
              onClick={copyPrompt}
              className="flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded font-bold transition-all"
            >
              <Copy size={18} /> Copy Prompt
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded font-bold transition-all opacity-50 cursor-not-allowed">
              <TerminalIcon size={18} /> Generate (Requires API Key)
            </button>
          </div>

          <div className="mt-8 grid grid-cols-4 gap-2 w-32 mx-auto opacity-50">
            {/* Mock Grid Visualization 4x4 */}
            {Array.from({length: 16}).map((_, i) => (
              <div key={i} className="w-6 h-6 border border-pink-500/30 bg-pink-500/10"></div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-500 mt-2">4x4 Grid Structure Preview</p>
        </div>
    </div>
  );
};

export const DashboardDispatcher: React.FC<{ onStartBattle: () => void }> = ({ onStartBattle }) => {
  const { activeTab } = useGame();
  
  switch(activeTab) {
    case 'MISSIONS': return <MissionsTab onStartBattle={onStartBattle} />;
    case 'TREE': return <SkillTreeTab />;
    case 'SPRITE': return <SpriteWorkshopTab />;
    case 'PROJECT': return <ProjectHub />;
    default: return <MissionsTab onStartBattle={onStartBattle} />;
  }
};
