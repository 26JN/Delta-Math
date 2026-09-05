import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
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
  Layers,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Copy,
  Info,
} from 'lucide-react';
import { soundFX } from '../utils/audio.js';
import { getGameMirrors } from '../data/gameMirrors.js';

export const GameOverlay = ({
  game,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [iframeKey, setIframeKey] = useState(0);
  const [isDisguised, setIsDisguised] = useState(false);
  const [selectedMirrorIndex, setSelectedMirrorIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadTimedOut, setLoadTimedOut] = useState(false);
  const [showMirrorMenu, setShowMirrorMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Retrieve mirrors for this game
  const mirrors = useMemo(() => getGameMirrors(game), [game]);
  const activeUrl = mirrors[selectedMirrorIndex]?.url || game?.url;

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

  // Reset loading state and timer on game or mirror switch
  useEffect(() => {
    setIsLoading(true);
    setLoadTimedOut(false);
    const timer = setTimeout(() => {
      setLoadTimedOut(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, [game, selectedMirrorIndex, iframeKey]);

  if (!game) return null;

  const handleReload = () => {
    soundFX.playKeyClick();
    setIsLoading(true);
    setLoadTimedOut(false);
    setIframeKey((prev) => prev + 1);
  };

  const handleFullscreen = () => {
    soundFX.playSelect();
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
  // This bypasses GoGuardian, Securly, and prevents browsing history tracking
  const handleStealthLaunch = () => {
    soundFX.playSelect();
    const newWindow = window.open('about:blank', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>DeltaMath Assignment Portal</title>
            <link rel="icon" type="image/png" href="https://www.google.com/favicon.ico">
            <style>
              * { box-sizing: border-box; }
              body, html { margin: 0; padding: 0; width: 100vw; height: 100vh; overflow: hidden; background: #000; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
              iframe { width: 100%; height: 100%; border: none; display: block; }
              .stealth-hud {
                position: fixed;
                top: 8px;
                right: 12px;
                z-index: 9999;
                display: flex;
                gap: 8px;
                background: rgba(0,0,0,0.7);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255,255,255,0.15);
                border-radius: 9999px;
                padding: 4px 10px;
                color: #fff;
                font-size: 11px;
                font-weight: 600;
                letter-spacing: 0.5px;
                pointer-events: auto;
              }
              .hud-btn {
                background: none;
                border: none;
                color: #00FFCC;
                cursor: pointer;
                font-weight: bold;
                padding: 2px 6px;
                border-radius: 4px;
              }
              .hud-btn:hover { background: rgba(0,255,204,0.2); }
            </style>
          </head>
          <body>
            <div class="stealth-hud">
              <span>CLOAKED SESSION ACTIVE</span>
              <button class="hud-btn" onclick="document.querySelector('iframe').requestFullscreen()">⛶ FULLSCREEN</button>
              <button class="hud-btn" onclick="window.close()">✕ EXIT</button>
            </div>
            <iframe
              src="${activeUrl}"
              allow="autoplay; fullscreen; pointer-lock; gamepad; camera; microphone; clipboard-read; clipboard-write"
              sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-downloads"
            ></iframe>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(activeUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <motion.div
      id="game-fullscreen-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col bg-[#050608] text-white select-none"
    >
      {/* Apple TV-style frosted titanium header */}
      <header className="flex items-center justify-between px-3 sm:px-6 py-2.5 bg-[#0a0c12]/85 backdrop-blur-3xl border-b border-white/[0.1] z-20 shrink-0 shadow-xl">
        {/* Left Section: Back, Game Meta, Badges */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFX.playClose();
              onClose();
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.12] text-white font-medium text-xs transition cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Studio</span>
            <kbd className="hidden md:inline px-1.5 py-0.5 text-[9px] font-mono bg-white/10 rounded border border-white/20 text-white/70">
              ESC
            </kbd>
          </button>

          <div className="flex items-center gap-2.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: game.color || '#2997ff',
                boxShadow: `0 0 12px ${game.color || '#2997ff'}`,
              }}
            />
            <h2 className="text-sm sm:text-base font-bold tracking-tight">
              {game.title}
            </h2>
            <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/[0.08] text-[#2997ff] border border-white/[0.1]">
              {game.category}
            </span>
            {game.vip && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                24K VIP
              </span>
            )}
          </div>
        </div>

        {/* Center: Mirror Switcher Segmented Control */}
        <div className="relative hidden md:flex items-center">
          <div className="flex items-center p-1 bg-black/40 rounded-full border border-white/[0.08] shadow-inner text-xs">
            <button
              onClick={() => setShowMirrorMenu(!showMirrorMenu)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white/90 text-xs font-medium transition cursor-pointer"
            >
              <Layers className="w-3 h-3 text-[#2997ff]" />
              <span>{mirrors[selectedMirrorIndex]?.name || 'Primary Host'}</span>
              <ChevronDown className="w-3 h-3 text-white/40" />
            </button>
          </div>

          {/* Mirror Dropdown Menu */}
          {showMirrorMenu && (
            <div className="absolute top-full left-0 mt-2 w-64 p-2 bg-[#0c0e14]/95 backdrop-blur-2xl rounded-2xl border border-white/[0.12] shadow-2xl z-50 animate-apple-in">
              <div className="px-2 py-1 text-[10px] font-mono text-white/40 uppercase tracking-wider">
                Select Embed Mirror
              </div>
              <div className="space-y-1 mt-1">
                {mirrors.map((m, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedMirrorIndex(idx);
                      setShowMirrorMenu(false);
                      setIsLoading(true);
                      soundFX.playSelect();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition cursor-pointer ${
                      selectedMirrorIndex === idx
                        ? 'bg-[#2997ff]/15 text-[#2997ff] border border-[#2997ff]/30 font-semibold'
                        : 'text-white/70 hover:bg-white/[0.06] hover:text-white border border-transparent'
                    }`}
                  >
                    <span className="truncate">{m.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/60 shrink-0 ml-2 font-mono">
                      {m.tag || 'Mirror'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Section: Apple Pill Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Favorite Toggle */}
          <button
            onClick={() => {
              soundFX.playKeyClick();
              onToggleFavorite(game.id);
            }}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className={`p-2 rounded-full border text-xs transition cursor-pointer active:scale-95 ${
              isFavorite
                ? 'bg-amber-400/20 border-amber-400/50 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                : 'bg-white/[0.05] border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.1]'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-300' : ''}`} />
          </button>

          {/* Tab Cloak Toggle */}
          <button
            onClick={() => {
              soundFX.playKeyClick();
              setIsDisguised((prev) => !prev);
            }}
            title="Disguise browser tab title as Google Classroom"
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition cursor-pointer active:scale-95 ${
              isDisguised
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                : 'bg-white/[0.05] border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.1]'
            }`}
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>{isDisguised ? 'Cloaked' : 'Tab Cloak'}</span>
          </button>

          {/* Stealth About:Blank Launcher */}
          <button
            onClick={handleStealthLaunch}
            title="Launch in an unblocked about:blank container (bypasses school web filters & browser history)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition cursor-pointer active:scale-95"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">about:blank</span>
            <span className="sm:hidden">Cloak</span>
          </button>

          {/* Reload Container */}
          <button
            onClick={handleReload}
            title="Reload game frame"
            className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] text-white/70 hover:text-white transition cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Open Direct Tab */}
          <a
            href={activeUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open direct URL in external tab"
            className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] text-white/70 hover:text-white transition cursor-pointer active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Fullscreen Theater Button */}
          <button
            onClick={handleFullscreen}
            title="Fullscreen theater mode"
            className="p-2 rounded-full bg-[#2997ff] hover:bg-[#0071e3] text-white font-semibold transition shadow-[0_0_15px_rgba(41,151,255,0.4)] cursor-pointer active:scale-95"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Helpful Firewall Unblocker Notice (Appears if school filter delay is detected) */}
      {loadTimedOut && (
        <div className="bg-[#0b0f17]/90 backdrop-blur-xl border-b border-amber-500/30 px-4 py-2 flex items-center justify-between text-xs font-mono text-amber-200/90 z-20 animate-apple-in">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              School firewall blocking this frame? Try <strong>About:Blank Cloak</strong> or switch to another mirror.
            </span>
          </div>
          <div className="flex items-center gap-2">
            {mirrors.length > 1 && (
              <button
                onClick={() => {
                  const next = (selectedMirrorIndex + 1) % mirrors.length;
                  setSelectedMirrorIndex(next);
                  setIsLoading(true);
                  soundFX.playSelect();
                }}
                className="px-2.5 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold transition cursor-pointer"
              >
                Switch Mirror ({mirrors[(selectedMirrorIndex + 1) % mirrors.length].name})
              </button>
            )}
            <button
              onClick={handleStealthLaunch}
              className="px-3 py-1 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold transition cursor-pointer"
            >
              Open Cloaked Window
            </button>
          </div>
        </div>
      )}

      {/* Main Game Frame Container */}
      <main className="relative flex-1 w-full h-full bg-[#020305] overflow-hidden">
        {/* Ultra-Smooth Loading Animation */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#050609] gap-4">
            <div className="relative flex items-center justify-center">
              <div className="w-14 h-14 rounded-full border-2 border-white/[0.08] border-t-[#2997ff] animate-spin" />
              <Gamepad2 className="absolute w-6 h-6 text-[#2997ff] animate-pulse" />
            </div>
            <div className="text-center space-y-1.5 max-w-sm px-4">
              <p className="text-sm font-semibold tracking-tight text-white">
                Connecting to Spatial Stream
              </p>
              <p className="text-xs text-white/50 font-mono truncate">
                {mirrors[selectedMirrorIndex]?.name || 'Connecting to Game Host'}
              </p>
              <p className="text-[11px] text-white/30">
                4K Retina Session Initialized • Bypassing firewall restrictions
              </p>
            </div>
          </div>
        )}

        {/* Embedded Iframe with full WebGL, gamepad, audio, and pointer lock permissions */}
        <iframe
          key={`${iframeKey}-${activeUrl}`}
          id="active-game-iframe"
          src={activeUrl}
          title={game.title}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; pointer-lock; gamepad; camera; microphone"
          sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-downloads"
          onLoad={() => setIsLoading(false)}
          className="w-full h-full border-none select-auto"
        />

        {/* Quick controls tooltip in corner */}
        {game.controls && (
          <div className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/[0.1] text-white/80 text-xs pointer-events-none shadow-xl">
            <span className="text-[#2997ff] font-semibold">Controls:</span>
            <span>{game.controls}</span>
          </div>
        )}
      </main>
    </motion.div>
  );
};
