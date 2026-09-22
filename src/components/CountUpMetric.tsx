import React, { useEffect, useRef, useState } from 'react';

interface CountUpMetricProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  symbol?: string;
  className?: string;
}

export const CountUpMetric: React.FC<CountUpMetricProps> = ({
  value,
  duration = 1500,
  prefix = '',
  suffix = '',
  symbol = '',
  className = '',
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setCount(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out quad
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            setCount(Math.round(easeProgress * value));

            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <span ref={ref} className={`font-mono font-semibold tabular-nums ${className}`}>
      {symbol && <span className="mr-0.5">{symbol}</span>}
      {prefix}
      {count}
      {suffix}
    </span>
  );
};
