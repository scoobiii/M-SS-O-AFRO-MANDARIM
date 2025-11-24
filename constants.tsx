import { Terminal, Database, Palette, Cpu } from 'lucide-react';
import { CharacterClass, ClassType, LevelData, Mission } from './types';

export const CLASSES: CharacterClass[] = [
  {
    id: ClassType.ChaosProgrammer,
    name: "Chaos Programmer",
    cnName: "混沌程序员",
    description: "Master Mandarin via Linux commands. Ethical hacking missions in Chinese.",
    skills: ["Linux CN", "Python Logic", "Web3 Basics"],
    icon: Terminal,
    color: "text-green-400 border-green-500 shadow-green-500/50",
  },
  {
    id: ClassType.DataMonk,
    name: "Data Monk",
    cnName: "数据武僧",
    description: "Vocabulary of AI, LLM and Big Data. Projects with Chinese datasets.",
    skills: ["AI Vocab", "Data Analysis", "Tech Pitching"],
    icon: Database,
    color: "text-blue-400 border-blue-500 shadow-blue-500/50",
  },
  {
    id: ClassType.PixelArtisan,
    name: "Pixel Artisan",
    cnName: "像素工匠",
    description: "Learn Mandarin by drawing sprite sheets. Each tile is a phrase.",
    skills: ["Sprite Logic", "Visual Mnemonic", "GBA Palette"],
    icon: Palette,
    color: "text-pink-400 border-pink-500 shadow-pink-500/50",
  },
  {
    id: ClassType.QuantumAmbassador,
    name: "Quantum Ambassador",
    cnName: "量子外交官",
    description: "Scientific Mandarin. Intro to Quantum Lux Computing.",
    skills: ["Quantum Physics", "Hard Sci-Fi CN", "Investor Pitch"],
    icon: Cpu,
    color: "text-purple-400 border-purple-500 shadow-purple-500/50",
  },
];

export const LEVELS: LevelData[] = [
  { level: 1, title: "Survival", cnTitle: "生存", description: "Kung Fu of 4 Tones", boss: "Guardian of Tones", bossCn: "声调守卫" },
  { level: 2, title: "Dev Mandarin", cnTitle: "程序员汉语", description: "Variables & Loops in CN", boss: "Demon of Debug", bossCn: "调试妖" },
  { level: 3, title: "Web3 Chain", cnTitle: "区块链", description: "Smart Contracts & Wallets", boss: "Immutable Hash Emperor", bossCn: "哈希大帝" },
  { level: 4, title: "Quantum Lux", cnTitle: "量子之光", description: "Superposition Analogies", boss: "Qubit Priestess", bossCn: "量子巫女" },
  { level: 5, title: "Robotics IoT", cnTitle: "机器人物联网", description: "Voice Command & Hardware", boss: "Mecha Titan", bossCn: "机甲泰坦" },
  { level: 6, title: "Techno-Monk", cnTitle: "技术僧", description: "The Final Ritual", boss: "Dragon of Neomemory", bossCn: "新记忆之龙" },
];

export const INITIAL_MISSIONS: Mission[] = [
  { id: 'm1', title: 'Practice 4 Tones (Kung Fu Mode)', xp: 150, completed: false, type: 'DAILY' },
  { id: 'm2', title: 'Read 1 page of CN Documentation', xp: 300, completed: false, type: 'DAILY' },
  { id: 'm3', title: 'Translate "sudo apt-get" to Mandarin', xp: 200, completed: false, type: 'DAILY' },
  { id: 'b1', title: 'Defeat the Guardian of Tones', xp: 1000, completed: false, type: 'BOSS' },
];

export const SPRITE_PROMPT = `sprite sheet of Vex (from league of legends) casting 'Personal Space'. 
pixel art, gameboy advance style, strict GBA RGB555 palette, 
use 15 colors + 1 transparent index. 
follow a 4x4 grid, 256x256 total, 16 frames. 
smooth magical flow, purple energy arcs around Vex. 
clean outlines, no anti-aliasing, authentic GBA constraints, 
consistent lighting per frame, animation-friendly. 
match reference image grid. 
no backgrounds, transparent index 0.`;

export const PROJECT_ROADMAP = {
  status: "ALPHA v0.2 🚧",
  description: "A gamified platform integrating Mandarin learning, Programming, and Tech Culture with RPG elements. Currently in active development focusing on core loops and asset generation.",
  sprints: [
    {
      id: "S1",
      title: "Sprint 1: Foundations",
      status: "DONE",
      items: [
        "✅ Class System Architecture (Chaos/Data/Pixel/Quantum)",
        "✅ Basic UI/UX with Cyberpunk Aesthetic",
        "✅ XP & Leveling Engine",
        "✅ Static Asset Integration"
      ]
    },
    {
      id: "S2",
      title: "Sprint 2: Battle & Assets (Current)",
      status: "IN_PROGRESS",
      items: [
        "🔄 Boss Battle Logic (Guardian of Tones)",
        "🔄 Sprite Generator Prompt Engineer",
        "🚧 Sound Effects Integration",
        "🚧 Mobile Responsiveness Polish"
      ]
    },
    {
      id: "S3",
      title: "Sprint 3: Content Expansion",
      status: "PLANNED",
      items: [
        "📅 Level 2: Python/Logic Modules",
        "📅 'Demon of Debug' AI Chatbot Integration",
        "📅 Voice Recognition for Tones",
        "📅 User Persistence (Local Storage)"
      ]
    },
    {
      id: "S4",
      title: "Sprint 4: Launch Protocol",
      status: "PLANNED",
      items: [
        "📦 Web3 Wallet Connection (Optional Badge)",
        "📦 PWA (Progressive Web App) Config",
        "🚀 1.0 Public Release",
        "✨ 'Techno-Monk' Certification NFT"
      ]
    }
  ]
};