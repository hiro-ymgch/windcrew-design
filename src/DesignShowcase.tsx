import React, { useState } from 'react';
import { 
  Calendar, MapPin, Music, Info, Users, Mail, ArrowRight, Play, 
  SkipForward, SkipBack, Menu, Ticket, X as XIcon, ChevronRight, Star, 
  Heart, Clock, Plane, Instagram, LayoutGrid, Layers, GitBranch, 
  Newspaper, HelpCircle, Train, Film, MoveRight, Circle, Moon, 
  BookOpen, Search, Gamepad2, ChevronDown, ChevronUp, AlignLeft, Grid, List, 
  Columns, MousePointer, Sidebar, Monitor, AlertCircle, RefreshCw, LayoutTemplate, 
  PieChart, MessageCircle, CloudSun, ArrowUpCircle, Utensils, SplitSquareHorizontal,
  Sun, Activity, Settings, Bell,
  MoreHorizontal, Send, Camera, ThumbsUp, ChefHat, EyeOff
} from 'lucide-react';

// --- Types & Data ---

type DesignId = 'index' 
  | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' 
  | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
  | 'AA' | 'AB' | 'AC' | 'AD' | 'AE' | 'AF' | 'AG' | 'AH' | 'AI' | 'AJ' | 'AK' | 'AL' | 'AM' | 'AN' | 'AO' | 'AP' | 'AQ' | 'AR' | 'AS' | 'AT';

const ACTIVE_IDS: DesignId[] = [
  'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
  'AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP','AQ','AR','AS','AT'
];

const COMMON_DATA = {
  orchestraName: "WindCrewOrchestra",
  nextConcert: {
    title: "第25回 定期演奏会 〜春の風と共に〜",
    date: "2025.03.21",
    fullDate: "2025年3月21日(土)",
    time: "14:00",
    place: "足立区文化会館 大ホール",
    fee: "入場無料"
  },
  links: [
    { id: 'about', label: '楽団紹介', icon: Info, desc: '楽団の歴史と活動について' },
    { id: 'recruit', label: '団員募集', icon: Users, desc: '一緒に演奏しませんか？' },
    { id: 'concert', label: '演奏会情報', icon: Music, desc: '今後の演奏会とアーカイブ' },
    { id: 'contact', label: 'お問い合わせ', icon: Mail, desc: 'ご質問・ご依頼はこちら' },
  ],
  sns: "Instagram / Facebook"
};

// --- Shared Components ---

const Button = ({ children, primary = true, className = "", onClick }: { children: React.ReactNode, primary?: boolean, className?: string, onClick?: () => void }) => (
  <button onClick={onClick} className={`px-6 py-3 rounded-full font-bold transition-all transform hover:-translate-y-1 hover:shadow-lg ${
    primary 
      ? "bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-200" 
      : "bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50"
  } ${className}`}>
    {children}
  </button>
);

