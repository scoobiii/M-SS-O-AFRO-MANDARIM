import React, { useState, useEffect } from 'react';
import { CLASSES, LEVELS, INITIAL_MISSIONS, SPRITE_PROMPT, PROJECT_ROADMAP } from './constants';
import { CharacterClass, ClassType, Mission, UserState } from './types';
import { 
  Shield, 
  Sword, 
  Zap, 
  Scroll, 
  Trophy, 
  User, 
  Lock, 
  CheckCircle, 
  Play,
  Copy,
  Terminal as TerminalIcon,
  Palette,
  Github,
  GitCommit,
  Clock,
  Box
} from 'lucide-react';

// --- Sub-Components ---

const LandingScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
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
        onClick={onStart}
        className="px-10 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-sm border-b-4 border-purple-900 hover:border-purple-600 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
      >
        INITIALIZE SYSTEM
      </button>
    </div>
  </div>
);

const ClassSelector: React.FC<{ onSelect: (c: CharacterClass) => void }> = ({ onSelect }) => (
  <div className="min-h-screen bg-slate-900 p-8 flex flex-col items-center">
    <h2 className="text-3xl text-emerald-400 font-bold mb-2">CHOOSE YOUR PATH</h2>
    <p className="text-slate-400 mb-8">The Cyber Oracle awaits your decision...</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
      {CLASSES.map((cls) => {
        const Icon = cls.icon;
        return (
          <div 
            key={cls.id}
            onClick={() => onSelect(cls)}
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

const BossBattle: React.FC<{ onWin: () => void, onFlee: () => void }> = ({ onWin, onFlee }) => {
  const [turn, setTurn] = useState(0);
  const [hp, setHp] = useState(100);
  const [bossHp, setBossHp] = useState(100);
  const [log, setLog] = useState<string[]>(["Guardian of Tones: 'Show me your mastery of the 4 tones!'"]);

  const handleAttack = (tone: number) => {
    // Simulated logic: Correct tone deals damage
    const damage = Math.floor(Math.random() * 20) + 15;
    const bossDamage = Math.floor(Math.random() * 10) + 5;
    
    setBossHp(prev => Math.max(0, prev - damage));
    setLog(prev => [`You cast Tone ${tone} Blast! Dealt ${damage} DMG.`, ...prev]);

    if (bossHp - damage <= 0) {
      setTimeout(onWin, 1500);
    } else {
      setTimeout(() => {
        setHp(prev => Math.max(0, prev - bossDamage));
        setLog(prev => [`Guardian counters with 'Mā Má Mǎ Mà'! You took ${bossDamage} DMG.`, ...prev]);
      }, 800);
    }
    setTurn(prev => prev + 1);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-slate-900 border-4 border-red-600 rounded-lg p-6 relative shadow-[0_0_50px_rgba(220,38,38,0.5)]">
        <h2 className="text-3xl font-pixel text-red-500 text-center mb-2">BOSS BATTLE</h2>
        <h3 className="text-xl text-white text-center mb-8">Guardian of Tones <span className="text-red-500">声调守卫</span></h3>

        <div className="flex justify-between items-center mb-8 px-4 md:px-12">
          {/* Player */}
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-900 rounded-full border-4 border-blue-500 flex items-center justify-center mb-2 mx-auto">
              <User size={40} className="text-blue-300" />
            </div>
            <div className="w-32 bg-slate-700 h-4 rounded-full overflow-hidden border border-slate-500">
              <div className="bg-green-500 h-full transition-all duration-300" style={{ width: `${hp}%` }}></div>
            </div>
            <p className="text-sm mt-1">HP: {hp}/100</p>
          </div>

          <div className="text-2xl font-bold text-red-500 font-pixel">VS</div>

          {/* Boss */}
          <div className="text-center">
            <div className="w-24 h-24 bg-red-900 rounded-full border-4 border-red-500 flex items-center justify-center mb-2 mx-auto animate-bounce-slow">
              <span className="text-4xl">👹</span>
            </div>
            <div className="w-32 bg-slate-700 h-4 rounded-full overflow-hidden border border-slate-500">
              <div className="bg-red-500 h-full transition-all duration-300" style={{ width: `${bossHp}%` }}></div>
            </div>
            <p className="text-sm mt-1">HP: {bossHp}/100</p>
          </div>
        </div>

        {/* Combat Log */}
        <div className="bg-black/50 p-4 h-32 overflow-y-auto mb-6 font-mono text-sm border border-slate-700 rounded text-green-400">
          {log.map((l, i) => <div key={i}>{`> ${l}`}</div>)}
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => handleAttack(1)} className="p-4 bg-slate-800 hover:bg-purple-700 border border-purple-500 rounded text-center transition-colors">
            <span className="block text-2xl mb-1">ˉ</span>
            Tone 1 (High)
          </button>
          <button onClick={() => handleAttack(2)} className="p-4 bg-slate-800 hover:bg-purple-700 border border-purple-500 rounded text-center transition-colors">
            <span className="block text-2xl mb-1">ˊ</span>
            Tone 2 (Rising)
          </button>
          <button onClick={() => handleAttack(3)} className="p-4 bg-slate-800 hover:bg-purple-700 border border-purple-500 rounded text-center transition-colors">
            <span className="block text-2xl mb-1">ˇ</span>
            Tone 3 (Dip)
          </button>
          <button onClick={() => handleAttack(4)} className="p-4 bg-slate-800 hover:bg-purple-700 border border-purple-500 rounded text-center transition-colors">
            <span className="block text-2xl mb-1">ˋ</span>
            Tone 4 (Falling)
          </button>
        </div>
        
        <button onClick={onFlee} className="absolute top-4 right-4 text-slate-500 hover:text-white text-xs underline">
          Flee Battle
        </button>
      </div>
    </div>
  );
};

// --- Project Hub Component ---
const ProjectHub: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <header className="mb-6 border-b border-slate-800 pb-6 flex items-center gap-4">
         <div className="p-3 bg-slate-800 rounded-full border border-slate-700">
           <Github size={32} className="text-slate-200" />
         </div>
         <div>
            <h1 className="text-3xl font-bold mb-1">Project Repository <span className="text-sm font-normal text-slate-500 ml-2">MissionMandarin/Core</span></h1>
            <p className="text-slate-400 font-mono text-sm">Main branch • Last commit: Just now</p>
         </div>
      </header>

      {/* README Style Box */}
      <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden mb-8">
        <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center gap-2 text-sm text-slate-300">
           <Scroll size={14} /> <span>README.md</span>
        </div>
        <div className="p-6">
           <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
             Mission Mandarin <span className="px-2 py-0.5 rounded-full bg-blue-900/50 text-blue-400 text-xs border border-blue-800">{PROJECT_ROADMAP.status}</span>
           </h2>
           <p className="text-slate-400 leading-relaxed mb-6">{PROJECT_ROADMAP.description}</p>
           
           <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Development Roadmap</h3>
           
           <div className="grid gap-6">
             {PROJECT_ROADMAP.sprints.map((sprint, idx) => (
               <div key={sprint.id} className="relative pl-6 border-l-2 border-slate-700 pb-2 last:pb-0 last:border-0">
                 {/* Timeline Dot */}
                 <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${
                   sprint.status === 'DONE' ? 'bg-emerald-500 border-emerald-900' : 
                   sprint.status === 'IN_PROGRESS' ? 'bg-yellow-500 border-yellow-900 animate-pulse' : 
                   'bg-slate-800 border-slate-600'
                 }`}></div>

                 <div className="flex justify-between items-start mb-2">
                   <h4 className={`font-bold ${sprint.status === 'IN_PROGRESS' ? 'text-yellow-400' : 'text-slate-200'}`}>
                     {sprint.title}
                   </h4>
                   <span className={`text-xs px-2 py-1 rounded font-mono ${
                      sprint.status === 'DONE' ? 'bg-emerald-900/30 text-emerald-400' :
                      sprint.status === 'IN_PROGRESS' ? 'bg-yellow-900/30 text-yellow-400' :
                      'bg-slate-800 text-slate-500'
                   }`}>
                     {sprint.status}
                   </span>
                 </div>

                 <div className="bg-slate-950/50 rounded p-3 border border-slate-800">
                   {sprint.items.map((item, i) => (
                     <div key={i} className="flex items-start gap-2 mb-1 last:mb-0 text-sm font-mono text-slate-400">
                       <span className="opacity-70 mt-0.5">{item.substring(0,2)}</span>
                       <span>{item.substring(2)}</span>
                     </div>
                   ))}
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* Repo Stats / Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="bg-slate-800 p-4 rounded border border-slate-700 flex items-center gap-3">
            <GitCommit className="text-purple-400" />
            <div>
              <div className="text-xl font-bold">142</div>
              <div className="text-xs text-slate-500">Commits</div>
            </div>
         </div>
         <div className="bg-slate-800 p-4 rounded border border-slate-700 flex items-center gap-3">
            <Box className="text-blue-400" />
            <div>
              <div className="text-xl font-bold">v0.2.1</div>
              <div className="text-xs text-slate-500">Current Build</div>
            </div>
         </div>
         <div className="bg-slate-800 p-4 rounded border border-slate-700 flex items-center gap-3">
            <Clock className="text-emerald-400" />
            <div>
              <div className="text-xl font-bold">48h</div>
              <div className="text-xs text-slate-500">Next Sprint Review</div>
            </div>
         </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [view, setView] = useState<'LANDING' | 'SELECT' | 'DASHBOARD'>('LANDING');
  const [inBattle, setInBattle] = useState(false);
  const [user, setUser] = useState<UserState>({
    name: 'Novice',
    class: null,
    level: 1,
    xp: 0,
    maxXp: 1000,
    badges: []
  });
  const [activeTab, setActiveTab] = useState<'MISSIONS' | 'TREE' | 'SPRITE' | 'PROJECT'>('MISSIONS');
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [selectedClassData, setSelectedClassData] = useState<CharacterClass | null>(null);

  const handleStart = () => setView('SELECT');

  const handleClassSelect = (cls: CharacterClass) => {
    setSelectedClassData(cls);
    setUser(prev => ({ ...prev, class: cls.id }));
    setView('DASHBOARD');
  };

  const handleCompleteMission = (missionId: string) => {
    setMissions(prev => prev.map(m => m.id === missionId ? { ...m, completed: true } : m));
    const mission = missions.find(m => m.id === missionId);
    if (mission && !mission.completed) {
      const newXp = user.xp + mission.xp;
      setUser(prev => ({
        ...prev,
        xp: newXp,
        level: newXp >= prev.maxXp ? prev.level + 1 : prev.level,
        maxXp: newXp >= prev.maxXp ? prev.maxXp * 1.5 : prev.maxXp
      }));
    }
  };

  const startBattle = () => setInBattle(true);
  
  const endBattle = (won: boolean) => {
    setInBattle(false);
    if (won) {
      handleCompleteMission('b1');
      setUser(prev => ({ ...prev, badges: [...prev.badges, 'Tone Master'] }));
    }
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(SPRITE_PROMPT);
    alert('Sprite Prompt copied to clipboard!');
  };

  if (view === 'LANDING') return <LandingScreen onStart={handleStart} />;
  if (view === 'SELECT') return <ClassSelector onSelect={handleClassSelect} />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar / Stats */}
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
            onClick={() => setActiveTab('MISSIONS')} 
            className={`w-full text-left p-3 rounded flex items-center gap-3 transition-colors ${activeTab === 'MISSIONS' ? 'bg-purple-900/50 text-purple-200 border-l-4 border-purple-500' : 'hover:bg-slate-800'}`}
          >
            <Scroll size={18} /> Daily Missions
          </button>
          <button 
            onClick={() => setActiveTab('TREE')} 
            className={`w-full text-left p-3 rounded flex items-center gap-3 transition-colors ${activeTab === 'TREE' ? 'bg-purple-900/50 text-purple-200 border-l-4 border-purple-500' : 'hover:bg-slate-800'}`}
          >
            <Zap size={18} /> Skill Tree
          </button>
          <button 
            onClick={() => setActiveTab('SPRITE')} 
            className={`w-full text-left p-3 rounded flex items-center gap-3 transition-colors ${activeTab === 'SPRITE' ? 'bg-purple-900/50 text-purple-200 border-l-4 border-purple-500' : 'hover:bg-slate-800'}`}
          >
            <Palette size={18} /> Sprite Gen
          </button>
          <div className="border-t border-slate-800 pt-2 mt-2">
            <button 
              onClick={() => setActiveTab('PROJECT')} 
              className={`w-full text-left p-3 rounded flex items-center gap-3 transition-colors ${activeTab === 'PROJECT' ? 'bg-slate-800 text-slate-200 border-l-4 border-slate-500' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <Github size={18} /> Project Hub
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* Missions Tab */}
        {activeTab === 'MISSIONS' && (
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
                        onClick={startBattle}
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded shadow-[0_0_15px_rgba(220,38,38,0.4)] animate-pulse"
                      >
                        FIGHT BOSS
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleCompleteMission(mission.id)}
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
        )}

        {/* Skill Tree Tab */}
        {activeTab === 'TREE' && (
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
                    const isNext = user.level === lvl.level - 1;

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
        )}

        {/* Sprite Generator Tab */}
        {activeTab === 'SPRITE' && (
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
        )}

        {/* Project Hub Tab */}
        {activeTab === 'PROJECT' && <ProjectHub />}

      </main>

      {/* Battle Overlay */}
      {inBattle && <BossBattle onWin={() => endBattle(true)} onFlee={() => endBattle(false)} />}
    </div>
  );
};

export default App;