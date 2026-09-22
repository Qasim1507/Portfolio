import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Terminal as TerminalIcon,
  CheckCircle2,
  ExternalLink,
  Phone,
} from 'lucide-react';
import { PERSONAL_DATA } from '../data';

interface HeroProps {
  isDark?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isDark = true }) => {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [isConverged, setIsConverged] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setTerminalLines([
        '> loading weights: qasim_nalawala.pt',
        '> epoch 4/4  loss: 0.071  acc: 0.97  ✓ converged',
      ]);
      setIsConverged(true);
      return;
    }

    const script = [
      { text: '> loading weights: qasim_nalawala.pt', delay: 200 },
      { text: '> epoch 1/4  loss: 0.842  acc: 0.61', delay: 600 },
      { text: '> epoch 4/4  loss: 0.071  acc: 0.97  ✓ converged', delay: 1100 },
    ];

    const timeouts: NodeJS.Timeout[] = [];

    script.forEach((item, index) => {
      const timeout = setTimeout(() => {
        setTerminalLines((prev) => [...prev, item.text]);
        if (index === script.length - 1) {
          setIsConverged(true);
        }
      }, item.delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[92vh] flex flex-col items-center justify-center pt-28 pb-16 px-4 sm:px-6 text-center select-none"
    >
      <div className="max-w-5xl mx-auto w-full z-10 space-y-6 sm:space-y-8">
        {/* Status Chips */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2.5"
        >
          <span
            id="chip-location"
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono border backdrop-blur-md ${
              isDark
                ? 'bg-[#151518]/90 border-white/10 text-slate-300'
                : 'bg-white border-slate-200 text-slate-700 shadow-xs'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-teal-400" />
            {PERSONAL_DATA.location}
          </span>

          <span
            id="chip-open-to-work"
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-medium border border-teal-500/40 bg-teal-500/10 text-teal-300 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping inline-block" />
            {PERSONAL_DATA.statusChip}
          </span>

          <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border border-violet-500/30 bg-violet-500/10 text-violet-300">
            NUS M.Sc. (GPA 4.17/5.0)
          </span>
        </motion.div>

        {/* Monumental Hero Headline matching reference site */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          <h1
            id="hero-name"
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-[-0.03em] text-[#F4F4F5] dark:text-[#F4F4F5] leading-[1.05]"
            style={{
              textShadow: isDark
                ? '0 0 80px rgba(20,184,166,0.2), 0 0 30px rgba(20,184,166,0.1)'
                : '0 4px 12px rgba(0,0,0,0.08)',
            }}
          >
            <span className="text-slate-100 dark:text-[#F4F4F5]">Qasim </span>
            <span className="hidden sm:inline">Fakharuddin </span>
            <span className="text-teal-400">Nalawala</span>
          </h1>

          {/* Pulsing Accent Dot */}
          <div className="flex justify-center py-1">
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_15px_#14B8A6]"
            />
          </div>

          {/* Subtitle / Role Tagline */}
          <p
            id="hero-title"
            className="text-xs sm:text-sm md:text-base text-slate-400 dark:text-[#A1A1AA] uppercase tracking-[0.25em] font-medium max-w-3xl mx-auto"
          >
            Computer Engineer · ML Researcher · Full-Stack Developer
          </p>
        </motion.div>

        {/* Short Bio Statement */}
        <motion.p
          id="hero-one-liner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-base sm:text-lg text-slate-300 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans"
        >
          {PERSONAL_DATA.oneLiner}
        </motion.p>

        {/* Action Buttons: View Projects, View Resume, Get In Touch */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
        >
          {/* Primary Action: View Projects */}
          <a
            id="hero-btn-view-projects"
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-mono text-sm font-bold shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span>View Projects</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          {/* Secondary Action: View Resume (Direct Google Drive Link) */}
          <a
            id="hero-btn-view-resume"
            href={PERSONAL_DATA.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-sm font-semibold border transition-all duration-200 active:scale-95 cursor-pointer ${
              isDark
                ? 'border-white/15 bg-[#1a1a1d]/90 hover:bg-[#25252b] text-white hover:border-teal-500/50 shadow-md'
                : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800 shadow-xs'
            }`}
          >
            <FileText className="w-4 h-4 text-teal-400" />
            <span>View Resume</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          {/* Tertiary Action: Contact */}
          <a
            id="hero-btn-contact"
            href="#contact"
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-mono text-sm font-medium border transition-all duration-200 active:scale-95 cursor-pointer ${
              isDark
                ? 'border-white/10 bg-transparent hover:bg-white/5 text-slate-300 hover:text-white'
                : 'border-slate-300 bg-transparent hover:bg-slate-100 text-slate-700'
            }`}
          >
            <Mail className="w-4 h-4 text-teal-400" />
            <span>Get In Touch</span>
          </a>
        </motion.div>

        {/* Social Links & Quick Contacts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center justify-center gap-3 pt-2"
        >
          <a
            id="hero-link-github"
            href={PERSONAL_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className={`p-2.5 rounded-full border transition-all duration-200 ${
              isDark
                ? 'border-white/10 bg-[#1a1a1d]/60 text-slate-300 hover:text-teal-400 hover:border-teal-500/40'
                : 'border-slate-200 bg-white text-slate-700 hover:text-teal-600'
            }`}
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            id="hero-link-linkedin"
            href={PERSONAL_DATA.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className={`p-2.5 rounded-full border transition-all duration-200 ${
              isDark
                ? 'border-white/10 bg-[#1a1a1d]/60 text-slate-300 hover:text-teal-400 hover:border-teal-500/40'
                : 'border-slate-200 bg-white text-slate-700 hover:text-teal-600'
            }`}
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            id="hero-link-email"
            href={`mailto:${PERSONAL_DATA.email}`}
            aria-label="Send email"
            className={`p-2.5 rounded-full border transition-all duration-200 ${
              isDark
                ? 'border-white/10 bg-[#1a1a1d]/60 text-slate-300 hover:text-teal-400 hover:border-teal-500/40'
                : 'border-slate-200 bg-white text-slate-700 hover:text-teal-600'
            }`}
          >
            <Mail className="w-4 h-4" />
          </a>

          <a
            id="hero-link-phone"
            href={`tel:${PERSONAL_DATA.phone.replace(/\s+/g, '')}`}
            aria-label="Call Qasim"
            className={`p-2.5 rounded-full border transition-all duration-200 ${
              isDark
                ? 'border-white/10 bg-[#1a1a1d]/60 text-slate-300 hover:text-teal-400 hover:border-teal-500/40'
                : 'border-slate-200 bg-white text-slate-700 hover:text-teal-600'
            }`}
          >
            <Phone className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Interactive Neural Training Evaluation Capsule (Preserves the ML Training theme) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="pt-4 max-w-lg mx-auto"
        >
          <div
            onClick={() => setShowTerminal((prev) => !prev)}
            className={`cursor-pointer inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-mono transition-all duration-200 ${
              isDark
                ? 'bg-[#151518]/80 border-teal-500/30 text-teal-300 hover:border-teal-400 shadow-sm'
                : 'bg-teal-50 border-teal-300 text-teal-900 shadow-xs'
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-semibold">train_eval.py --weights qasim_nalawala.pt</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold">
              ✓ converged (acc: 97.4%)
            </span>
          </div>

          {showTerminal && (
            <div
              className={`mt-3 p-3 rounded-xl border text-left font-mono text-xs backdrop-blur-md transition-all ${
                isDark
                  ? 'bg-[#0F0F11]/95 border-teal-500/30 text-slate-300'
                  : 'bg-white/95 border-slate-300 text-slate-800'
              }`}
            >
              <div className="space-y-1 text-[11px]">
                {terminalLines.map((line, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="text-teal-400">{line}</span>
                    {line.includes('converged') && (
                      <CheckCircle2 className="w-3 h-3 text-teal-400 inline" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 text-xs font-mono"
      >
        <span className="text-[10px] uppercase tracking-widest text-slate-400">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-teal-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};
