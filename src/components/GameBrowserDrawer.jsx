import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  Crown,
  Play,
  Star,
  Compass,
  Lock,
  Gamepad2,
} from 'lucide-react';
import { GameThumbnail } from '../utils/gameThumbnails.jsx';
import { soundFX } from '../utils/audio.js';

export const GameBrowserDrawer = ({
  isOpen,
  onClose,
  games,
  isVipUnlocked,
  onSelectGame,
  onFlyToGame,
  favorites,
  onToggleFavorite,
  onOpenVipModal,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Categories for filter
  const categories = useMemo(() => {
    return ['All', 'VIP Exclusive', 'Favorites', 'Action', 'Driving', 'Puzzle', 'Strategy', 'Sports', 'Arcade', 'Retro'];
  }, []);

  // Filtered games
  const filteredList = useMemo(() => {
    const q = query.trim().toLowerCase();
    return games.filter((g) => {
      // Category filter
      if (selectedCategory === 'VIP Exclusive') {
        if (!g.vip) return false;
      } else if (selectedCategory === 'Favorites') {
        if (!favorites.includes(g.id)) return false;
      } else if (selectedCategory !== 'All') {
        if (g.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
      }

      // Search query
      if (q) {
        return (
          g.title.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [games, query, selectedCategory, favorites]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex justify-end bg-black/70 backdrop-blur-md transition-opacity duration-300">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-2xl h-full bg-[#0c0e14]/90 border-l border-white/[0.12] backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.9)] flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2997ff] to-[#0071e3] flex items-center justify-center text-white font-bold shadow-lg shadow-[#2997ff]/20">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Game Explorer
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/[0.08] text-[#2997ff] border border-white/[0.1]">
                  {filteredList.length} Titles
                </span>
                {isVipUnlocked && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                    <Crown className="w-2.5 h-2.5" /> VIP Unlocked
                  </span>
                )}
              </div>
              <p className="text-xs text-white/50 mt-0.5">
                Full 4K visual directory and instant launcher
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playClose();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-white/60 hover:text-white transition cursor-pointer active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-4 border-b border-white/[0.08] space-y-3 bg-black/20">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-white/40 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title (Slope, Minecraft, Roblox, Subway Surfers...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-[#2997ff] focus:ring-1 focus:ring-[#2997ff] transition"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 p-1 text-white/40 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const isVipCat = cat === 'VIP Exclusive';
              return (
                <button
                  key={cat}
                  onClick={() => {
                    soundFX.playHover();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1 rounded-xl whitespace-nowrap font-medium transition cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                    isSelected
                      ? isVipCat
                        ? 'bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(251,191,36,0.5)] border border-amber-300'
                        : 'bg-white text-black font-semibold shadow-sm'
                      : isVipCat
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-400/30 hover:bg-amber-500/25'
                      : 'bg-white/[0.06] text-white/70 hover:text-white hover:bg-white/[0.1] border border-transparent'
                  }`}
                >
                  {isVipCat && <Crown className="w-3 h-3" />}
                  {cat === 'Favorites' && <Star className="w-3 h-3 fill-amber-300 text-amber-300" />}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Game Cards Grid with Visual Thumbnails */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 custom-scrollbar">
          {filteredList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Gamepad2 className="w-12 h-12 text-white/20 mb-3" />
              <h4 className="text-base font-semibold text-white/80">
                No matching games found
              </h4>
              <p className="text-xs text-white/40 mt-1 max-w-xs">
                Try a different search query or clear the selected category filter.
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-4 px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredList.map((game) => {
              const isFav = favorites.includes(game.id);
              const isLockedVip = game.vip && !isVipUnlocked;

              return (
                <div
                  key={game.id}
                  className={`group relative flex items-center gap-3.5 p-3 rounded-2xl border transition-all duration-200 ${
                    game.vip
                      ? isVipUnlocked
                        ? 'bg-amber-950/20 hover:bg-amber-900/30 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                        : 'bg-[#120f08]/80 hover:bg-[#1a1408] border-amber-500/30'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] hover:border-white/[0.16]'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden shadow-md border border-white/[0.1] bg-black/40">
                    <GameThumbnail
                      game={game}
                      isVip={isVipUnlocked || game.vip}
                      className="w-full h-full object-cover"
                    />

                    {/* VIP Corner Tag on Thumbnail */}
                    {game.vip && (
                      <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-bold bg-amber-400 text-black shadow-sm flex items-center gap-0.5">
                        <Crown className="w-2 h-2" /> VIP
                      </span>
                    )}

                    {/* Locked Badge Overlay */}
                    {isLockedVip && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                        <Lock className="w-5 h-5 text-amber-400" />
                      </div>
                    )}
                  </div>

                  {/* Game Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-semibold text-white truncate leading-tight group-hover:text-[#2997ff] transition-colors">
                        {game.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/[0.08] text-white/70">
                        {game.category}
                      </span>
                      {game.badge && (
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-medium bg-[#af52de]/20 text-purple-200 border border-[#af52de]/30">
                          {game.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-white/60 line-clamp-1 mt-1 leading-relaxed">
                      {game.description}
                    </p>

                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-white/50">
                      <span className="text-amber-300 flex items-center gap-1 font-semibold">
                        ★ {game.rating}
                      </span>
                      <span>•</span>
                      <span>{(game.plays || 150000).toLocaleString()} plays</span>
                      <span>•</span>
                      <span className="truncate">{game.controls || 'Keyboard / Mouse'}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Favorite Button */}
                    <button
                      onClick={() => onToggleFavorite(game.id)}
                      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                      className={`p-2 rounded-xl border text-xs transition cursor-pointer active:scale-95 ${
                        isFav
                          ? 'bg-amber-400/20 border-amber-400/50 text-amber-300'
                          : 'bg-white/[0.05] border-white/[0.08] text-white/40 hover:text-white'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${isFav ? 'fill-amber-300' : ''}`} />
                    </button>

                    {/* Fly to in 3D Button */}
                    <button
                      onClick={() => {
                        soundFX.playSelect();
                        onFlyToGame(game);
                        onClose();
                      }}
                      title="Locate & Focus in 3D scene"
                      className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] text-white/60 hover:text-[#2997ff] transition cursor-pointer active:scale-95"
                    >
                      <Compass className="w-4 h-4" />
                    </button>

                    {/* Play Button */}
                    {isLockedVip ? (
                      <button
                        onClick={() => {
                          soundFX.playKeyClick();
                          onOpenVipModal();
                        }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-400 text-amber-300 hover:text-black border border-amber-400/50 text-xs font-semibold transition cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.2)] active:scale-95"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>VIP</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          soundFX.playSelect();
                          onSelectGame(game);
                          onClose();
                        }}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2997ff] hover:bg-[#0071e3] text-white font-semibold text-xs tracking-tight transition shadow-[0_0_15px_rgba(41,151,255,0.4)] cursor-pointer active:scale-95"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Play</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer Status */}
        <div className="p-3 sm:p-4 border-t border-white/[0.08] bg-black/40 flex items-center justify-between text-xs text-white/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2997ff] animate-ping" />
            <span>Total Titles: <strong className="text-white font-semibold">{games.length}</strong></span>
          </div>
          <div>
            {!isVipUnlocked ? (
              <button
                onClick={onOpenVipModal}
                className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Unlock VIP Vault</span>
              </button>
            ) : (
              <span className="text-amber-300 font-semibold flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 fill-amber-300" />
                <span>VIP 24K Gold Active</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
