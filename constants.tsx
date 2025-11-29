import { Terminal, Database, Palette, Cpu } from 'lucide-react';
import { CharacterClass, ClassType, LevelData, Mission } from './types';

export const CLASSES: CharacterClass[] = [
  {
    id: ClassType.ChaosProgrammer,
    name: "Programador do Caos",
    cnName: "混沌程序员",
    description: "Domine Mandarim via comandos Linux. Missões de hacking ético em chinês.",
    skills: ["Linux CN", "Lógica Python", "Básico Web3"],
    icon: Terminal,
    color: "text-green-400 border-green-500 shadow-green-500/50",
  },
  {
    id: ClassType.DataMonk,
    name: "Monge de Dados",
    cnName: "数据武僧",
    description: "Vocabulário de IA, LLM e Big Data. Projetos com datasets chineses.",
    skills: ["Vocab. IA", "Análise de Dados", "Tech Pitch"],
    icon: Database,
    color: "text-blue-400 border-blue-500 shadow-blue-500/50",
  },
  {
    id: ClassType.PixelArtisan,
    name: "Artesão de Pixel",
    cnName: "像素工匠",
    description: "Aprenda Mandarim desenhando sprites. Cada tile é uma frase.",
    skills: ["Lógica Sprite", "Mnemônica Visual", "Paleta GBA"],
    icon: Palette,
    color: "text-pink-400 border-pink-500 shadow-pink-500/50",
  },
  {
    id: ClassType.QuantumAmbassador,
    name: "Embaixador Quântico",
    cnName: "量子外交官",
    description: "Mandarim científico. Introdução à Computação Quantum Lux.",
    skills: ["Física Quântica", "Hard Sci-Fi CN", "Pitch Investidor"],
    icon: Cpu,
    color: "text-purple-400 border-purple-500 shadow-purple-500/50",
  },
];

export const LEVELS: LevelData[] = [
  { level: 1, title: "Sobrevivência", cnTitle: "生存", description: "Kung Fu dos 4 Tons", boss: "Guardião dos Tons", bossCn: "声调守卫" },
  { level: 2, title: "Mandarim Dev", cnTitle: "程序员汉语", description: "Variáveis & Loops em CN", boss: "Demônio do Debug", bossCn: "调试妖" },
  { level: 3, title: "Web3 Chain", cnTitle: "区块链", description: "Contratos Inteligentes & Carteiras", boss: "Imperador Hash Imutável", bossCn: "哈希大帝" },
  { level: 4, title: "Quantum Lux", cnTitle: "量子之光", description: "Analogias de Superposição", boss: "Sacerdotisa Qubit", bossCn: "量子巫女" },
  { level: 5, title: "Robótica IoT", cnTitle: "机器人物联网", description: "Comando de Voz & Hardware", boss: "Titã Mecha", bossCn: "机甲泰坦" },
  { level: 6, title: "Tecno-Monge", cnTitle: "技术僧", description: "O Ritual Final", boss: "Dragão da Neomemória", bossCn: "新记忆之龙" },
];

export const INITIAL_MISSIONS: Mission[] = [
  { id: 'm1', title: 'Praticar 4 Tons (Modo Kung Fu)', xp: 150, completed: false, type: 'DAILY' },
  { id: 'm2', title: 'Ler 1 pág. de Documentação CN', xp: 300, completed: false, type: 'DAILY' },
  { id: 'm3', title: 'Traduzir "sudo apt-get" p/ Mandarim', xp: 200, completed: false, type: 'DAILY' },
  { id: 'b1', title: 'Derrotar o Guardião dos Tons', xp: 1000, completed: false, type: 'BOSS' },
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
  description: "Uma plataforma gamificada integrando aprendizado de Mandarim, Programação e Cultura Tech com elementos de RPG. Focada em loops principais e geração de assets.",
  sprints: [
    {
      id: "S1",
      title: "Sprint 1: Fundações",
      status: "DONE",
      items: [
        "✅ Arquitetura de Classes (Caos/Dados/Pixel/Quântico)",
        "✅ UI/UX Básico com Estética Cyberpunk",
        "✅ Motor de XP & Níveis",
        "✅ Integração de Assets Estáticos"
      ]
    },
    {
      id: "S2",
      title: "Sprint 2: Batalha & Assets (Atual)",
      status: "IN_PROGRESS",
      items: [
        "🔄 Lógica de Boss Battle (Guardião dos Tons)",
        "🔄 Engenharia de Prompt de Sprites",
        "🚧 Integração de Efeitos Sonoros",
        "🚧 Polimento Responsivo Mobile"
      ]
    },
    {
      id: "S3",
      title: "Sprint 3: Expansão de Conteúdo",
      status: "PLANNED",
      items: [
        "📅 Nível 2: Módulos Python/Lógica",
        "📅 Chatbot IA 'Demônio do Debug'",
        "📅 Reconhecimento de Voz para Tons",
        "📅 Persistência Avançada de Usuário"
      ]
    },
    {
      id: "S4",
      title: "Sprint 4: Protocolo de Lançamento",
      status: "PLANNED",
      items: [
        "📦 Conexão Web3 Wallet (Badge Opcional)",
        "📦 Config PWA (Progressive Web App)",
        "🚀 Lançamento Público 1.0",
        "✨ Certificado NFT 'Tecno-Monge'"
      ]
    }
  ]
};

export const SUPPORTED_LANGUAGES = [
  { code: 'pt', name: 'Português', voice: 'Puck' },
  { code: 'zh', name: 'Mandarin (中文)', voice: 'Fenrir' },
  { code: 'en', name: 'English', voice: 'Puck' },
  { code: 'es', name: 'Español', voice: 'Kore' },
  { code: 'fr', name: 'Français', voice: 'Charon' },
  { code: 'de', name: 'Deutsch', voice: 'Fenrir' },
  { code: 'ja', name: 'Japanese (日本語)', voice: 'Kore' },
];