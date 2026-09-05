import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Star, Sparkles, Crown, Gamepad2, ChevronRight, ChevronLeft, ShieldCheck, Flame } from 'lucide-react';
import { GameThumbnail } from '../utils/gameThumbnails.jsx';
import { soundFX } from '../utils/audio.js';

export const RetinaShowcase = ({
  games,
  activeCategory,
  searchQuery,
  favorites,
  onSelectGame,
  onToggleFavorite,
  isVipUnlocked,
  onOpenVipModal,
}) => {
  // Filtered games based on category and search
  const filteredGames = games.filter((game) => {
    const matchesSearch =
      !searchQuery ||
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === 'All' ||
      (activeCategory === 'Favorites' && favorites.includes(game.id)) ||
      game.category.toLowerCase() === activeCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Spotlight featured games (curated top picks)
  const spotlightGames = [
    games.find((g) => g.id.includes('minecraft')) || games[0],
    games.find((g) => g.id.includes('slope')) || games[1],
    games.find((g) => g.id.includes('roblox') || g.id.includes('1v1')) || games[2],
    games.find((g) => g.id.includes('subway') || g.id.includes('fnaf')) || games[3],
  ].filter(Boolean);

  const [activeSpotlightIdx, setActiveSpotlightIdx] = useState(0);

  // Auto-advance spotlight every 7 seconds
  useEffect(() => {
    if (spotlightGames.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSpotlightIdx((prev) => (prev + 1) % spotlightGames.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [spotlightGames.length]);

  const currentHero = spotlightGames[activeSpotlightIdx] || games[0];

  return (
    <div className="w-full h-full overflow-y-auto px-4 sm:px-8 pt-24 pb-20 no-scrollbar">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Apple Arcade Hero Spotlight */}
        {!searchQuery && activeCategory === 'All' && currentHero && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full rounded-3xl overflow-hidden border border-white/[0.12] bg-[#0c0e14] shadow-[0_30px_90px_rgba(0,0,0,0.8)]"
          >
            {/* Ambient Backlight Glow behind hero */}
            <div
              className="absolute inset-0 opacity-40 blur-3xl transition-colors duration-1000"
              style={{
                background: `radial-gradient(circle at 70% 30%, ${
                  currentHero.color || '#2997ff'
                } 0%, transparent 65%)`,
              }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-6 sm:p-10 gap-8 min-h-[360px] sm:min-h-[420px]">
              {/* Left Column: Typography & CTAs */}
              <div className="flex-1 flex flex-col items-start gap-4 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-white/[0.08] text-[#2997ff] border border-white/[0.1] backdrop-blur-md">
                    Featured Arcade // 4K Retina
                  </span>
                  {(currentHero.vip || isVipUnlocked) && (
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                      <Crown className="w-3 h-3" /> VIP Edition
                    </span>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentHero.id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col gap-2"
                  >
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
                      {currentHero.title}
                    </h2>
                    <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-lg mt-1">
                      {currentHero.description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => {
                      soundFX.playSelect();
                      onSelectGame(currentHero);
                    }}
                    className="flex items-center gap-2.5 px-7 py-3 rounded-full bg-white text-black hover:bg-[#2997ff] hover:text-white font-semibold text-sm transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.2)] active:scale-95 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Play Now</span>
                  </button>

                  <button
                    onClick={() => {
                      soundFX.playKeyClick();
                      onToggleFavorite(currentHero.id);
                    }}
                    className={`p-3 rounded-full border text-sm transition-all cursor-pointer active:scale-95 ${
                      favorites.includes(currentHero.id)
                        ? 'bg-amber-400/20 border-amber-400/50 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                        : 'bg-white/[0.06] border-white/[0.12] text-white/60 hover:text-white hover:bg-white/[0.1]'
                    }`}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        favorites.includes(currentHero.id) ? 'fill-amber-300' : ''
                      }`}
                    />
                  </button>

                  <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-white/50 pl-2">
                    <span className="text-amber-300 flex items-center gap-1">
                      ★ {currentHero.rating}
                    </span>
                    <span>•</span>
                    <span>{currentHero.category}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Artwork Showcase */}
              <div className="relative w-full max-w-md aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.14] shadow-2xl shrink-0 group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentHero.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    <GameThumbnail
                      game={currentHero}
                      isVip={isVipUnlocked || currentHero.vip}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Laser specular shine sweep on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>
            </div>

            {/* Spotlight Navigation Indicators */}
            <div className="absolute bottom-4 right-6 sm:right-10 z-20 flex items-center gap-2">
              {spotlightGames.map((game, idx) => (
                <button
                  key={game.id}
                  onClick={() => {
                    soundFX.playHover();
                    setActiveSpotlightIdx(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSpotlightIdx === idx
                      ? 'w-8 bg-white shadow-sm'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {activeCategory === 'All'
                ? 'Retina Pro Collection'
                : `${activeCategory} Collection`}
            </h3>
            <p className="text-xs sm:text-sm text-white/50 mt-0.5">
              Showing {filteredGames.length} verified unblocked titles • 4K Native
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/[0.05] text-white/60 border border-white/[0.08]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2997ff]" />
              Securly & GoGuardian Bypassed
            </span>
          </div>
        </div>

        {/* Bento Grid: 4K Retina Game Cards */}
        {filteredGames.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3 bg-[#0c0e14]/60 rounded-3xl border border-white/[0.08]">
            <Gamepad2 className="w-12 h-12 text-white/20" />
            <h4 className="text-lg font-semibold text-white">No games found</h4>
            <p className="text-sm text-white/40 max-w-sm">
              Try adjusting your search query or switching to another category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredGames.map((game, idx) => {
              const isFav = favorites.includes(game.id);
              const isGold = isVipUnlocked || game.vip;

              return (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(0.2, idx * 0.03),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => {
                    soundFX.playSelect();
                    onSelectGame(game);
                  }}
                  className={`group relative flex flex-col rounded-2xl overflow-hidden bg-[#0e1017]/80 backdrop-blur-2xl border transition-all duration-300 hover:-translate-y-1.5 cursor-pointer select-none ${
                    isGold
                      ? 'border-amber-400/30 hover:border-amber-400/70 hover:shadow-[0_15px_40px_rgba(229,193,88,0.25)]'
                      : 'border-white/[0.08] hover:border-white/[0.2] hover:shadow-[0_15px_40px_rgba(0,0,0,0.8)]'
                  }`}
                >
                  {/* Thumbnail Banner (16:10 aspect ratio) */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#07090f]">
                    <GameThumbnail
                      game={game}
                      isVip={isGold}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Top badging */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 backdrop-blur-md text-white/90 border border-white/[0.1]">
                        {game.category}
                      </span>

                      {isGold ? (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-400 text-black shadow-md flex items-center gap-1">
                          <Crown className="w-2.5 h-2.5" /> VIP
                        </span>
                      ) : game.badge ? (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-violet-500/80 text-white shadow-md">
                          {game.badge}
                        </span>
                      ) : null}
                    </div>

                    {/* Play hover trigger overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-semibold text-xs shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Play className="w-3.5 h-3.5 fill-black" />
                        <span>Play</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Info Footer */}
                  <div className="p-3.5 flex flex-col justify-between flex-1 gap-2">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-white tracking-tight leading-snug line-clamp-1 group-hover:text-[#2997ff] transition-colors">
                          {game.title}
                        </h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            soundFX.playKeyClick();
                            onToggleFavorite(game.id);
                          }}
                          className={`p-1 text-xs rounded-full transition-colors cursor-pointer ${
                            isFav
                              ? 'text-amber-300'
                              : 'text-white/30 hover:text-white'
                          }`}
                        >
                          <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-300' : ''}`} />
                        </button>
                      </div>

                      <p className="text-[11px] text-white/50 line-clamp-2 mt-1 leading-relaxed">
                        {game.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-white/40">
                      <span className="flex items-center gap-1 text-amber-300/90 font-medium">
                        ★ {game.rating}
                      </span>
                      <span>
                        {game.plays ? `${Math.floor(game.plays / 1000)}k plays` : 'Verified'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