const HeroImage = ({ className = "h-full w-full", overlay = false }: { className?: string, overlay?: boolean }) => (
  <div className={`relative bg-gray-900 overflow-hidden ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/60 z-0"></div>
    <img 
      src="/api/placeholder/1920/600" 
      alt="WindCrewOrchestra Performance" 
      className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
    />
    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    
    {overlay && (
      <div className="absolute inset-0 bg-black/40 z-10"></div>
    )}
  </div>
);

const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
const ArrowDownIcon = ({className}:{className?:string}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 5v14M19 12l-7 7-7-7"/></svg>;
const Square = ({className, size}:{className?:string, size?:number}) => <div style={{width:size, height:size}} className={`border-2 border-current rounded ${className}`} />;
const Shuffle = ({className, size}:{className?:string, size?:number}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>;


// --- Implementations ---

// A: Standard
const DesignA = () => (
  <div className="min-h-screen bg-gray-50 font-sans">
    <header className="relative h-[500px] flex items-center justify-center text-white">
      <HeroImage className="absolute inset-0" overlay />
      <div className="relative z-20 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wider">{COMMON_DATA.orchestraName}</h1>
        <p className="text-xl opacity-90">東京都足立区で活動するアマチュア吹奏楽団</p>
      </div>
    </header>
    <section className="bg-white py-16 shadow-sm relative -mt-20 mx-4 md:mx-auto max-w-5xl rounded-xl z-30 border-t-4 border-purple-600">
      <div className="text-center px-8">
        <span className="inline-block bg-purple-100 text-purple-800 px-4 py-1 rounded-full text-sm font-bold mb-4">Next Concert</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{COMMON_DATA.nextConcert.title}</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-lg mb-8">
          <div className="flex items-center gap-2"><Calendar className="text-purple-600" /> {COMMON_DATA.nextConcert.fullDate}</div>
          <div className="flex items-center gap-2"><MapPin className="text-purple-600" /> {COMMON_DATA.nextConcert.place}</div>
        </div>
        <Button>詳細を見る</Button>
      </div>
    </section>
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        {COMMON_DATA.links.slice(0, 3).map((link) => (
          <div key={link.id} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl text-center group cursor-pointer border border-gray-100">
            <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-600 transition-colors">
              <link.icon className="w-8 h-8 text-purple-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">{link.label}</h3>
            <p className="text-gray-500 mb-4">{link.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// B: 2-2 Grid
const DesignB = () => (
  <div className="min-h-screen bg-gray-100 font-sans p-4 md:p-8 flex flex-col items-center justify-center">
    <h1 className="text-3xl font-bold mb-8 text-slate-800">{COMMON_DATA.orchestraName}</h1>
    <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      {COMMON_DATA.links.map((link, idx) => (
        <div key={link.id} className={`
          p-8 rounded-3xl flex flex-col items-center justify-center text-center cursor-pointer transition-transform hover:scale-[1.02]
          ${idx === 0 ? 'bg-purple-600 text-white' : 'bg-white text-slate-800 shadow-sm hover:shadow-md'}
        `}>
          <link.icon size={48} className="mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-2">{link.label}</h2>
          <p className={`text-sm ${idx === 0 ? 'text-purple-200' : 'text-gray-500'}`}>{link.desc}</p>
        </div>
      ))}
    </div>
    <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm w-full max-w-4xl flex items-center justify-between border-l-8 border-purple-600">
      <div>
        <span className="text-xs font-bold text-gray-400 uppercase">Next Concert</span>
        <h3 className="text-xl font-bold text-slate-800">{COMMON_DATA.nextConcert.title}</h3>
      </div>
      <ArrowRight className="text-purple-600" />
    </div>
  </div>
);

// C: Size by Importance (Bento Grid)
const DesignC = () => (
  <div className="min-h-screen bg-slate-50 font-sans p-4 md:p-8">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-auto md:h-[800px]">
      <div className="md:col-span-2 md:row-span-2 bg-purple-900 rounded-3xl relative overflow-hidden group cursor-pointer text-white p-8 flex flex-col justify-end">
        <HeroImage className="absolute inset-0 opacity-60 group-hover:scale-105 transition-transform duration-700" />
        <div className="relative z-10">
          <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">MAIN EVENT</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{COMMON_DATA.nextConcert.title}</h2>
          <p className="text-purple-200 text-lg">{COMMON_DATA.nextConcert.fullDate}</p>
        </div>
      </div>
      <div className="md:col-span-2 md:row-span-1 bg-yellow-400 rounded-3xl p-8 flex items-center justify-between cursor-pointer hover:bg-yellow-300 transition-colors text-yellow-900">
        <div>
          <h2 className="text-3xl font-bold mb-2">団員募集中！</h2>
          <p className="font-medium opacity-80">全パート歓迎・見学随時</p>
        </div>
        <Users size={64} className="opacity-80"/>
      </div>
      <div className="md:col-span-1 md:row-span-2 bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center cursor-pointer">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
          <Info size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-800">About Us</h3>
        <p className="text-sm text-slate-500 mt-2">楽団の歴史と紹介</p>
      </div>
      <div className="md:col-span-1 md:row-span-2 bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center cursor-pointer">
        <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 mb-4">
          <Music size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-800">Archive</h3>
        <p className="text-sm text-slate-500 mt-2">過去の演奏会</p>
      </div>
      <div className="md:col-span-4 md:row-span-1 bg-slate-800 rounded-3xl p-8 flex items-center justify-between text-white cursor-pointer hover:bg-slate-700 transition-colors">
        <div className="flex items-center gap-4">
          <Mail size={32} />
          <div>
            <h3 className="text-xl font-bold">お問い合わせ</h3>
            <p className="text-slate-400 text-sm">演奏依頼やご質問はこちらから</p>
          </div>
        </div>
        <div className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold text-sm">Contact Form</div>
      </div>
    </div>
  </div>
);

// D: Story Flow
const DesignD = () => (
  <div className="min-h-screen bg-[#f8f5f2] font-sans overflow-x-auto flex items-center">
    <div className="flex items-center gap-8 px-8 md:px-20 min-w-max h-[80vh]">
      <div className="w-[300px] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-center relative">
        <span className="text-6xl font-bold text-slate-100 absolute top-4 left-6">01</span>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">ようこそ</h2>
        <p className="text-slate-600 leading-relaxed mb-8">
          WindCrewOrchestraは、足立区で活動する吹奏楽団です。<br/>
          私たちの音楽の旅へご案内します。
        </p>
        <div className="flex items-center text-purple-600 font-bold animate-bounce">
          Scroll Right <ArrowRight className="ml-2" />
        </div>
      </div>
      <div className="h-1 w-20 bg-slate-200"></div>
      <div className="w-[300px] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-xl p-0 overflow-hidden relative group cursor-pointer">
        <HeroImage className="absolute inset-0 opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 text-white">
          <span className="text-4xl font-bold text-white/20 absolute top-4 left-6">02</span>
          <h3 className="text-2xl font-bold mb-2">どんな楽団？</h3>
          <p className="text-sm opacity-90">2000年の創立以来、地域に根差した活動を続けています。</p>
        </div>
      </div>
      <div className="h-1 w-20 bg-slate-200"></div>
      <div className="w-[400px] md:w-[600px] h-[600px] bg-purple-900 rounded-3xl shadow-2xl p-12 text-white flex flex-col justify-center relative transform scale-105 border-4 border-white/20">
        <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-xs font-bold absolute top-12 left-12">MAIN EVENT</span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{COMMON_DATA.nextConcert.title}</h2>
        <p className="text-xl text-purple-200 mb-8">{COMMON_DATA.nextConcert.fullDate}</p>
        <Button className="bg-white text-purple-900 w-fit">チケット・詳細情報</Button>
      </div>
      <div className="h-1 w-20 bg-slate-200"></div>
      <div className="w-[300px] md:w-[400px] h-[500px] bg-yellow-400 rounded-2xl shadow-xl p-8 flex flex-col justify-center text-yellow-900 relative cursor-pointer hover:bg-yellow-300 transition-colors">
        <Users size={64} className="mb-6"/>
        <h2 className="text-3xl font-bold mb-4">仲間になる</h2>
        <p className="leading-relaxed mb-8">
          聴くだけじゃ物足りない？<br/>
          あなたもステージに立ちませんか？
        </p>
        <button className="bg-yellow-900 text-white px-6 py-3 rounded-full font-bold w-fit">団員募集ページへ</button>
      </div>
    </div>
  </div>
);

// E: Contextual Links
const DesignE = () => (
  <div className="min-h-screen bg-white font-serif text-slate-800">
    <div className="max-w-3xl mx-auto p-8 md:p-12">
      <header className="text-center mb-16 pt-8">
        <h1 className="text-4xl font-bold mb-2 tracking-widest">{COMMON_DATA.orchestraName}</h1>
        <p className="text-slate-500 italic">Official Website</p>
      </header>
      <section className="mb-16 relative">
        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-purple-200"></div>
        <div className="pl-8">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-2 block">Latest News</span>
          <h2 className="text-3xl font-bold mb-6 leading-tight">春の定期演奏会、開催決定。</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            今年も恒例の定期演奏会を開催します。今回のテーマは「春の風」。
            新しい季節の訪れを、吹奏楽の響きとともにお届けします。
            {COMMON_DATA.nextConcert.place}にて、皆様をお待ちしております。
          </p>
          <div className="flex gap-4 items-center">
            <a href="#" className="text-purple-600 font-bold border-b-2 border-purple-600 hover:text-purple-800 hover:border-purple-800 transition-colors">
              詳細・プログラムを見る
            </a>
            <span className="text-sm text-slate-400">or</span>
            <a href="#" className="text-slate-500 text-sm hover:text-slate-800 underline">
              過去の演奏会記録
            </a>
          </div>
        </div>
      </section>
      <section className="mb-16 bg-slate-50 p-8 rounded-xl border border-slate-100">
        <h3 className="text-xl font-bold mb-4">楽団について</h3>
        <p className="text-slate-600 mb-4">
          私たちは2000年に結成されました。音楽を愛する社会人が集まり、週に一度の練習を楽しんでいます。
        </p>
        <div className="flex justify-end">
          <a href="#" className="flex items-center gap-2 text-sm font-bold text-slate-700 bg-white px-4 py-2 rounded-full shadow-sm hover:shadow transition-shadow">
            <Info size={16}/> もっと詳しく知る
          </a>
        </div>
      </section>
      <section className="text-center p-12 bg-purple-900 text-white rounded-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4">新しい仲間を募集しています</h3>
          <p className="text-purple-200 mb-8">全パートで見学受付中。ブランクがある方も大歓迎です。</p>
          <Button className="bg-white text-purple-900 border-none">募集要項を見る</Button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -mr-16 -mt-16"></div>
      </section>
    </div>
  </div>
);

// F: Full Screen Overlay
const DesignF = () => (
  <div className="h-screen w-full relative overflow-hidden bg-gray-900 font-sans group">
    <div className="absolute inset-0 transition-transform duration-[20s] ease-linear transform scale-100 group-hover:scale-110">
       <HeroImage className="h-full w-full object-cover" />
    </div>
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>
    <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-16 text-white">
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold tracking-widest uppercase border-b-2 border-purple-500 inline-block pb-2 mb-2">WindCrew</h1>
        <p className="text-xs text-gray-400">Since 2000 / Adachi, Tokyo</p>
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <span className="inline-block px-4 py-1 border border-white/30 rounded-full text-xs font-bold tracking-[0.2em] mb-6 backdrop-blur-sm">NEXT STAGE</span>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tighter">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">SPRING</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">CONCERT</span>
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-lg font-light tracking-wide mb-8">
          <span className="flex items-center gap-2"><Calendar size={20} className="text-purple-500"/> {COMMON_DATA.nextConcert.fullDate}</span>
          <span className="hidden md:inline text-gray-600">|</span>
          <span className="flex items-center gap-2"><MapPin size={20} className="text-purple-500"/> {COMMON_DATA.nextConcert.place}</span>
        </div>
        <button className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest overflow-hidden">
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">Get Details</span>
          <div className="absolute inset-0 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
        </button>
      </div>
      <nav className="w-full max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {COMMON_DATA.links.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="flex flex-col items-center justify-center gap-2 py-2 rounded-xl hover:bg-white/10 transition-all cursor-pointer group/link">
              <link.icon size={24} className="text-gray-300 group-hover/link:text-purple-400 transition-colors" />
              <span className="text-xs font-bold tracking-wider">{link.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  </div>
);

// G: Scroll Story
const DesignG = () => (
  <div className="bg-white font-serif text-slate-800">
    <div className="h-screen flex flex-col items-center justify-center p-8 text-center sticky top-0 bg-white z-10">
      <div className="max-w-2xl animate-in fade-in zoom-in duration-1000">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">奏でる喜び、<br/>届ける感動。</h1>
        <p className="text-xl text-slate-500 mb-12">私たちは、東京都足立区で活動する<br/>アマチュア吹奏楽団です。</p>
        <div className="animate-bounce text-slate-400 flex flex-col items-center">
          <span className="text-xs mb-2 uppercase tracking-widest">Scroll</span>
          <ArrowDownIcon />
        </div>
      </div>
    </div>
    <div className="relative z-20 bg-slate-900 text-white min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <div className="aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden relative shadow-2xl transform rotate-3">
            <HeroImage className="absolute inset-0 opacity-80" />
            <div className="absolute inset-0 border-8 border-white/10"></div>
          </div>
        </div>
        <div className="md:w-1/2">
          <span className="text-purple-400 font-bold tracking-widest uppercase mb-4 block">Next Chapter</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{COMMON_DATA.nextConcert.title}</h2>
          <p className="text-lg text-slate-300 mb-8">
            春の訪れとともに、心温まる音楽をお届けします。<br/>
            {COMMON_DATA.nextConcert.date}、{COMMON_DATA.nextConcert.place}にて。
          </p>
          <Button className="bg-white text-slate-900 border-none">詳細・チケット情報</Button>
        </div>
      </div>
    </div>
    <div className="relative z-30 bg-yellow-50 min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <Users size={80} className="mx-auto mb-8 text-yellow-600" />
        <h2 className="text-4xl font-bold mb-6 text-yellow-900">物語の続きを、ご一緒に。</h2>
        <p className="text-xl text-yellow-800 mb-12 leading-relaxed">
          WindCrewOrchestraでは、新しい仲間を募集しています。<br/>
          あなたの音色が、私たちの音楽を完成させます。
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button className="bg-yellow-600 text-white border-none hover:bg-yellow-700">募集要項を見る</Button>
          <Button className="bg-transparent border-2 border-yellow-600 text-yellow-800 hover:bg-yellow-100">楽団紹介へ</Button>
        </div>
      </div>
    </div>
  </div>
);

// H: Integrated Card
const DesignH = () => (
  <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4 md:p-8 font-sans">
    <div className="w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      <div className="md:w-5/12 relative bg-slate-900">
        <HeroImage className="absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="text-3xl font-bold leading-tight mb-2">{COMMON_DATA.orchestraName}</h1>
          <p className="text-purple-200 text-sm">Since 2000 / Adachi, Tokyo</p>
        </div>
      </div>
      <div className="md:w-7/12 p-8 md:p-16 flex flex-col">
        <div className="flex-1">
          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold mb-6 tracking-wide">UPCOMING EVENT</span>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">{COMMON_DATA.nextConcert.title}</h2>
          <div className="flex flex-col gap-3 text-slate-600 mb-8">
            <div className="flex items-center gap-3"><Calendar className="text-purple-500"/> {COMMON_DATA.nextConcert.fullDate}</div>
            <div className="flex items-center gap-3"><MapPin className="text-purple-500"/> {COMMON_DATA.nextConcert.place}</div>
            <div className="flex items-center gap-3"><Ticket className="text-purple-500"/> {COMMON_DATA.nextConcert.fee}</div>
          </div>
          <Button className="w-full md:w-auto">コンサート詳細へ</Button>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-100">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-4 font-bold">Quick Links</p>
          <div className="grid grid-cols-3 gap-4">
            <a href="#" className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-slate-50 transition-colors group">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors"><Info size={20}/></div>
              <span className="text-xs font-bold text-slate-600">About</span>
            </a>
            <a href="#" className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-slate-50 transition-colors group">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors"><Users size={20}/></div>
              <span className="text-xs font-bold text-slate-600">Recruit</span>
            </a>
            <a href="#" className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-slate-50 transition-colors group">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors"><Mail size={20}/></div>
              <span className="text-xs font-bold text-slate-600">Contact</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// I: Sidebar
const DesignI = () => (
  <div className="min-h-screen bg-white font-sans flex flex-col md:flex-row">
    <div className="md:w-72 bg-slate-900 text-white flex flex-col fixed md:relative h-full z-20 w-full">
      <div className="p-8">
        <h1 className="text-2xl font-bold tracking-tighter">WindCrew</h1>
        <p className="text-xs text-slate-400 mt-1">Orchestra</p>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1">
        <a href="#" className="flex items-center gap-4 px-4 py-3 bg-purple-600 rounded-lg text-white font-bold shadow-lg shadow-purple-900/50">
          <Star size={18}/> Top
        </a>
        {COMMON_DATA.links.map(link => (
          <a key={link.id} href="#" className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium">
            <link.icon size={18}/> {link.label}
          </a>
        ))}
      </nav>
      <div className="p-8 text-xs text-slate-500 border-t border-white/10">
        <div className="flex gap-4 mb-4">
          <Instagram size={16} className="hover:text-white cursor-pointer"/>
          <div className="w-4 h-4 bg-slate-500 rounded hover:bg-white cursor-pointer"></div>
        </div>
        &copy; 2025 WindCrewOrchestra
      </div>
    </div>
    <div className="flex-1 md:ml-0 bg-slate-50 min-h-screen">
      <div className="h-[500px] relative bg-slate-200">
        <HeroImage className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full">
          <span className="bg-white/20 backdrop-blur border border-white/40 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">Next Performance</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4">{COMMON_DATA.nextConcert.title}</h2>
          <div className="flex flex-wrap gap-6 text-slate-700 font-medium">
            <span className="flex items-center gap-2"><Calendar className="text-purple-600"/> {COMMON_DATA.nextConcert.fullDate}</span>
            <span className="flex items-center gap-2"><MapPin className="text-purple-600"/> {COMMON_DATA.nextConcert.place}</span>
          </div>
        </div>
      </div>
      <div className="p-8 md:p-16 max-w-5xl">
        <p className="text-xl leading-relaxed text-slate-600 mb-12 border-l-4 border-purple-600 pl-6">
          私たちは音楽を通じて地域との交流を深め、<br/>
          聴く人の心に響く演奏を目指しています。
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:border-purple-200 transition-colors group cursor-pointer">
            <Users size={32} className="text-slate-400 mb-4 group-hover:text-purple-600 transition-colors"/>
            <h3 className="text-xl font-bold mb-2">団員募集</h3>
            <p className="text-slate-500 text-sm mb-4">全パート募集中です。見学・お問い合わせはこちらから。</p>
            <span className="text-purple-600 text-sm font-bold border-b border-purple-600">詳細を見る</span>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:border-purple-200 transition-colors group cursor-pointer">
            <Music size={32} className="text-slate-400 mb-4 group-hover:text-purple-600 transition-colors"/>
            <h3 className="text-xl font-bold mb-2">過去の演奏会</h3>
            <p className="text-slate-500 text-sm mb-4">これまでの活動記録や演奏曲目をご覧いただけます。</p>
            <span className="text-purple-600 text-sm font-bold border-b border-purple-600">アーカイブへ</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// J: Timeline Story
const DesignJ = () => (
  <div className="min-h-screen bg-white font-sans text-gray-800">
    <div className="max-w-2xl mx-auto px-6 py-12 relative">
      <div className="absolute left-10 md:left-1/2 top-0 bottom-0 w-1 bg-gray-100 transform -translate-x-1/2"></div>
      <header className="mb-20 text-center relative z-10 bg-white pt-4">
         <div className="inline-block p-4 rounded-full bg-purple-50 mb-4">
           <Music size={40} className="text-purple-600" />
         </div>
         <h1 className="text-3xl font-bold">{COMMON_DATA.orchestraName}</h1>
         <p className="text-gray-500">Welcome to our journey</p>
      </header>
      <div className="mb-16 relative pl-16 md:pl-0">
         <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-purple-200 rounded-full border-4 border-white transform md:-translate-x-1/2 flex items-center justify-center text-xs font-bold text-purple-700">1</div>
         <div className="md:w-1/2 md:pr-12 md:text-right md:ml-0">
            <span className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-2 block">Step 1: Know Us</span>
            <h2 className="text-2xl font-bold mb-3">楽団を知る</h2>
            <p className="text-gray-600 mb-4">私たちは足立区で活動する吹奏楽団です。音楽への情熱と歴史をご覧ください。</p>
            <button className="text-purple-600 font-bold hover:underline">楽団紹介へ &rarr;</button>
         </div>
      </div>
      <div className="mb-16 relative pl-16 md:pl-0">
         <div className="absolute left-0 md:left-1/2 w-12 h-12 bg-purple-600 rounded-full border-4 border-white transform -translate-x-[2px] md:-translate-x-1/2 flex items-center justify-center text-white shadow-lg z-10">2</div>
         <div className="md:w-1/2 md:ml-auto md:pl-12">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow border border-gray-100 group cursor-pointer">
               <div className="h-40 bg-gray-200 relative overflow-hidden">
                  <HeroImage className="absolute inset-0 transition-transform group-hover:scale-105" />
               </div>
               <div className="p-6">
                 <span className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-bold mb-2 inline-block">MAIN EVENT</span>
                 <h2 className="text-xl font-bold mb-2">演奏会に来る</h2>
                 <h3 className="text-lg font-bold text-purple-800 mb-1">{COMMON_DATA.nextConcert.title}</h3>
                 <p className="text-sm text-gray-500 mb-4">{COMMON_DATA.nextConcert.fullDate}</p>
                 <Button className="w-full text-sm py-2">詳細を見る</Button>
               </div>
            </div>
         </div>
      </div>
      <div className="mb-16 relative pl-16 md:pl-0">
         <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-purple-200 rounded-full border-4 border-white transform md:-translate-x-1/2 flex items-center justify-center text-xs font-bold text-purple-700">3</div>
         <div className="md:w-1/2 md:pr-12 md:text-right md:ml-0">
            <span className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-2 block">Step 3: Join Us</span>
            <h2 className="text-2xl font-bold mb-3">仲間になる</h2>
            <p className="text-gray-600 mb-4">一緒に演奏しませんか？全パート募集中です。</p>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-bold transition-colors">団員募集ページへ</button>
         </div>
      </div>
    </div>
  </div>
);

// K: Minimal
const DesignK = () => (
  <div className="h-screen w-full relative bg-black font-sans flex flex-col items-center justify-center">
    <div className="absolute inset-0 opacity-30 grayscale"><HeroImage /></div>
    <div className="relative z-10 text-center w-full max-w-md px-8 border-y border-white/20 py-12 backdrop-blur-sm">
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-12 tracking-widest uppercase">{COMMON_DATA.orchestraName}</h1>
      <div className="space-y-6">
        <a href="#" className="block text-white text-xl font-light hover:font-bold hover:tracking-widest transition-all">NEXT CONCERT</a>
        <a href="#" className="block text-white/70 text-lg font-light hover:text-white hover:font-bold transition-all">ABOUT US</a>
        <a href="#" className="block text-white/70 text-lg font-light hover:text-white hover:font-bold transition-all">JOIN US</a>
        <a href="#" className="block text-white/70 text-lg font-light hover:text-white hover:font-bold transition-all">CONTACT</a>
      </div>
    </div>
    <div className="absolute bottom-8 text-white/30 text-xs tracking-widest">&copy; 2000-2025 TOKYO ADACHI</div>
  </div>
);

// L: Top Bar Alert
const DesignL = () => (
  <div className="min-h-screen bg-white font-sans">
    <div className="bg-purple-600 text-white p-3 sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
        <div className="flex items-center gap-2"><Bell size={16} className="animate-pulse"/><span className="font-bold">NEWS:</span><span>次回演奏会「{COMMON_DATA.nextConcert.title}」詳細決定！</span></div>
        <button className="bg-white text-purple-600 px-4 py-1 rounded-full text-xs font-bold hover:bg-purple-50 transition-colors">チケット・詳細を見る &rarr;</button>
      </div>
    </div>
    <header className="px-8 py-6 border-b border-gray-100 flex justify-between items-center"><h1 className="font-bold text-2xl tracking-tighter text-slate-900">{COMMON_DATA.orchestraName}</h1><Menu className="text-slate-600 cursor-pointer"/></header>
    <div className="h-[500px] relative bg-slate-100">
      <HeroImage className="absolute inset-0 opacity-80" />
      <div className="absolute inset-0 flex items-center justify-center"><h2 className="text-5xl md:text-7xl font-bold text-white tracking-widest drop-shadow-lg opacity-80">HARMONY</h2></div>
    </div>
    <div className="max-w-6xl mx-auto px-8 -mt-24 relative z-10 grid md:grid-cols-3 gap-8 pb-20">
      {COMMON_DATA.links.slice(0,3).map(link => (
        <div key={link.id} className="bg-white p-8 rounded-lg shadow-xl hover:-translate-y-2 transition-transform cursor-pointer border-t-4 border-purple-600">
          <div className="mb-4 text-purple-600"><link.icon size={32}/></div>
          <h3 className="font-bold text-xl mb-3">{link.label}</h3>
          <p className="text-slate-500 text-sm leading-relaxed">{link.desc}</p>
          <div className="mt-6 text-purple-600 text-sm font-bold flex items-center gap-1">Read More <ArrowRight size={14}/></div>
        </div>
      ))}
    </div>
  </div>
);

// M: Integrated Hero
const DesignM = () => (
  <div className="min-h-screen bg-white font-sans">
    <div className="relative h-[80vh] md:h-[80vh] bg-gray-900 overflow-hidden flex flex-col md:flex-row md:items-stretch">
      <div className="w-full md:w-[70%] relative h-[50vh] md:h-full">
        <HeroImage className="absolute inset-0 h-full" />
        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 text-white z-10 drop-shadow-lg">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{COMMON_DATA.orchestraName}</h1>
        </div>
      </div>
      <div className="flex md:w-[30%] bg-purple-900/90 backdrop-blur-xl text-white flex-col justify-center p-6 md:p-8 relative z-20 md:shadow-[-20px_0_50px_rgba(0,0,0,0.3)]">
        <div className="space-y-6 md:space-y-8">
          <div>
            <span className="block text-purple-300 text-sm font-bold mb-2">UPCOMING</span>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4">{COMMON_DATA.nextConcert.title}</h2>
            <div className="space-y-2 text-purple-100">
              <p className="flex items-center gap-3"><Calendar size={18} /> {COMMON_DATA.nextConcert.fullDate}</p>
              <p className="flex items-center gap-3"><MapPin size={18} /> {COMMON_DATA.nextConcert.place}</p>
            </div>
          </div>
          <div className="pt-6 md:pt-8 border-t border-white/20">
             <button className="w-full py-3 md:py-4 bg-white text-purple-900 font-bold hover:bg-purple-50 transition-colors flex items-center justify-center gap-2">チケット情報・詳細 <ArrowRight size={18}/></button>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20 overflow-x-auto">
           <div className="flex space-x-4 md:space-x-8 min-w-max">
             {COMMON_DATA.links.map(link => (
               <a key={link.id} href="#" className="flex items-center gap-1 md:gap-2 text-gray-600 hover:text-purple-600 font-bold transition-colors text-sm md:text-base"><link.icon size={18} className="md:w-5 md:h-5" /><span className="hidden sm:inline">{link.label}</span></a>
             ))}
           </div>
        </div>
      </div>
    </div>
  </div>
);

// N: Zigzag
const DesignN = () => (
  <div className="min-h-screen bg-white font-sans">
    <div className="h-[60vh] relative mb-0">
      <HeroImage />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
        <div className="text-center text-white"><h1 className="text-5xl font-bold mb-4">{COMMON_DATA.orchestraName}</h1><p className="text-xl opacity-90">Enjoy Music, Enjoy Life.</p></div>
      </div>
    </div>
    <div className="grid md:grid-cols-2 min-h-[400px]">
      <div className="bg-slate-100 relative min-h-[300px]"><img src="/api/placeholder/800/600" className="absolute inset-0 w-full h-full object-cover" alt="About"/></div>
      <div className="p-12 md:p-20 flex flex-col justify-center">
        <span className="text-purple-600 font-bold text-xs uppercase tracking-widest mb-2">Who We Are</span>
        <h2 className="text-3xl font-bold mb-6">楽団について</h2>
        <p className="text-slate-600 leading-relaxed mb-8">2000年の創団以来、足立区を中心に活動を続けています。「音楽を楽しむ」をモットーに、幅広い年代のメンバーが集まり、ハーモニーを奏でています。</p>
        <a href="#" className="text-purple-600 font-bold flex items-center gap-2 hover:gap-4 transition-all">もっと詳しく <ArrowRight size={16}/></a>
      </div>
    </div>
    <div className="grid md:grid-cols-2 min-h-[400px]">
      <div className="p-12 md:p-20 flex flex-col justify-center bg-purple-900 text-white order-2 md:order-1">
        <span className="text-purple-300 font-bold text-xs uppercase tracking-widest mb-2">Next Stage</span>
        <h2 className="text-3xl font-bold mb-6">次回演奏会情報</h2>
        <div className="mb-8"><p className="text-xl font-bold mb-2">{COMMON_DATA.nextConcert.title}</p><p className="opacity-80">{COMMON_DATA.nextConcert.fullDate}</p><p className="opacity-80">{COMMON_DATA.nextConcert.place}</p></div>
        <Button className="bg-white text-purple-900 border-none w-fit">詳細を見る</Button>
      </div>
      <div className="bg-slate-200 relative min-h-[300px] order-1 md:order-2"><HeroImage className="absolute inset-0 w-full h-full object-cover" /></div>
    </div>
    <div className="grid md:grid-cols-2 min-h-[400px]">
      <div className="bg-slate-100 relative min-h-[300px]"><img src="/api/placeholder/800/600" className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Recruit"/></div>
      <div className="p-12 md:p-20 flex flex-col justify-center">
        <span className="text-purple-600 font-bold text-xs uppercase tracking-widest mb-2">Join Us</span>
        <h2 className="text-3xl font-bold mb-6">団員募集</h2>
        <p className="text-slate-600 leading-relaxed mb-8">全パートで新しい仲間を募集しています。<br/>ブランクがある方も、楽器を始めたばかりの方も、<br/>まずは一度見学にお越しください。</p>
        <a href="#" className="text-purple-600 font-bold flex items-center gap-2 hover:gap-4 transition-all">募集要項へ <ArrowRight size={16}/></a>
      </div>
    </div>
  </div>
);

// O: Floating
const DesignO = () => (
  <div className="min-h-screen bg-gray-50 font-sans">
    <div className="h-[500px] w-full relative z-0">
      <HeroImage className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-purple-900/40"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-widest drop-shadow-lg">{COMMON_DATA.orchestraName}</h1>
      </div>
    </div>
    <div className="max-w-6xl mx-auto px-4 relative z-10 -mt-24 mb-20">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-16 transform transition-transform hover:-translate-y-2 duration-500">
         <div className="flex-1 text-center md:text-left">
            <span className="text-purple-600 font-bold tracking-widest text-sm uppercase mb-2 block">Next Performance</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{COMMON_DATA.nextConcert.title}</h2>
            <div className="flex flex-col gap-2 text-gray-600 mb-6">
              <span className="flex items-center gap-2 justify-center md:justify-start"><Calendar size={20} className="text-purple-500"/> {COMMON_DATA.nextConcert.fullDate}</span>
              <span className="flex items-center gap-2 justify-center md:justify-start"><MapPin size={20} className="text-purple-500"/> {COMMON_DATA.nextConcert.place}</span>
            </div>
            <Button>詳細を見る</Button>
         </div>
         <div className="w-full md:w-1/3 aspect-video bg-gray-200 rounded-xl overflow-hidden relative shadow-inner">
            <HeroImage className="absolute inset-0" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
               <span className="text-white font-bold border-2 border-white px-4 py-2">PREVIEW</span>
            </div>
         </div>
      </div>
    </div>
    <div className="max-w-5xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-8">
       <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-l-8 border-purple-500">
         <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><Info className="text-purple-500"/> 楽団紹介</h3>
         <p className="text-gray-600 mb-6">2000年の創団以来、地域に根差した活動を続けています...</p>
         <a href="#" className="font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1">Read Story <ArrowRight size={16}/></a>
       </div>
       <div className="bg-purple-900 text-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
         <div className="relative z-10">
           <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><Users className="text-purple-300"/> 団員募集</h3>
           <p className="text-purple-100 mb-6">音楽を愛する仲間を募集中。全パート歓迎！</p>
           <a href="#" className="inline-block bg-white text-purple-900 font-bold px-6 py-2 rounded-full hover:bg-purple-50">Join Us</a>
         </div>
         <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4"><Users size={200} /></div>
       </div>
    </div>
  </div>
);

// P: Small Info
const DesignP = () => (
  <div className="min-h-screen bg-white font-sans flex flex-col items-center justify-center p-8 text-center">
    <h1 className="text-2xl font-bold mb-16 tracking-widest uppercase">{COMMON_DATA.orchestraName}</h1>
    <div className="w-full max-w-md space-y-12">
      <div className="group cursor-pointer">
        <div className="flex justify-between items-end border-b border-gray-300 pb-2 mb-2 group-hover:border-purple-600 transition-colors">
          <p className="text-xs text-gray-400 font-bold">NEXT LIVE</p>
          <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-purple-600"/>
        </div>
        <div className="text-left">
          <span className="text-2xl font-bold block mb-1 group-hover:text-purple-600 transition-colors">{COMMON_DATA.nextConcert.date}</span>
          <span className="text-sm text-gray-500">{COMMON_DATA.nextConcert.title}</span>
        </div>
      </div>
      <div className="group cursor-pointer">
        <div className="flex justify-between items-end border-b border-gray-300 pb-2 mb-2 group-hover:border-purple-600 transition-colors">
          <p className="text-xs text-gray-400 font-bold">RECRUIT</p>
          <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-purple-600"/>
        </div>
        <div className="text-left">
          <span className="text-2xl font-bold block mb-1 group-hover:text-purple-600 transition-colors">Members Wanted</span>
          <span className="text-sm text-gray-500">全パート募集中 / 見学受付中</span>
        </div>
      </div>
      <div className="group cursor-pointer">
        <div className="flex justify-between items-end border-b border-gray-300 pb-2 mb-2 group-hover:border-purple-600 transition-colors">
          <p className="text-xs text-gray-400 font-bold">ABOUT</p>
          <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-purple-600"/>
        </div>
        <div className="text-left">
          <span className="text-2xl font-bold block mb-1 group-hover:text-purple-600 transition-colors">Our Story</span>
          <span className="text-sm text-gray-500">2000 - 2025</span>
        </div>
      </div>
    </div>
    <div className="mt-20 flex gap-6 text-gray-400"><Instagram size={20} className="hover:text-black cursor-pointer"/><Mail size={20} className="hover:text-black cursor-pointer"/></div>
  </div>
);

// Q: Carousel
const DesignQ = () => {
  const [slide, setSlide] = useState(0);
  const slides = [
    { title: COMMON_DATA.nextConcert.title, sub: "Next Concert", type: "concert" },
    { title: "団員募集中", sub: "Join Our Crew", type: "recruit" },
    { title: "楽団紹介", sub: "About Us", type: "about" }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl aspect-[16/9] md:aspect-[21/9] bg-gray-800 rounded-3xl overflow-hidden shadow-2xl">
        <HeroImage className={`absolute inset-0 opacity-60 transition-transform duration-1000 ${slide === 0 ? 'scale-100' : 'scale-110'}`} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-24">
          <div key={slide} className="animate-in slide-in-from-bottom duration-500">
            <span className="text-purple-400 font-bold tracking-widest text-sm mb-4 block uppercase">{slides[slide].sub}</span>
            <h2 className="text-4xl md:text-7xl font-bold mb-8 leading-tight max-w-3xl">{slides[slide].title}</h2>
            <Button className="bg-white text-black border-none hover:bg-purple-50">Check Details</Button>
          </div>
        </div>
        <div className="absolute bottom-8 right-12 flex gap-4">
          <button onClick={() => setSlide((s) => (s - 1 + slides.length) % slides.length)} className="p-4 bg-white/10 rounded-full hover:bg-white/20 backdrop-blur transition-colors"><ChevronDown className="rotate-90" /></button>
          <button onClick={() => setSlide((s) => (s + 1) % slides.length)} className="p-4 bg-white/10 rounded-full hover:bg-white/20 backdrop-blur transition-colors"><ChevronRight /></button>
        </div>
        <div className="absolute bottom-8 left-12 flex gap-3">
          {slides.map((_, i) => (<div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === slide ? 'w-12 bg-white' : 'w-4 bg-white/30'}`}></div>))}
        </div>
      </div>
    </div>
  );
};

