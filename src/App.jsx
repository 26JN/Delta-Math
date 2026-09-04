import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { INITIAL_GAMES } from './data/fallbackGames.js';
import { ThreeGameScene } from './components/ThreeGameScene.jsx';
import { TopNav } from './components/TopNav.jsx';
import { HologramHUD } from './components/HologramHUD.jsx';
import { GameOverlay } from './components/GameOverlay.jsx';
import { AddGameModal } from './components/AddGameModal.jsx';
import { soundFX } from './utils/audio.js';

const STORAGE_KEY_FAVS = 'unblocked_fav_games';
const STORAGE_KEY_CUSTOM = 'unblocked_custom_games';

export default function App() {
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

  // Load favorites & custom games from localStorage on mount
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem(STORAGE_KEY_FAVS);
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }

      const savedCustom = localStorage.getItem(STORAGE_KEY_CUSTOM);
      const customGames = savedCustom ? JSON.parse(savedCustom) : [];

      // Fetch games from JSON file (as requested)
      fetch('/games.json')
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
          // Graceful fallback to initial games
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

  // Filtered games list for random picker & counts
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

  // Pick a random game from currently available
  const handleRandomGame = useCallback(() => {
    const pool = filteredGames.length > 0 ? filteredGames : games;
    if (pool.length === 0) return;
    const random = pool[Math.floor(Math.random() * pool.length)];
    setActiveGame(random);
  }, [filteredGames, games]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#050505] text-white font-['Plus_Jakarta_Sans',sans-serif] select-none">
      {/* Frosted Glass Neon Atmosphere Gradients */}
      <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] bg-[#00FFCC] rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '9s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[60%] bg-[#7000FF] rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      {/* Three.js Interactive 3D WebGL Canvas */}
      <ThreeGameScene
        games={games}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        layoutMode={layoutMode}
        autoRotate={autoRotate}
        onSelectGame={(game) => setActiveGame(game)}
        onHoverGame={(game) => setHoveredGame(game)}
      />

      {/* Top HUD: Search, Categories, Layout Modes, Random Launcher */}
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
        totalGames={games.length}
        favCount={favorites.length}
      />

      {/* Bottom Hologram HUD / Tooltip */}
      <HologramHUD
        hoveredGame={hoveredGame}
        onSelectGame={(game) => setActiveGame(game)}
        isFavorite={hoveredGame ? favorites.includes(hoveredGame.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

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
