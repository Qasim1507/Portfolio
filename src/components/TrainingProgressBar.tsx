import React, { useEffect, useState } from 'react';

interface TrainingProgressBarProps {
  isDark?: boolean;
}

export const TrainingProgressBar: React.FC<TrainingProgressBarProps> = ({ isDark = true }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalScroll <= 0) {
        setScrollProgress(0);
        return;
      }
      const currentScroll = window.scrollY;
      const progress = Math.min(Math.max((currentScroll / totalScroll) * 100, 0), 100);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute a simulated converging loss value corresponding to scroll depth
  const simulatedLoss = (0.842 * Math.exp(-0.025 * scrollProgress)).toFixed(3);
  const currentEpochPercent = Math.round(scrollProgress);

  return (
    <div
      id="training-progress-header"
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none"
    >
      {/* Background track line */}
      <div className="h-[2px] w-full bg-slate-800/40 dark:bg-slate-800/60 backdrop-blur-xs relative overflow-hidden">
        {/* Animated training progress fill */}
        <div
          className="h-full transition-all duration-150 ease-out"
          style={{
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #14B8A6 0%, #06B6D4 50%, #8B5CF6 100%)',
            boxShadow: isDark
              ? '0 0 10px rgba(20, 184, 166, 0.7), 0 0 4px rgba(6, 182, 212, 0.6)'
              : '0 0 6px rgba(20, 184, 166, 0.5)',
          }}
        />
      </div>

      {/* Floating mini training status chip (visible on desktop) */}
      <div className="hidden md:flex justify-end px-6 pt-1">
        <div
          className={`text-[10px] font-mono tracking-tight px-3 py-1 rounded-full border flex items-center gap-2 backdrop-blur-md shadow-xs ${
            isDark
              ? 'bg-[#151518]/90 border-white/10 text-slate-300'
              : 'bg-white/80 border-slate-300 text-slate-600'
          }`}
        >
          <span className="flex items-center gap-1">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                scrollProgress > 95
                  ? 'bg-teal-400 animate-pulse'
                  : 'bg-teal-400 animate-pulse'
              }`}
            />
            <span className="text-teal-400 font-semibold">epoch</span> {currentEpochPercent}%
          </span>
          <span className="text-slate-600 dark:text-slate-600">|</span>
          <span>
            <span className="text-slate-500">loss:</span>{' '}
            <span className="text-teal-400 font-semibold">{simulatedLoss}</span>
          </span>
          <span className="text-slate-600 dark:text-slate-600">|</span>
          <span className="text-slate-400 hidden lg:inline">cuda:0</span>
        </div>
      </div>
    </div>
  );
};
