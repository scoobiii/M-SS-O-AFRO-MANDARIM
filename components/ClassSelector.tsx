import React from 'react';
import { CLASSES } from '../constants';
import { useGame } from '../context/GameContext';

export const ClassSelector: React.FC = () => {
  const { selectClass } = useGame();
  return (
    <div className="min-h-screen bg-slate-900 p-8 flex flex-col items-center">
      <h2 className="text-3xl text-emerald-400 font-bold mb-2">ESCOLHA SEU CAMINHO</h2>
      <p className="text-slate-400 mb-8">O Oráculo Cibernético aguarda sua decisão...</p>
      
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