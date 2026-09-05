import React from 'react';
import { Star, Play, Sparkles, Gamepad2, MousePointer2, Compass, Crown } from 'lucide-react';
import { soundFX } from '../utils/audio.js';
import { GameThumbnail } from '../utils/gameThumbnails.jsx';

export const HologramHUD = ({
  hoveredGame,
  onSelectGame,
  isFavorite,
  onToggleFavorite,
  isVipUnlocked = false,
}) => {
  return (
    <div className="absolute bottom-8 left-4 right-4 z-20 pointer-events-none flex flex-col items-center">
      {hoveredGame ? (
        <div
          className={`pointer-events-auto w-full max-w-xl bg-[#0f1117]/85 backdrop-blur-3xl rounded-3xl p-4 sm:p-5 border shadow-2xl transition-all animate-apple-in ${
            hoveredGame.vip || isVipUnlocked
              ? 'border-amber-400/40 shadow-[0_0_50px_rgba(229,193,88,0.25)]'
              : 'border-white/[0.12] shadow-[0_25px_60px_rgba(0,0,0,0.85)]'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3.5">
              {/* 4K Game Thumbnail Art */}
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-xl shrink-0 border border-white/[0.14] bg-[#0c0e14]">
                <GameThumbnail
                  game={hoveredGame}
                  isVip={isVipUnlocked || hoveredGame.vip}
                  className="w-full h-full object-cover"
                />
                {(hoveredGame.vip || isVipUnlocked) && (
                  <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-amber-400 text-black shadow-md flex items-center gap-0.5">
                    <Crown className="w-2.5 h-2.5" /> VIP
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
                    {hoveredGame.title}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/[0.08] text-[#2997ff] border border-white/[0.1]">
                    {hoveredGame.category}
                  </span>
                  {hoveredGame.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-violet-500/20 text-violet-300 border border-violet-500/30">
                      {hoveredGame.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-white/70 mt-1.5 line-clamp-2 leading-relaxed font-normal">
                  {hoveredGame.description}
                </p>
              </div>
            </div>

            {/* Rating & Favorite */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              <div className="flex items-center gap-1 text-xs font-semibold text-amber-300 bg-white/[0.06] px-2.5 py-1 rounded-full border border-white/[0.08] shadow-sm">
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                {hoveredGame.rating}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundFX.playKeyClick();
                  onToggleFavorite(hoveredGame.id);
                }}
                className={`p-2 rounded-full border text-xs transition cursor-pointer active:scale-95 ${
                  isFavorite
                    ? 'bg-amber-400/20 border-amber-400/50 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                    : 'bg-white/[0.04] border-white/[0.08] text-white/40 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-300' : ''}`} />
              </button>
            </div>
          </div>

          {/* Bottom row: Controls & Apple-style Launch Button */}
          <div className="mt-4 pt-3.5 border-t border-white/[0.08] flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-white/60 text-[11px] truncate max-w-[260px] sm:max-w-none">
              <Gamepad2 className="w-4 h-4 text-[#2997ff] shrink-0" />
              <span className="truncate">{hoveredGame.controls || 'Keyboard / Touch / Controller'}</span>
            </div>

            <button
              onClick={() => {
                soundFX.playSelect();
                onSelectGame(hoveredGame);
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-xs tracking-tight transition-all cursor-pointer active:scale-95 shadow-lg ${
                hoveredGame.vip || isVipUnlocked
                  ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-black shadow-[0_0_20px_rgba(251,191,36,0.5)] hover:brightness-110'
                  : 'bg-[#2997ff] hover:bg-[#0071e3] text-white shadow-[0_0_20px_rgba(41,151,255,0.4)]'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{hoveredGame.vip || isVipUnlocked ? 'Play 24K VIP' : 'Play Game'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Floating Apple Instruction Pill when nothing is hovered */
        <div className="pointer-events-auto flex items-center gap-3 px-5 py-2 rounded-full bg-[#0f1117]/80 backdrop-blur-2xl border border-white/[0.1] text-white/70 text-xs shadow-2xl animate-apple-in">
          <span className="flex items-center gap-1.5 text-[#2997ff] font-medium">
            <MousePointer2 className="w-3 h-3" />
            <span>Drag to Orbit</span>
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5 text-white/80 font-medium">
            <Compass className="w-3 h-3 text-[#af52de]" />
            <span>Scroll to Zoom</span>
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <Sparkles className="w-3 h-3" />
            <span>Click Cartridge to Play</span>
          </span>
        </div>
      )}
    </div>
  );
};
