import React, { useState, useEffect } from 'react';
import { Github, Scroll, Clock, CheckCircle, Circle, AlertCircle, Terminal, FileCode, AlignLeft, GitCommit, Box } from 'lucide-react';
import { PROJECT_ROADMAP } from '../constants';

export const ProjectHub: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  // Simulate a "Boot Sequence" log effect
  useEffect(() => {
    const bootLogs = [
      "INICIALIZANDO TIMELINE DO PROJETO...",
      "CARREGANDO DADOS DO SPRINT...",
      "BUSCANDO STATUS DO REPOSITÓRIO...",
      "CALCULANDO LINHAS DE CÓDIGO...",
      "SISTEMA PRONTO."
    ];
    let delay = 0;
    bootLogs.forEach((log) => {
      delay += 300;
      setTimeout(() => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${log}`]);
      }, delay);
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto animate-fade-in pb-12">
      <header className="mb-8 border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-800 rounded-full border border-slate-700 shadow-[0_0_15px_rgba(148,163,184,0.1)]">
              <Github size={32} className="text-white" />
            </div>
            <div>
                <h1 className="text-3xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
                  Timeline do Projeto
                </h1>
                <p className="text-slate-400 font-mono text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  Status: {PROJECT_ROADMAP.status}
                </p>
            </div>
         </div>
         
         <div className="flex gap-3">
            <div className="px-4 py-2 bg-slate-900 rounded border border-slate-700 text-xs font-mono text-slate-400">
               BRANCH: <span className="text-purple-400">main</span>
            </div>
            <div className="px-4 py-2 bg-slate-900 rounded border border-slate-700 text-xs font-mono text-slate-400">
               BUILD: <span className="text-emerald-400">v0.2.1</span>
            </div>
         </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Timeline */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Clock size={20} className="text-purple-500" /> Roadmap de Desenvolvimento
            </h3>

            <div className="relative pl-4">
              {/* Vertical Line */}
              <div className="absolute left-[27px] top-2 bottom-0 w-0.5 bg-slate-800"></div>

              {PROJECT_ROADMAP.sprints.map((sprint) => {
                const isDone = sprint.status === 'DONE';
                const isInProgress = sprint.status === 'IN_PROGRESS';
                
                return (
                  <div key={sprint.id} className={`relative pl-12 pb-10 last:pb-0 group ${isInProgress ? 'opacity-100' : 'opacity-80'}`}>
                    {/* Icon Marker */}
                    <div className={`absolute left-0 top-0 w-14 h-14 rounded-full border-4 flex items-center justify-center z-10 transition-all duration-500
                      ${isDone ? 'bg-slate-900 border-emerald-900/50 text-emerald-500' : 
                        isInProgress ? 'bg-slate-900 border-purple-500 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 
                        'bg-slate-900 border-slate-700 text-slate-600'}`}
                    >
                      {isDone ? <CheckCircle size={24} /> : isInProgress ? <AlertCircle size={24} className="animate-pulse" /> : <Circle size={24} />}
                    </div>

                    {/* Content Card */}
                    <div className={`p-5 rounded-lg border transition-all ${
                      isInProgress 
                        ? 'bg-slate-800/50 border-purple-500/30 shadow-lg' 
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}>
                      <div className="flex justify-between items-start mb-3">
                        <h4 className={`text-xl font-bold ${isInProgress ? 'text-purple-300' : 'text-slate-300'}`}>
                          {sprint.title}
                        </h4>
                        <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded tracking-wider ${
                           isDone ? 'bg-emerald-900/20 text-emerald-500' :
                           isInProgress ? 'bg-purple-900/20 text-purple-400' :
                           'bg-slate-800 text-slate-500'
                        }`}>
                          {sprint.status.replace('_', ' ')}
                        </span>
                      </div>
                      
                      <ul className="space-y-2">
                        {sprint.items.map((item, i) => (
                          <li key={i} className="text-sm font-mono flex items-start gap-2 text-slate-400">
                             <span className="opacity-50 mt-1">
                               {isDone || item.includes('✅') ? '✓' : isInProgress ? '>' : '•'}
                             </span>
                             <span className={isDone || item.includes('✅') ? 'text-slate-500 line-through' : 'text-slate-300'}>
                               {item.replace(/✅|🔄|🚧|📅|📦|🚀|✨/g, '').trim()}
                             </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: System Logs & Stats */}
        <div className="space-y-6">
           
           {/* System Logs Console */}
           <div className="bg-black border border-slate-800 rounded-xl overflow-hidden font-mono text-xs">
              <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2 text-slate-400">
                <Terminal size={12} /> SYSTEM_LOGS.log
              </div>
              <div className="p-4 h-64 overflow-y-auto space-y-2 text-green-500/80">
                {logs.map((log, i) => (
                  <div key={i} className="animate-fade-in-left">
                    <span className="text-slate-600 mr-2">{'>'}</span>
                    {log}
                  </div>
                ))}
                <div className="animate-pulse">_</div>
              </div>
           </div>

           {/* Quick Stats */}
           <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-slate-400 text-sm font-bold uppercase mb-4">Saúde do Repositório</h3>
              <div className="space-y-4">
                 <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-900 p-3 rounded border border-slate-700">
                        <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                            <AlignLeft size={14} /> LOC
                        </div>
                        <div className="text-lg font-bold text-white">~1,350</div>
                    </div>
                    <div className="bg-slate-900 p-3 rounded border border-slate-700">
                        <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                            <FileCode size={14} /> Arquivos
                        </div>
                        <div className="text-lg font-bold text-white">14</div>
                    </div>
                 </div>

                 <div>
                    <div className="flex justify-between text-xs mb-1">
                       <span className="text-slate-300">Cobertura de Código</span>
                       <span className="text-emerald-400">84%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-emerald-500 h-full w-[84%]"></div>
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-xs mb-1">
                       <span className="text-slate-300">Dívida Técnica</span>
                       <span className="text-yellow-400">Baixa</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-yellow-500 h-full w-[20%]"></div>
                    </div>
                 </div>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
};