import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Linkedin,
  Github,
  Phone,
  Copy,
  Check,
  Send,
  Sparkles,
  Server,
  Zap,
} from 'lucide-react';
import { PERSONAL_DATA } from '../data';

interface ContactSectionProps {
  isDark?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  isDark = true,
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <section
      id="contact"
      aria-label="Inference Endpoint and Contact"
      className="py-24 px-4 sm:px-6 relative scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-teal-400 font-semibold tracking-wider uppercase">
              // section_05
            </span>
            <span className="h-[1px] w-8 bg-teal-500/30" />
            <span className="font-mono text-[11px] text-slate-500">
              endpoint · api_v1_inference
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-100 dark:text-white">
            Run inference → let's talk
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
            Currently interviewing for new-grad Software Engineer and ML Engineer roles in Singapore. Ping the endpoint directly.
          </p>
        </div>

        {/* Inference Endpoint Code-Block Card */}
        <div
          id="inference-endpoint-card"
          className={`rounded-2xl border backdrop-blur-md overflow-hidden transition-all duration-300 shadow-2xl ${
            isDark
              ? 'bg-[#151518]/90 border-white/10 hover:border-teal-500/40'
              : 'bg-white/95 border-slate-200 shadow-xl'
          }`}
        >
          {/* Endpoint Bar Header */}
          <div className="px-6 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_8px_#14B8A6] animate-pulse" />
              <span className="font-bold text-teal-400">STATUS: 200 OK</span>
              <span className="text-slate-500 hidden sm:inline">|</span>
              <span className="text-slate-400 hidden sm:inline">latency: ~18ms</span>
            </div>

            <button
              id="copy-endpoint-btn"
              type="button"
              onClick={() =>
                copyToClipboard(
                  `POST /hire/qasim\n{ "role": "SWE / ML Engineer", "location": "Singapore" }`,
                  'endpoint'
                )
              }
              className="text-xs text-slate-400 hover:text-teal-400 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedType === 'endpoint' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-teal-400" />
                  <span className="text-teal-400">Copied snippet</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy curl</span>
                </>
              )}
            </button>
          </div>

          {/* Terminal / Code Body */}
          <div className="p-6 sm:p-8 font-mono text-sm space-y-4">
            {/* Request Method & Route */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/40 font-bold text-xs tracking-wider">
                POST
              </span>
              <span className="text-slate-100 dark:text-white font-semibold text-base">
                /hire/qasim
              </span>
            </div>

            {/* JSON Payload */}
            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm font-mono overflow-x-auto ${
                isDark
                  ? 'bg-[#0F0F11]/90 border-white/10 text-slate-300'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <div className="text-slate-500">// Request payload</div>
              <div>{'{'}</div>
              <div className="pl-4">
                <span className="text-teal-400">"role"</span>:{' '}
                <span className="text-emerald-300">"SWE / ML Engineer"</span>,
              </div>
              <div className="pl-4">
                <span className="text-teal-400">"location"</span>:{' '}
                <span className="text-emerald-300">"Singapore"</span>,
              </div>
              <div className="pl-4">
                <span className="text-teal-400">"candidate"</span>:{' '}
                <span className="text-amber-300">"Qasim Fakharuddin Nalawala"</span>
              </div>
              <div>{'}'}</div>
            </div>

            {/* Simulated Server Response */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-teal-400 font-semibold pt-1">
              <span>→ 200 OK · response within 24h</span>
              <span className="text-slate-400 text-xs font-normal">
                (direct notification to inbox)
              </span>
            </div>
          </div>
        </div>

        {/* Real Contact Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Email button */}
          <a
            id="contact-btn-email"
            href={`mailto:${PERSONAL_DATA.email}`}
            className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-teal-400 group cursor-pointer ${
              isDark
                ? 'bg-[#151518]/90 border-white/10 hover:shadow-[0_10px_30px_rgba(20,184,166,0.1)]'
                : 'bg-white border-slate-200 hover:bg-slate-50 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
                <Mail className="w-5 h-5" />
              </div>
              <Send className="w-4 h-4 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400">direct_email</div>
              <div className="font-display text-sm font-bold text-slate-100 dark:text-white truncate">
                {PERSONAL_DATA.email}
              </div>
            </div>
          </a>

          {/* LinkedIn button */}
          <a
            id="contact-btn-linkedin"
            href={PERSONAL_DATA.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-sky-400 group cursor-pointer ${
              isDark
                ? 'bg-[#151518]/90 border-white/10 hover:shadow-[0_10px_30px_rgba(56,189,248,0.1)]'
                : 'bg-white border-slate-200 hover:bg-slate-50 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
                <Linkedin className="w-5 h-5" />
              </div>
              <span className="text-slate-500 group-hover:text-sky-400 text-xs font-mono">
                connect ↗
              </span>
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400">professional_network</div>
              <div className="font-display text-sm font-bold text-slate-100 dark:text-white truncate">
                linkedin.com/in/qasimfnalawala
              </div>
            </div>
          </a>

          {/* GitHub button */}
          <a
            id="contact-btn-github"
            href={PERSONAL_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-violet-400 group cursor-pointer ${
              isDark
                ? 'bg-[#151518]/90 border-white/10 hover:shadow-[0_10px_30px_rgba(139,92,246,0.1)]'
                : 'bg-white border-slate-200 hover:bg-slate-50 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-400">
                <Github className="w-5 h-5" />
              </div>
              <span className="text-slate-500 group-hover:text-violet-400 text-xs font-mono">
                repos ↗
              </span>
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400">code_repository</div>
              <div className="font-display text-sm font-bold text-slate-100 dark:text-white truncate">
                github.com/Qasim1507
              </div>
            </div>
          </a>

          {/* Phone button */}
          <a
            id="contact-btn-phone"
            href={`tel:${PERSONAL_DATA.phone.replace(/\s+/g, '')}`}
            className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-emerald-400 group cursor-pointer ${
              isDark
                ? 'bg-[#151518]/90 border-white/10 hover:shadow-[0_10px_30px_rgba(52,211,153,0.1)]'
                : 'bg-white border-slate-200 hover:bg-slate-50 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-slate-500 group-hover:text-emerald-400 text-xs font-mono">
                call ↗
              </span>
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400">phone / whatsapp</div>
              <div className="font-display text-sm font-bold text-slate-100 dark:text-white truncate">
                {PERSONAL_DATA.phone}
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
