import React from 'react';
import { motion } from 'motion/react';
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
  Star,
  Crown,
  LayoutGrid,
  Box,
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
  onCloakToDeltaMath,
  totalGames,
  favCount,
  isVipUnlocked = false,
  onOpenVipModal,
  onOpenCatalog,
  viewMode = 'spatial',
  onToggleViewMode,
}) => {
  return (
    <motion.header
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-0 left-0 right-0 z-30 pointer-events-none p-3 sm:p-4 flex flex-col gap-2.5"
    >
      {/* Top Banner Navigation Row */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 w-full max-w-7xl mx-auto">
        {/* Apple Brand / Logo */}
        <div className="pointer-events-auto flex items-center gap-3 bg-[#0a0c12]/80 backdrop-blur-3xl px-3.5 py-2 rounded-2xl border border-white/[0.1] shadow-2xl">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2997ff] to-[#0071e3] text-white font-bold shadow-lg shadow-[#2997ff]/25">
            <Box className="w-4 h-4 text-white" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2997ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2997ff]"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xs sm:text-sm font-bold tracking-tight text-white leading-none">
                Spatial Arcade
              </h1>
              <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-[9px] font-semibold bg-white/[0.08] text-[#2997ff] border border-white/[0.1]">
                4K RETINA
              </span>
            </div>
            <p className="text-[10px] text-white/50 tracking-wider flex items-center gap-1.5 mt-0.5">
              <span>{totalGames} Titles</span>
              <span className="text-white/20">•</span>
              <span className="text-amber-300 flex items-center gap-0.5 font-medium">
                <Star className="w-2.5 h-2.5 fill-amber-300" /> {favCount} Saved
              </span>
            </p>
          </div>
        </div>

        {/* View Mode Toggle: 3D Spatial vs 4K Retina Showcase (Fluid Apple Segmented Control) */}
        <div className="pointer-events-auto relative flex items-center p-1 bg-[#0a0c12]/80 backdrop-blur-3xl rounded-2xl border border-white/[0.1] shadow-2xl">
          <button
            onClick={() => {
              soundFX.playHover();
              if (onToggleViewMode) onToggleViewMode('spatial');
            }}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer select-none z-10 ${
              viewMode === 'spatial' ? 'text-black' : 'text-white/70 hover:text-white'
            }`}
          >
            {viewMode === 'spatial' && (
              <motion.div
                layoutId="activeViewTab"
                className="absolute inset-0 bg-white rounded-xl shadow-md -z-10"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <Box className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">3D Studio</span>
          </button>

          <button
            onClick={() => {
              soundFX.playHover();
              if (onToggleViewMode) onToggleViewMode('retina');
            }}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer select-none z-10 ${
              viewMode === 'retina' ? 'text-black' : 'text-white/70 hover:text-white'
            }`}
          >
            {viewMode === 'retina' && (
              <motion.div
                layoutId="activeViewTab"
                className="absolute inset-0 bg-white rounded-xl shadow-md -z-10"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Retina Showcase</span>
          </button>
        </div>

        {/* Center: Search Bar */}
        <div className="pointer-events-auto flex-1 max-w-md min-w-[200px]">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-white/40 pointer-events-none" />
            <input
              id="search-input"
              type="text"
              placeholder="Search games (Minecraft, Roblox, Slope, 1v1.lol...)"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-2xl bg-[#0a0c12]/80 backdrop-blur-3xl border border-white/[0.1] text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-[#2997ff] focus:ring-1 focus:ring-[#2997ff] transition shadow-2xl"
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
        <div className="pointer-events-auto flex items-center gap-1.5 bg-[#0a0c12]/80 backdrop-blur-3xl p-1.5 rounded-2xl border border-white/[0.1] shadow-2xl">
          {/* Catalog Drawer Launcher */}
          <button
            id="open-catalog-btn"
            onClick={() => {
              soundFX.playSelect();
              if (onOpenCatalog) onOpenCatalog();
            }}
            title="Browse all game thumbnails in catalog drawer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-semibold transition cursor-pointer active:scale-95"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-[#2997ff]" />
            <span className="hidden sm:inline">Drawer</span>
          </button>

          {/* VIP Section Passkey Button */}
          <button
            id="vip-vault-btn"
            onClick={() => {
              soundFX.playSelect();
              if (onOpenVipModal) onOpenVipModal();
            }}
            title={
              isVipUnlocked
                ? 'VIP Executive Vault Active (220+ Games Unlocked)'
                : 'Unlock VIP Executive Vault'
            }
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer active:scale-95 ${
              isVipUnlocked
                ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.5)] border border-amber-300'
                : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-amber-200 border border-amber-400/30'
            }`}
          >
            <Crown
              className={`w-3.5 h-3.5 ${isVipUnlocked ? 'fill-black text-black' : 'text-amber-400'}`}
            />
            <span>{isVipUnlocked ? 'VIP Active' : 'VIP Vault'}</span>
          </button>

          {/* Random Game */}
          <button
            id="random-game-btn"
            onClick={() => {
              soundFX.playSelect();
              onRandomGame();
            }}
            title="Launch Random Game"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2997ff] hover:bg-[#0071e3] text-white text-xs font-semibold shadow-[0_0_15px_rgba(41,151,255,0.3)] transition cursor-pointer active:scale-95"
          >
            <Dices className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Random</span>
          </button>

          {/* Add Game Button */}
          <button
            onClick={onOpenAddModal}
            title="Add Custom Game URL"
            className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-white/80 hover:text-white transition cursor-pointer active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>

          {/* 3D Layout Switcher (spatial mode only) */}
          {viewMode === 'spatial' && (
            <div className="hidden lg:flex items-center gap-1 pl-1 border-l border-white/[0.1]">
              <button
                onClick={() => onChangeLayout('ring')}
                title="Ring Layout (Vision Pro Cylinder)"
                className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                  layoutMode === 'ring'
                    ? 'bg-white text-black font-bold shadow-xs'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                <Circle className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onChangeLayout('grid')}
                title="Grid Matrix Layout"
                className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                  layoutMode === 'grid'
                    ? 'bg-white text-black font-bold shadow-xs'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onChangeLayout('helix')}
                title="Helix Spiral Layout"
                className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                  layoutMode === 'helix'
                    ? 'bg-white text-black font-bold shadow-xs'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Auto Rotate Toggle (spatial mode only) */}
          {viewMode === 'spatial' && (
            <button
              onClick={onToggleAutoRotate}
              title={autoRotate ? 'Pause 3D orbit rotation' : 'Resume 3D orbit rotation'}
              className={`p-2 rounded-xl border transition cursor-pointer active:scale-95 ${
                autoRotate
                  ? 'bg-white/[0.12] border-white/[0.15] text-[#2997ff]'
                  : 'bg-white/[0.04] border-white/[0.08] text-white/40 hover:text-white'
              }`}
            >
              <RotateCw
                className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`}
                style={{ animationDuration: '8s' }}
              />
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            className={`p-2 rounded-xl border transition cursor-pointer active:scale-95 ${
              soundEnabled
                ? 'bg-white/[0.12] border-white/[0.15] text-[#2997ff]'
                : 'bg-white/[0.04] border-white/[0.08] text-white/40 hover:text-white'
            }`}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Stealth DeltaMath Cloak button */}
          <button
            id="deltamath-cloak-btn"
            onClick={() => {
              soundFX.playClose();
              if (onCloakToDeltaMath) {
                onCloakToDeltaMath();
              }
            }}
            title="Instant Stealth Cloak: Return to DeltaMath [ESC]"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-blue-600/20 hover:bg-[#0071e3] border border-blue-400/30 text-blue-200 hover:text-white text-xs font-semibold transition shadow-sm cursor-pointer active:scale-95"
          >
            <span className="font-serif font-black text-sm text-blue-300">Δ</span>
            <span className="hidden xl:inline">DeltaMath Cloak</span>
          </button>
        </div>
      </div>

      {/* Category Pills Row (Apple-grade floating pill bar with sliding spring highlight) */}
      <div className="pointer-events-auto flex items-center justify-center gap-1.5 overflow-x-auto py-1 px-2 no-scrollbar max-w-full mx-auto">
        <div className="flex items-center gap-1 bg-[#0a0c12]/80 backdrop-blur-3xl p-1.5 rounded-2xl border border-white/[0.1] shadow-2xl">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  soundFX.playHover();
                  onSelectCategory(cat);
                }}
                className={`relative px-3.5 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer select-none z-10 ${
                  isSelected ? 'text-black font-semibold' : 'text-white/70 hover:text-white'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-white rounded-xl shadow-md -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                {cat === 'Favorites' ? (
                  <span className="flex items-center gap-1">
                    <Star
                      className={`w-3 h-3 ${
                        isSelected ? 'fill-black text-black' : 'fill-amber-300 text-amber-300'
                      }`}
                    />
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
    </motion.header>
  );
};
