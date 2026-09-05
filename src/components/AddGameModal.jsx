import React, { useState } from 'react';
import { X, Plus, Gamepad2, Link, Palette } from 'lucide-react';

const PRESET_COLORS = [
  '#2997ff',
  '#38bdf8',
  '#f59e0b',
  '#ef4444',
  '#a855f7',
  '#10b981',
  '#ec4899',
  '#eab308',
];

const CATEGORIES = ['Action', 'Arcade', 'Puzzle', 'Retro', 'Driving', 'Casual'];

export const AddGameModal = ({
  isOpen,
  onClose,
  onAddGame,
}) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [color, setColor] = useState('#2997ff');
  const [description, setDescription] = useState('');
  const [controls, setControls] = useState('Keyboard / Mouse');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) {
      setError('Please provide both a Game Title and Iframe URL.');
      return;
    }

    try {
      new URL(url.trim());
    } catch {
      setError('Please enter a valid URL (e.g. https://example.com/game).');
      return;
    }

    const newGame = {
      id: 'custom-' + Date.now(),
      title: title.trim(),
      category,
      url: url.trim(),
      color,
      accent: color,
      description: description.trim() || 'Custom added unblocked game cartridge.',
      controls: controls.trim() || 'Keyboard / Mouse',
      rating: 5.0,
      plays: 1,
      badge: 'Custom',
      isCustom: true,
    };

    onAddGame(newGame);
    onClose();
    // Reset form
    setTitle('');
    setUrl('');
    setDescription('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0c0e14]/90 border border-white/[0.12] rounded-3xl backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-6 text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#2997ff]/10 border border-[#2997ff]/30 text-[#2997ff] shadow-[0_0_15px_rgba(41,151,255,0.25)]">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-white">
                Add Game Cartridge
              </h3>
              <p className="text-xs text-white/50 mt-0.5">
                Register a new unblocked iframe to your spatial collection
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/40 hover:text-white hover:bg-white/[0.08] transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-sm">
          {error && (
            <div className="p-3 text-xs font-medium text-red-300 bg-red-950/40 border border-red-500/40 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[11px] font-medium text-white/60 uppercase tracking-wider mb-1.5">
              Game Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Neon Drift 3D"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder-white/30 focus:outline-none focus:border-[#2997ff] focus:ring-1 focus:ring-[#2997ff] text-sm transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-white/60 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Link className="w-3.5 h-3.5 text-[#2997ff]" />
              IFrame Embed URL
            </label>
            <input
              type="url"
              required
              placeholder="https://example.com/embed/game"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder-white/30 focus:outline-none focus:border-[#2997ff] focus:ring-1 focus:ring-[#2997ff] text-sm transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-white/60 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12151e] border border-white/[0.1] text-white focus:outline-none focus:border-[#2997ff] text-sm cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-900 text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-white/60 uppercase tracking-wider mb-1.5">
                Controls
              </label>
              <input
                type="text"
                placeholder="e.g. WASD / Mouse"
                value={controls}
                onChange={(e) => setControls(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder-white/30 focus:outline-none focus:border-[#2997ff] text-sm transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-white/60 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[#2997ff]" />
              3D Cartridge Accent Color
            </label>
            <div className="flex items-center gap-2">
              {PRESET_COLORS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-full border-2 transition transform hover:scale-110 cursor-pointer ${
                    color === c ? 'border-white scale-110 shadow-[0_0_15px_rgba(41,151,255,0.6)]' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-white/60 uppercase tracking-wider mb-1.5">
              Short Description (Optional)
            </label>
            <input
              type="text"
              placeholder="Exciting endless runner with power-ups..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder-white/30 focus:outline-none focus:border-[#2997ff] text-sm transition"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.1] text-white text-xs font-semibold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#2997ff] hover:bg-[#0071e3] text-white font-semibold text-xs transition-all shadow-[0_0_15px_rgba(41,151,255,0.4)] cursor-pointer active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Cartridge
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
