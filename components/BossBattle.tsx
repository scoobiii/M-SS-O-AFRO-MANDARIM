
import React, { useState } from 'react';
import { User } from 'lucide-react';

interface BossBattleProps {
  onWin: () => void;
  onFlee: () => void;
}

export const BossBattle: React.FC<BossBattleProps> = ({ onWin, onFlee }) => {
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
