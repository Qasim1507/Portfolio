import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Cloud,
  Server,
  Code,
  CheckCircle,
  Award,
  Sparkles,
  Layers,
  Crosshair,
} from 'lucide-react';
import {
  SKILL_NODES,
  SKILL_CATEGORIES,
  CERTIFICATIONS,
  SkillNode,
} from '../data';

interface SkillsSectionProps {
  isDark?: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ isDark = true }) => {
  const [activeCluster, setActiveCluster] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);
  const [driftTime, setDriftTime] = useState(0);

  // Subtle continuous drift animation for dots in embedding space
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    let animId: number;
    let start = performance.now();

    const updateDrift = (time: number) => {
      setDriftTime((time - start) / 1000);
      animId = requestAnimationFrame(updateDrift);
    };

    animId = requestAnimationFrame(updateDrift);
    return () => cancelAnimationFrame(animId);
  }, []);

  const getClusterColor = (category: string) => {
    switch (category) {
      case 'Languages':
        return '#22D3EE'; // cyan
      case 'ML / DL':
        return '#8B5CF6'; // violet
      case 'Web':
        return '#38BDF8'; // sky
      case 'Tools & Cloud':
        return '#34D399'; // emerald
      default:
        return '#94A3B8';
    }
  };

  const renderCertIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-amber-400 shrink-0" />;
      case 'Server':
        return <Server className="w-5 h-5 text-sky-400 shrink-0" />;
      case 'Code':
        return <Code className="w-5 h-5 text-emerald-400 shrink-0" />;
      case 'CheckCircle':
      default:
        return <CheckCircle className="w-5 h-5 text-violet-400 shrink-0" />;
    }
  };

  return (
    <section
      id="skills"
      aria-label="Skills and Technical Stack"
      className="py-20 px-4 sm:px-6 relative scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-cyan-400 font-semibold tracking-wider uppercase">
              // section_04
            </span>
            <span className="h-[1px] w-8 bg-cyan-500/30" />
            <span className="font-mono text-[11px] text-slate-500">
              latent_space · tsne_projection [dim=2]
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-100 dark:text-white">
                Technical Embedding Space
              </h2>
              <p className="text-sm text-slate-400 max-w-xl mt-1">
                2D latent projection of proficiencies clustered by domain semantics. Hover over embeddings to isolate clusters.
              </p>
            </div>

            {/* Cluster Legend / Selector Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {SKILL_CATEGORIES.map((cat) => {
                const isActive = activeCluster === cat.name;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() =>
                      setActiveCluster(isActive ? null : cat.name)
                    }
                    onMouseEnter={() => setActiveCluster(cat.name)}
                    onMouseLeave={() => setActiveCluster(null)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'border-cyan-400 bg-cyan-950/60 text-white shadow-sm shadow-cyan-500/30'
                        : isDark
                        ? 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                        : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2D Embedding Space Scatter Plot (Visible on Desktop / Tablets) */}
        <div
          id="skills-embedding-plot"
          className={`hidden md:block relative h-[480px] rounded-2xl border backdrop-blur-md overflow-hidden p-6 transition-all duration-300 shadow-xl ${
            isDark
              ? 'bg-[#121A2E]/80 border-cyan-500/20 shadow-cyan-950/20 bg-tensor-grid'
              : 'bg-white/90 border-slate-200 shadow-slate-200/50 bg-tensor-grid'
          }`}
        >
          {/* Coordinate Axes & Grid Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Center Crosshair lines */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-700/20" />
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-slate-700/20" />

            {/* TensorBoard style HUD watermark */}
            <div className="absolute top-4 left-6 font-mono text-[10px] text-slate-500 space-y-0.5">
              <div>UMAP_DIM_0 vs UMAP_DIM_1 (perplexity: 30)</div>
              <div>total_embeddings: {SKILL_NODES.length} tokens</div>
            </div>

            <div className="absolute bottom-4 right-6 font-mono text-[10px] text-slate-500 flex items-center gap-2">
              <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
              <span>latent_norm: l2_standardized</span>
            </div>
          </div>

          {/* Render Driftable Skill Nodes */}
          {SKILL_NODES.map((skill, idx) => {
            const isHighlighted =
              !activeCluster || activeCluster === skill.category;
            const isHovered = hoveredSkill?.name === skill.name;
            const color = getClusterColor(skill.category);

            // Compute organic drift offset
            const driftOffsetX = Math.sin(driftTime * 0.8 + idx * 1.3) * 1.5;
            const driftOffsetY = Math.cos(driftTime * 0.7 + idx * 0.9) * 1.5;

            const posX = skill.x + driftOffsetX;
            const posY = skill.y + driftOffsetY;

            return (
              <div
                key={skill.name}
                style={{
                  left: `${posX}%`,
                  top: `${posY}%`,
                }}
                onMouseEnter={() => {
                  setHoveredSkill(skill);
                  setActiveCluster(skill.category);
                }}
                onMouseLeave={() => {
                  setHoveredSkill(null);
                  setActiveCluster(null);
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-opacity duration-300 z-10 ${
                  isHighlighted ? 'opacity-100' : 'opacity-20 blur-[0.5px]'
                }`}
              >
                {/* Node Dot with surrounding glow */}
                <div className="relative group/node flex items-center gap-1.5">
                  <div
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all duration-200 ${
                      isHovered ? 'scale-150 ring-4' : 'group-hover/node:scale-125'
                    }`}
                    style={{
                      backgroundColor: color,
                      borderColor: '#FFFFFF',
                      boxShadow: `0 0 ${isHovered ? '16px' : '8px'} ${color}`,
                    }}
                  >
                    <span className="w-1 h-1 rounded-full bg-white" />
                  </div>

                  {/* Label next to node */}
                  <span
                    className={`font-mono text-xs px-2 py-0.5 rounded-md border backdrop-blur-md transition-all whitespace-nowrap select-none ${
                      isHovered
                        ? 'bg-slate-900 text-white font-bold border-cyan-400 shadow-md'
                        : isDark
                        ? 'bg-slate-900/80 text-slate-200 border-slate-700/60'
                        : 'bg-white/90 text-slate-800 border-slate-300'
                    }`}
                  >
                    {skill.name}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Active Hover Tooltip Card at the bottom left */}
          {hoveredSkill && (
            <div className="absolute bottom-4 left-6 z-20 pointer-events-none p-3 rounded-lg border border-cyan-500/40 bg-slate-950/90 text-white font-mono text-xs shadow-xl backdrop-blur-md max-w-xs animate-fadeIn">
              <div className="flex items-center justify-between gap-4 pb-1 mb-1 border-b border-slate-700">
                <span className="font-bold text-cyan-400">{hoveredSkill.name}</span>
                <span
                  className="px-1.5 py-0.2 rounded text-[10px]"
                  style={{
                    backgroundColor: `${getClusterColor(hoveredSkill.category)}25`,
                    color: getClusterColor(hoveredSkill.category),
                  }}
                >
                  {hoveredSkill.category}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                latent_coord: [{hoveredSkill.x.toFixed(1)}, {hoveredSkill.y.toFixed(1)}]
              </div>
              <div className="text-[10px] text-slate-500">
                affinity: high_confidence_weight
              </div>
            </div>
          )}
        </div>

        {/* Mobile Grouped Tag Chips Fallback (<768px) */}
        <div className="md:hidden space-y-6">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
            // cluster_groups (mobile view)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SKILL_CATEGORIES.map((cat) => {
              const skillsInCat = SKILL_NODES.filter(
                (s) => s.category === cat.name
              );
              return (
                <div
                  key={cat.name}
                  className={`p-4 rounded-xl border backdrop-blur-md ${
                    isDark
                      ? 'bg-[#121A2E]/80 border-cyan-500/20'
                      : 'bg-white/90 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-700/40">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200 dark:text-white">
                      {cat.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {skillsInCat.map((s) => (
                      <span
                        key={s.name}
                        className="px-2.5 py-1 rounded-md text-xs font-mono border border-slate-700/60 bg-slate-800/40 text-slate-300"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certifications Row Below the Plot */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-xs text-slate-300 uppercase tracking-wider font-semibold">
              verified_certifications & milestones
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.title}
                className={`p-4 rounded-xl border backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400/40 flex items-start gap-3 shadow-md ${
                  isDark
                    ? 'bg-[#121A2E]/80 border-slate-800 shadow-black/20'
                    : 'bg-white/90 border-slate-200 shadow-slate-200/50'
                }`}
              >
                <div className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 shrink-0">
                  {renderCertIcon(cert.iconName)}
                </div>

                <div className="space-y-1 min-w-0">
                  <h4 className="font-display text-sm font-bold text-slate-100 dark:text-white leading-tight">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-sans">{cert.issuer}</p>
                  <div className="text-[10px] font-mono text-emerald-400">
                    badge: {cert.badge}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
