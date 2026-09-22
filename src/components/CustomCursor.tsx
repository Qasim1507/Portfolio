import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [active, setActive] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [visible, setVisible] = useState(false);

  // Smooth spring physics matching the reference site (damping: 25, stiffness: 200)
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    // Detect touch-only mobile devices to avoid showing custom cursor
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(hasTouch);
    if (hasTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setVisible(true);
      // Offset by half size (8px) so cursor centers directly under the pointer
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Expand when hovering any clickable/interactive element
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        Boolean(target.closest('a')) ||
        Boolean(target.closest('button')) ||
        target.classList.contains('cursor-pointer') ||
        target.getAttribute('role') === 'button';

      setActive(isInteractive);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  if (isTouch || !visible) return null;

  return (
    <motion.div
      id="custom-pointer-follower"
      aria-hidden="true"
      className={`custom-cursor hidden md:block ${active ? 'active' : ''}`}
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
    />
  );
};
