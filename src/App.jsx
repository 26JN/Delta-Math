import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { INITIAL_GAMES } from './data/fallbackGames.js';
import { ThreeGameScene } from './components/ThreeGameScene.jsx';
import { TopNav } from './components/TopNav.jsx';
import { HologramHUD } from './components/HologramHUD.jsx';
import { GameOverlay } from './components/GameOverlay.jsx';
import { AddGameModal } from './components/AddGameModal.jsx';
import { DeltaMathView } from './components/DeltaMathView.jsx';
import { PasscodeModal } from './components/PasscodeModal.jsx';
import { soundFX } from './utils/audio.js';

const STORAGE_KEY_FAVS = 'unblocked_fav_games';
const STORAGE_KEY_CUSTOM = 'unblocked_custom_games';

export default function App() {
  // Disguise / Unlock state: Starts in DeltaMath mode as requested
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPasscodeOpen, setIsPasscodeOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showUnlockToast, setShowUnlockToast] = useState(false);

  const [games, setGames] = useState(INITIAL_GAMES);
  const [favorites, setFavorites] = useState([]);
  const [activeGame, setActiveGame] = useState(null);
  const [hoveredGame, setHoveredGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [layoutMode, setLayoutMode] = useState('ring');
  const [autoRotate, setAutoRotate] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Sync document title to current mode
  useEffect(() => {
    if (!isUnlocked) {
      document.title = 'DeltaMath - Student Dashboard';
    } else if (activeGame) {
      document.title = `${activeGame.title} - 3D Unblocked Games Hub`;
    } else {
      document.title = '3D Unblocked Games Hub';
    }
  }, [isUnlocked, activeGame]);

  // Global hotkeys: '~' or '\' to open secret passcode from DeltaMath; 'Escape' to panic back to DeltaMath
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (!isUnlocked) {
        if (e.key === '`' || e.key === '~' || e.key === '\\') {
          e.preventDefault();
          soundFX.playKeyClick();
          setIsPasscodeOpen(true);
        }
      } else {
        // If in games view and no active game or modal is open, pressing 'p' or 'Escape' cloaks back to DeltaMath
        if ((e.key === 'Escape' || e.key === 'p' || e.key === 'P') && !activeGame && !isAddModalOpen) {
          soundFX.playClose();
          setIsUnlocked(false);
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isUnlocked, activeGame, isAddModalOpen]);

  // Load favorites & custom games from localStorage on mount
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem(STORAGE_KEY_FAVS);
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }

      const savedCustom = localStorage.getItem(STORAGE_KEY_CUSTOM);
      const customGames = savedCustom ? JSON.parse(savedCustom) : [];

      // Fetch games from JSON file (relative path for GitHub Pages compatibility)
      const gamesUrl = `${import.meta.env.BASE_URL || './'}games.json`.replace('//', '/');
      fetch(gamesUrl)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch games.json');
          return res.json();
        })
        .then((data) => {
          if (data && Array.isArray(data.games) && data.games.length > 0) {
            setGames([...customGames, ...data.games]);
          } else {
            setGames([...customGames, ...INITIAL_GAMES]);
          }
        })
        .catch(() => {
          setGames([...customGames, ...INITIAL_GAMES]);
        });
    } catch {
      setGames(INITIAL_GAMES);
    }
  }, []);

  // Sync sound toggle to soundFX instance
  useEffect(() => {
    soundFX.enabled = soundEnabled;
  }, [soundEnabled]);

  // Handle Passcode Success (1234 entered): Apple-quality transition
  const handlePasscodeSuccess = useCallback(() => {
    setIsPasscodeOpen(false);
    setIsTransitioning(true);
    soundFX.playTransitionWhoosh();

    setTimeout(() => {
      setIsUnlocked(true);
      setIsTransitioning(false);
      setShowUnlockToast(true);
      setTimeout(() => setShowUnlockToast(false), 4500);
    }, 850);
  }, []);

  // Return / Cloak back to DeltaMath
  const handleCloakToDeltaMath = useCallback(() => {
    soundFX.playClose();
    setActiveGame(null);
    setIsUnlocked(false);
  }, []);

  // Memoized handlers to keep Three.js scene rock solid
  const handleHoverGame = useCallback((game) => {
    setHoveredGame(game);
  }, []);

  const handleSelectGame = useCallback((game) => {
    setActiveGame(game);
  }, []);

  // Toggle favorite
  const handleToggleFavorite = useCallback((gameId) => {
    setFavorites((prev) => {
      const isFav = prev.includes(gameId);
      const next = isFav ? prev.filter((id) => id !== gameId) : [...prev, gameId];
      try {
        localStorage.setItem(STORAGE_KEY_FAVS, JSON.stringify(next));
      } catch {
        // LocalStorage fallback
      }
      return next;
    });
  }, []);

  // Add custom game
  const handleAddGame = useCallback((newGame) => {
    setGames((prev) => {
      const updated = [newGame, ...prev];
      try {
        const savedCustom = localStorage.getItem(STORAGE_KEY_CUSTOM);
        const customList = savedCustom ? JSON.parse(savedCustom) : [];
        localStorage.setItem(STORAGE_KEY_CUSTOM, JSON.stringify([newGame, ...customList]));
      } catch {
        // LocalStorage fallback
      }
      return updated;
    });
  }, []);

  // Categories list
  const categories = useMemo(() => {
    const rawCategories = Array.from(new Set(games.map((g) => g.category)));
    return ['All', 'Favorites', ...rawCategories];
  }, [games]);

  // Filtered games list
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      if (activeCategory === 'Favorites') {
        if (!favorites.includes(game.id)) return false;
      } else if (activeCategory !== 'All') {
        if (game.category.toLowerCase() !== activeCategory.toLowerCase()) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          game.title.toLowerCase().includes(q) ||
          game.description.toLowerCase().includes(q) ||
          game.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [games, activeCategory, favorites, searchQuery]);

  // Pick random game
  const handleRandomGame = useCallback(() => {
    const pool = filteredGames.length > 0 ? filteredGames : games;
    if (pool.length === 0) return;
    const random = pool[Math.floor(Math.random() * pool.length)];
    setActiveGame(random);
  }, [filteredGames, games]);

  // 1. Initial State: Authentic DeltaMath Platform View
  if (!isUnlocked && !isTransitioning) {
    return (
      <div className="relative w-full min-h-screen">
        <DeltaMathView onOpenSecretCode={() => setIsPasscodeOpen(true)} />
        <PasscodeModal
          isOpen={isPasscodeOpen}
          onClose={() => setIsPasscodeOpen(false)}
          onSuccess={handlePasscodeSuccess}
        />
      </div>
    );
  }

  // 2. Active Unblocked 3D Games Hub with Apple Website Quality Transition
  return (
    <div
      className={`relative w-screen h-screen overflow-hidden bg-[#050505] text-white font-['Plus_Jakarta_Sans',sans-serif] select-none ${
        isTransitioning ? 'animate-portal' : 'animate-apple-in'
      }`}
    >
      {/* Apple-grade Transition Aperture Veil */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[90] pointer-events-none bg-radial from-transparent via-black/40 to-black animate-pulse" />
      )}

      {/* Frosted Glass Neon Atmosphere Gradients */}
      <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] bg-[#00FFCC] rounded-full blur-[140px] animate-pulse"
          style={{ animationDuration: '9s' }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[60%] bg-[#7000FF] rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: '12s' }}
        />
      </div>

      {/* Three.js Interactive 3D WebGL Canvas */}
      <ThreeGameScene
        games={games}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        layoutMode={layoutMode}
        autoRotate={autoRotate}
        onSelectGame={handleSelectGame}
        onHoverGame={handleHoverGame}
      />

      {/* Top HUD: Search, Categories, Layout Modes, Random Launcher & DeltaMath Disguise */}
      <TopNav
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        categories={categories}
        layoutMode={layoutMode}
        onChangeLayout={setLayoutMode}
        autoRotate={autoRotate}
        onToggleAutoRotate={() => setAutoRotate((prev) => !prev)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onRandomGame={handleRandomGame}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onCloakToDeltaMath={handleCloakToDeltaMath}
        totalGames={games.length}
        favCount={favorites.length}
      />

      {/* Bottom Hologram HUD / Tooltip */}
      <HologramHUD
        hoveredGame={hoveredGame}
        onSelectGame={handleSelectGame}
        isFavorite={hoveredGame ? favorites.includes(hoveredGame.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Unlock Toast Notification */}
      {showUnlockToast && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/50 backdrop-blur-xl text-emerald-300 text-xs font-mono font-bold shadow-[0_0_30px_rgba(52,211,153,0.3)] animate-in fade-in slide-in-from-top-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>ACCESS GRANTED • PRESS ESC OR CLICK Δ DELTAMATH TO RETURN TO CLASS</span>
        </div>
      )}

      {/* Frosted Glass Telemetry Status Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none hidden sm:flex items-center justify-between px-4 py-1.5 border-t border-white/10 bg-black/40 backdrop-blur-md text-[10px] font-mono tracking-wider text-white/50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00FFCC] animate-pulse" />
          <span className="text-white/80 font-bold tracking-widest">SECURE_TUNNEL_ENABLED</span>
          <span className="text-white/20">•</span>
          <span className="text-[#00FFCC]">0.02ms LATENCY</span>
          <span className="text-white/20">•</span>
          <span className="text-emerald-400">STATUS: ONLINE</span>
        </div>
        <div className="flex items-center gap-3">
          <span>SYSTEM: <strong className="text-white">UNBLOCKED_V4</strong></span>
          <span className="text-white/20">•</span>
          <span>READY: <strong className="text-[#00FFCC]">{games.length} CARTRIDGES</strong></span>
        </div>
      </footer>

      {/* Fullscreen Iframe Game Player Overlay */}
      {activeGame && (
        <GameOverlay
          game={activeGame}
          onClose={() => setActiveGame(null)}
          isFavorite={favorites.includes(activeGame.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* Modal: Add Custom Game to 3D Library */}
      <AddGameModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGame={handleAddGame}
      />
    </div>
  );
}
