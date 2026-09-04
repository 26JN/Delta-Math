import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  RotateCcw,
  Maximize2,
  ExternalLink,
  Shield,
  Star,
  EyeOff,
  Sparkles,
  Gamepad2,
} from 'lucide-react';
import { soundFX } from '../utils/audio.js';

export const GameOverlay = ({
  game,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [isDisguised, setIsDisguised] = useState(false);

  // Handle ESC key to return to 3D Hub
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        soundFX.playClose();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Tab cloak / disguise effect
  useEffect(() => {
    const originalTitle = document.title;
    if (isDisguised) {
      document.title = 'Google Classroom - Class Dashboard';
    } else {
      document.title = game ? `${game.title} - 3D Unblocked Games Hub` : '3D Unblocked Games Hub';
    }
    return () => {
      document.title = originalTitle;
    };
  }, [isDisguised, game]);

  // Reset loading whenever game changes
  useEffect(() => {
    if (game) {
      setIsLoading(true);
    }
  }, [game]);

  if (!game) return null;

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const handleFullscreen = () => {
    const frameContainer = document.getElementById('game-fullscreen-container');
    if (frameContainer) {
      if (!document.fullscreenElement) {
        frameContainer.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  // Stealth Cloak: open an unblocked about:blank window with iframe
  const handleStealthLaunch = () => {
    const newWindow = window.open('about:blank', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Classroom Assignment</title>
            <style>
              body, html { margin:0; padding:0; height:100%; overflow:hidden; background:#000; }
              iframe { width:100%; height:100%; border:none; }
            </style>
          </head>
          <body>
            <iframe src="${game.url}" allowfullscreen allow="autoplay; fullscreen; pointer-lock"></iframe>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <div
      id="game-fullscreen-container"
      className="fixed inset-0 z-50 flex flex-col bg-[#050505] text-white select-none animate-in fade-in duration-200"
    >
      {/* Top Header Bar */}
      <header className="flex items-center justify-between px-3 sm:px-6 py-2.5 bg-black/60 backdrop-blur-2xl border-b border-white/10 z-10 shrink-0">
        <div className="flex items-center gap-3">
          {/* Back button */}
          <button
            onClick={() => {
              soundFX.playClose();
              onClose();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to 3D Hub</span>
            <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] font-mono bg-white/10 rounded border border-white/20">ESC</kbd>
          </button>

          {/* Game Title info */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: game.color || '#00ffcc',
                boxShadow: `0 0 10px ${game.color || '#00ffcc'}`,
              }}
            />
            <h2 className="text-sm sm:text-base font-bold font-['Chakra_Petch'] tracking-wide">
              {game.title}
            </h2>
            <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/10 text-cyan-300 border border-white/10">
              {game.category}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Favorite button */}
          <button
            onClick={() => onToggleFavorite(game.id)}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className={`p-2 rounded-xl border text-xs transition cursor-pointer ${
              isFavorite
                ? 'bg-amber-400/20 border-amber-400/50 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10'
            }`}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-300' : ''}`} />
          </button>

          {/* Tab Cloak button */}
          <button
            onClick={() => setIsDisguised((prev) => !prev)}
            title="Disguise browser tab title as Google Classroom"
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer ${
              isDisguised
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
            }`}
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>{isDisguised ? 'Cloaked' : 'Tab Cloak'}</span>
          </button>

          {/* Stealth about:blank launch */}
          <button
            onClick={handleStealthLaunch}
            title="Launch in stealth about:blank window to bypass browser history"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white text-xs font-semibold transition cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-[#00FFCC]" />
            <span>About:Blank</span>
          </button>

          {/* Reload Iframe */}
          <button
            onClick={handleReload}
            title="Reload game container"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Open Direct URL in new tab */}
          <a
            href={game.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open direct URL in new tab"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Fullscreen Button */}
          <button
            onClick={handleFullscreen}
            title="Toggle fullscreen display"
            className="p-2 rounded-xl bg-[#00FFCC] hover:bg-white text-black font-bold transition shadow-[0_0_15px_rgba(0,255,204,0.3)] cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Game Frame Container */}
      <main className="relative flex-1 w-full h-full bg-black overflow-hidden">
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050505] gap-4">
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-[#00FFCC] animate-spin" />
              <Gamepad2 className="absolute w-7 h-7 text-[#00FFCC] animate-pulse" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-bold font-['Chakra_Petch'] tracking-wide text-white">
                INITIALIZING UNBLOCKED CONTAINER
              </p>
              <p className="text-xs text-white/40 font-mono">
                Connecting to {new URL(game.url).hostname || 'game mirror'}...
              </p>
            </div>
          </div>
        )}

        {/* Embedded Iframe */}
        <iframe
          key={iframeKey}
          id="active-game-iframe"
          src={game.url}
          title={game.title}
          allowFullScreen
          allow="autoplay; fullscreen; pointer-lock; camera; microphone; payment"
          sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          onLoad={() => setIsLoading(false)}
          className="w-full h-full border-none select-auto"
        />

        {/* Quick controls tooltip in corner */}
        {game.controls && (
          <div className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 text-white/70 text-xs pointer-events-none">
            <span className="text-[#00FFCC] font-bold font-mono">CONTROLS:</span>
            <span>{game.controls}</span>
          </div>
        )}
      </main>
    </div>
  );
};
