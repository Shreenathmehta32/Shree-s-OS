import React, { useRef, useEffect } from 'react';
import { wallpapers } from '../data/wallpapers';

export const MatrixCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let raf: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const isLeading = drops[i] === 1 || Math.random() < 0.05;

        if (isLeading) {
          ctx.fillStyle = '#a6e3a1';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#a6e3a1';
        } else {
          ctx.fillStyle = '#2ea043';
          ctx.shadowBlur = 0;
        }

        ctx.font = `${fontSize}px "Fira Code", monospace`;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="wp-matrix-canvas" />;
};

export const WallpaperLayer: React.FC<{ id: string; className?: string; style?: React.CSSProperties }> = ({ id, className = '', style }) => {
  const wp = wallpapers.find((w) => w.id === id);
  if (!wp) return null;

  const FIXED: React.CSSProperties = { position: 'fixed', inset: 0, zIndex: 0, ...style };

  switch (id) {
    case 'aurora':
      return (
        <div className={`wp-aurora ${className}`} style={FIXED}>
          <div className="wp-stars" />
        </div>
      );
    case 'matrix':
      return (
        <div className={`wp-matrix ${className}`} style={FIXED}>
          <MatrixCanvas />
        </div>
      );
    case 'nebula':
      return <div className={`wp-nebula ${className}`} style={FIXED} />;
    case 'synthwave':
      return (
        <div className={`wp-synthwave ${className}`} style={FIXED}>
          <div className="wp-sun" />
          <div className="wp-buildings" />
        </div>
      );
    case 'coderain':
      return (
        <div className={`wp-cybergrid ${className}`} style={FIXED}>
          <div className="wp-scanline" />
          <div className="wp-hex" />
        </div>
      );
    case 'lava':
      return (
        <div className={`wp-lava ${className}`} style={FIXED}>
          <div className="wp-lava-cracks" />
        </div>
      );
    default:
      return null;
  }
};
