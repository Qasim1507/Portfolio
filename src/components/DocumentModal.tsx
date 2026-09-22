import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  FileText,
  ExternalLink,
  Printer,
  BookOpen,
  Award,
  Layers,
  Cpu,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { ProjectItem } from '../data';

interface DocumentModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  isDark?: boolean;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  project,
  onClose,
  isDark = true,
}) => {
  if (!project) return null;

  const isPaper = project.documentType === 'paper';
  const isPresentation = project.documentType === 'presentation';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden z-10 ${
            isDark
              ? 'bg-[#0f172a] border-cyan-500/30 text-slate-100 shadow-cyan-950/40'
              : 'bg-white border-slate-300 text-slate-900 shadow-slate-400/30'
          }`}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/40 bg-slate-900/40 shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                {isPresentation ? (
                  <Layers className="w-4 h-4" />
                ) : (
                  <BookOpen className="w-4 h-4" />
                )}
              </span>
              <div>
                <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  {isPresentation ? 'Project Presentation Slide Deck' : 'Academic Research Document'}
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {project.publicationBadge || 'VIT Chennai · Research'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {project.documentUrl && (
                <a
                  href={project.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/30 text-xs font-mono text-cyan-300 hover:bg-cyan-900/40 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Standalone</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => {
                  if (project.documentUrl) {
                    window.open(project.documentUrl, '_blank');
                  }
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                title="Print or export as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close document"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Document Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-sm leading-relaxed">
            {/* Title & Metadata */}
            <div className="space-y-3 pb-6 border-b border-slate-700/40">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md font-mono text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                  {project.category}
                </span>
                {project.publicationBadge && (
                  <span className="px-2.5 py-0.5 rounded-md font-mono text-xs font-semibold bg-violet-500/10 border border-violet-500/30 text-violet-300">
                    {project.publicationBadge}
                  </span>
                )}
                <span className="text-xs font-mono text-slate-400">
                  {project.date}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
                {project.title}
              </h2>

              {project.subtitle && (
                <p className="text-xs sm:text-sm font-mono text-cyan-400">
                  // {project.subtitle}
                </p>
              )}

              <div className="text-xs font-mono text-slate-400 flex flex-wrap gap-x-4 gap-y-1 pt-1">
                <span>Authors: <strong className="text-slate-200">Qasim Fakharuddin Nalawala</strong> et al.</span>
                <span>Affiliation: <strong className="text-slate-200">VIT Chennai</strong></span>
              </div>
            </div>

            {/* Metric Highlights Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 text-center"
                >
                  <div className="font-mono text-lg sm:text-xl font-bold text-cyan-400">
                    {m.prefix || ''}
                    {m.value}
                    {m.suffix || ''}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Document Content / Abstract */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs text-cyan-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Executive Summary & Methodology</span>
              </h3>

              <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 text-slate-300 space-y-3">
                <p className="text-sm leading-relaxed">{project.description}</p>
              </div>
            </div>

            {/* Architecture / Tensor Specifications */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs text-cyan-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>Computational & Architecture Specs</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50">
                  <div className="text-slate-400">// Tensor & Model Pipeline</div>
                  <div className="text-cyan-300 font-semibold mt-1">
                    {project.tensorShape}
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50">
                  <div className="text-slate-400">// Core Technologies</div>
                  <div className="text-slate-200 mt-1 flex flex-wrap gap-1">
                    {project.tags.map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs font-mono text-slate-400">
                Document viewer · Verified candidate contribution
              </div>

              {project.documentUrl && (
                <a
                  href={project.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full Formatted Document in New Tab</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
