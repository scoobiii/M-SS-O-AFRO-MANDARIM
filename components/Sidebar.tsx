import React from 'react';
import { 
  Shield, 
  Trophy, 
  Scroll, 
  Zap, 
  Palette,
  Github,
  Trash2
} from 'lucide-react';
import { useGame } from '../context/GameContext';

export const Sidebar: React.FC = () => {
  const { user, selectedClassData, activeTab, switchTab, resetGame } = useGame();
  
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
              <span className="text-slate-400">Nível {user.level}</span>
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
            <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-3">Badges Ativas</h3>
            <div className="flex flex-wrap gap-2">
              <span className="p-2 bg-slate-900 rounded border border-slate-600 text-xs flex items-center gap-1">
                <Shield size={12} className="text-yellow-500" /> Novato
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
            <Scroll size={18} /> Missões Diárias
          </button>
          <button 
            onClick={() => switchTab('TREE')} 
            className={`w-full text-left p-3 rounded flex items-center gap-3 transition-colors ${activeTab === 'TREE' ? 'bg-purple-900/50 text-purple-200 border-l-4 border-purple-500' : 'hover:bg-slate-800'}`}
          >
            <Zap size={18} /> Árvore de Skills
          </button>
          <button 
            onClick={() => switchTab('SPRITE')} 
            className={`w-full text-left p-3 rounded flex items-center gap-3 transition-colors ${activeTab === 'SPRITE' ? 'bg-purple-900/50 text-purple-200 border-l-4 border-purple-500' : 'hover:bg-slate-800'}`}
          >
            <Palette size={18} /> Gerador Sprite
          </button>
          <div className="border-t border-slate-800 pt-2 mt-2">
            <button 
              onClick={() => switchTab('PROJECT')} 
              className={`w-full text-left p-3 rounded flex items-center gap-3 transition-colors ${activeTab === 'PROJECT' ? 'bg-slate-800 text-slate-200 border-l-4 border-slate-500' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <Github size={18} /> Hub do Projeto
            </button>
          </div>
          
          <button 
            onClick={resetGame} 
            className="w-full text-left p-3 rounded flex items-center gap-3 text-red-500 hover:text-red-400 hover:bg-slate-800 text-xs mt-4"
          >
            <Trash2 size={14} /> Resetar Sistema
          </button>
        </nav>
      </aside>
  );
};