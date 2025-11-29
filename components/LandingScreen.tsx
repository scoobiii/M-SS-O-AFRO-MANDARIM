import React from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { useGame } from '../context/GameContext';

export const LandingScreen: React.FC = () => {
  const { startGame } = useGame();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://picsum.photos/1920/1080?grayscale&blur=2')] opacity-10 bg-cover bg-center"></div>
      <div className="z-10 animate-fade-in-up">
        <div className="mb-6 inline-block p-4 border-2 border-purple-500 rounded-full bg-slate-900/80 backdrop-blur">
          <TerminalIcon size={48} className="text-purple-400 animate-pulse" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400 font-pixel">
          MISSÃO MANDARIM
        </h1>
        <h2 className="text-xl md:text-3xl font-light text-slate-300 mb-8 tracking-widest uppercase">
          Tecno-Monge do Futuro <span className="text-purple-500">技术僧</span>
        </h2>
        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto italic border-l-4 border-emerald-500 pl-4 bg-slate-800/50 p-4 rounded-r-lg">
          "Para dominar a tecnologia global, é preciso dominar a língua que comanda o século."
          <br/><span className="text-sm not-italic text-emerald-400 mt-2 block">- O Oráculo Cibernético</span>
        </p>
        <button 
          onClick={startGame}
          className="px-10 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-sm border-b-4 border-purple-900 hover:border-purple-600 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
        >
          INICIALIZAR SISTEMA
        </button>
      </div>
    </div>
  );
};