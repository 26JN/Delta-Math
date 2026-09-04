import React from 'react';
import {
  Search,
  X,
  Volume2,
  VolumeX,
  RotateCw,
  Plus,
  Dices,
  Circle,
  Grid,
  Layers,
  Sparkles,
  Gamepad2,
  Star,
} from 'lucide-react';
import { soundFX } from '../utils/audio.js';

export const TopNav = ({
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
  categories,
  layoutMode,
  onChangeLayout,
  autoRotate,
  onToggleAutoRotate,
  soundEnabled,
  onToggleSound,
  onRandomGame,
  onOpenAddModal,
  totalGames,
  favCount,
}) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 pointer-events-none p-3 sm:p-4 flex flex-col gap-3">
      {/* Top Banner Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 w-full max-w-7xl mx-auto">
        {/* Brand / Logo */}
        <div className="pointer-events-auto flex items-center gap-3 bg-black/40 backdrop-blur-xl px-3.5 py-2 rounded-2xl border border-white/10 shadow-2xl">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00FFCC] to-[#7000FF] text-black font-black shadow-lg shadow-[#00FFCC]/30">
            <Gamepad2 className="w-5 h-5 text-black" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFCC] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FFCC]"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white font-['Chakra_Petch'] leading-none">
                UNBLOCKED <span className="text-[#00FFCC]">3D</span> HUB
              </h1>
              <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/5 text-[#00FFCC] border border-white/15">
                SECURE JSON
              </span>
            </div>
            <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-mono flex items-center gap-1.5 mt-0.5">
              <span>{totalGames} CARTRIDGES</span>
              <span className="text-white/20">•</span>
              <span className="text-amber-300 flex items-center gap-0.5 font-bold">
                <Star className="w-2.5 h-2.5 fill-amber-300" /> {favCount} SAVED
              </span>
            </p>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="pointer-events-auto flex-1 max-w-md min-w-[200px]">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-white/40 pointer-events-none" />
            <input
              id="search-input"
              type="text"
              placeholder="Search 3D library (Slope, Mario, Moto X3M...)"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/15 text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:bg-white/10 transition shadow-2xl"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 p-1 text-white/40 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-black/40 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 shadow-2xl">
          {/* Random Game */}
          <button
            id="random-game-btn"
            onClick={() => {
              soundFX.playSelect();
              onRandomGame();
            }}
            title="Launch Random Game"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#7000FF] to-violet-600 hover:from-[#7000FF] hover:to-indigo-500 text-white text-xs font-bold shadow-[0_0_15px_rgba(112,0,255,0.4)] border border-white/20 transition cursor-pointer"
          >
            <Dices className="w-4 h-4" />
            <span className="hidden sm:inline">Random</span>
          </button>

          {/* Add Game button */}
          <button
            id="add-game-btn"
            onClick={() => {
              soundFX.playSelect();
              onOpenAddModal();
            }}
            title="Add Custom Iframe Game"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#00FFCC] text-[#00FFCC] hover:text-black border border-[#00FFCC]/40 hover:border-[#00FFCC] text-xs font-bold transition shadow-[0_0_15px_rgba(0,255,204,0.15)] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Game</span>
          </button>

          {/* 3D Layout mode toggles */}
          <div className="hidden lg:flex items-center gap-0.5 px-1 py-0.5 bg-black/40 rounded-xl border border-white/10">
            <button
              onClick={() => {
                soundFX.playHover();
                onChangeLayout('ring');
              }}
              title="Ring Orbit Layout"
              className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                layoutMode === 'ring'
                  ? 'bg-[#00FFCC]/20 text-[#00FFCC] border border-[#00FFCC]/60 shadow-[0_0_10px_rgba(0,255,204,0.2)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Circle className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                soundFX.playHover();
                onChangeLayout('grid');
              }}
              title="Matrix Grid Layout"
              className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                layoutMode === 'grid'
                  ? 'bg-[#00FFCC]/20 text-[#00FFCC] border border-[#00FFCC]/60 shadow-[0_0_10px_rgba(0,255,204,0.2)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                soundFX.playHover();
                onChangeLayout('helix');
              }}
              title="Helix Spiral Layout"
              className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                layoutMode === 'helix'
                  ? 'bg-[#00FFCC]/20 text-[#00FFCC] border border-[#00FFCC]/60 shadow-[0_0_10px_rgba(0,255,204,0.2)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Auto Rotate Toggle */}
          <button
            onClick={onToggleAutoRotate}
            title={autoRotate ? 'Pause 3D orbit rotation' : 'Resume 3D orbit rotation'}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              autoRotate
                ? 'bg-white/15 border-white/20 text-[#00FFCC]'
                : 'bg-white/5 border-white/10 text-white/40 hover:text-white'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              soundEnabled
                ? 'bg-white/15 border-white/20 text-[#00FFCC]'
                : 'bg-white/5 border-white/10 text-white/40 hover:text-white'
            }`}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Category Pills Row */}
      <div className="pointer-events-auto flex items-center justify-center gap-1.5 overflow-x-auto py-1 px-2 no-scrollbar max-w-full mx-auto">
        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 shadow-2xl">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  soundFX.playHover();
                  onSelectCategory(cat);
                }}
                className={`px-3.5 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#00FFCC] text-black font-extrabold shadow-[0_0_15px_#00FFCC] border border-[#00FFCC]'
                    : 'text-white/70 hover:text-white hover:bg-white/10 border border-transparent'
                }`}
              >
                {cat === 'Favorites' ? (
                  <span className="flex items-center gap-1">
                    <Star className={`w-3 h-3 ${isSelected ? 'fill-black text-black' : 'fill-amber-300 text-amber-300'}`} />
                    Favorites
                  </span>
                ) : (
                  cat
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
