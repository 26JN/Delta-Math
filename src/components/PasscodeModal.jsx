import React, { useState, useEffect, useRef } from 'react';
import { Lock, Unlock, X, ShieldAlert, CheckCircle2, KeyRound } from 'lucide-react';
import { soundFX } from '../utils/audio.js';

export const PasscodeModal = ({ isOpen, onClose, onSuccess }) => {
  const [digits, setDigits] = useState(['', '', '', '']);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Auto focus first digit on open
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
    // Only accept numeric digit
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned && value !== '') return;

    soundFX.playKeyClick();
    const newDigits = [...digits];
    newDigits[index] = cleaned.slice(-1);
    setDigits(newDigits);

    // Auto advance to next input
    if (cleaned && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // If 4 digits entered, verify
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
    if (code === '0711') {
      setIsSuccess(true);
      soundFX.playVipFanfare();
      setTimeout(() => {
        onSuccess(true); // VIP mode unlocked!
      }, 700);
    } else if (code === '1234') {
      setIsSuccess(true);
      soundFX.playUnlockChime();
      setTimeout(() => {
        onSuccess(false);
      }, 600);
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xl transition-all duration-300">
      <div
        className={`relative w-full max-w-sm rounded-3xl p-6 sm:p-8 bg-[#0d1117]/85 border backdrop-blur-3xl shadow-[0_20px_70px_rgba(0,0,0,0.8)] transition-all duration-300 ${
          isError
            ? 'border-red-500/60 shadow-[0_0_40px_rgba(239,68,68,0.3)] animate-[shake_0.4s_ease-in-out]'
            : isSuccess
            ? 'border-emerald-400/80 shadow-[0_0_50px_rgba(52,211,153,0.4)] scale-105'
            : 'border-white/20'
        }`}
      >
        {/* Subtle Ambient Radial Light */}
        <div
          className={`absolute -top-16 -left-16 w-32 h-32 rounded-full blur-3xl transition-opacity duration-500 pointer-events-none ${
            isSuccess ? 'bg-emerald-500/30' : isError ? 'bg-red-500/20' : 'bg-blue-500/20'
          }`}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon */}
        <div className="flex flex-col items-center text-center">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isSuccess
                ? 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.4)]'
                : isError
                ? 'bg-red-500/20 border border-red-500/50 text-red-400'
                : 'bg-white/5 border border-white/15 text-blue-400 shadow-inner'
            }`}
          >
            {isSuccess ? (
              <Unlock className="w-7 h-7 animate-bounce text-emerald-300" />
            ) : isError ? (
              <ShieldAlert className="w-7 h-7 text-red-400" />
            ) : (
              <Lock className="w-7 h-7 text-[#2997ff]" />
            )}
          </div>

          <h3 className="mt-4 text-lg font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
            {isSuccess
              ? 'ACCESS AUTHORIZED'
              : isError
              ? 'INCORRECT PASSCODE'
              : 'ENTER ACCESS CODE'}
          </h3>
          <p className="text-xs text-white/50 mt-1 font-mono">
            {isSuccess
              ? 'Decrypting 3D WebGL Library...'
              : isError
              ? 'Security code verification failed. Try again.'
              : 'Authorized personnel override'}
          </p>
        </div>

        {/* 4-digit PIN Inputs */}
        <div className="flex items-center justify-center gap-3 my-6">
          {digits.map((digit, idx) => (
            <input
              key={idx}
              ref={inputRefs[idx]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className={`w-12 h-14 text-center text-xl font-mono font-bold rounded-2xl border transition-all duration-200 focus:outline-none ${
                isSuccess
                  ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                  : isError
                  ? 'border-red-500/70 bg-red-500/10 text-red-300'
                  : digit
                  ? 'border-[#2997ff] bg-white/10 text-white shadow-[0_0_12px_rgba(41,151,255,0.3)]'
                  : 'border-white/15 bg-white/5 text-white/80 focus:border-[#2997ff] focus:bg-white/10'
              }`}
            />
          ))}
        </div>

        {/* Apple-style On-Screen Keypad */}
        <div className="grid grid-cols-3 gap-2 pt-1 max-w-[260px] mx-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleKeypadPress(num)}
              className="h-11 rounded-xl bg-white/5 hover:bg-white/15 active:bg-white/20 border border-white/10 text-white font-semibold text-base transition duration-150 flex items-center justify-center cursor-pointer select-none"
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setDigits(['', '', '', ''])}
            className="h-11 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 text-xs font-mono transition flex items-center justify-center cursor-pointer select-none"
          >
            CLEAR
          </button>
          <button
            type="button"
            onClick={() => handleKeypadPress('0')}
            className="h-11 rounded-xl bg-white/5 hover:bg-white/15 active:bg-white/20 border border-white/10 text-white font-semibold text-base transition duration-150 flex items-center justify-center cursor-pointer select-none"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleKeypadBackspace}
            className="h-11 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 text-xs font-mono transition flex items-center justify-center cursor-pointer select-none"
          >
            DEL
          </button>
        </div>

        {/* Discreet security footer */}
        <div className="mt-5 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono text-white/40 bg-white/5 border border-white/10">
            <KeyRound className="w-3 h-3 text-[#2997ff]" />
            <span>DeltaMath Classroom Security Active</span>
          </span>
        </div>
      </div>
    </div>
  );
};
