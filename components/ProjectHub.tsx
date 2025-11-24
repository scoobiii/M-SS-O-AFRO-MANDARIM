
import React from 'react';
import { Github, Scroll, GitCommit, Box, Clock } from 'lucide-react';
import { PROJECT_ROADMAP } from '../constants';

export const ProjectHub: React.FC = () => {
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
