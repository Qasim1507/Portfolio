import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Briefcase, Calendar, MapPin, TrendingUp, Layers } from 'lucide-react';
import { EXPERIENCES } from '../data';
import { CountUpMetric } from './CountUpMetric';

interface ExperienceSectionProps {
  isDark?: boolean;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  isDark = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 30%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="experience"
      aria-label="Professional Experience Timeline"
      className="py-24 px-4 sm:px-6 relative scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-teal-400 font-semibold tracking-wider uppercase">
              // section_02
            </span>
            <span className="h-[1px] w-8 bg-teal-500/30" />
            <span className="font-mono text-[11px] text-slate-500">
              training_history · industry_weights
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-100 dark:text-white">
            Experience Timeline
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
            Progression across research institutions and technology companies in Singapore and the UAE.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative pl-6 sm:pl-10 space-y-12">
          {/* Vertical Background Line */}
          <div className="absolute left-2.5 sm:left-4 top-3 bottom-3 w-[2px] bg-white/10" />

          {/* Animated Filling Line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-2.5 sm:left-4 top-3 w-[2px] bg-gradient-to-b from-teal-400 via-cyan-400 to-violet-500 origin-top shadow-[0_0_10px_rgba(20,184,166,0.8)]"
          />

          {/* Experience Nodes */}
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline Node Point (Glows when reached) */}
              <div className="absolute -left-[30px] sm:-left-[38px] top-5 w-4 h-4 rounded-full border-2 border-teal-400 bg-[#0F0F11] flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-[0_0_12px_rgba(20,184,166,0.8)]">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              </div>

              {/* Role Card */}
              <div
                id={`exp-card-${exp.id}`}
                className={`rounded-2xl border backdrop-blur-md p-6 sm:p-8 transition-all duration-300 hover:border-teal-500/40 shadow-xl ${
                  isDark
                    ? 'bg-[#151518]/90 border-white/10 hover:shadow-[0_15px_40px_rgba(20,184,166,0.08)]'
                    : 'bg-white/95 border-slate-200 shadow-md'
                }`}
              >
                {/* Header row: Company, Role, Layer tag */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-4 border-b border-white/10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-teal-300 px-2.5 py-0.5 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center gap-1">
                        <Layers className="w-3 h-3" />
                        {exp.layerTag}
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-100 dark:text-white">
                      {exp.role}
                    </h3>
                    <div className="text-teal-400 font-semibold text-sm sm:text-base flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                      <Calendar className="w-3.5 h-3.5 text-teal-400" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="mt-5 space-y-2.5 text-sm text-slate-300 dark:text-slate-300">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-2.5 leading-relaxed"
                    >
                      <span className="text-teal-400 mt-1 text-xs select-none">
                        ▸
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Highlighted Metrics Section with CountUp */}
                {exp.metrics && exp.metrics.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                    <span className="text-[11px] font-mono text-slate-400 uppercase flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
                      measured_impact:
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {exp.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 flex items-center gap-1.5 text-xs font-mono"
                        >
                          <span className="text-slate-400">{m.label}</span>
                          <span className="text-teal-400 font-bold">
                            <CountUpMetric
                              value={m.value}
                              prefix={m.prefix}
                              suffix={m.suffix}
                              symbol={m.symbol}
                            />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
