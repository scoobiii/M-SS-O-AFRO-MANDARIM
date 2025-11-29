
import React, { useState } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { X, Volume2 } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../hooks/useAudio';
import { PROJECT_ROADMAP, SUPPORTED_LANGUAGES } from '../constants';

interface AIGuideModalProps {
  onClose: () => void;
}

export const AIGuideModal: React.FC<AIGuideModalProps> = ({ onClose }) => {
  const { user } = useGame();
  const { playPCM } = useAudio();
  
  const [inputText, setInputText] = useState('');
  const [selectedLang, setSelectedLang] = useState(SUPPORTED_LANGUAGES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const generateAndSpeak = async () => {
    if (!inputText.trim()) return;
    setIsGenerating(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `
        You are the Cyber Geisha Agent (赛博艺伎 - Sàibó Yìjì) 👘.
        You are a supportive, knowledgeable, and gentle mentor for the 'Mission Mandarin' platform.
        
        USER CONTEXT:
        Name: ${user.name}
        Class: ${user.class || 'Unassigned'}
        Level: ${user.level}
        XP: ${user.xp}
        
        PROJECT DATA:
        Status: ${PROJECT_ROADMAP.status}
        Sprints: ${JSON.stringify(PROJECT_ROADMAP.sprints)}
        
        YOUR ROLE:
        1. Support the student's development in Mandarin & Code.
        2. Answer questions about the project status or roadmap.
        3. Be encouraging. Use a polite, slightly formal but warm tone.
        4. Maintain the persona of a high-tech cultural guide.
        
        IMPORTANT: Answer concisely (under 50 words). Answer in ${selectedLang.name}.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: inputText }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: selectedLang.voice },
            },
          },
          systemInstruction: systemInstruction,
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      if (base64Audio) {
        setIsPlaying(true);
        await playPCM(base64Audio);
        setIsPlaying(false);
        setInputText(''); // Clear input after success
      }
    } catch (error) {
      console.error("Oracle Error:", error);
      alert("The connection to the Cyber Geisha was interrupted (API Error).");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96">
      <div className="bg-slate-900 border-2 border-pink-500 rounded-lg shadow-[0_0_30px_rgba(236,72,153,0.3)] overflow-hidden flex flex-col animate-fade-in-up">
        {/* Header */}
        <div className="bg-pink-900/30 p-3 flex justify-between items-center border-b border-pink-700">
           <div className="flex items-center gap-2 text-pink-300 font-bold">
             <span className="text-xl">👘</span>
             <span>CYBER GEISHA SUPPORT</span>
           </div>
           <button onClick={onClose} className="text-pink-300/70 hover:text-white"><X size={18} /></button>
        </div>

        {/* Visualizer Area */}
        <div className="h-40 bg-black relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/uV5V9p8MNk4uY/giphy.gif')] opacity-30 bg-cover bg-center"></div>
          
          <div className="z-10 flex flex-col items-center">
             <div className="text-4xl mb-2 animate-bounce-slow">👘</div>
             {isGenerating ? (
               <div className="text-pink-400 font-pixel text-xs animate-pulse bg-black/50 px-2 rounded">THINKING...</div>
             ) : isPlaying ? (
               <div className="flex gap-1 items-end h-8">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-1.5 bg-pink-500 animate-bounce" style={{ height: `${Math.random() * 100}%`, animationDuration: `${0.3 + Math.random()}s` }}></div>
                  ))}
               </div>
             ) : (
               <div className="text-pink-200/80 font-pixel text-xs bg-black/50 px-2 rounded">ONLINE</div>
             )}
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 bg-slate-900 space-y-3">
          <div>
            <label className="text-xs text-pink-400 mb-1 block font-bold">LANGUAGE PROTOCOL</label>
            <select 
              className="w-full bg-slate-800 border border-pink-900 text-slate-200 text-sm rounded p-2 focus:border-pink-500 outline-none"
              value={selectedLang.code}
              onChange={(e) => setSelectedLang(SUPPORTED_LANGUAGES.find(l => l.code === e.target.value) || SUPPORTED_LANGUAGES[0])}
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Ask the Geisha Agent...`}
              className="flex-1 bg-slate-800 border border-pink-900 text-slate-200 text-sm rounded p-2 focus:border-pink-500 outline-none placeholder-pink-900/50"
              onKeyPress={(e) => e.key === 'Enter' && generateAndSpeak()}
            />
            <button 
              onClick={generateAndSpeak}
              disabled={isGenerating || isPlaying}
              className={`p-2 rounded flex items-center justify-center transition-colors ${
                isGenerating ? 'bg-slate-700' : 'bg-pink-600 hover:bg-pink-700'
              } text-white`}
            >
              {isGenerating ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Volume2 size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
