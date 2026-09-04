import React from 'react';
import { Star, Play, Sparkles, Gamepad2, MousePointer2, Compass } from 'lucide-react';
import { soundFX } from '../utils/audio.js';

export const HologramHUD = ({
  hoveredGame,
  onSelectGame,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="absolute bottom-8 left-4 right-4 z-20 pointer-events-none flex flex-col items-center">
      {hoveredGame ? (
        <div className="pointer-events-auto w-full max-w-xl bg-white/5 backdrop-blur-2xl border border-[#00FFCC]/40 rounded-2xl p-4 shadow-[0_0_50px_rgba(0,255,204,0.2)] animate-in slide-in-from-bottom-3 duration-150">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              {/* Glowing category avatar badge */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg font-['Chakra_Petch'] text-black shadow-lg shrink-0 border border-white/20"
                style={{
                  backgroundColor: hoveredGame.color || '#00ffcc',
                  boxShadow: `0 0 20px ${hoveredGame.color || '#00ffcc'}80`,
                }}
              >
                {hoveredGame.title.slice(0, 2).toUpperCase()}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-black text-white font-['Chakra_Petch'] leading-tight tracking-wide">
                    {hoveredGame.title}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/10 text-[#00FFCC] border border-white/15">
                    {hoveredGame.category}
                  </span>
                  {hoveredGame.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#7000FF]/30 text-violet-200 border border-[#7000FF]/50">
                      {hoveredGame.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-white/70 mt-1.5 line-clamp-2 leading-relaxed">
                  {hoveredGame.description}
                </p>
              </div>
            </div>

            {/* Rating & Favorite */}
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-300 bg-white/5 px-2.5 py-1 rounded-xl border border-white/15 shadow-sm">
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                {hoveredGame.rating}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(hoveredGame.id);
                }}
                className={`p-1.5 rounded-xl border text-xs transition cursor-pointer ${
                  isFavorite
                    ? 'bg-amber-400/20 border-amber-400/50 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                    : 'bg-white/5 border-white/15 text-white/40 hover:text-white hover:bg-white/10'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-300' : ''}`} />
              </button>
            </div>
          </div>

          {/* Bottom row: controls & Play button */}
          <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-white/60 font-mono text-[11px]">
              <Gamepad2 className="w-4 h-4 text-[#00FFCC]" />
              <span>{hoveredGame.controls || 'Mouse / Keyboard'}</span>
            </div>

            <button
              onClick={() => {
                soundFX.playSelect();
                onSelectGame(hoveredGame);
              }}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#00FFCC] hover:bg-white text-black font-extrabold text-xs tracking-wider transition-all shadow-[0_0_20px_#00FFCC] hover:shadow-[0_0_25px_#ffffff] cursor-pointer"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>PLAY FULLSCREEN</span>
            </button>
          </div>
        </div>
      ) : (
        /* Floating Instruction Pill when nothing hovered */
        <div className="pointer-events-auto flex items-center gap-3 px-5 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white/60 text-xs shadow-2xl">
          <span className="flex items-center gap-1.5 text-[#00FFCC] font-mono">
            <MousePointer2 className="w-3.5 h-3.5" />
            <span>DRAG TO ORBIT</span>
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5 text-white/80 font-mono">
            <Compass className="w-3.5 h-3.5 text-[#7000FF]" />
            <span>SCROLL TO ZOOM</span>
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CLICK CARTRIDGE TO PLAY</span>
          </span>
        </div>
      )}
    </div>
  );
};
