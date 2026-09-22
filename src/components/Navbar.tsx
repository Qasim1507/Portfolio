import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, FileText, ExternalLink } from 'lucide-react';
import { PERSONAL_DATA } from '../data';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section tracking
      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-[#0F0F11]/80 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20'
            : 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs'
          : 'bg-transparent pt-3'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo QN with pulsing teal micro-node */}
        <a
          id="nav-logo"
          href="#hero"
          className="group flex items-center gap-2.5 text-inherit no-underline focus:outline-hidden rounded-md"
        >
          <div className="relative w-8 h-8 rounded-full flex items-center justify-center border border-teal-500/40 bg-teal-500/10 group-hover:border-teal-400 group-hover:bg-teal-500/20 transition-all duration-300">
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_#14B8A6] group-hover:animate-ping" />
            <span className="font-mono text-xs font-bold tracking-tight text-teal-400 group-hover:text-teal-300">
              {PERSONAL_DATA.initials}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-tight leading-none text-slate-100 dark:text-white group-hover:text-teal-400 transition-colors">
              {PERSONAL_DATA.shortName}
            </span>
            <span className="font-mono text-[10px] text-slate-400 tracking-wider">
              [m.sc_ce · nus]
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav
          id="nav-desktop-links"
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1 rounded-full border border-white/10 bg-[#151518]/60 backdrop-blur-md"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                id={`nav-link-${link.id}`}
                href={link.href}
                className={`relative px-3.5 py-1.5 rounded-full font-mono text-xs tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'text-teal-400 font-semibold bg-teal-500/10'
                    : isDark
                    ? 'text-slate-400 hover:text-teal-300 hover:bg-white/5'
                    : 'text-slate-600 hover:text-teal-700 hover:bg-slate-100'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right side controls: Theme toggle + Resume button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme toggle */}
          <button
            id="theme-toggle-btn"
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className={`p-2 rounded-full border transition-all duration-200 cursor-pointer ${
              isDark
                ? 'bg-[#151518]/80 border-white/10 text-teal-400 hover:bg-[#1a1a1d] hover:border-teal-500/40'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Resume button (opens direct Google Drive link) */}
          <a
            id="nav-resume-btn"
            href={PERSONAL_DATA.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold rounded-full border border-teal-500/50 bg-teal-500/15 text-teal-300 hover:bg-teal-500 hover:text-slate-950 transition-all duration-200 shadow-sm hover:shadow-teal-500/25 active:scale-95"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
            <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
          </a>

          {/* Mobile hamburger menu toggle */}
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className={`md:hidden p-2 rounded-full border transition-colors cursor-pointer ${
              isDark
                ? 'border-white/10 bg-[#151518] text-slate-300 hover:text-teal-400'
                : 'border-slate-300 bg-slate-100 text-slate-700 hover:text-teal-700'
            }`}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className={`md:hidden px-4 pt-3 pb-6 border-b shadow-xl backdrop-blur-xl ${
            isDark
              ? 'bg-[#0F0F11]/95 border-white/10 text-slate-200'
              : 'bg-white/95 border-slate-200 text-slate-800'
          }`}
        >
          <div className="flex flex-col gap-1.5 pt-2">
            <div className="text-[10px] font-mono text-teal-400 mb-1 px-3">
              // NAVIGATION_GRAPH
            </div>
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`mobile-nav-${link.id}`}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl font-mono text-sm transition-colors ${
                  activeSection === link.id
                    ? 'text-teal-400 bg-teal-500/10 font-semibold'
                    : isDark
                    ? 'text-slate-300 hover:bg-white/5 hover:text-teal-300'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-teal-700'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-white/10 flex justify-between items-center px-1">
              <span className="text-xs font-mono text-slate-500">status: open_to_work</span>
              <a
                id="mobile-resume-link"
                href={PERSONAL_DATA.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-teal-400 hover:underline flex items-center gap-1"
              >
                view_resume.pdf <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
