import React, { useEffect, useRef } from 'react';

interface Node {
  layer: number;
  index: number;
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  pulsePhase: number;
}

interface Edge {
  source: Node;
  target: Node;
  weight: number;
}

interface Signal {
  edge: Edge;
  progress: number;
  speed: number;
  color: string;
}

interface NeuralCanvasProps {
  isDark?: boolean;
}

export const NeuralCanvas: React.FC<NeuralCanvasProps> = ({ isDark = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = !document.hidden;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Layer distribution: 5 layers, totaling ~48 nodes
    const layerSizes = [7, 11, 14, 11, 5];
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let signals: Signal[] = [];

    let mousePos = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mousePos = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const initNetwork = () => {
      const width = canvas.width;
      const height = canvas.height;

      nodes = [];
      edges = [];
      signals = [];

      const layerCount = layerSizes.length;
      // Padding from edges
      const paddingX = Math.min(width * 0.08, 80);
      const usableWidth = width - paddingX * 2;

      // Create nodes
      layerSizes.forEach((count, layerIdx) => {
        const x = paddingX + (usableWidth / (layerCount - 1)) * layerIdx;
        const paddingY = Math.min(height * 0.15, 70);
        const usableHeight = height - paddingY * 2;
        const spacingY = usableHeight / (count + 1);

        for (let i = 0; i < count; i++) {
          const y = paddingY + spacingY * (i + 1);
          // slight natural jitter
          const jitterX = (Math.sin(layerIdx * 3 + i) * 6);
          const jitterY = (Math.cos(layerIdx + i * 2) * 6);

          nodes.push({
            layer: layerIdx,
            index: i,
            x: x + jitterX,
            y: y + jitterY,
            radius: layerIdx === 0 || layerIdx === layerCount - 1 ? 4 : 3,
            baseAlpha: 0.35 + Math.random() * 0.3,
            pulsePhase: Math.random() * Math.PI * 2,
          });
        }
      });

      // Create sparse edges between adjacent layers to keep clean aesthetics & low overhead
      for (let l = 0; l < layerCount - 1; l++) {
        const currentLayerNodes = nodes.filter((n) => n.layer === l);
        const nextLayerNodes = nodes.filter((n) => n.layer === l + 1);

        currentLayerNodes.forEach((source) => {
          // Connect to 2-4 nearest nodes in the next layer
          const sorted = [...nextLayerNodes].sort((a, b) => {
            const distA = Math.hypot(a.x - source.x, a.y - source.y);
            const distB = Math.hypot(b.x - source.x, b.y - source.y);
            return distA - distB;
          });

          const connectionsCount = Math.min(
            sorted.length,
            Math.max(2, Math.floor(Math.random() * 3) + 2)
          );

          for (let c = 0; c < connectionsCount; c++) {
            const target = sorted[c];
            edges.push({
              source,
              target,
              weight: 0.2 + Math.random() * 0.6,
            });
          }
        });
      }

      // Initialize initial signals (forward pass pulses)
      if (!prefersReducedMotion && edges.length > 0) {
        for (let s = 0; s < 18; s++) {
          const randomEdge = edges[Math.floor(Math.random() * edges.length)];
          signals.push({
            edge: randomEdge,
            progress: Math.random(),
            speed: 0.004 + Math.random() * 0.007,
            color: Math.random() > 0.4 ? '#22D3EE' : '#8B5CF6',
          });
        }
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement?.getBoundingClientRect() || {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);

      // Store logical width/height
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      initNetwork();
      if (prefersReducedMotion) {
        drawStatic();
      }
    };

    const drawStatic = () => {
      const logicalWidth = parseFloat(canvas.style.width) || canvas.width;
      const logicalHeight = parseFloat(canvas.style.height) || canvas.height;
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);

      // Draw edges
      edges.forEach((edge) => {
        ctx.beginPath();
        ctx.moveTo(edge.source.x, edge.source.y);
        ctx.lineTo(edge.target.x, edge.target.y);
        ctx.strokeStyle = isDark
          ? `rgba(34, 211, 238, ${edge.weight * 0.12})`
          : `rgba(14, 165, 233, ${edge.weight * 0.15})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#22D3EE' : '#0284C7';
        ctx.fill();
      });
    };

    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const logicalWidth = parseFloat(canvas.style.width) || canvas.width;
      const logicalHeight = parseFloat(canvas.style.height) || canvas.height;
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);

      // Draw edges
      edges.forEach((edge) => {
        const { source, target, weight } = edge;
        const midX = (source.x + target.x) / 2;
        const midY = (source.y + target.y) / 2;
        const distToMouse = Math.hypot(midX - mousePos.x, midY - mousePos.y);
        const mouseFactor = Math.max(0, 1 - distToMouse / 140);

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);

        const edgeAlpha = Math.min(
          0.7,
          weight * (isDark ? 0.12 : 0.16) + mouseFactor * 0.35
        );
        ctx.strokeStyle = mouseFactor > 0.1
          ? isDark ? `rgba(34, 211, 238, ${edgeAlpha})` : `rgba(14, 165, 233, ${edgeAlpha})`
          : isDark ? `rgba(148, 163, 184, ${edgeAlpha})` : `rgba(100, 116, 139, ${edgeAlpha})`;
        ctx.lineWidth = mouseFactor > 0.1 ? 1.5 : 0.8;
        ctx.stroke();
      });

      // Update and draw signal pulses
      signals.forEach((sig) => {
        sig.progress += sig.speed * (delta * 60);

        if (sig.progress >= 1) {
          sig.progress = 0;
          // Pick a connected forward edge or random edge to continue the forward pass
          const nextLayerEdges = edges.filter(
            (e) => e.source.layer === sig.edge.target.layer
          );
          if (nextLayerEdges.length > 0 && Math.random() > 0.25) {
            sig.edge = nextLayerEdges[Math.floor(Math.random() * nextLayerEdges.length)];
          } else {
            sig.edge = edges[Math.floor(Math.random() * edges.length)];
          }
        }

        const sx = sig.edge.source.x;
        const sy = sig.edge.source.y;
        const tx = sig.edge.target.x;
        const ty = sig.edge.target.y;

        const px = sx + (tx - sx) * sig.progress;
        const py = sy + (ty - sy) * sig.progress;

        // Glowing signal packet
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = sig.color;
        ctx.shadowColor = sig.color;
        ctx.shadowBlur = isDark ? 6 : 3;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw nodes
      nodes.forEach((node) => {
        node.pulsePhase += delta * 1.5;
        const pulse = Math.sin(node.pulsePhase) * 0.2 + 0.8;
        const distToMouse = Math.hypot(node.x - mousePos.x, node.y - mousePos.y);
        const mouseHighlight = Math.max(0, 1 - distToMouse / 120);

        const currentRadius = node.radius + mouseHighlight * 2.5;

        // Node glow
        if (mouseHighlight > 0.1 || node.layer === 0 || node.layer === layerSizes.length - 1) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, currentRadius + 3, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(34, 211, 238, ${(mouseHighlight * 0.35 + 0.08) * pulse})`
            : `rgba(14, 165, 233, ${(mouseHighlight * 0.35 + 0.08) * pulse})`;
          ctx.fill();
        }

        // Inner node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        if (mouseHighlight > 0.2) {
          ctx.fillStyle = isDark ? '#FFFFFF' : '#0284C7';
        } else {
          ctx.fillStyle = node.layer === 0
            ? (isDark ? '#34D399' : '#059669') // input layer: green
            : node.layer === layerSizes.length - 1
            ? (isDark ? '#8B5CF6' : '#7C3AED') // output layer: violet
            : (isDark ? '#22D3EE' : '#0284C7'); // hidden layers: cyan
        }
        ctx.fill();

        // Node ring
        ctx.lineWidth = 1;
        ctx.strokeStyle = isDark
          ? `rgba(255, 255, 255, ${0.3 + mouseHighlight * 0.5})`
          : `rgba(0, 0, 0, ${0.2 + mouseHighlight * 0.4})`;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Pause when tab is hidden to save battery & CPU
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize);

    // Initial setup
    handleResize();

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      drawStatic();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isDark]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <canvas
        id="neural-network-canvas"
        ref={canvasRef}
        aria-hidden="true"
        className="w-full h-full opacity-70"
      />
    </div>
  );
};
