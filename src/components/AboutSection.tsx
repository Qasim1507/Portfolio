import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Database, Award, Binary, GitFork, GraduationCap } from 'lucide-react';
import { MODEL_CARD_DATA, PERSONAL_DATA } from '../data';

interface AboutSectionProps {
  isDark?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  isDark = true,
}) => {
  const modelCardEntries = [
    {
      key: 'architecture',
      value: MODEL_CARD_DATA.architecture,
      icon: <GraduationCap className="w-4 h-4 text-teal-400 shrink-0" />,
      highlight: true,
    },
    {
      key: 'pretraining',
      value: MODEL_CARD_DATA.pretraining,
      icon: <Database className="w-4 h-4 text-sky-400 shrink-0" />,
      highlight: false,
    },
    {
      key: 'fine-tuned on',
      value: MODEL_CARD_DATA.fineTunedOn,
      icon: <Binary className="w-4 h-4 text-violet-400 shrink-0" />,
      highlight: false,
    },
    {
      key: 'intended use',
      value: MODEL_CARD_DATA.intendedUse,
      icon: <Award className="w-4 h-4 text-teal-400 shrink-0" />,
      highlight: true,
    },
  ];

  return (
    <section
      id="about"
      aria-label="About and Model Card"
      className="py-24 px-4 sm:px-6 relative scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="space-y-6"
        >
          {/* Section Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-teal-400 font-semibold tracking-wider uppercase">
              // section_01
            </span>
            <span className="h-[1px] w-8 bg-teal-500/30" />
            <span className="font-mono text-[11px] text-slate-500">
              candidate_spec · model_card.yaml
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-100 dark:text-white">
            About Me
          </h2>

          {/* Model Card Container */}
          <div
            id="about-model-card"
            className={`rounded-2xl border backdrop-blur-md overflow-hidden transition-all duration-300 shadow-2xl ${
              isDark
                ? 'bg-[#151518]/90 border-white/10 hover:border-teal-500/30'
                : 'bg-white/95 border-slate-200 shadow-xl'
            }`}
          >
            {/* Card Header Bar */}
            <div className="px-6 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_8px_#14B8A6]" />
                <span className="font-semibold text-teal-400">
                  checkpoint: qasim_nalawala_nus.pt
                </span>
                <span className="text-slate-500 hidden sm:inline">
                  [sha256: 7f8c92a]
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30">
                  precision: fp32
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  eval_gpa: 4.17
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Short Paragraph */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <GitFork className="w-3.5 h-3.5 text-teal-400" />
                  <span>overview / background</span>
                </div>
                <p className="text-base sm:text-lg text-slate-300 dark:text-slate-200 leading-relaxed font-sans">
                  {MODEL_CARD_DATA.aboutParagraph}
                </p>
              </div>

              {/* Model Card Table */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  metadata_spec:
                </div>

                <div className="rounded-xl border border-white/10 divide-y divide-white/10 overflow-hidden font-mono text-xs sm:text-sm">
                  {modelCardEntries.map((entry) => (
                    <div
                      key={entry.key}
                      className={`p-3.5 sm:px-4 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors ${
                        isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-slate-400 shrink-0 sm:w-44">
                        {entry.icon}
                        <span className="text-teal-400 font-medium">
                          {entry.key}:
                        </span>
                      </div>
                      <div
                        className={`sm:text-right font-mono text-xs sm:text-sm ${
                          entry.highlight
                            ? 'text-slate-100 dark:text-white font-semibold'
                            : 'text-slate-300 dark:text-slate-300'
                        }`}
                      >
                        {entry.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Attributes Tag Row */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="text-slate-500">core_capabilities:</span>
                <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300">
                  ML Pipelines & PyTorch
                </span>
                <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300">
                  Computer Vision & Grad-CAM
                </span>
                <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300">
                  Full-Stack Engineering
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  Edge Deep Q-Learning
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
