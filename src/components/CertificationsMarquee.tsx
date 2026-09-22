import React from 'react';
import {
  Cloud,
  Award,
  Code2,
  Cpu,
  BookOpen,
  Terminal,
  ShieldCheck,
} from 'lucide-react';

interface CertificationsMarqueeProps {
  isDark?: boolean;
}

const CERTS = [
  {
    name: 'AWS Academy Graduate',
    badge: 'Cloud Foundations',
    icon: Cloud,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/20',
  },
  {
    name: 'Google Cloud Digital Leader',
    badge: 'GCP Certified',
    icon: Cloud,
    color: 'text-sky-400',
    borderColor: 'border-sky-500/20',
  },
  {
    name: 'HackerRank Python (Advanced)',
    badge: '5-Star Gold',
    icon: Terminal,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
  },
  {
    name: 'Frontiers in AI Researcher',
    badge: 'MS #1840005 · In Review',
    icon: BookOpen,
    color: 'text-teal-400',
    borderColor: 'border-teal-500/20',
  },
  {
    name: 'IEEE Access Medical CV',
    badge: 'DenseNet-121 + Grad-CAM',
    icon: Award,
    color: 'text-purple-400',
    borderColor: 'border-purple-500/20',
  },
  {
    name: 'Data Structures & Algorithms',
    badge: 'VIT Chennai · High Distinction',
    icon: Code2,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/20',
  },
  {
    name: 'ML Research at SERIS',
    badge: 'Solar Cell BIPV Analytics',
    icon: Cpu,
    color: 'text-teal-300',
    borderColor: 'border-teal-500/20',
  },
  {
    name: 'Full-Stack Software Engineering',
    badge: 'Samcom Electronics LLC',
    icon: ShieldCheck,
    color: 'text-emerald-300',
    borderColor: 'border-emerald-500/20',
  },
];

export const CertificationsMarquee: React.FC<CertificationsMarqueeProps> = ({
  isDark = true,
}) => {
  // Duplicate array for seamless infinite looping
  const marqueeItems = [...CERTS, ...CERTS];

  return (
    <section
      id="marquee-certifications"
      aria-label="Accreditations and Certifications"
      className={`py-6 border-y overflow-hidden relative select-none transition-colors ${
        isDark
          ? 'bg-[#151518]/90 border-white/5 backdrop-blur-md'
          : 'bg-slate-100/90 border-slate-200 backdrop-blur-md'
      }`}
    >
      {/* Subtle fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#0F0F11] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#0F0F11] to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee whitespace-nowrap">
        {marqueeItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`inline-flex items-center gap-3 px-5 py-2 mx-3 rounded-full border text-xs font-mono tracking-wide transition-transform hover:scale-105 cursor-pointer ${
                isDark
                  ? 'bg-[#1a1a1d]/80 border-white/10 text-slate-300 hover:border-teal-500/50 hover:text-white'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-teal-500 hover:text-slate-900 shadow-xs'
              }`}
            >
              <Icon className={`w-4 h-4 ${item.color} shrink-0`} />
              <span className="font-semibold">{item.name}</span>
              <span className="text-[10px] text-slate-400 font-sans border-l border-slate-600/40 pl-2">
                {item.badge}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
