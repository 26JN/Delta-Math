import React, { useState } from 'react';
import {
  BookOpen,
  Calculator,
  HelpCircle,
  CheckCircle2,
  Clock,
  ChevronRight,
  Shield,
  Lock,
  Sparkles,
  ExternalLink,
  Award,
  Terminal,
  FileText,
  Video,
  Info,
} from 'lucide-react';
import { soundFX } from '../utils/audio.js';

export const DeltaMathView = ({ onOpenSecretCode }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleSubmitMath = (e) => {
    e.preventDefault();
    soundFX.playKeyClick();
    const clean = userAnswer.replace(/\s+/g, '').toLowerCase();

    // Secret passkey trigger right inside math input: 0711 or 1234
    if (clean.includes('0711') || clean.includes('1234')) {
      soundFX.playTransitionWhoosh();
      onOpenSecretCode();
      return;
    }

    // Accept x=1, x=2 or 1,2 or (1,2)
    if (
      clean.includes('1') &&
      clean.includes('2')
    ) {
      soundFX.playSelect();
      setFeedback({
        type: 'correct',
        message: 'Correct! First derivative f\'(x) = 6(x-1)(x-2) = 0 gives critical numbers x = 1 (Local Max) and x = 2 (Local Min). Score: 8/10 (+1.0 pt)',
      });
    } else {
      soundFX.playErrorShake();
      setFeedback({
        type: 'incorrect',
        message: 'Incorrect. Set f\'(x) = 6x² - 18x + 12 = 0 and factor out 6 to find critical points.',
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-800 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-blue-600 selection:text-white pb-16">
      {/* Top DeltaMath School Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#0047AB] text-white font-black text-xl shadow-md shadow-blue-900/20">
              Δ
            </div>
            <div className="leading-tight">
              <span className="text-xl font-extrabold tracking-tight text-[#0047AB]">
                DeltaMath
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                CLASSROOM PLUS
              </span>
            </div>
          </div>

          {/* Quick Academic Tools */}
          <div className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
            <button className="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-blue-700 transition flex items-center gap-1.5 cursor-pointer">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Assignments</span>
            </button>
            <button className="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-blue-700 transition flex items-center gap-1.5 cursor-pointer">
              <Calculator className="w-4 h-4 text-blue-600" />
              <span>Graphing Calc</span>
            </button>
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-blue-700 transition flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Help Videos</span>
            </button>
          </div>

          {/* User Student Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900 leading-none">
                Jordan M.
              </p>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                Period 4 • AP Calculus BC
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm border-2 border-white">
              JM
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Assignment Header Banner */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  DUE FRIDAY 11:59 PM
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Course: AP Calculus BC (Room 204)
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">
                  Instructor: Dr. Harrison
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
                Unit 4 Review: Polynomial Extrema & Optimization
              </h1>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                Solve each differential equation for critical values and verify relative extrema using the First and Second Derivative Tests. Complete all 10 problem modules.
              </p>
            </div>

            {/* Apple-style Progress Indicator */}
            <div className="shrink-0 bg-slate-50 border border-slate-200 rounded-xl p-4 min-w-[200px]">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span>Progress</span>
                <span className="text-blue-600 font-mono">7 / 10 (70%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: '70%' }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5 text-center font-medium">
                Grade: <strong className="text-emerald-600 font-bold">B+ (70.0%)</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Active Math Problem (Problem #8) */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                8
              </span>
              <h2 className="text-sm font-bold text-slate-900 tracking-wide">
                PROBLEM 8 OF 10: RELATIVE EXTREMA OF POLYNOMIALS
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHint((prev) => !prev)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition cursor-pointer"
              >
                {showHint ? 'Hide Hint' : 'Show Derivative Hint'}
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Mathematical Prompt */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 text-slate-800">
              <p className="text-sm font-medium leading-relaxed">
                Consider the continuous cubic polynomial function:
              </p>
              <div className="my-3 py-3 px-4 bg-white rounded-lg border border-slate-200 text-center font-serif text-lg sm:text-xl text-slate-900 shadow-xs tracking-wider">
                <em>f</em>(<em>x</em>) = 2<em>x</em><sup>3</sup> − 9<em>x</em><sup>2</sup> + 12<em>x</em> − 5
              </div>
              <p className="text-sm font-medium">
                Find all critical numbers where <em>f'</em>(<em>x</em>) = 0. List the values of <em>x</em> separated by commas.
              </p>
            </div>

            {/* Hint Box */}
            {showHint && (
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs sm:text-sm font-mono space-y-1">
                <p className="font-bold font-sans text-amber-950">Derivative Walkthrough:</p>
                <p>1. f'(x) = d/dx [ 2x³ − 9x² + 12x − 5 ] = 6x² − 18x + 12</p>
                <p>2. Factor 6: f'(x) = 6(x² − 3x + 2) = 6(x − 1)(x − 2)</p>
                <p>3. Set to 0: x − 1 = 0 or x − 2 = 0 → x = 1, 2</p>
              </div>
            )}

            {/* Interactive Math Input Form */}
            <form onSubmit={handleSubmitMath} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Answer for <em>x</em>
                </label>
                <div className="flex gap-2 max-w-md">
                  <input
                    type="text"
                    placeholder="e.g. x = 1, 2"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-mono text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-white"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#0047AB] hover:bg-blue-800 text-white font-bold text-xs tracking-wider transition shadow-sm cursor-pointer"
                  >
                    SUBMIT ANSWER
                  </button>
                </div>
              </div>

              {/* Math Keyboard Shortcut Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap text-xs font-mono text-slate-600">
                <span className="text-[11px] text-slate-400 font-sans font-medium mr-1">Quick insert:</span>
                {['x = 1, 2', 'x²', '√x', 'f\'(x)', '(x-1)(x-2)', 'π'].map((symbol) => (
                  <button
                    key={symbol}
                    type="button"
                    onClick={() => setUserAnswer((prev) => prev + (prev ? ' ' : '') + symbol)}
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition cursor-pointer"
                  >
                    {symbol}
                  </button>
                ))}
              </div>

              {/* Feedback Alert */}
              {feedback && (
                <div
                  className={`p-4 rounded-xl border text-xs sm:text-sm font-medium flex items-start gap-2.5 transition-all ${
                    feedback.type === 'correct'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-red-50 border-red-200 text-red-900'
                  }`}
                >
                  <Info className="w-4 h-4 shrink-0 mt-0.5 text-current" />
                  <div>{feedback.message}</div>
                </div>
              )}
            </form>
          </div>
        </section>

        {/* Complete Problem List Breakdown */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
            <span>Assignment Checklist (10 Modules)</span>
            <span className="text-xs text-slate-500 font-normal">Auto-saved to Canvas</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {[
              { id: 1, title: 'Factoring Higher Degree Polynomials', status: 'Completed', score: '1/1' },
              { id: 2, title: 'Rational Zero Theorem & Synthetic Division', status: 'Completed', score: '1/1' },
              { id: 3, title: 'Horizontal & Slant Asymptotes', status: 'Completed', score: '1/1' },
              { id: 4, title: 'Derivative Definition by Limit', status: 'Completed', score: '1/1' },
              { id: 5, title: 'Power Rule and Constant Multiple Rule', status: 'Completed', score: '1/1' },
              { id: 6, title: 'Product & Quotient Rules', status: 'Completed', score: '1/1' },
              { id: 7, title: 'Trigonometric Derivative Rates', status: 'Completed', score: '1/1' },
              { id: 8, title: 'Polynomial Extrema & Optimization', status: 'In Progress', score: '0/1' },
              { id: 9, title: 'Concavity & Inflection Points', status: 'Not Started', score: '0/1' },
              { id: 10, title: 'Curve Sketching Synthesis', status: 'Not Started', score: '0/1' },
            ].map((prob) => (
              <div
                key={prob.id}
                className={`flex items-center justify-between p-3 rounded-xl border text-xs transition ${
                  prob.status === 'Completed'
                    ? 'bg-slate-50/60 border-slate-200/80 text-slate-700'
                    : prob.status === 'In Progress'
                    ? 'bg-blue-50/60 border-blue-200 text-blue-900 font-semibold'
                    : 'bg-white border-slate-200 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {prob.status === 'Completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : prob.status === 'In Progress' ? (
                    <Clock className="w-4 h-4 text-blue-600 animate-pulse" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-slate-300 inline-block" />
                  )}
                  <span>
                    Problem {prob.id}: {prob.title}
                  </span>
                </div>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white border border-slate-200">
                  {prob.score}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Teacher Notes & Formulas Reference */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              Teacher Announcement
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              "Remember to simplify your coefficients before applying the second derivative test. The Friday review will cover application optimization word problems. Section B allows scientific calculators only."
            </p>
            <p className="text-[11px] text-slate-400 font-mono mt-2">— Dr. Harrison (Yesterday at 3:45 PM)</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              Formula Sheet Preview
            </h4>
            <div className="text-[11px] font-mono text-slate-700 space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <p>• Power Rule: d/dx [xⁿ] = n·xⁿ⁻¹</p>
              <p>• Product Rule: (f·g)' = f'g + fg'</p>
              <p>• Quotient Rule: (f/g)' = (f'g − fg') / g²</p>
              <p>• Critical Points: f'(c) = 0 or f'(c) undefined</p>
            </div>
          </div>
        </section>

        {/* Educational Help Video Modal */}
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Video className="w-4 h-4 text-blue-600" />
                  Video Explanation (Unit 4.2)
                </h4>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video bg-slate-900 rounded-xl flex flex-col items-center justify-center text-white p-4 text-center">
                <Video className="w-10 h-10 text-blue-400 mb-2 opacity-80" />
                <p className="text-xs font-bold font-mono">DELTA MATH TUTORIAL VIDEO #42</p>
                <p className="text-[11px] text-slate-400 mt-1">Finding Relative Extrema of 3rd Degree Polynomials</p>
                <span className="mt-3 px-3 py-1 rounded-full text-[10px] font-mono bg-blue-600 text-white font-bold">
                  Duration: 4:18 • High Definition
                </span>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 transition cursor-pointer"
              >
                Close Video
              </button>
            </div>
          </div>
        )}

        {/* Scroll Down Target: Institutional Footer with Secret Access Trigger */}
        <footer className="mt-12 pt-8 border-t border-slate-200/80 text-xs text-slate-500 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-md bg-[#0047AB] text-white font-bold text-xs flex items-center justify-center">
                  Δ
                </div>
                <span className="font-extrabold text-[#0047AB]">DeltaMath LLC</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                DeltaMath is a registered trademark used under academic license. Providing standards-aligned mathematics practice for secondary and collegiate curricula.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-slate-700 mb-2">Institutional Compliance</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                FERPA, COPPA Safe Harbor certified. Student PII is encrypted at rest using AES-256 standards with strict district isolation.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-slate-700 mb-2">District Integration</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Connected via OneRoster LTI 1.3 to Unified District Student Information System. Server Node: <span className="font-mono text-slate-700">us-east-cluster-09</span>
              </p>
            </div>
          </div>

          {/* Bottom Bar containing the Secret Button */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-[11px] text-slate-400 flex-wrap">
              <span>© 2026 DeltaMath LLC. All rights reserved.</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">Terms of Service</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">Accessibility (VPAT)</span>
            </div>

            {/* Secret Button Trigger: Subtle, authentic-looking diagnostic lock */}
            <div className="flex items-center gap-2">
              <button
                id="secret-button-trigger"
                onClick={() => {
                  soundFX.playKeyClick();
                  onOpenSecretCode();
                }}
                title="District System Diagnostic & Security Gateway"
                className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-600 hover:text-slate-900 border border-slate-300 text-[11px] font-mono transition-all duration-200 shadow-2xs hover:shadow-sm cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                <span className="font-semibold">Diagnostic Key</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-300/80 text-slate-600 font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  SECURE
                </span>
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};
