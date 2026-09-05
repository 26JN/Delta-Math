import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Play, X, Zap, ArrowRight, Folder, EyeOff, Crown, Skull } from 'lucide-react';
import { INITIAL_GAMES } from './data/fallbackGames.js';
import { DeltaMathView } from './components/DeltaMathView.jsx';
import { PasscodeModal } from './components/PasscodeModal.jsx';
import { VipPasscodeModal } from './components/VipPasscodeModal.jsx';

// Search internet for game thumbnail using Bing Image Search proxy
const getThumbnail = (game) => {
  if (game.image) return game.image;
  const query = encodeURIComponent(`${game.title} game icon cover`);
  return `https://tse2.mm.bing.net/th?q=${query}&w=300&h=300&c=7&rs=1&p=0&dpr=1&pid=1.7&mkt=en-US&adlt=moderate`;
};

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPasscodeOpen, setIsPasscodeOpen] = useState(false);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [isVipUnlocked, setIsVipUnlocked] = useState(false);
  const [isJumpscareActive, setIsJumpscareActive] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeGame, setActiveGame] = useState(null);

  // Global hotkey to re-engage cloak
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Re-engage cloak on Escape key press if currently unlocked
      if (e.key === 'Escape') {
        if (isUnlocked) {
          setIsUnlocked(false);
          setActiveGame(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isUnlocked]);

  const handlePasscodeSuccess = (isVip) => {
    setIsPasscodeOpen(false);
    if (isVip) {
      setIsVipUnlocked(true);
    }
    // Small delay to allow passcode modal to close before morphing
    setTimeout(() => setIsUnlocked(true), 150);
  };
  
  const handleVipPasscodeSuccess = () => {
    setIsVipModalOpen(false);
    setIsVipUnlocked(true);
  };

  const triggerJumpscare = () => {
    const audio = new Audio('https://www.myinstants.com/media/sounds/fnaf-jumpscare-sound.mp3');
    audio.play().catch((e) => console.log('Audio autoplay blocked:', e));
    setIsJumpscareActive(true);
    setTimeout(() => {
      setIsJumpscareActive(false);
    }, 2500);
  };

  // Extract categories
  const categories = useMemo(() => {
    const cats = new Set(INITIAL_GAMES.map((g) => g.category));
    return ['All', ...Array.from(cats)];
  }, []);

  // Filter games
  const filteredGames = useMemo(() => {
    let filtered = INITIAL_GAMES;
    if (activeCategory !== 'All') {
      filtered = filtered.filter((g) => g.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    return filtered;
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-transparent">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="deltamath-cloak"
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full overflow-y-auto bg-white"
          >
            <DeltaMathView onOpenSecretCode={() => setIsPasscodeOpen(true)} />
            <PasscodeModal
              isOpen={isPasscodeOpen}
              onClose={() => setIsPasscodeOpen(false)}
              onSuccess={handlePasscodeSuccess}
            />
          </motion.div>
        ) : (
          <motion.div
            key="zine-arcade"
            initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="w-full min-h-screen p-4 md:p-8 flex flex-col max-w-7xl mx-auto relative z-10"
          >
            {/* Brutalist Header */}
            <header className="brutal-border bg-[#FF90E8] brutal-shadow p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-2">
                  26JN Hangout
                </h1>
                <div className="flex items-center gap-3">
                  <p className="text-xl font-bold bg-white inline-block px-2 brutal-border uppercase">
                    100% UNBLOCKED & RAW
                  </p>
                  {isVipUnlocked ? (
                    <span className="flex items-center gap-1 bg-[#FFC900] px-2 py-0.5 brutal-border font-black text-sm uppercase">
                      <Crown className="w-4 h-4" /> VIP ACTIVE
                    </span>
                  ) : (
                    <button
                      onClick={() => setIsVipModalOpen(true)}
                      className="flex items-center gap-1 bg-black text-white hover:bg-yellow-400 hover:text-black px-2 py-0.5 brutal-border font-black text-sm uppercase transition-colors cursor-pointer"
                    >
                      <Crown className="w-4 h-4" /> UNLOCK VIP
                    </button>
                  )}
                </div>
              </div>

              {/* Marquee Ticker & Cloak Button */}
              <div className="flex flex-col gap-3 w-full md:w-auto items-end">
                <button
                  onClick={() => setIsUnlocked(false)}
                  className="flex items-center gap-2 bg-black text-[#00E5FF] px-3 py-1.5 font-bold uppercase text-sm brutal-border hover:bg-[#00E5FF] hover:text-black transition-colors brutal-active"
                >
                  <EyeOff className="w-4 h-4" /> Re-engage Cloak (Esc)
                </button>
                <div className="w-full md:w-64 bg-black text-[#00E5FF] p-2 brutal-border overflow-hidden whitespace-nowrap font-bold text-sm">
                  <div className="animate-marquee">
                    NO FILTERS • NO RULES • PURE GAMING • NO FILTERS • NO RULES • PURE GAMING • NO FILTERS • NO RULES • PURE GAMING •
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content Area */}
            <div className="flex flex-col lg:flex-row gap-8 flex-1">
              
              {/* Sidebar / Controls */}
              <aside className="w-full lg:w-64 flex flex-col gap-6 shrink-0">
                
                {/* Search Box */}
                <div className="bg-[#FFC900] brutal-border brutal-shadow-sm p-4">
                  <h2 className="font-black text-xl mb-3 flex items-center gap-2 uppercase">
                    <Search className="w-5 h-5" /> Find Game
                  </h2>
                  <input
                    type="text"
                    placeholder="TYPE HERE..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 brutal-border bg-white text-black font-bold uppercase placeholder:text-gray-400 focus:outline-none focus:bg-[#00E5FF] transition-colors"
                  />
                </div>

                {/* Categories */}
                <div className="bg-white brutal-border brutal-shadow-sm p-4">
                  <h2 className="font-black text-xl mb-3 flex items-center gap-2 uppercase">
                    <Folder className="w-5 h-5" /> Categories
                  </h2>
                  <div className="flex flex-col gap-2 max-h-[50vh] overflow-y-auto pr-2 scrollbar-hide">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`text-left font-bold uppercase px-3 py-2 brutal-border transition-all ${
                          activeCategory === cat
                            ? 'bg-black text-[#00E5FF] translate-x-1'
                            : 'bg-white text-black hover:bg-[#FF90E8]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Secret Troll Button */}
                <button
                  onClick={triggerJumpscare}
                  className="bg-red-600 text-white font-black text-xl brutal-border brutal-shadow-sm p-4 uppercase hover:bg-black hover:text-red-600 transition-colors brutal-active flex items-center justify-center gap-2 mt-auto"
                >
                  <Skull className="w-6 h-6" /> FREE VIP
                </button>
              </aside>

              {/* Game Grid */}
              <main className="flex-1 bg-white brutal-border brutal-shadow p-6 relative min-h-[500px]">
                
                {/* Background decoration */}
                <div className="absolute top-4 right-4 pointer-events-none opacity-20">
                  <Zap className="w-32 h-32" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
                  {filteredGames.length > 0 ? (
                    filteredGames.map((game) => (
                      <motion.div
                        key={game.id}
                        layoutId={`game-${game.id}`}
                        className={`bg-[#00E5FF] brutal-border brutal-shadow-sm flex flex-col group ${
                          game.vip && !isVipUnlocked ? 'opacity-50 grayscale pointer-events-none' : ''
                        }`}
                      >
                        <div className="relative aspect-video border-b-3 border-black overflow-hidden bg-black p-1">
                          <img
                            src={getThumbnail(game)}
                            alt={game.title}
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                          />
                          <div className="absolute top-2 left-2 flex gap-1">
                            <div className="bg-yellow-400 text-black px-2 py-0.5 text-xs font-black brutal-border uppercase">
                              {game.category}
                            </div>
                            {game.vip && (
                              <div className="bg-purple-500 text-white px-2 py-0.5 text-xs font-black brutal-border uppercase flex items-center gap-1">
                                <Crown className="w-3 h-3" /> VIP
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="p-4 flex flex-col flex-1 bg-white">
                          <h3 className="font-black text-xl uppercase mb-1 line-clamp-1">{game.title}</h3>
                          <p className="text-sm font-bold text-gray-600 mb-4 line-clamp-2">
                            {game.description}
                          </p>
                          <div className="mt-auto">
                            <button
                              onClick={() => setActiveGame(game)}
                              className="w-full bg-[#FF90E8] text-black font-black uppercase brutal-border py-2 flex items-center justify-center gap-2 hover:bg-black hover:text-[#00E5FF] transition-colors brutal-active"
                            >
                              <Play className="w-5 h-5" /> Launch
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center flex flex-col items-center">
                      <div className="text-4xl font-black uppercase bg-black text-[#00E5FF] p-4 brutal-border inline-block rotate-[-2deg]">
                        NOTHING FOUND
                      </div>
                    </div>
                  )}
                </div>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Player Overlay */}
      <AnimatePresence>
        {activeGame && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 md:inset-8 z-50 flex flex-col bg-white brutal-border brutal-shadow p-2"
          >
            {/* Player Header */}
            <header className="flex items-center justify-between bg-black text-white p-3 brutal-border mb-2">
              <div className="flex items-center gap-3">
                <div className="bg-[#FFC900] w-4 h-4 brutal-border"></div>
                <h2 className="font-black text-xl md:text-2xl uppercase tracking-tighter">
                  {activeGame.title} <span className="text-[#00E5FF]">// PLAYING</span>
                </h2>
              </div>
              <button
                onClick={() => setActiveGame(null)}
                className="bg-[#FF90E8] text-black p-1 brutal-border hover:bg-white transition-colors brutal-active"
              >
                <X className="w-6 h-6" />
              </button>
            </header>

            {/* Iframe Container */}
            <div className="flex-1 brutal-border bg-black relative">
              <iframe
                src={activeGame.url}
                title={activeGame.title}
                className="absolute inset-0 w-full h-full border-none bg-white"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                allow="fullscreen"
              />
            </div>
            
            {/* Player Footer */}
            <div className="mt-2 bg-[#00E5FF] text-black p-2 brutal-border flex items-center justify-between text-sm font-bold uppercase">
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4" /> SECURE SANDBOX ACTIVE
              </div>
              <div>26JN HANGOUT V2.0</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* JUMPSCARE OVERLAY */}
      {isJumpscareActive && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center animate-[shake_0.1s_infinite]">
          {/* We use a classic FNAF-style animatronic image */}
          <img 
            src="https://tse2.mm.bing.net/th?q=fnaf+jumpscare&w=1200&h=1200&c=7&rs=1&p=0&dpr=1&pid=1.7&mkt=en-US&adlt=moderate" 
            alt="scary face" 
            className="w-full h-full object-cover select-none pointer-events-none filter contrast-125 saturate-200"
          />
          <div className="absolute inset-0 bg-red-600 mix-blend-overlay animate-pulse opacity-50 pointer-events-none"></div>
        </div>
      )}

      <VipPasscodeModal
        isOpen={isVipModalOpen}
        onClose={() => setIsVipModalOpen(false)}
        onSuccess={handleVipPasscodeSuccess}
      />
    </div>
  );
}

