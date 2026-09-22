import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { PERSONAL_DATA } from '../data';

interface FooterProps {
  isDark?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDark = true }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className={`border-t py-12 px-4 sm:px-6 transition-colors ${
        isDark
          ? 'bg-[#0F0F11] border-white/10 text-slate-400'
          : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Attribution */}
        <div className="space-y-1 text-center md:text-left">
          <p className="text-sm font-sans text-slate-300 dark:text-slate-400">
            © 2026 {PERSONAL_DATA.name} · built with React, TypeScript & Tailwind
          </p>
          <div className="text-xs font-mono text-slate-500">
            optimizer: adamw · lr: 1e-4 · loss: 0.071 · converged
          </div>
        </div>

        {/* Right: Social Icons & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            id="footer-link-github"
            href={PERSONAL_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:border-teal-400 text-slate-400 hover:text-teal-400 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            id="footer-link-linkedin"
            href={PERSONAL_DATA.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:border-teal-400 text-slate-400 hover:text-teal-400 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            id="footer-link-email"
            href={`mailto:${PERSONAL_DATA.email}`}
            aria-label="Email Qasim"
            className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:border-teal-400 text-slate-400 hover:text-teal-400 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            id="footer-back-to-top"
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-xs font-mono text-slate-300 hover:text-teal-300 hover:border-teal-400 transition-all cursor-pointer"
          >
            <span>top</span>
            <ArrowUp className="w-3.5 h-3.5 text-teal-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