// R: Tabs
const DesignR = () => {
  const [activeTab, setActiveTab] = useState('concert');

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 md:p-12 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px] flex flex-col">
        <div className="relative h-48 bg-gray-900 shrink-0">
          <HeroImage className="opacity-60" />
          <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/60 to-transparent w-full">
            <h1 className="text-3xl font-bold text-white">{COMMON_DATA.orchestraName}</h1>
          </div>
        </div>
        <div className="flex border-b border-gray-200">
          {[{id: 'concert', label: 'Concert', icon: Music}, {id: 'recruit', label: 'Recruit', icon: Users}, {id: 'about', label: 'About', icon: Info}, {id: 'contact', label: 'Contact', icon: Mail}].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 py-4 text-center font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === tab.id ? 'border-b-4 border-purple-600 text-purple-600 bg-purple-50' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}>
              <tab.icon size={18} /> <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>
        <div className="p-8 md:p-12 flex-1 bg-gray-50/50">
          {activeTab === 'concert' && (
            <div className="animate-in fade-in zoom-in duration-300">
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">NEXT EVENT</span>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">{COMMON_DATA.nextConcert.title}</h2>
              <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                  <div className="flex items-center gap-3 text-slate-600"><Calendar className="text-purple-500"/> {COMMON_DATA.nextConcert.fullDate}</div>
                  <div className="flex items-center gap-3 text-slate-600"><MapPin className="text-purple-500"/> {COMMON_DATA.nextConcert.place}</div>
                  <div className="flex items-center gap-3 text-slate-600"><Clock className="text-purple-500"/> {COMMON_DATA.nextConcert.time}</div>
                  <div className="flex items-center gap-3 text-slate-600"><Ticket className="text-purple-500"/> {COMMON_DATA.nextConcert.fee}</div>
                </div>
              </div>
              <Button>詳細ページへ</Button>
            </div>
          )}
          {activeTab === 'recruit' && (
            <div className="animate-in fade-in zoom-in duration-300">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Join Our Team</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">私たちと一緒に音楽を作りませんか？<br/>WindCrewOrchestraでは、全パートで新しい仲間を募集しています。<br/>見学は随時受け付けておりますので、お気軽にご連絡ください。</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {['Flute', 'Clarinet', 'Sax', 'Trumpet', 'Horn', 'Trombone', 'Tuba', 'Perc'].map(inst => (<div key={inst} className="bg-white py-2 px-4 rounded border text-center text-sm font-bold text-slate-600">{inst}</div>))}
              </div>
              <Button>募集要項を見る</Button>
            </div>
          )}
          {(activeTab === 'about' || activeTab === 'contact') && (
             <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center justify-center h-full text-slate-400">
               <Info size={48} className="mb-4 opacity-50"/>
               <p>Content for {activeTab} goes here...</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

// S: Split Screen
const DesignS = () => (
  <div className="min-h-screen flex flex-col md:flex-row font-sans">
    <div className="md:w-1/2 relative min-h-[300px] md:h-screen md:sticky md:top-0">
      <HeroImage className="absolute inset-0 h-full" />
      <div className="absolute inset-0 bg-purple-900/40 flex items-center justify-center">
        <div className="text-center text-white p-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-widest mb-4">{COMMON_DATA.orchestraName}</h1>
          <p className="text-lg opacity-80">Tokyo Adachi Wind Orchestra</p>
        </div>
      </div>
    </div>
    <div className="md:w-1/2 bg-white">
      <div className="p-12 md:p-24 flex flex-col justify-center min-h-screen">
        <div className="mb-16">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-2 block">Upcoming Concert</span>
          <h2 className="text-3xl font-bold mb-4 text-slate-900">{COMMON_DATA.nextConcert.title}</h2>
          <p className="text-slate-600 mb-6">{COMMON_DATA.nextConcert.fullDate} <br/> {COMMON_DATA.nextConcert.place}</p>
          <a href="#" className="inline-flex items-center gap-2 text-purple-600 font-bold hover:underline">詳細を見る <ArrowRight size={16}/></a>
        </div>
        <nav className="space-y-8">
          <a href="#" className="block group border-l-4 border-transparent hover:border-purple-600 pl-4 transition-all"><h3 className="text-2xl font-bold mb-1 group-hover:text-purple-600 text-slate-800">About Us</h3><p className="text-sm text-slate-500">楽団について・歴史</p></a>
          <a href="#" className="block group border-l-4 border-transparent hover:border-purple-600 pl-4 transition-all"><h3 className="text-2xl font-bold mb-1 group-hover:text-purple-600 text-slate-800">Recruit</h3><p className="text-sm text-slate-500">団員募集・見学申し込み</p></a>
          <a href="#" className="block group border-l-4 border-transparent hover:border-purple-600 pl-4 transition-all"><h3 className="text-2xl font-bold mb-1 group-hover:text-purple-600 text-slate-800">Concert Archive</h3><p className="text-sm text-slate-500">過去の演奏会記録</p></a>
          <a href="#" className="block group border-l-4 border-transparent hover:border-purple-600 pl-4 transition-all"><h3 className="text-2xl font-bold mb-1 group-hover:text-purple-600 text-slate-800">Contact</h3><p className="text-sm text-slate-500">お問い合わせ</p></a>
        </nav>
        <div className="mt-20 flex gap-4 text-slate-400"><Instagram className="hover:text-purple-600 cursor-pointer"/><Mail className="hover:text-purple-600 cursor-pointer"/></div>
      </div>
    </div>
  </div>
);

// T: FAQ Accordion
const DesignT = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = [
    { q: "次の演奏会はいつですか？", a: <div className="bg-purple-50 p-6 rounded-lg mt-4 border border-purple-100"><h3 className="font-bold text-xl text-purple-900 mb-2">{COMMON_DATA.nextConcert.title}</h3><p className="mb-4">{COMMON_DATA.nextConcert.fullDate} @ {COMMON_DATA.nextConcert.place}</p><Button>詳細を見る</Button></div>},
    { q: "どんな楽団ですか？", a: <div className="p-4 text-gray-600 leading-relaxed"><p className="mb-4">2000年に結成された、足立区を中心に活動する社会人吹奏楽団です。</p><a href="#" className="text-purple-600 font-bold hover:underline">楽団紹介ページへ</a></div> },
    { q: "入団するにはどうすればいいですか？", a: <div className="p-4 text-gray-600"><p className="mb-4">全パートで団員を募集しています！まずは見学にお越しください。</p><div className="flex gap-4"><Button primary={false} className="py-2 px-4 text-sm">募集要項を見る</Button></div></div> },
    { q: "お問い合わせ先は？", a: <div className="p-4"><p className="mb-4">フォームより受け付けております。</p><a href="#" className="flex items-center gap-2 text-purple-600 font-bold"><Mail size={20}/> お問い合わせフォーム</a></div> }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <div className="relative h-[400px]">
         <HeroImage className="absolute inset-0" overlay />
         <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Questions?</h1>
            <p className="text-xl opacity-90">WindCrewOrchestraについて知りたいことをタップしてください</p>
         </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 -mt-16 relative z-20 pb-20">
         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {items.map((item, idx) => (
              <div key={idx} className="border-b border-gray-100 last:border-none">
                 <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className={`w-full text-left p-6 md:p-8 flex justify-between items-center transition-colors hover:bg-gray-50 ${openIndex === idx ? 'bg-gray-50' : ''}`}>
                    <span className={`text-lg md:text-2xl font-bold flex gap-4 ${openIndex === idx ? 'text-purple-600' : 'text-gray-700'}`}><span className="text-purple-300">Q.</span> {item.q}</span>
                    {openIndex === idx ? <ChevronUp className="text-purple-600"/> : <ChevronDown className="text-gray-400"/>}
                 </button>
                 <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-8 pb-8 md:px-12 md:pb-10 pl-14 md:pl-16">{item.a}</div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

// U: Map/Radial
const DesignU = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 overflow-hidden relative font-sans">
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute border border-slate-700 rounded-full w-[300px] h-[300px] md:w-[600px] md:h-[600px] animate-spin-slow" style={{animationDuration: '60s'}}></div>
      <div className="absolute border border-slate-700 rounded-full w-[200px] h-[200px] md:w-[400px] md:h-[400px] animate-spin-slow" style={{animationDuration: '40s', animationDirection: 'reverse'}}></div>
      <div className="relative w-48 h-48 md:w-64 md:h-64 z-20 group cursor-pointer">
        <div className="absolute inset-0 rounded-full border-4 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.4)] animate-pulse"></div>
        <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-slate-800 bg-slate-900">
          <HeroImage className="opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black/40 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h1 className="text-white font-bold text-lg md:text-xl">{COMMON_DATA.orchestraName}</h1>
          <p className="text-purple-300 text-xs mt-1">Tokyo Adachi Base</p>
        </div>
      </div>
      <div className="absolute top-[15%] right-[20%] md:top-[15%] md:right-[25%] flex flex-col items-center group cursor-pointer z-30 hover:scale-110 transition-transform">
        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white mb-2 shadow-[0_0_20px_rgba(147,51,234,0.6)] border-4 border-slate-900"><Music size={24} /></div>
        <div className="bg-slate-800 text-white px-3 py-1 rounded text-xs font-bold border border-slate-600">Next Concert</div>
      </div>
      <div className="absolute top-[20%] left-[20%] md:top-[20%] md:left-[25%] flex flex-col items-center group cursor-pointer z-30 hover:scale-110 transition-transform">
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-slate-900 mb-2 shadow-[0_0_20px_rgba(255,255,255,0.4)] border-4 border-slate-900"><Users size={24} /></div>
        <div className="bg-slate-800 text-white px-3 py-1 rounded text-xs font-bold border border-slate-600">Recruit</div>
      </div>
      <div className="absolute bottom-[20%] left-[20%] md:bottom-[20%] md:left-[25%] flex flex-col items-center group cursor-pointer z-30 hover:scale-110 transition-transform">
        <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-white mb-2 border-2 border-slate-500"><Info size={20} /></div>
        <span className="text-slate-400 text-xs font-bold">About Us</span>
      </div>
      <div className="absolute bottom-[15%] right-[20%] md:bottom-[15%] md:right-[25%] flex flex-col items-center group cursor-pointer z-30 hover:scale-110 transition-transform">
        <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-white mb-2 border-2 border-slate-500"><Mail size={20} /></div>
        <span className="text-slate-400 text-xs font-bold">Contact</span>
      </div>
    </div>
  );
}

// V: Newspaper
const DesignV = () => (
  <div className="min-h-screen bg-[#F4F1EA] text-[#2F2F2F] font-serif p-4 md:p-8">
    <div className="max-w-6xl mx-auto bg-white shadow-2xl p-8 md:p-12 border-t-8 border-[#2F2F2F] relative">
       <header className="border-b-4 border-[#2F2F2F] pb-4 mb-8 text-center">
         <div className="flex justify-between items-center text-xs font-sans text-gray-500 mb-2 uppercase tracking-widest border-b border-gray-300 pb-1">
           <span>Vol. 25</span><span>Adachi, Tokyo</span><span>Est. 2000</span>
         </div>
         <h1 className="text-5xl md:text-8xl font-black font-serif tracking-tighter mb-2">The Wind Crew</h1>
         <p className="italic font-serif text-lg">"Harmony in the Community"</p>
       </header>
       <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
         <div className="md:col-span-8">
            <div className="mb-8">
              <HeroImage className="w-full h-[400px] object-cover grayscale contrast-125 mb-4 border border-gray-300 p-1" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{COMMON_DATA.nextConcert.title}</h2>
              <div className="flex gap-4 font-sans text-sm font-bold border-y-2 border-gray-200 py-3 mb-6">
                 <span><Calendar className="inline w-4 h-4 mr-1"/> {COMMON_DATA.nextConcert.fullDate}</span>
                 <span className="ml-auto text-red-700">FREE ADMISSION</span>
              </div>
              <div className="columns-1 md:columns-2 gap-8 text-justify leading-relaxed text-gray-800">
                <p className="mb-4"><span className="float-left text-5xl font-black mr-2 mt-[-10px]">W</span>e are thrilled to announce our 25th regular concert.</p>
                <p>Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
              <button className="mt-8 bg-[#2F2F2F] text-white font-sans px-8 py-3 font-bold hover:bg-gray-800 transition-colors uppercase tracking-wider text-sm">Read Full Details</button>
            </div>
         </div>
         <div className="md:col-span-4 flex flex-col gap-8 border-l border-gray-200 md:pl-8">
            <div className="border-4 border-double border-gray-800 p-6 text-center bg-gray-50">
               <h3 className="text-2xl font-bold mb-2 uppercase">We Want You!</h3>
               <Users size={48} className="mx-auto mb-4"/>
               <a href="#" className="underline font-bold font-sans hover:text-red-700">Apply Now</a>
            </div>
            <div>
               <h3 className="text-xl font-bold border-b-2 border-black mb-4 pb-1 uppercase">Index</h3>
               <ul className="space-y-3 font-sans font-bold">
                 {COMMON_DATA.links.map(link => (
                   <li key={link.id} className="flex justify-between items-center group cursor-pointer hover:bg-gray-100 p-2 -mx-2 transition-colors">
                     <span>{link.label}</span><span className="text-xs text-gray-400 group-hover:text-black">p.0{link.id.length}</span>
                   </li>
                 ))}
               </ul>
            </div>
         </div>
       </div>
    </div>
  </div>
);

// W: Pinterest
const DesignW = () => (
  <div className="min-h-screen bg-gray-100 font-sans p-4">
    <header className="text-center py-10">
      <h1 className="text-3xl font-bold mb-2">WindCrewOrchestra</h1>
      <p className="text-gray-500 text-sm">Official Gallery</p>
    </header>
    <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      <div className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-lg group hover:-translate-y-1 transition-transform duration-300">
        <div className="h-[400px] relative">
          <HeroImage className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 p-6 text-white">
            <span className="bg-purple-600 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">NEXT LIVE</span>
            <h2 className="text-2xl font-bold leading-tight mb-2">{COMMON_DATA.nextConcert.title}</h2>
            <p className="text-sm opacity-90">{COMMON_DATA.nextConcert.fullDate}</p>
          </div>
        </div>
      </div>
      <div className="break-inside-avoid bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
         <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4"><Info size={32} /></div>
         <h3 className="text-xl font-bold mb-2">楽団について</h3>
         <button className="text-purple-600 font-bold text-sm hover:underline">もっと詳しく</button>
      </div>
      <div className="break-inside-avoid bg-purple-900 text-white rounded-2xl p-8 shadow-lg text-center relative overflow-hidden group">
         <div className="relative z-10">
           <Users size={48} className="mx-auto mb-4 text-purple-300" />
           <h3 className="text-2xl font-bold mb-2">団員募集中！</h3>
           <button className="bg-white text-purple-900 px-6 py-2 rounded-full font-bold text-sm hover:bg-purple-100 transition-colors">募集要項を見る</button>
         </div>
      </div>
      <div className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <span className="font-bold text-sm flex items-center gap-2"><Instagram size={16}/> Instagram</span>
        </div>
        <div className="grid grid-cols-2 gap-1 p-1">
           <div className="aspect-square bg-gray-200"><HeroImage /></div>
           <div className="aspect-square bg-gray-200"><HeroImage className="grayscale" /></div>
        </div>
      </div>
    </div>
  </div>
);

// X: Ticket
const DesignX = () => (
  <div className="min-h-screen bg-[#f0f0f4] font-sans p-4 md:p-12 flex flex-col items-center justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
    <h1 className="text-3xl font-bold text-gray-800 mb-8 tracking-wider uppercase text-center">{COMMON_DATA.orchestraName}</h1>
    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row mb-12 relative transform rotate-1 hover:rotate-0 transition-transform duration-500">
      <div className="w-full md:w-2/3 relative h-64 md:h-auto border-b-2 md:border-b-0 md:border-r-2 border-dashed border-gray-300">
        <HeroImage className="absolute inset-0 h-full" />
        <div className="absolute inset-0 bg-purple-900/30 mix-blend-multiply"></div>
        <div className="absolute bottom-6 left-6 text-white z-10">
          <span className="bg-purple-600 px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-2 inline-block">Admit One</span>
          <h2 className="text-3xl md:text-5xl font-black italic">{COMMON_DATA.nextConcert.title}</h2>
        </div>
        <div className="hidden md:block absolute -top-4 -right-4 w-8 h-8 bg-[#f0f0f4] rounded-full z-20"></div>
        <div className="hidden md:block absolute -bottom-4 -right-4 w-8 h-8 bg-[#f0f0f4] rounded-full z-20"></div>
      </div>
      <div className="w-full md:w-1/3 p-8 bg-white flex flex-col justify-between relative">
        <div className="space-y-6">
          <div className="text-center md:text-left"><p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">DATE</p><p className="text-2xl font-mono text-gray-800">{COMMON_DATA.nextConcert.fullDate}</p></div>
          <div className="text-center md:text-left"><p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">VENUE</p><p className="text-lg font-bold text-gray-800">{COMMON_DATA.nextConcert.place}</p></div>
        </div>
        <div className="mt-8 pt-8 border-t-2 border-dashed border-gray-200">
          <img src="/api/placeholder/150/50" alt="Barcode" className="h-12 w-full object-cover opacity-50 grayscale" />
        </div>
        <div className="md:hidden absolute -left-4 -bottom-4 w-8 h-8 bg-[#f0f0f4] rounded-full z-20"></div>
        <div className="md:hidden absolute -right-4 -bottom-4 w-8 h-8 bg-[#f0f0f4] rounded-full z-20"></div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
      {COMMON_DATA.links.map((link) => (
        <div key={link.id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500 relative overflow-hidden group hover:-translate-y-1 transition-transform cursor-pointer">
           <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity"><link.icon size={60} /></div>
           <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><link.icon size={16} className="text-purple-500" /> {link.label}</h3>
           <div className="mt-4 flex justify-end"><ArrowRight size={16} className="text-purple-400" /></div>
        </div>
      ))}
    </div>
  </div>
);

// Y: Sheet Music
const DesignY = () => (
  <div className="min-h-screen bg-[#FFFDF0] relative overflow-hidden font-serif">
    <div className="absolute inset-0 pointer-events-none opacity-20 flex flex-col justify-center gap-16">
      {[...Array(5)].map((_, i) => (<div key={i} className="w-full flex flex-col gap-2">{[...Array(5)].map((_, j) => <div key={j} className="w-full h-[1px] bg-black"></div>)}</div>))}
    </div>
    <div className="relative z-10 p-4 md:p-12 max-w-7xl mx-auto h-full flex flex-col justify-center">
      <div className="text-center mb-16 relative">
        <h1 className="text-5xl md:text-7xl font-bold font-serif mb-2 italic">WindCrewOrchestra</h1>
        <p className="text-xl italic text-gray-600">Con Moto - With Motion</p>
      </div>
      <div className="relative h-[600px]">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl text-center group cursor-pointer hover:-translate-y-4 transition-transform duration-500">
           <div className="w-4 h-32 bg-black mx-auto mb-[-20px] relative"><div className="absolute top-0 right-0 w-16 h-8 bg-black rounded-tr-3xl skew-y-12"></div></div>
           <div className="bg-black text-white p-8 rounded-[4rem] rounded-tl-none relative shadow-xl overflow-hidden">
              <HeroImage className="absolute inset-0 opacity-40 mix-blend-overlay" />
              <div className="relative z-10">
                <span className="text-purple-300 italic text-xl font-bold">ff (Fortissimo)</span>
                <h2 className="text-3xl md:text-4xl font-bold my-4">{COMMON_DATA.nextConcert.title}</h2>
                <Button primary={false} className="mt-6 bg-white text-black border-none hover:bg-gray-200">詳細を見る</Button>
              </div>
           </div>
        </div>
        <div className="absolute bottom-0 w-full flex justify-between md:px-20 items-end">
          {COMMON_DATA.links.slice(0, 3).map((link, idx) => (
            <div key={link.id} className="flex flex-col items-center group cursor-pointer hover:-translate-y-2 transition-transform" style={{ marginBottom: `${idx * 40}px` }}>
              <div className="w-2 h-24 bg-black mb-[-10px]"></div>
              <div className="w-20 h-16 bg-black rounded-[50%] rotate-[-20deg] flex items-center justify-center text-white relative z-10 group-hover:bg-purple-600 transition-colors"><link.icon size={24} /></div>
              <span className="mt-4 font-bold font-serif text-lg bg-white px-2 py-1 rounded border border-gray-200 shadow-sm">{link.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Z: Dashboard
const DesignZ = () => (
  <div className="min-h-screen bg-slate-100 font-sans flex">
    {/* Sidebar */}
    <div className="w-20 md:w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-6 flex items-center gap-3 border-b border-slate-100">
        <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center text-white font-bold">W</div>
        <span className="font-bold text-slate-800 hidden md:inline">WindAdmin</span>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <div className="flex items-center gap-3 p-3 bg-purple-50 text-purple-700 rounded-lg font-bold cursor-pointer">
          <LayoutTemplate size={20}/> <span className="hidden md:inline">Overview</span>
        </div>
        <div className="flex items-center gap-3 p-3 text-slate-500 hover:bg-slate-50 rounded-lg cursor-pointer">
          <Music size={20}/> <span className="hidden md:inline">Concerts</span>
        </div>
        <div className="flex items-center gap-3 p-3 text-slate-500 hover:bg-slate-50 rounded-lg cursor-pointer">
          <Users size={20}/> <span className="hidden md:inline">Members</span>
        </div>
        <div className="flex items-center gap-3 p-3 text-slate-500 hover:bg-slate-50 rounded-lg cursor-pointer">
          <Settings size={20}/> <span className="hidden md:inline">Settings</span>
        </div>
      </nav>
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200"></div>
          <div className="hidden md:block">
            <p className="text-sm font-bold text-slate-700">Guest User</p>
            <p className="text-xs text-slate-400">View Only</p>
          </div>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500">Welcome to WindCrewOrchestra Portal</p>
        </div>
        <div className="flex gap-4">
          <button className="p-2 bg-white rounded-full shadow-sm text-slate-400"><Search size={20}/></button>
          <button className="p-2 bg-white rounded-full shadow-sm text-slate-400"><Bell size={20}/></button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Card: Concert */}
        <div className="md:col-span-8 bg-white rounded-2xl p-6 shadow-sm relative overflow-hidden group cursor-pointer">
          <div className="absolute top-0 right-0 p-6 z-10">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Activity size={14}/> On Schedule</span>
          </div>
          <div className="flex items-start gap-6 relative z-10">
            <div className="w-24 h-24 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 shrink-0">
              <Calendar size={40} />
            </div>
            <div>
              <h2 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Next Event</h2>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">{COMMON_DATA.nextConcert.title}</h3>
              <p className="text-slate-600 flex items-center gap-2"><MapPin size={16}/> {COMMON_DATA.nextConcert.place}</p>
              <p className="text-slate-600 flex items-center gap-2"><Clock size={16}/> {COMMON_DATA.nextConcert.fullDate} {COMMON_DATA.nextConcert.time}</p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-100 flex gap-6">
             <div className="text-center">
               <p className="text-2xl font-bold text-slate-800">25th</p>
               <p className="text-xs text-slate-400">Regular Concert</p>
             </div>
             <div className="text-center">
               <p className="text-2xl font-bold text-slate-800">Free</p>
               <p className="text-xs text-slate-400">Entrance Fee</p>
             </div>
             <div className="flex-1 flex justify-end items-center">
               <Button className="py-2 text-sm">View Details</Button>
             </div>
          </div>
          {/* Background decoration */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-purple-50 rounded-full opacity-50"></div>
        </div>

        {/* Stats Card: Recruit */}
        <div className="md:col-span-4 bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between cursor-pointer hover:shadow-md transition-shadow">
           <div>
             <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Users size={24}/></div>
               <span className="text-slate-300"><MoreHorizontal/></span>
             </div>
             <h3 className="text-lg font-bold text-slate-700">Recruitment Status</h3>
             <p className="text-3xl font-bold text-slate-900 mt-2">Active</p>
             <p className="text-sm text-green-500 mt-1 flex items-center gap-1"><ArrowUpCircle size={14}/> All parts welcome</p>
           </div>
           
           <div className="space-y-3 mt-6">
             <div className="flex justify-between items-center text-sm">
               <span className="text-slate-500">Woodwinds</span>
               <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="w-[80%] h-full bg-blue-500 rounded-full"></div></div>
             </div>
             <div className="flex justify-between items-center text-sm">
               <span className="text-slate-500">Brass</span>
               <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="w-[60%] h-full bg-purple-500 rounded-full"></div></div>
             </div>
             <div className="flex justify-between items-center text-sm">
               <span className="text-slate-500">Percussion</span>
               <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="w-[40%] h-full bg-orange-500 rounded-full"></div></div>
             </div>
           </div>
        </div>

        {/* Bottom Cards */}
        <div className="md:col-span-4 bg-slate-800 text-white rounded-2xl p-6 shadow-sm cursor-pointer group">
           <h3 className="font-bold text-slate-300 mb-4">About Us</h3>
           <p className="text-sm text-slate-400 mb-6 line-clamp-3">
             WindCrewOrchestra was established in 2000 in Adachi, Tokyo. We are a community of music lovers...
           </p>
           <div className="flex items-center gap-2 text-sm font-bold group-hover:text-purple-300 transition-colors">
             Read History <ArrowRight size={16}/>
           </div>
        </div>

        <div className="md:col-span-4 bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
           <h3 className="font-bold text-slate-700 mb-4">Past Performance</h3>
           <div className="h-32 bg-slate-100 rounded-xl flex items-end p-2 gap-1">
              {[40, 60, 45, 70, 50, 80, 65].map((h, i) => (
                <div key={i} className="flex-1 bg-purple-200 hover:bg-purple-400 transition-colors rounded-t-sm" style={{height: `${h}%`}}></div>
              ))}
           </div>
           <p className="text-center text-xs text-slate-400 mt-2">Audience Growth (2018-2024)</p>
        </div>

        <div className="md:col-span-4 bg-gradient-to-br from-pink-500 to-orange-400 text-white rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center cursor-pointer hover:scale-[1.02] transition-transform">
           <Mail size={40} className="mb-4" />
           <h3 className="text-xl font-bold mb-1">Contact Us</h3>
           <p className="text-white/80 text-sm">Have any questions?</p>
        </div>
      </div>
    </div>
  </div>
);

// AA: Chat Bubbles
const DesignAA = () => (
  <div className="min-h-screen bg-[#e5ddd5] font-sans p-4 flex justify-center items-center">
    <div className="w-full max-w-md bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] rounded-xl shadow-2xl overflow-hidden flex flex-col h-[700px]">
      {/* Chat Header */}
      <div className="bg-[#075e54] p-4 flex items-center gap-4 text-white shadow-md">
        <ChevronDown className="rotate-90"/>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#075e54] font-bold">W</div>
        <div className="flex-1">
          <h2 className="font-bold">WindCrewOrchestra</h2>
          <p className="text-xs opacity-80">Online</p>
        </div>
        <MoreHorizontal />
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        <div className="flex justify-center"><span className="bg-[#e1f3fb] text-gray-500 text-xs px-2 py-1 rounded shadow-sm">Today</span></div>
        
        {/* Msg 1 */}
        <div className="flex items-start gap-2">
          <div className="bg-white p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-sm max-w-[80%]">
            <p className="text-sm">こんにちは！WindCrewOrchestraです👋<br/>本日はどのようなご用件でしょうか？</p>
            <span className="text-[10px] text-gray-400 float-right mt-1">10:00</span>
          </div>
        </div>

        {/* Msg 2 (Rich) */}
        <div className="flex items-start gap-2">
          <div className="bg-white p-2 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-sm max-w-[85%]">
            <div className="rounded overflow-hidden mb-2 relative">
              <HeroImage className="h-32" />
              <div className="absolute bottom-0 w-full bg-black/50 text-white text-xs p-1">次回演奏会のお知らせ</div>
            </div>
            <p className="text-sm font-bold">{COMMON_DATA.nextConcert.title}</p>
            <p className="text-xs text-gray-600 mb-2">{COMMON_DATA.nextConcert.fullDate}</p>
            <button className="w-full bg-blue-50 text-blue-600 text-sm py-2 rounded font-bold">詳細を見る</button>
            <span className="text-[10px] text-gray-400 float-right mt-1">10:01</span>
          </div>
        </div>

        {/* User Msg */}
        <div className="flex justify-end">
          <div className="bg-[#dcf8c6] p-3 rounded-tl-xl rounded-bl-xl rounded-br-xl shadow-sm max-w-[80%]">
            <p className="text-sm">団員募集について知りたいです！</p>
            <span className="text-[10px] text-green-800/60 float-right mt-1">10:05</span>
          </div>
        </div>

        {/* Reply */}
        <div className="flex items-start gap-2">
          <div className="bg-white p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-sm max-w-[80%]">
            <p className="text-sm">ありがとうございます！全パート募集中です✨<br/>詳しくはこちらをご覧ください。</p>
            <div className="mt-2 flex gap-2">
              <button className="flex-1 bg-gray-100 py-2 rounded text-xs font-bold text-gray-700 border border-gray-200">募集要項</button>
              <button className="flex-1 bg-gray-100 py-2 rounded text-xs font-bold text-gray-700 border border-gray-200">見学申込</button>
            </div>
            <span className="text-[10px] text-gray-400 float-right mt-1">10:05</span>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-[#f0f0f0] p-2 flex items-center gap-2">
        <Camera className="text-gray-500" />
        <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-400">Message...</div>
        <div className="w-10 h-10 bg-[#075e54] rounded-full flex items-center justify-center text-white"><Send size={18}/></div>
      </div>
    </div>
  </div>
);

// AB: Subway Map (Already Implemented)
const DesignAB = () => (
  <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4 md:p-12 overflow-hidden relative">
    <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px]"></div>
    <div className="w-full max-w-5xl bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-8 md:p-16 relative border-4 border-gray-100">
       <h1 className="text-3xl font-bold mb-12 text-center text-gray-800 flex items-center justify-center gap-3"><Train size={32} className="text-purple-600" /> WindCrew Metro Map</h1>
       <div className="relative h-[400px] flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
             <path d="M100,200 C200,200 250,100 400,100 S600,100 800,200" stroke="#8B5CF6" strokeWidth="12" fill="none" strokeLinecap="round" />
             <path d="M100,200 C200,200 250,100 400,100 S600,100 800,200" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
             <path d="M400,100 L400,300" stroke="#F59E0B" strokeWidth="8" fill="none" strokeLinecap="round" />
          </svg>
          <div className="absolute left-[10%] top-[50%] transform -translate-y-1/2 -translate-x-1/2 flex flex-col items-center group cursor-pointer hover:scale-110 transition-transform" style={{marginTop: '-20px'}}>
             <div className="w-8 h-8 bg-white border-4 border-purple-600 rounded-full mb-2 z-10 shadow-lg group-hover:bg-purple-600 transition-colors"></div>
             <div className="bg-white px-3 py-1 rounded shadow text-sm font-bold whitespace-nowrap">楽団紹介駅</div>
          </div>
          <div className="absolute left-[40%] top-[25%] transform -translate-y-1/2 -translate-x-1/2 flex flex-col items-center group cursor-pointer z-20 hover:scale-105 transition-transform">
             <div className="bg-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold mb-2 shadow animate-bounce">Main Station</div>
             <div className="w-48 bg-white p-4 rounded-xl shadow-xl border-4 border-purple-600 text-center relative">
                <div className="w-full h-24 bg-gray-200 mb-2 rounded overflow-hidden"><HeroImage /></div>
                <h3 className="font-bold text-lg leading-tight">{COMMON_DATA.nextConcert.title}</h3>
                <div className="text-xs text-gray-500 mt-1">次回演奏会</div>
             </div>
          </div>
          <div className="absolute left-[80%] top-[50%] transform -translate-y-1/2 -translate-x-1/2 flex flex-col items-center group cursor-pointer hover:scale-110 transition-transform" style={{marginTop: '-20px'}}>
             <div className="w-8 h-8 bg-white border-4 border-purple-600 rounded-full mb-2 z-10 shadow-lg group-hover:bg-purple-600 transition-colors"></div>
             <div className="bg-white px-3 py-1 rounded shadow text-sm font-bold whitespace-nowrap">団員募集駅</div>
          </div>
          <div className="absolute left-[40%] top-[75%] transform -translate-y-1/2 -translate-x-1/2 flex flex-col items-center group cursor-pointer hover:scale-110 transition-transform">
             <div className="w-6 h-6 bg-white border-4 border-yellow-500 rounded-full mb-2 z-10 shadow-lg group-hover:bg-yellow-500 transition-colors"></div>
             <div className="bg-white px-3 py-1 rounded shadow text-sm font-bold whitespace-nowrap text-gray-500">アーカイブ</div>
          </div>
       </div>
    </div>
  </div>
);

// AC: Calendar Focus (Refined)
const DesignAC = () => (
  <div className="min-h-screen bg-slate-50 font-sans p-8 flex flex-col items-center justify-center">
    <div className="bg-white shadow-2xl rounded-[3rem] overflow-hidden max-w-5xl w-full flex flex-col md:flex-row border border-slate-200">
      {/* Calendar Side */}
      <div className="md:w-5/12 bg-purple-700 text-white p-12 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply opacity-50 -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <span className="text-sm font-bold opacity-60 uppercase tracking-widest">Mark Your Calendar</span>
          <div className="mt-8">
            <span className="text-8xl font-bold block leading-none">21</span>
            <span className="text-3xl font-light">March 2025</span>
          </div>
        </div>
        <div className="relative z-10 mt-12">
          <h2 className="text-2xl font-bold mb-2">{COMMON_DATA.nextConcert.title}</h2>
          <p className="flex items-center gap-2 opacity-80"><MapPin size={16}/> {COMMON_DATA.nextConcert.place}</p>
          <Button className="mt-6 bg-white text-purple-700 border-none w-full">Save to Calendar</Button>
        </div>
      </div>

      {/* List Side */}
      <div className="md:w-7/12 p-12 bg-white">
        <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
          <Calendar className="text-purple-600"/> Upcoming Schedule
        </h3>
        
        <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
          <div className="flex gap-6 relative">
            <div className="w-10 h-10 rounded-full bg-purple-100 border-4 border-white z-10 flex items-center justify-center text-xs font-bold text-purple-600 shadow-sm shrink-0">FEB</div>
            <div>
              <span className="text-xs font-bold text-slate-400">Feb 15, 2025</span>
              <h4 className="font-bold text-slate-800">公開リハーサル</h4>
              <p className="text-sm text-slate-500 mt-1">見学自由。普段の練習風景をご覧いただけます。</p>
            </div>
          </div>
          
          <div className="flex gap-6 relative">
            <div className="w-10 h-10 rounded-full bg-purple-600 border-4 border-white z-10 flex items-center justify-center text-xs font-bold text-white shadow-md ring-4 ring-purple-50 shrink-0">MAR</div>
            <div className="bg-purple-50 p-4 rounded-lg -mt-2 w-full">
              <span className="text-xs font-bold text-purple-600">Mar 21, 2025</span>
              <h4 className="font-bold text-purple-900">第25回 定期演奏会</h4>
              <p className="text-sm text-purple-700 mt-1">入場無料。ぜひお越しください。</p>
            </div>
          </div>

          <div className="flex gap-6 relative opacity-60">
            <div className="w-10 h-10 rounded-full bg-slate-100 border-4 border-white z-10 flex items-center justify-center text-xs font-bold text-slate-400 shadow-sm shrink-0">APR</div>
            <div>
              <span className="text-xs font-bold text-slate-400">Apr 01, 2025</span>
              <h4 className="font-bold text-slate-800">新歓イベント</h4>
              <p className="text-sm text-slate-500 mt-1">入団希望者向けの説明会と懇親会。</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-3 gap-4 text-center">
          <a href="#" className="flex flex-col items-center gap-1 text-slate-500 hover:text-purple-600"><Info size={20}/><span className="text-xs font-bold">About</span></a>
          <a href="#" className="flex flex-col items-center gap-1 text-slate-500 hover:text-purple-600"><Users size={20}/><span className="text-xs font-bold">Recruit</span></a>
          <a href="#" className="flex flex-col items-center gap-1 text-slate-500 hover:text-purple-600"><Mail size={20}/><span className="text-xs font-bold">Contact</span></a>
        </div>
      </div>
    </div>
  </div>
);

// AD: Before/After (Refined)
const DesignAD = () => (
  <div className="min-h-screen flex flex-col md:flex-row font-sans">
    {/* Before: Audience */}
    <div className="md:w-1/2 bg-slate-200 flex flex-col items-center justify-center relative overflow-hidden group border-b md:border-b-0 md:border-r border-white">
      <div className="absolute inset-0 bg-slate-600 mix-blend-multiply opacity-40 group-hover:opacity-30 transition-opacity"></div>
      <HeroImage className="absolute inset-0 opacity-50 grayscale" />
      <div className="z-10 text-center p-8 transition-transform group-hover:scale-105">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">LISTEN</h2>
        <p className="text-slate-100 mb-8 text-lg font-light tracking-wide">感動を客席で味わう</p>
        <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 w-full md:w-auto">演奏会情報へ</Button>
      </div>
    </div>

    {/* Center Divider */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-4 shadow-xl">
      <ArrowRight className="text-purple-600 hidden md:block" size={32} />
      <ArrowRight className="text-purple-600 md:hidden rotate-90" size={32} />
    </div>

    {/* After: Player */}
    <div className="md:w-1/2 bg-purple-900 flex flex-col items-center justify-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-purple-800 mix-blend-multiply opacity-60 group-hover:opacity-50 transition-opacity"></div>
      <HeroImage className="absolute inset-0 opacity-60" />
      <div className="z-10 text-center p-8 transition-transform group-hover:scale-105">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">PLAY</h2>
        <p className="text-purple-100 mb-8 text-lg font-light tracking-wide">感動をステージで作る</p>
        <Button className="bg-white text-purple-900 border-none hover:bg-purple-100 w-full md:w-auto">団員募集へ</Button>
      </div>
    </div>
  </div>
);

// AE: Search Results (Already Implemented)
const DesignAE = () => (
  <div className="min-h-screen bg-white font-sans text-gray-800 p-4 max-w-4xl mx-auto">
    <div className="flex items-center gap-4 mb-6 border-b pb-4 sticky top-0 bg-white z-10 pt-4">
      <h1 className="text-xl font-bold"><span className="text-blue-500">W</span><span className="text-red-500">i</span><span className="text-yellow-500">n</span><span className="text-blue-500">d</span><span className="text-green-500">C</span><span className="text-red-500">rew</span></h1>
      <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600 shadow-inner flex items-center justify-between">
        <span>WindCrewOrchestra 評判</span>
        <Search size={16} className="text-blue-500"/>
      </div>
    </div>
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <p className="text-xs text-gray-400">約 250,000 件 (0.34 秒)</p>
      
      <div className="group cursor-pointer">
        <span className="text-xs text-slate-800 font-bold">広告 • windcrew.org/concert</span>
        <h2 className="text-xl text-blue-800 hover:underline cursor-pointer mb-1 font-medium">【入場無料】{COMMON_DATA.nextConcert.title}</h2>
        <p className="text-sm text-gray-600 mb-2">{COMMON_DATA.nextConcert.fullDate}開催。家族で楽しめる吹奏楽の祭典。全席自由。</p>
        <div className="flex gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><MapPin size={12}/> アクセス</span>
          <span className="flex items-center gap-1"><Ticket size={12}/> チケット情報</span>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6 group cursor-pointer">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-[10px] text-purple-700 font-bold">W</div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-800">Wind Crew Orchestra</span>
            <span className="text-[10px] text-gray-500">https://windcrew.org</span>
          </div>
        </div>
        <h2 className="text-xl text-blue-800 hover:underline cursor-pointer mb-1 font-medium">WindCrewOrchestra 公式ウェブサイト | 足立区の吹奏楽団</h2>
        <p className="text-sm text-gray-600 mb-4">
          2000年創団。東京都足立区を拠点に活動するアマチュア吹奏楽団です。「音楽を楽しむ」をモットーに、年2回の定期演奏会や依頼演奏を行っています。
        </p>
        <div className="ml-4 pl-4 border-l-2 border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><a href="#" className="text-blue-800 hover:underline text-lg block">団員募集</a><p className="text-xs text-gray-500">全パート募集中。ブランク歓迎...</p></div>
          <div><a href="#" className="text-blue-800 hover:underline text-lg block">活動紹介</a><p className="text-xs text-gray-500">指揮者紹介、練習場所について...</p></div>
          <div><a href="#" className="text-blue-800 hover:underline text-lg block">過去の演奏会</a><p className="text-xs text-gray-500">これまでの活動記録アーカイブ...</p></div>
          <div><a href="#" className="text-blue-800 hover:underline text-lg block">お問い合わせ</a><p className="text-xs text-gray-500">よくある質問、演奏依頼...</p></div>
        </div>
      </div>
    </div>
  </div>
);

// AF: Backstage / Onstage (Refined)
const DesignAF = () => {
  const [mode, setMode] = useState<'on' | 'off'>('on');

  return (
    <div className="min-h-screen font-sans relative transition-colors duration-500 overflow-hidden">
      {/* Toggle */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur rounded-full p-1 shadow-xl flex gap-2">
        <button 
          onClick={() => setMode('on')}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${mode === 'on' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          ON STAGE
        </button>
        <button 
          onClick={() => setMode('off')}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${mode === 'off' ? 'bg-slate-800 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          BACKSTAGE
        </button>
      </div>

      {/* ON STAGE VIEW */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${mode === 'on' ? 'opacity-100 z-20' : 'opacity-0 z-10 pointer-events-none'}`}>
        <div className="h-full w-full bg-white">
          <div className="h-3/4 relative">
            <HeroImage className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
            <div className="absolute bottom-0 w-full text-center pb-12">
              <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">THE STAGE</h1>
              <p className="text-xl text-purple-700 font-bold">{COMMON_DATA.nextConcert.title}</p>
            </div>
          </div>
          <div className="h-1/4 flex items-center justify-center">
            <Button>チケット情報を見る</Button>
          </div>
        </div>
      </div>

      {/* BACKSTAGE VIEW */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${mode === 'off' ? 'opacity-100 z-20' : 'opacity-0 z-10 pointer-events-none'}`}>
        <div className="h-full w-full bg-slate-900 text-slate-200">
          <div className="h-full flex flex-col items-center justify-center p-8 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            <h1 className="text-5xl font-black text-slate-700 mb-8 tracking-tighter uppercase">Behind The Scenes</h1>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl w-full">
              <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 text-center hover:bg-slate-700 transition-colors cursor-pointer">
                <Users size={48} className="mx-auto mb-4 text-slate-400"/>
                <h3 className="text-xl font-bold text-white mb-2">Practice</h3>
                <p className="text-sm text-slate-400">練習風景・団員の素顔</p>
              </div>
              <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 text-center hover:bg-slate-700 transition-colors cursor-pointer">
                <Settings size={48} className="mx-auto mb-4 text-slate-400"/>
                <h3 className="text-xl font-bold text-white mb-2">Join Us</h3>
                <p className="text-sm text-slate-400">団員募集・見学について</p>
              </div>
              <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 text-center hover:bg-slate-700 transition-colors cursor-pointer">
                <MessageCircle size={48} className="mx-auto mb-4 text-slate-400"/>
                <h3 className="text-xl font-bold text-white mb-2">Staff Only</h3>
                <p className="text-sm text-slate-400">団員専用ページ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// AG: Music Player (Already Implemented)
const DesignAG = () => (
  <div className="min-h-screen bg-gray-900 text-white font-sans flex items-center justify-center">
    <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 p-8">
      <div className="md:w-1/2">
        <div className="aspect-square bg-gray-800 rounded-lg shadow-2xl mb-8 relative overflow-hidden group">
          <HeroImage className="absolute inset-0" />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Play size={64} fill="white" /></div>
        </div>
      </div>
      <div className="md:w-1/2 flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-2">{COMMON_DATA.nextConcert.title}</h2>
        <p className="text-gray-400 text-xl mb-8">Wind Crew Orchestra</p>
        <div className="w-full bg-gray-700 h-1 rounded-full mb-2"><div className="w-1/3 bg-purple-500 h-1 rounded-full"></div></div>
        <div className="flex justify-between text-xs text-gray-500 mb-8"><span>0:00</span><span>Next Spring</span></div>
        <div className="flex justify-center gap-8 items-center mb-12">
          <SkipBack size={32} />
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"><Play size={32} fill="white" className="ml-1"/></div>
          <SkipForward size={32} />
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 hover:bg-white/10 rounded cursor-pointer"><span className="text-gray-500">01</span><span className="font-bold flex-1">About Us</span><span className="text-xs text-gray-500">History</span></div>
          <div className="flex items-center gap-4 p-3 hover:bg-white/10 rounded cursor-pointer"><span className="text-gray-500">02</span><span className="font-bold flex-1">Join The Crew</span><span className="text-xs text-gray-500">Recruit</span></div>
        </div>
      </div>
    </div>
  </div>
);

// AH: Insta Stories (Already Implemented)
const DesignAH = () => (
  <div className="min-h-screen bg-black flex items-center justify-center p-4">
    <div className="w-[375px] h-[700px] bg-gray-900 rounded-[40px] border-8 border-gray-800 overflow-hidden relative shadow-2xl">
      <HeroImage className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/50 to-transparent pt-12">
        <div className="flex gap-1 mb-2"><div className="h-1 flex-1 bg-white rounded-full"></div><div className="h-1 flex-1 bg-white/50 rounded-full"></div></div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs">W</div><span className="text-white font-bold text-sm">windcrew_official</span><span className="text-gray-300 text-xs">2h</span></div>
          <XIcon className="text-white" size={20}/>
        </div>
      </div>
      <div className="absolute bottom-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
        <h2 className="text-white text-2xl font-bold mb-4">{COMMON_DATA.nextConcert.title}</h2>
        <Button className="w-full bg-white text-black text-sm">詳細を見る</Button>
        <div className="flex justify-center gap-4 mt-6"><Heart className="text-white" /><MessageCircle className="text-white" /><Send className="text-white" /></div>
      </div>
    </div>
  </div>
);

// AI: Airport (Already Implemented)
const DesignAI = () => (
  <div className="min-h-screen bg-[#222] text-[#ffbf00] font-mono p-4 flex items-center justify-center">
    <div className="w-full max-w-5xl bg-black border-8 border-gray-800 p-8 rounded-xl shadow-2xl">
      <div className="flex justify-between items-end border-b-2 border-[#ffbf00]/30 pb-4 mb-8">
         <h1 className="text-4xl font-bold tracking-widest text-white">DEPARTURES</h1>
         <div className="text-right"><div className="text-xl font-bold text-white"><Clock className="inline mr-2" />14:00</div></div>
      </div>
      <div className="space-y-2">
        <div className="flex text-xs text-gray-500 px-4"><div className="w-20">TIME</div><div className="flex-1">DESTINATION</div><div className="w-32">STATUS</div></div>
        <div className="bg-[#1a1a1a] p-4 flex items-center border-l-4 border-green-500 animate-pulse">
          <div className="w-20 text-xl font-bold text-white">14:00</div>
          <div className="flex-1 text-2xl font-bold text-[#ffbf00] uppercase truncate pr-4">{COMMON_DATA.nextConcert.title}</div>
          <div className="w-32 text-green-500 font-bold animate-pulse">BOARDING</div>
        </div>
        <div className="bg-[#111] p-4 flex items-center border-l-4 border-gray-600 text-gray-400 hover:text-white cursor-pointer hover:bg-[#222]">
          <div className="w-20">---</div><div className="flex-1 uppercase">About WindCrew</div><div className="w-32">ON TIME</div>
        </div>
        <div className="bg-[#111] p-4 flex items-center border-l-4 border-gray-600 text-gray-400 hover:text-white cursor-pointer hover:bg-[#222]">
          <div className="w-20">---</div><div className="flex-1 uppercase">Recruitment</div><div className="w-32">CHECK-IN</div>
        </div>
      </div>
    </div>
  </div>
);

// AJ: Recipe (Refined)
const DesignAJ = () => (
  <div className="min-h-screen bg-[#fffcf5] font-serif text-[#4a4a4a]">
    {/* Recipe Header */}
    <div className="max-w-4xl mx-auto bg-white shadow-lg min-h-screen border-x border-gray-200">
      <div className="relative h-[400px]">
        <HeroImage className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <div className="bg-orange-500 text-xs font-bold px-2 py-1 rounded inline-block mb-2 uppercase tracking-widest">Premium Recipe</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">WindCrewOrchestraの<br/>極上ハーモニー</h1>
          <div className="flex items-center gap-4 text-sm mt-4">
            <span className="flex items-center gap-1"><ChefHat size={16}/> Chef: Conductor</span>
            <span className="flex items-center gap-1"><Clock size={16}/> Prep: 6 months</span>
            <span className="flex items-center gap-1"><Users size={16}/> Serves: Everyone</span>
          </div>
        </div>
      </div>

      <div className="p-8 md:p-12">
        <p className="text-lg leading-relaxed mb-12 border-l-4 border-orange-400 pl-4 italic text-gray-600">
          足立区で2000年から愛され続けている、味わい深い吹奏楽のレシピです。
          情熱的な音色とアットホームな隠し味が特徴。定期演奏会という名のフルコースを、ぜひご賞味ください。
        </p>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Ingredients */}
          <div className="md:w-1/3 bg-[#fdf6e3] p-6 rounded-lg h-fit">
            <h3 className="font-bold text-xl mb-6 border-b-2 border-[#e6dbb9] pb-2 flex items-center gap-2">
              <Utensils className="text-orange-500"/> 材料 (団員)
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between border-b border-dashed border-[#e6dbb9] pb-1"><span>Flute & Oboe</span> <span>適量</span></li>
              <li className="flex justify-between border-b border-dashed border-[#e6dbb9] pb-1"><span>Clarinet</span> <span>たっぷり</span></li>
              <li className="flex justify-between border-b border-dashed border-[#e6dbb9] pb-1"><span>Saxophone</span> <span>少々</span></li>
              <li className="flex justify-between border-b border-dashed border-[#e6dbb9] pb-1"><span>Brass Section</span> <span>黄金色に</span></li>
              <li className="flex justify-between border-b border-dashed border-[#e6dbb9] pb-1"><span>Percussion</span> <span>アクセント</span></li>
              <li className="flex justify-between font-bold text-orange-600 mt-4"><span>★ 新規団員</span> <span>募集中!</span></li>
            </ul>
            <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 border-none text-white text-sm">
              材料になる (団員募集)
            </Button>
          </div>

          {/* Steps */}
          <div className="md:w-2/3">
            <h3 className="font-bold text-xl mb-6 border-b-2 border-gray-200 pb-2 flex items-center gap-2">
              <List className="text-orange-500"/> 調理手順 (楽しみ方)
            </h3>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
                <div>
                  <h4 className="font-bold text-lg mb-2">楽団について知る</h4>
                  <p className="text-gray-600 text-sm mb-2">まずは私たちの歴史や活動理念といったベースの出汁をご確認ください。</p>
                  <a href="#" className="text-orange-500 text-sm font-bold hover:underline">楽団紹介ページへ &rarr;</a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-orange-700 bg-orange-50 inline-block px-2">メインディッシュ: 演奏会に来る</h4>
                  <p className="text-gray-600 text-sm mb-3">春の定期演奏会が焼き上がりました。熱々のうちにお召し上がりください。</p>
                  
                  <div className="border border-orange-200 rounded-lg p-4 bg-white shadow-sm flex gap-4">
                    <div className="w-20 h-20 bg-gray-200 rounded overflow-hidden"><HeroImage/></div>
                    <div>
                      <h5 className="font-bold text-gray-800">{COMMON_DATA.nextConcert.title}</h5>
                      <p className="text-xs text-gray-500 mt-1">{COMMON_DATA.nextConcert.fullDate}</p>
                      <p className="text-xs text-gray-500">{COMMON_DATA.nextConcert.place}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
                <div>
                  <h4 className="font-bold text-lg mb-2">味わった後は...</h4>
                  <p className="text-gray-600 text-sm mb-2">ご感想をお聞かせいただくか、またはシェフ（団員）として厨房に参加することも可能です。</p>
                  <div className="flex gap-4 mt-2">
                    <button className="text-gray-500 hover:text-orange-500 flex items-center gap-1 text-sm"><MessageCircle size={16}/> お問い合わせ</button>
                    <button className="text-gray-500 hover:text-orange-500 flex items-center gap-1 text-sm"><ThumbsUp size={16}/> SNSでシェア</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// AK: Diagnostic (Already Implemented)
const DesignAK = () => (
  <div className="min-h-screen bg-[#E0F7FA] font-sans flex items-center justify-center p-4">
    <div className="bg-white/80 backdrop-blur-xl w-full max-w-2xl rounded-3xl shadow-2xl p-12 text-center border-4 border-white">
      <div className="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-lg">?</div>
      <h1 className="text-3xl font-bold text-slate-800 mb-4">Yes/No チャート</h1>
      <p className="text-lg text-slate-500 mb-10">音楽は好きですか？</p>
      <div className="flex gap-4 justify-center">
        <Button className="bg-pink-500 border-none text-white hover:bg-pink-600">YES (演奏会へ)</Button>
        <Button className="bg-blue-500 border-none text-white hover:bg-blue-600">NO (Aboutへ)</Button>
      </div>
    </div>
  </div>
);

// AL: Movie (Already Implemented)
const DesignAL = () => (
  <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col justify-center items-center text-center p-4">
    <span className="text-xs font-bold tracking-[0.5em] text-purple-500 mb-4 uppercase">Now Showing</span>
    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">{COMMON_DATA.nextConcert.title}</h1>
    <div className="flex gap-4 mb-12">
      <button className="border border-white px-8 py-3 hover:bg-white hover:text-black transition-colors font-bold uppercase tracking-widest">Get Tickets</button>
      <button className="bg-purple-600 border border-purple-600 px-8 py-3 hover:bg-purple-700 transition-colors font-bold uppercase tracking-widest">About Cast</button>
    </div>
    <p className="text-xs text-gray-500 font-mono">COMING SOON TO ADACHI HALL</p>
  </div>
);

// AM: Book (Already Implemented)
const DesignAM = () => (
  <div className="min-h-screen bg-[#FDFBF7] text-[#2c2c2c] font-serif p-12 flex justify-center items-center">
    <div className="w-full max-w-4xl bg-white shadow-2xl flex border-l-8 border-[#8B4513] min-h-[500px]">
      <div className="w-1/2 p-12 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
        <h2 className="text-3xl font-bold text-center mb-12 uppercase border-b-2 border-black pb-2">Index</h2>
        <ul className="space-y-6">
          <li className="flex justify-between font-bold text-xl cursor-pointer hover:text-purple-800"><span>Chapter 1: Intro</span> <span>p.1</span></li>
          <li className="flex justify-between font-bold text-xl cursor-pointer text-purple-900"><span>Chapter 2: Concert</span> <span>p.15</span></li>
          <li className="flex justify-between font-bold text-xl cursor-pointer hover:text-purple-800"><span>Chapter 3: Join</span> <span>p.24</span></li>
        </ul>
      </div>
      <div className="w-1/2 bg-gray-200 relative"><HeroImage className="absolute inset-0 sepia" /></div>
    </div>
  </div>
);

// AN: Bingo (Refined)
const DesignAN = () => {
  const cells = [
    { text: "About", color: "bg-orange-100", icon: Info },
    { text: "History", color: "bg-blue-100", icon: Clock },
    { text: "Member", color: "bg-green-100", icon: Users },
    { text: "Concert", color: "bg-yellow-100", icon: Music },
    { text: "FREE", color: "bg-purple-600 text-white", icon: Star, highlight: true }, // Center
    { text: "Recruit", color: "bg-pink-100", icon: Users },
    { text: "Blog", color: "bg-teal-100", icon: Newspaper },
    { text: "Contact", color: "bg-indigo-100", icon: Mail },
    { text: "SNS", color: "bg-red-100", icon: Instagram },
  ];

  return (
    <div className="min-h-screen bg-amber-500 p-4 flex flex-col items-center justify-center font-sans relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.2)_2px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <h1 className="text-white text-5xl md:text-7xl font-black mb-8 tracking-widest drop-shadow-md">BINGO!</h1>
      
      <div className="bg-white p-4 pb-8 rounded-xl shadow-2xl transform rotate-1 max-w-lg w-full">
        <div className="text-center mb-4 font-bold text-gray-400 text-xs tracking-widest uppercase">Wind Crew Official Card</div>
        
        <div className="grid grid-cols-3 gap-3 aspect-square">
          {cells.map((cell, idx) => (
            <div 
              key={idx} 
              className={`${cell.color} rounded-full flex flex-col items-center justify-center font-bold shadow-inner relative group cursor-pointer border-4 border-white ring-2 ring-gray-100 transition-transform hover:scale-105`}
            >
              {cell.highlight ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center animate-pulse">
                  <cell.icon size={32} className="mb-1"/>
                  <span className="text-sm md:text-xl">{COMMON_DATA.nextConcert.date}</span>
                  <span className="text-[10px] md:text-xs">Next Concert</span>
                </div>
              ) : (
                <>
                  <cell.icon size={24} className="mb-1 opacity-50 group-hover:opacity-100"/>
                  <span className="text-sm md:text-lg text-gray-700">{cell.text}</span>
                  {/* Stamp effect on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="w-16 h-16 border-4 border-red-500 rounded-full opacity-50"></div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 text-white text-center font-bold text-lg animate-bounce">
        Pick a card to start exploring!
      </div>
    </div>
  );
}

// AO: Weather (Refined)
const DesignAO = () => (
  <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-200 p-4 md:p-8 font-sans text-white">
    <div className="max-w-md mx-auto">
      {/* Header Location */}
      <div className="text-center mb-8 pt-8">
        <h1 className="text-3xl font-bold mb-1 shadow-text">Adachi, Tokyo</h1>
        <p className="text-blue-100 text-sm">WindCrew Music Forecast</p>
      </div>

      {/* Main Card */}
      <div className="bg-white/20 backdrop-blur-md rounded-[3rem] p-8 shadow-lg border border-white/30 text-center mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-50"><RefreshCw className="animate-spin-slow" /></div>
        
        <div className="mb-4">
          <CloudSun size={120} className="mx-auto text-yellow-300 drop-shadow-lg animate-pulse" />
        </div>
        <div className="mb-4">
          <span className="text-6xl font-bold">100</span>
          <span className="text-2xl font-bold align-top">%</span>
        </div>
        <p className="text-xl font-bold mb-6">Excellent Harmony</p>
        
        <div className="bg-white/20 rounded-2xl p-4">
          <div className="text-xs uppercase tracking-widest mb-2 opacity-80">Next Event Forecast</div>
          <h2 className="text-lg font-bold leading-tight mb-1">{COMMON_DATA.nextConcert.title}</h2>
          <p className="text-sm opacity-90">{COMMON_DATA.nextConcert.fullDate}</p>
        </div>
      </div>

      {/* Weekly Forecast List */}
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/30 space-y-4">
        <div className="flex items-center justify-between p-2 border-b border-white/20 cursor-pointer hover:bg-white/10 rounded transition-colors">
          <span className="font-bold w-12">NOW</span>
          <div className="flex items-center gap-2 flex-1 px-4">
            <Users size={20} className="text-blue-100"/>
            <span className="text-sm">Recruiting Members</span>
          </div>
          <span className="font-bold">Open</span>
        </div>
        <div className="flex items-center justify-between p-2 border-b border-white/20 cursor-pointer hover:bg-white/10 rounded transition-colors">
          <span className="font-bold w-12">SAT</span>
          <div className="flex items-center gap-2 flex-1 px-4">
            <Music size={20} className="text-yellow-200"/>
            <span className="text-sm">Weekly Practice</span>
          </div>
          <span className="font-bold">17:00</span>
        </div>
        <div className="flex items-center justify-between p-2 cursor-pointer hover:bg-white/10 rounded transition-colors">
          <span className="font-bold w-12">MAR</span>
          <div className="flex items-center gap-2 flex-1 px-4">
            <Sun size={20} className="text-orange-300"/>
            <span className="text-sm">Regular Concert</span>
          </div>
          <span className="font-bold">21st</span>
        </div>
      </div>

      <div className="mt-8 flex justify-between text-blue-900/50 px-8">
        <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-white"><Info /><span className="text-xs">About</span></div>
        <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-white"><Mail /><span className="text-xs">Contact</span></div>
        <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-white"><Settings /><span className="text-xs">Config</span></div>
      </div>
    </div>
  </div>
);

// AP: Game Menu (Already Implemented)
const DesignAP = () => (
  <div className="min-h-screen bg-[#2c1a4d] font-mono text-white flex flex-col items-center justify-center p-4">
    <h1 className="text-4xl md:text-6xl font-bold mb-12 tracking-widest text-shadow-retro text-yellow-400">Wind Crew</h1>
    <div className="bg-blue-900 border-4 border-white p-8 rounded max-w-md w-full shadow-2xl">
      <ul className="space-y-4 text-xl">
        <li className="cursor-pointer hover:text-yellow-300">▶ START (Concert)</li>
        <li className="cursor-pointer hover:text-yellow-300">▶ RECRUIT</li>
        <li className="cursor-pointer hover:text-yellow-300">▶ ABOUT</li>
        <li className="cursor-pointer hover:text-yellow-300">▶ CONTACT</li>
      </ul>
    </div>
    <p className="mt-8 animate-pulse">PRESS START BUTTON</p>
  </div>
);

// AQ: Constellation (Already Implemented)
const DesignAQ = () => (
  <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center overflow-hidden relative">
    <div className="absolute inset-0 opacity-50"><HeroImage /></div>
    <div className="relative z-10 w-[600px] h-[600px]">
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <line x1="300" y1="300" x2="150" y2="150" stroke="white" strokeWidth="1" opacity="0.5"/>
        <line x1="300" y1="300" x2="450" y2="150" stroke="white" strokeWidth="1" opacity="0.5"/>
        <line x1="300" y1="300" x2="300" y2="500" stroke="white" strokeWidth="1" opacity="0.5"/>
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-black font-bold shadow-[0_0_50px_white] cursor-pointer hover:scale-110 transition-transform">Concert</div>
      </div>
      <div className="absolute top-[150px] left-[150px] transform -translate-x-1/2 -translate-y-1/2 text-center cursor-pointer">
        <div className="w-4 h-4 bg-white rounded-full mb-2 mx-auto"></div><span className="text-xs tracking-widest">ABOUT</span>
      </div>
      <div className="absolute top-[150px] right-[150px] transform translate-x-1/2 -translate-y-1/2 text-center cursor-pointer">
        <div className="w-4 h-4 bg-white rounded-full mb-2 mx-auto"></div><span className="text-xs tracking-widest">RECRUIT</span>
      </div>
      <div className="absolute bottom-[100px] left-1/2 transform -translate-x-1/2 translate-y-1/2 text-center cursor-pointer">
        <div className="w-4 h-4 bg-white rounded-full mb-2 mx-auto"></div><span className="text-xs tracking-widest">CONTACT</span>
      </div>
    </div>
  </div>
);

// AR: Elevator (Refined)
const DesignAR = () => (
  <div className="min-h-screen bg-zinc-800 flex items-center justify-center p-8 font-sans relative">
    {/* Elevator Panel Texture */}
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-20"></div>
    
    <div className="bg-gradient-to-br from-zinc-200 to-zinc-400 p-2 rounded-lg shadow-2xl max-w-md w-full border-4 border-zinc-500 relative z-10">
      <div className="bg-zinc-300 border-2 border-zinc-400 p-8 rounded flex flex-col gap-8 items-center">
        
        {/* Floor Indicator */}
        <div className="bg-black w-full h-24 rounded border-4 border-zinc-600 shadow-inner flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,0,0,0.1)_2px,transparent_1px)] bg-[size:4px_4px] opacity-30"></div>
          <span className="text-red-600 font-mono text-6xl font-bold drop-shadow-[0_0_10px_rgba(220,38,38,0.8)] animate-pulse">25</span>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <ArrowUpCircle className="text-red-600 animate-bounce" size={32} />
          </div>
        </div>

        {/* Info Screen (Next Concert) */}
        <div className="bg-zinc-800 w-full p-4 rounded border-2 border-zinc-600 text-center">
           <span className="text-zinc-400 text-xs uppercase tracking-widest mb-1 block">Information</span>
           <div className="text-yellow-500 font-mono text-sm overflow-hidden whitespace-nowrap">
             <div className="animate-[marquee_10s_linear_infinite] inline-block">
               NEXT STOP: {COMMON_DATA.nextConcert.title} --- {COMMON_DATA.nextConcert.fullDate} --- FREE ADMISSION --- 
             </div>
           </div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-2 gap-6 w-full px-4">
           {/* Button 4: About */}
           <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-gradient-to-b from-zinc-100 to-zinc-300 border-4 border-zinc-400 shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.8)] flex items-center justify-center active:scale-95 active:shadow-inner transition-all group-hover:ring-4 ring-yellow-400/50">
                 <span className="text-3xl font-bold text-zinc-700 font-serif">4</span>
              </div>
              <span className="text-xs font-bold text-zinc-600 uppercase">About</span>
           </div>

           {/* Button 3: Recruit */}
           <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-gradient-to-b from-zinc-100 to-zinc-300 border-4 border-zinc-400 shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.8)] flex items-center justify-center active:scale-95 active:shadow-inner transition-all group-hover:ring-4 ring-yellow-400/50">
                 <span className="text-3xl font-bold text-zinc-700 font-serif">3</span>
              </div>
              <span className="text-xs font-bold text-zinc-600 uppercase">Recruit</span>
           </div>

           {/* Button 2: Concert (Lit up) */}
           <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-gradient-to-b from-yellow-100 to-yellow-200 border-4 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.6),inset_0_2px_4px_rgba(255,255,255,0.8)] flex items-center justify-center transform scale-95 shadow-inner">
                 <span className="text-3xl font-bold text-yellow-800 font-serif">2</span>
              </div>
              <span className="text-xs font-bold text-zinc-800 uppercase">Concert</span>
           </div>

           {/* Button 1: Contact */}
           <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-gradient-to-b from-zinc-100 to-zinc-300 border-4 border-zinc-400 shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.8)] flex items-center justify-center active:scale-95 active:shadow-inner transition-all group-hover:ring-4 ring-yellow-400/50">
                 <span className="text-3xl font-bold text-zinc-700 font-serif">1</span>
              </div>
              <span className="text-xs font-bold text-zinc-600 uppercase">Contact</span>
           </div>
        </div>

        {/* Emergency / Brand */}
        <div className="mt-4 border-t border-zinc-400 pt-4 w-full flex justify-between items-center text-zinc-500">
           <div className="flex flex-col items-center">
             <Bell size={20} />
             <span className="text-[10px]">ALARM</span>
           </div>
           <div className="text-center font-bold tracking-widest border-2 border-zinc-500 px-2 py-1 rounded">
             WIND CREW
           </div>
           <div className="flex flex-col items-center">
             <PhoneIcon />
             <span className="text-[10px]">CALL</span>
           </div>
        </div>

      </div>
    </div>
  </div>
);

// AS: Menu (Already Implemented)
const DesignAS = () => (
  <div className="min-h-screen bg-[#fdfbf7] font-serif text-[#2c2c2c] p-8 border-[16px] border-[#2c2c2c]">
    <div className="text-center mb-12"><h1 className="text-5xl font-bold mb-2">Wind Crew</h1><p className="italic">Le Menu</p></div>
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="border-b border-dotted border-gray-400 pb-4">
        <h3 className="text-xl font-bold flex justify-between"><span>Main Course</span> <span className="text-purple-600">Free</span></h3>
        <p className="text-gray-600 italic">{COMMON_DATA.nextConcert.title}</p>
      </div>
      <div className="border-b border-dotted border-gray-400 pb-4">
        <h3 className="text-xl font-bold flex justify-between"><span>Appetizer</span></h3>
        <p className="text-gray-600 italic">About Us - 楽団の歴史と紹介</p>
      </div>
      <div className="border-b border-dotted border-gray-400 pb-4">
        <h3 className="text-xl font-bold flex justify-between"><span>Dessert</span></h3>
        <p className="text-gray-600 italic">Join Us - 団員募集中</p>
      </div>
    </div>
  </div>
);

// AT: Station (Already Implemented)
const DesignAT = () => (
  <div className="min-h-screen bg-[#e0e0e0] font-sans flex flex-col p-8 items-center">
    <div className="bg-white border-4 border-black p-4 flex gap-8 mb-12 shadow-lg">
      <div className="text-center"><span className="block text-xs font-bold text-gray-500">FOR</span><span className="block text-2xl font-black">About</span></div>
      <div className="text-center border-x-2 border-gray-300 px-8"><span className="block text-xs font-bold text-red-500 animate-pulse">ARRIVING</span><span className="block text-4xl font-black text-purple-600">{COMMON_DATA.nextConcert.title}</span></div>
      <div className="text-center"><span className="block text-xs font-bold text-gray-500">FOR</span><span className="block text-2xl font-black">Recruit</span></div>
    </div>
    <div className="bg-black text-orange-500 font-mono p-8 rounded w-full max-w-4xl text-center text-4xl border-8 border-gray-600 shadow-2xl">
      14:00 {COMMON_DATA.nextConcert.place}
    </div>
  </div>
);

// --- Inactive Design Placeholder (Should not be used now) ---
const InactiveDesign = ({ id }: { id: DesignId }) => (
  <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
    <EyeOff size={64} className="mb-4" />
    <h2 className="text-2xl font-bold mb-2">Design {id} is coming soon</h2>
    <Button className="mt-8" onClick={() => window.location.reload()}>Return to Index</Button>
  </div>
);

// --- Main Application Wrapper ---

export default function DesignShowcase() {
  const [currentDesign, setCurrentDesign] = useState<DesignId>('index');

  const designList: {id: DesignId, name: string, icon: React.ElementType}[] = [
    { id: 'A', name: 'A: 王道スタンダード', icon: Star },
    { id: 'B', name: 'B: 2-2グリッド', icon: Grid },
    { id: 'C', name: 'C: 重要度サイズ', icon: LayoutGrid },
    { id: 'D', name: 'D: ストーリー', icon: ArrowRight },
    { id: 'E', name: 'E: 文脈リンク', icon: MousePointer },
    { id: 'F', name: 'F: 全画面', icon: Monitor },
    { id: 'G', name: 'G: スクロール', icon: ChevronDown },
    { id: 'H', name: 'H: 統合カード', icon: Layers },
    { id: 'I', name: 'I: サイドバー', icon: Sidebar },
    { id: 'J', name: 'J: タイムライン', icon: Clock },
    { id: 'K', name: 'K: 最小構成', icon: Square },
    { id: 'L', name: 'L: 最上部告知', icon: AlertCircle },
    { id: 'M', name: 'M: ヒーロー統合', icon: LayoutTemplate },
    { id: 'N', name: 'N: ジグザグ', icon: Shuffle },
    { id: 'O', name: 'O: フローティング', icon: Layers },
    { id: 'P', name: 'P: 情報小出し', icon: List },
    { id: 'Q', name: 'Q: カルーセル', icon: RefreshCw },
    { id: 'R', name: 'R: タブナビ', icon: Columns },
    { id: 'S', name: 'S: 分割画面', icon: SplitSquareHorizontal },
    { id: 'T', name: 'T: FAQ', icon: HelpCircle },
    { id: 'U', name: 'U: マップ風 (★)', icon: Circle },
    { id: 'V', name: 'V: 新聞風', icon: Newspaper },
    { id: 'W', name: 'W: Pinterest風', icon: LayoutGrid },
    { id: 'X', name: 'X: チケット風', icon: Ticket },
    { id: 'Y', name: 'Y: 楽譜風', icon: Music },
    { id: 'Z', name: 'Z: ダッシュボード (★)', icon: PieChart },
    { id: 'AA', name: 'AA: チャット風 (★)', icon: MessageCircle },
    { id: 'AB', name: 'AB: 路線図風', icon: Train },
    { id: 'AC', name: 'AC: カレンダー (★)', icon: Calendar },
    { id: 'AD', name: 'AD: Before/After (★)', icon: Columns },
    { id: 'AE', name: 'AE: 検索結果風', icon: Search },
    { id: 'AF', name: 'AF: 舞台裏/表 (★)', icon: SplitSquareHorizontal },
    { id: 'AG', name: 'AG: プレイヤー風', icon: Play },
    { id: 'AH', name: 'AH: ストーリー風', icon: Instagram },
    { id: 'AI', name: 'AI: 空港風', icon: Plane },
    { id: 'AJ', name: 'AJ: レシピ風 (★)', icon: Utensils },
    { id: 'AK', name: 'AK: 診断チャート', icon: GitBranch },
    { id: 'AL', name: 'AL: 映画予告風', icon: Film },
    { id: 'AM', name: 'AM: 本の目次風', icon: BookOpen },
    { id: 'AN', name: 'AN: ビンゴ風 (★)', icon: Grid },
    { id: 'AO', name: 'AO: 天気予報風 (★)', icon: CloudSun },
    { id: 'AP', name: 'AP: ゲーム風', icon: Gamepad2 },
    { id: 'AQ', name: 'AQ: 星座風', icon: Moon },
    { id: 'AR', name: 'AR: エレベーター (★)', icon: ArrowUpCircle },
    { id: 'AS', name: 'AS: メニュー風', icon: AlignLeft },
    { id: 'AT', name: 'AT: 駅ホーム風', icon: MoveRight },
  ];

  const renderDesign = () => {
    switch(currentDesign) {
      case 'A': return <DesignA />;
      case 'B': return <DesignB />;
      case 'C': return <DesignC />;
      case 'D': return <DesignD />;
      case 'E': return <DesignE />;
      case 'F': return <DesignF />;
      case 'G': return <DesignG />;
      case 'H': return <DesignH />;
      case 'I': return <DesignI />;
      case 'J': return <DesignJ />;
      case 'K': return <DesignK />;
      case 'L': return <DesignL />;
      case 'M': return <DesignM />;
      case 'N': return <DesignN />;
      case 'O': return <DesignO />;
      case 'P': return <DesignP />;
      case 'Q': return <DesignQ />;
      case 'R': return <DesignR />;
      case 'S': return <DesignS />;
      case 'T': return <DesignT />;
      case 'U': return <DesignU />;
      case 'V': return <DesignV />;
      case 'W': return <DesignW />;
      case 'X': return <DesignX />;
      case 'Y': return <DesignY />;
      case 'Z': return <DesignZ />;
      case 'AA': return <DesignAA />;
      case 'AB': return <DesignAB />;
      case 'AC': return <DesignAC />;
      case 'AD': return <DesignAD />;
      case 'AE': return <DesignAE />;
      case 'AF': return <DesignAF />;
      case 'AG': return <DesignAG />;
      case 'AH': return <DesignAH />;
      case 'AI': return <DesignAI />;
      case 'AJ': return <DesignAJ />;
      case 'AK': return <DesignAK />;
      case 'AL': return <DesignAL />;
      case 'AM': return <DesignAM />;
      case 'AN': return <DesignAN />;
      case 'AO': return <DesignAO />;
      case 'AP': return <DesignAP />;
      case 'AQ': return <DesignAQ />;
      case 'AR': return <DesignAR />;
      case 'AS': return <DesignAS />;
      case 'AT': return <DesignAT />;
      default: return <InactiveDesign id={currentDesign} />;
    }
  };

  if (currentDesign === 'index') {
    return (
      <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">WindCrewOrchestra Design Proposals</h1>
            <p className="text-slate-500 max-w-2xl mx-auto mb-4">
              PDFで提案された全46デザイン案の実装プレビュー。<br/>
              <span className="font-bold text-purple-600">全案の実装が完了しました。</span>
            </p>
            <div className="inline-block bg-green-100 text-green-800 px-6 py-2 rounded-full text-sm font-bold shadow-sm">
              Status: All 46 Designs Active
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {designList.map((design) => {
              const isActive = ACTIVE_IDS.includes(design.id);
              return (
                <button 
                  key={design.id}
                  onClick={() => isActive && setCurrentDesign(design.id)}
                  disabled={!isActive}
                  className={`
                    p-6 rounded-xl text-left border group flex items-center gap-4 relative overflow-hidden transition-all
                    ${isActive 
                      ? 'bg-white border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer' 
                      : 'bg-slate-100 border-slate-100 opacity-60 cursor-not-allowed grayscale'
                    }
                  `}
                >
                  <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors
                    ${isActive 
                      ? design.name.includes('★') ? 'bg-yellow-100 text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white' : 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white' 
                      : 'bg-slate-200 text-slate-400'
                    }
                  `}>
                    <design.icon size={24} />
                  </div>
                  <div>
                    <h2 className={`font-bold text-sm ${isActive ? 'text-slate-800' : 'text-slate-500'}`}>
                      {design.name}
                    </h2>
                    <span className={`text-xs ${isActive ? 'text-purple-600 group-hover:underline' : 'text-slate-400'}`}>
                      {isActive ? 'Preview \u2192' : 'Inactive'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          
          <footer className="mt-16 text-center text-slate-400 text-sm">
            Created by Gemini
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={() => setCurrentDesign('index')}
          className="bg-black/80 hover:bg-black text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur flex items-center gap-2 transition-all"
        >
          <XIcon size={16} /> 一覧に戻る
        </button>
      </div>
      {renderDesign()}
    </div>
  );
}