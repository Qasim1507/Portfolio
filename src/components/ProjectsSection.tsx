import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code,
  Layers,
  Sparkles,
  Calendar,
  BookOpen,
  FileText,
  ExternalLink,
  HardDrive,
} from 'lucide-react';
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  ProjectCategory,
  ProjectItem,
} from '../data';
import { CountUpMetric } from './CountUpMetric';
import { DocumentModal } from './DocumentModal';

interface ProjectsSectionProps {
  isDark?: boolean;
}

interface ProjectCardProps {
  project: ProjectItem;
  isDark: boolean;
  onOpenDoc: (project: ProjectItem) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isDark,
  onOpenDoc,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // 3D card tilt calculation matching reference portfolio
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateX = ((y - midY) / midY) * -7;
    const rotateY = ((x - midX) / midX) * 7;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="flex h-full"
      style={{ perspective: 1000 }}
    >
      <div
        ref={cardRef}
        id={`project-card-${project.id}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group w-full rounded-2xl border flex flex-col justify-between backdrop-blur-md p-6 transition-all duration-200 ${
          isDark
            ? 'bg-[#151518]/90 border-white/10 hover:border-teal-500/50 hover:shadow-[0_20px_50px_rgba(20,184,166,0.12)] shadow-xl'
            : 'bg-white/95 border-slate-200 shadow-md hover:border-teal-400 hover:shadow-xl'
        }`}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Top: Category + Publication Badge + Tensor Shape */}
        <div>
          <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10 text-[11px] font-mono">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 font-medium">
                {project.category}
              </span>
              {project.publicationBadge && (
                <span className="px-2.5 py-0.5 rounded-full bg-violet-950/70 border border-violet-500/40 text-violet-300 font-medium text-[10px] flex items-center gap-1">
                  <BookOpen className="w-2.5 h-2.5" />
                  <span>{project.publicationBadge}</span>
                </span>
              )}
            </div>
            <span className="text-slate-500 truncate text-[10px]">
              {project.tensorShape}
            </span>
          </div>

          {/* Title & Date */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>{project.date}</span>
            </div>

            {project.documentUrl ? (
              <button
                type="button"
                onClick={() => onOpenDoc(project)}
                className="text-left group/title focus:outline-none w-full"
              >
                <h3 className="font-display text-lg font-bold text-slate-100 dark:text-white group-hover/title:text-teal-400 transition-colors leading-snug cursor-pointer flex items-center gap-1.5">
                  <span>{project.title}</span>
                  <span className="text-xs text-teal-400/80 font-mono opacity-0 group-hover/title:opacity-100 transition-opacity">
                    ↗
                  </span>
                </h3>
              </button>
            ) : (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/title focus:outline-none block"
              >
                <h3 className="font-display text-lg font-bold text-slate-100 dark:text-white group-hover/title:text-teal-400 transition-colors leading-snug cursor-pointer flex items-center gap-1.5">
                  <span>{project.title}</span>
                  <span className="text-xs text-teal-400/80 font-mono opacity-0 group-hover/title:opacity-100 transition-opacity">
                    ↗
                  </span>
                </h3>
              </a>
            )}

            {project.subtitle && (
              <p className="text-[11px] font-mono text-teal-400/90 font-medium leading-relaxed">
                // {project.subtitle}
              </p>
            )}
          </div>

          {/* Description */}
          <p className="mt-3 text-sm text-slate-300 dark:text-slate-300 leading-relaxed font-sans">
            {project.description}
          </p>

          {/* Tech Stack Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[11px] font-mono border border-white/10 bg-white/5 text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom: Animated Metric Badges & Action Buttons */}
        <div className="mt-6 pt-4 border-t border-white/10 space-y-4">
          {/* Metric Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {project.metrics.map((m, mIdx) => (
              <div
                key={mIdx}
                className="px-2.5 py-1 rounded-md border border-teal-500/30 bg-teal-500/10 text-teal-300 flex items-center gap-1.5 text-xs font-mono"
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

          {/* Action Buttons: Paper / Presentation / Code & Direct Drive Document */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {project.documentType === 'paper' ? (
                <button
                  id={`btn-read-paper-${project.id}`}
                  type="button"
                  onClick={() => onOpenDoc(project)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-mono text-xs font-bold transition-all duration-200 active:scale-98 cursor-pointer shadow-md shadow-teal-500/20"
                >
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <span>Read Paper</span>
                </button>
              ) : project.documentType === 'presentation' ? (
                <button
                  id={`btn-read-slides-${project.id}`}
                  type="button"
                  onClick={() => onOpenDoc(project)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-mono text-xs font-bold transition-all duration-200 active:scale-98 cursor-pointer shadow-md shadow-teal-500/20"
                >
                  <Layers className="w-3.5 h-3.5 shrink-0" />
                  <span>View Presentation</span>
                </button>
              ) : (
                <a
                  id={`btn-code-${project.id}`}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-mono text-xs font-bold transition-all duration-200 active:scale-98 cursor-pointer shadow-md shadow-teal-500/20"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                  <span className="text-[10px] font-mono">↗</span>
                </a>
              )}

              {/* Direct Google Drive Document Link (points directly to the original document file) */}
              {project.driveUrl && (
                <a
                  id={`link-drive-${project.id}`}
                  href={project.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open original file in Google Drive"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-teal-300 transition-colors text-xs font-mono"
                >
                  <HardDrive className="w-3.5 h-3.5 text-teal-400" />
                  <span className="hidden sm:inline">Drive</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              )}

              {/* Standalone formatted document */}
              {project.documentUrl && !project.driveUrl && (
                <a
                  id={`link-doc-${project.id}`}
                  href={project.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open formatted document in new tab"
                  className="px-2.5 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-teal-300 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  isDark = true,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>('All');
  const [activeDocProject, setActiveDocProject] = useState<ProjectItem | null>(
    null
  );

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      aria-label="Projects Portfolio"
      className="py-24 px-4 sm:px-6 relative scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-teal-400 font-semibold tracking-wider uppercase">
              // section_03
            </span>
            <span className="h-[1px] w-8 bg-teal-500/30" />
            <span className="font-mono text-[11px] text-slate-500">
              model_zoo · research_artifacts
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-100 dark:text-white">
                Featured Projects & Papers
              </h2>
              <p className="text-sm sm:text-base text-slate-400 max-w-2xl mt-2 leading-relaxed">
                Medical deep learning models, edge reinforcement learning algorithms, and secure full-stack software systems with peer-reviewed publications.
              </p>
            </div>

            {/* Total Checkpoints Badge */}
            <div className="font-mono text-xs text-slate-300 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#151518]/60 shrink-0">
              <span className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_#14B8A6]" />
              <span>trained_models: </span>
              <span className="text-teal-400 font-bold">
                {PROJECTS.length} checkpoints
              </span>
            </div>
          </div>

          {/* Filter Chips */}
          <div
            id="project-filters"
            className="flex flex-wrap items-center gap-2 pt-4"
          >
            {PROJECT_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  id={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-mono text-xs transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? 'bg-teal-500 text-slate-950 font-bold border-teal-400 shadow-md shadow-teal-500/20'
                      : isDark
                      ? 'bg-[#151518]/80 border-white/10 text-slate-400 hover:text-teal-300 hover:border-teal-500/40'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-teal-700 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  {category}
                  {category === 'All' ? ` (${PROJECTS.length})` : ''}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Interactive Grid of Cards */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isDark={isDark}
                onOpenDoc={(p) => setActiveDocProject(p)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Research Document Viewer Modal */}
        <DocumentModal
          project={activeDocProject}
          onClose={() => setActiveDocProject(null)}
          isDark={isDark}
        />
      </div>
    </section>
  );
};
