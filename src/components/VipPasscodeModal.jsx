import React, { useState, useEffect, useRef } from 'react';
import { Crown, Sparkles, X, CheckCircle2, ShieldCheck, Lock, ArrowRight } from 'lucide-react';
import { soundFX } from '../utils/audio.js';

export const VipPasscodeModal = ({ isOpen, onClose, onSuccess }) => {
  const [digits, setDigits] = useState(['', '', '', '']);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Reset and auto focus on open
  useEffect(() => {
    if (isOpen) {
      setDigits(['', '', '', '']);
      setIsError(false);
      setIsSuccess(false);
      setTimeout(() => {
        if (inputRefs[0].current) {
          inputRefs[0].current.focus();
        }
      }, 100);
    }
  }, [isOpen]);

  const handleDigitChange = (index, value) => {
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned && value !== '') return;

    soundFX.playKeyClick();
    const newDigits = [...digits];
    newDigits[index] = cleaned.slice(-1);
    setDigits(newDigits);

    if (cleaned && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    const entered = newDigits.join('');
    if (entered.length === 4) {
      verifyCode(entered);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputRefs[index - 1].current?.focus();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const verifyCode = (code) => {
    // Passkey specified by user: 0711
    if (code === '0711') {
      setIsSuccess(true);
      soundFX.playVipFanfare();
      setTimeout(() => {
        onSuccess();
      }, 800);
    } else {
      setIsError(true);
      soundFX.playErrorShake();
      setTimeout(() => {
        setDigits(['', '', '', '']);
        setIsError(false);
        inputRefs[0].current?.focus();
      }, 700);
    }
  };

  const handleKeypadPress = (val) => {
    if (isSuccess) return;
    const nextEmptyIndex = digits.findIndex((d) => d === '');
    if (nextEmptyIndex !== -1) {
      handleDigitChange(nextEmptyIndex, val);
    }
  };

  const handleKeypadBackspace = () => {
    soundFX.playKeyClick();
    const lastFilledIndex = [...digits].reverse().findIndex((d) => d !== '');
    if (lastFilledIndex !== -1) {
      const realIndex = 3 - lastFilledIndex;
      const newDigits = [...digits];
      newDigits[realIndex] = '';
      setDigits(newDigits);
      inputRefs[realIndex].current?.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl transition-all duration-300">
      <div
        className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#181102] via-[#0d0a03] to-[#050401] border backdrop-blur-3xl shadow-[0_25px_80px_rgba(245,158,11,0.25)] transition-all duration-300 ${
          isError
            ? 'border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.4)] animate-shake'
            : isSuccess
            ? 'border-amber-400 shadow-[0_0_70px_rgba(251,191,36,0.6)]'
            : 'border-amber-500/40'
        }`}
      >
        {/* Glowing Gold Ambient Backlight */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            soundFX.playClose();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/40 text-white/50 hover:text-amber-300 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 text-black shadow-[0_0_35px_rgba(245,158,11,0.5)]">
            <Crown className="w-8 h-8 text-black" />
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-400"></span>
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-[11px] font-mono font-bold tracking-widest uppercase mb-2">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>VIP PASSKEY ACCESS</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white font-['Chakra_Petch'] tracking-tight">
            VIP EXECUTIVE VAULT
          </h3>
          <p className="text-xs text-amber-100/70 mt-1.5 max-w-xs leading-relaxed">
            Enter the 4-digit passkey to unlock the ultra gold theme and complete access to 200+ games.
          </p>
        </div>

        {/* 4 Digit Passkey Inputs */}
        <div className="flex justify-center gap-3 sm:gap-4 my-6">
          {digits.map((d, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleDigitChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-13 h-16 sm:w-14 sm:h-18 text-center text-2xl sm:text-3xl font-black font-['Chakra_Petch'] rounded-2xl border transition-all duration-200 focus:outline-none ${
                isSuccess
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.6)]'
                  : isError
                  ? 'bg-red-500/20 border-red-500 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                  : d
                  ? 'bg-amber-500/15 border-amber-400/60 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'bg-white/5 border-white/10 text-white/40 focus:border-amber-400 focus:bg-amber-500/10 focus:shadow-[0_0_20px_rgba(245,158,11,0.25)]'
              }`}
            />
          ))}
        </div>

        {/* Status Indicator */}
        <div className="h-6 flex items-center justify-center text-center">
          {isSuccess ? (
            <div className="flex items-center gap-2 text-amber-300 text-xs font-mono font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>PASSKEY VERIFIED • 216+ GAMES UNLOCKED</span>
            </div>
          ) : isError ? (
            <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-bold animate-in fade-in">
              <span>INVALID PASSKEY. TRY AGAIN</span>
            </div>
          ) : (
            <div className="text-[11px] text-white/40 font-mono flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-amber-400/60" />
              <span>ENTER 4-DIGIT EXECUTIVE PASSKEY</span>
            </div>
          )}
        </div>

        {/* Tactical On-Screen Numeric Keypad */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-amber-500/20">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleKeypadPress(num.toString())}
              className="py-3 rounded-xl bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/40 text-white font-bold text-base font-['Chakra_Petch'] transition active:scale-95 shadow-xs cursor-pointer"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => {
              soundFX.playKeyClick();
              setDigits(['', '', '', '']);
              inputRefs[0].current?.focus();
            }}
            title="Clear all digits"
            className="py-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white/60 hover:text-white font-mono text-xs font-bold transition active:scale-95 cursor-pointer"
          >
            CLEAR
          </button>
          <button
            onClick={() => handleKeypadPress('0')}
            className="py-3 rounded-xl bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/40 text-white font-bold text-base font-['Chakra_Petch'] transition active:scale-95 shadow-xs cursor-pointer"
          >
            0
          </button>
          <button
            onClick={handleKeypadBackspace}
            className="py-3 rounded-xl bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-400/40 text-white/70 hover:text-red-300 font-mono text-xs font-bold transition active:scale-95 shadow-xs cursor-pointer"
          >
            ⌫ DEL
          </button>
        </div>

        {/* Benefits Preview */}
        <div className="mt-5 p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 flex items-center justify-between text-[11px] text-amber-200/80 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>VIP Benefits: 77 Exclusive Games • 24K Gold 3D Scene</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-amber-400 text-black font-black text-[9px]">
            ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
};
