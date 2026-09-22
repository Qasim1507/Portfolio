/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { TrainingProgressBar } from './components/TrainingProgressBar';
import { Navbar } from './components/Navbar';
import { NeuralCanvas } from './components/NeuralCanvas';
import { Hero } from './components/Hero';
import { CertificationsMarquee } from './components/CertificationsMarquee';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
    }
    return true; // Default dark "GPU room at night" / Obsidian
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden font-sans transition-colors duration-300 ${
        isDark
          ? 'bg-[#0F0F11] text-[#F4F4F5] selection:bg-teal-500/30 selection:text-teal-200'
          : 'bg-[#F8FAFC] text-slate-900 selection:bg-teal-200 selection:text-teal-900'
      }`}
    >
      {/* Pointer Following Custom Cursor (matching reference portfolio) */}
      <CustomCursor />

      {/* Top Epoch & Training Progress Bar */}
      <TrainingProgressBar isDark={isDark} />

      {/* Floating Sticky Navigation Bar */}
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

      {/* Subtle Animated Neural Network Canvas Background */}
      <NeuralCanvas isDark={isDark} />

      {/* Main Content Sections */}
      <main id="main-content" className="relative z-10">
        {/* 1. Monumental Hero Section */}
        <Hero isDark={isDark} />

        {/* 2. Infinite Certifications Marquee (AWS, GCP, HackerRank, Frontiers, IEEE) */}
        <CertificationsMarquee isDark={isDark} />

        {/* 3. About Candidate Specification / Model Card */}
        <AboutSection isDark={isDark} />

        {/* 4. Experience Timeline Section */}
        <ExperienceSection isDark={isDark} />

        {/* 5. Projects & Research Papers with 3D Tilt & Document Viewing */}
        <ProjectsSection isDark={isDark} />

        {/* 6. Skills Embedding Latent Space */}
        <SkillsSection isDark={isDark} />

        {/* 7. Contact Inference Endpoint */}
        <ContactSection isDark={isDark} />
      </main>

      {/* Footer */}
      <Footer isDark={isDark} />
    </div>
  );
}
