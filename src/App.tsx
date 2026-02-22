import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Window } from './components/Window';
import { Terminal } from './components/apps/Terminal';
import { FileManager } from './components/apps/FileManager';
import { AboutMe } from './components/apps/AboutMe';
import { ContactApp } from './components/apps/ContactApp';
import { SkillsApp } from './components/apps/SkillsApp';
import { ResumeApp } from './components/apps/ResumeApp';
import { WallpaperPicker } from './components/WallpaperPicker';
import { MobileLayout } from './components/MobileLayout';
import { wallpapers } from './data/wallpapers';

// Auto-detect mobile / tablet (≤1024px)
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 1024);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
};

interface AppWindow {
  id: string;
  title: string;
  icon: string;
  component: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  defaultWidth?: number;
  defaultHeight?: number;
}

const BOOT_LOGS = [
  '[  OK  ] Starting ShreeOS v2.0.26...',
  '[  OK  ] Loading kernel modules...',
  '[  OK  ] Initializing React 19.0 renderer...',
  '[  OK  ] Mounting TypeScript compiler...',
  '[  OK  ] Starting Vite Desktop Environment...',
  '[ INFO ] Loading user profile: shreenath@portfolio',
  '[  OK  ] Loading GitHub repositories (14 repos)...',
  '[  OK  ] Initializing window manager...',
  '[ INFO ] Detected display: 1920x1080',
  '[  OK  ] Loading Catppuccin Mocha theme...',
  '[ WARN ] Creativity levels: MAXIMUM',
  '[  OK  ] Starting portfolio services...',
  '[  OK  ] All systems operational.',
  '',
  'ShreeOS 2.0.26 LTS \\n \\l',
  '',
  'portfolio login: shreenath',
  'Password: ********',
  'Last login: ' + new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
  'Welcome back, Shreenath! 🚀',
];

const desktopIcons = [
  { id: 'terminal', icon: '🖥️', label: 'Terminal' },
  { id: 'files', icon: '📁', label: 'Projects' },
  { id: 'about', icon: '👤', label: 'About Me' },
  { id: 'skills', icon: '📊', label: 'Skills' },
  { id: 'resume', icon: '📄', label: 'Resume' },
  { id: 'contact', icon: '📬', label: 'Contact' },
];

// ---- Matrix Rain Canvas ----
const MatrixCanvas: React.FC = () => {
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
        // Leading character bright
        ctx.fillStyle = drops[i] * fontSize > 0 ? '#a0f0a0' : '#00c840';
        ctx.font = `${fontSize}px Fira Code, monospace`;
        ctx.fillStyle = i % 3 === 0 ? '#ffffff' : '#00dd44';
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
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="wp-matrix-canvas" />;
};

// ---- Wallpaper Renderer ----
const WallpaperLayer: React.FC<{ id: string }> = ({ id }) => {
  const wp = wallpapers.find((w) => w.id === id);
  if (!wp) return null;

  const FIXED: React.CSSProperties = { position: 'fixed', inset: 0, zIndex: 0 };

  switch (id) {
    case 'aurora':
      return (
        <div className="wp-aurora" style={FIXED}>
          <div className="wp-stars" />
        </div>
      );
    case 'matrix':
      return (
        <div className="wp-matrix" style={FIXED}>
          <MatrixCanvas />
        </div>
      );
    case 'nebula':
      return <div className="wp-nebula" style={FIXED} />;
    case 'synthwave':
      return (
        <div className="wp-synthwave" style={FIXED}>
          <div className="wp-sun" />
          <div className="wp-buildings" />
        </div>
      );
    case 'coderain':
      return (
        <div className="wp-cybergrid" style={FIXED}>
          <div className="wp-scanline" />
          <div className="wp-hex" />
        </div>
      );
    case 'lava':
      return (
        <div className="wp-lava" style={FIXED}>
          <div className="wp-lava-cracks" />
        </div>
      );
    default:
      return null;
  }
};

// ---- Typing Animation ----
const TYPING_TEXTS = [
  'Full Stack Developer',
  'Robotics Enthusiast',
  'Web3 Builder',
  'Open Source Contributor',
  'BTech CSE \'28',
  'Hackathon Winner 🏆',
];

const useTypingAnimation = () => {
  const [text, setText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TYPING_TEXTS[textIndex];
    const speed = deleting ? 40 : 80;

    if (!deleting && charIndex === current.length) {
      const pause = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(pause);
    }
    if (deleting && charIndex === 0) {
      setDeleting(false);
      setTextIndex((i) => (i + 1) % TYPING_TEXTS.length);
      return;
    }

    const timer = setTimeout(() => {
      setText(current.substring(0, deleting ? charIndex - 1 : charIndex + 1));
      setCharIndex((c) => (deleting ? c - 1 : c + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [charIndex, deleting, textIndex]);

  return text;
};

const App: React.FC = () => {
  const [booting, setBooting] = useState(true);
  const [bootProgress, setBoot] = useState(0);
  const [windows, setWindows] = useState<AppWindow[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [windowOrder, setWindowOrder] = useState<string[]>([]);
  const [clock, setClock] = useState('');
  const [wallpaperId, setWallpaperId] = useState(() => {
    return localStorage.getItem('shreeos-wallpaper') || 'aurora';
  });
  const [showWpPicker, setShowWpPicker] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const typingText = useTypingAnimation();
  const isMobile = useIsMobile();

  // Boot sequence
  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 5500);
    const progressInterval = setInterval(() => {
      setBoot((p) => Math.min(p + 1, BOOT_LOGS.length));
    }, 250);
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  // Clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClock(
        now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) +
        '  ' +
        now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 10000);
    return () => clearInterval(interval);
  }, []);

  // Visitor counter — once per browser session (fixes StrictMode double-invoke)
  useEffect(() => {
    const SESSION_KEY = 'shreeos-session-counted';
    const STORAGE_KEY = 'shreeos-visitors';
    if (sessionStorage.getItem(SESSION_KEY)) {
      // Already counted this session — just read the current total
      setVisitorCount(parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10));
      return;
    }
    sessionStorage.setItem(SESSION_KEY, '1');
    const count = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10) + 1;
    localStorage.setItem(STORAGE_KEY, String(count));
    setVisitorCount(count);
  }, []);

  // Wallpaper persistence
  useEffect(() => {
    localStorage.setItem('shreeos-wallpaper', wallpaperId);
  }, [wallpaperId]);

  const openWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const exists = prev.find((w) => w.id === id);
      if (exists) {
        return prev.map((w) => (w.id === id ? { ...w, isMinimized: false } : w));
      }

      let win: AppWindow;
      switch (id) {
        case 'terminal':
          win = { id, title: 'Terminal', icon: '🖥️', component: <Terminal />, isMinimized: false, isMaximized: false, defaultWidth: 750, defaultHeight: 480 };
          break;
        case 'files':
          win = { id, title: 'Projects — File Manager', icon: '📁', component: <FileManager />, isMinimized: false, isMaximized: false, defaultWidth: 900, defaultHeight: 600 };
          break;
        case 'about':
          win = { id, title: 'About — Text Editor', icon: '👤', component: <AboutMe />, isMinimized: false, isMaximized: false, defaultWidth: 600, defaultHeight: 450 };
          break;
        case 'skills':
          win = { id, title: 'Skills — System Monitor', icon: '📊', component: <SkillsApp />, isMinimized: false, isMaximized: false, defaultWidth: 650, defaultHeight: 550 };
          break;
        case 'resume':
          win = { id, title: 'Resume — Document Viewer', icon: '📄', component: <ResumeApp />, isMinimized: false, isMaximized: false, defaultWidth: 700, defaultHeight: 600 };
          break;
        case 'contact':
          win = { id, title: 'Contact — Mail', icon: '📬', component: <ContactApp />, isMinimized: false, isMaximized: false, defaultWidth: 500, defaultHeight: 400 };
          break;
        default:
          return prev;
      }
      return [...prev, win];
    });
    setActiveWindowId(id);
    setWindowOrder((prev) => [...prev.filter((w) => w !== id), id]);
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setWindowOrder((prev) => {
      const newOrder = prev.filter((w) => w !== id);
      setActiveWindowId(newOrder[newOrder.length - 1] || null);
      return newOrder;
    });
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)));
    setWindowOrder((prev) => {
      const newOrder = prev.filter((w) => w !== id);
      setActiveWindowId(newOrder[newOrder.length - 1] || null);
      return newOrder;
    });
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setActiveWindowId(id);
    setWindowOrder((prev) => [...prev.filter((w) => w !== id), id]);
  }, []);

  const handleTaskbarClick = useCallback((id: string) => {
    const win = windows.find((w) => w.id === id);
    if (!win) return;
    if (win.isMinimized) {
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: false } : w)));
      focusWindow(id);
    } else if (activeWindowId === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  }, [windows, activeWindowId, focusWindow, minimizeWindow]);

  // Boot Screen
  if (booting) {
    return (
      <div className="boot-screen active">
        <div className="boot-logo">
          Shree's <span>OS</span>
        </div>
        <div className="boot-logs">
          {BOOT_LOGS.slice(0, bootProgress).map((log, i) => (
            <div
              key={i}
              className="boot-log-line"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {log.startsWith('[  OK  ]') ? (
                <><span className="ok">[  OK  ]</span>{log.substring(8)}</>
              ) : log.startsWith('[ INFO ]') ? (
                <><span className="info">[ INFO ]</span>{log.substring(8)}</>
              ) : log.startsWith('[ WARN ]') ? (
                <><span className="warn">[ WARN ]</span>{log.substring(8)}</>
              ) : (
                log
              )}
            </div>
          ))}
        </div>
        <div className="boot-progress">
          <div className="boot-progress-bar" />
        </div>
      </div>
    );
  }

  // Mobile / tablet — show the dedicated touchable layout
  if (isMobile) {
    return <MobileLayout />;
  }

  return (
    <>
      {/* Full-screen wallpaper — rendered outside .desktop so it fills the entire viewport */}
      <WallpaperLayer id={wallpaperId} />

      {/* Desktop */}
      <div className="desktop instant has-wallpaper">
        {/* Typing Animation Overlay */}
        <div className="desktop-typing" style={{ position: 'relative', zIndex: 1 }}>
          <div className="typing-name">Shreenath Mehta</div>
          <div className="typing-line">
            <span className="typing-prompt">&gt; </span>
            <span className="typing-text">{typingText}</span>
            <span className="typing-cursor">|</span>
          </div>
          {visitorCount > 0 && (
            <div className="visitor-badge">👁️ Visitor #{visitorCount}</div>
          )}
        </div>

        {/* Desktop Icons */}
        <div className="desktop-icons" style={{ position: 'relative', zIndex: 1 }}>
          {desktopIcons.map((icon) => (
            <div
              key={icon.id}
              className="desktop-icon"
              onDoubleClick={() => openWindow(icon.id)}
            >
              <span className="desktop-icon-img">{icon.icon}</span>
              <span className="desktop-icon-label">{icon.label}</span>
            </div>
          ))}
        </div>

        {/* Windows */}
        {windows.map((win) => (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            icon={win.icon}
            isActive={activeWindowId === win.id}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            zIndex={100 + windowOrder.indexOf(win.id)}
            defaultWidth={win.defaultWidth}
            defaultHeight={win.defaultHeight}
            onFocus={() => focusWindow(win.id)}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onMaximize={() => maximizeWindow(win.id)}
          >
            {win.component}
          </Window>
        ))}
      </div>

      {/* Wallpaper Picker Modal */}
      {showWpPicker && (
        <WallpaperPicker
          current={wallpaperId}
          onSelect={setWallpaperId}
          onClose={() => setShowWpPicker(false)}
        />
      )}

      {/* Taskbar */}
      <div className="taskbar">
        <div className="taskbar-launcher" onClick={() => openWindow('terminal')} title="Open Terminal">
          🐧
        </div>
        <div className="taskbar-windows">
          {windows.map((win) => (
            <button
              key={win.id}
              className={`taskbar-window-btn ${activeWindowId === win.id && !win.isMinimized ? 'active' : ''}`}
              onClick={() => handleTaskbarClick(win.id)}
            >
              <span className="icon">{win.icon}</span>
              <span>{win.title.split(' — ')[0]}</span>
            </button>
          ))}
        </div>
        <div className="taskbar-tray">
          <div className="taskbar-status" title="Open to opportunities">
            <span className="status-dot" />
            <span className="status-label">Available</span>
          </div>
          <span
            className="taskbar-tray-icon"
            onClick={() => setShowWpPicker((s) => !s)}
            title="Change Wallpaper"
            style={{ fontSize: 16 }}
          >
            🖼️
          </span>
          <span className="taskbar-tray-icon">🔊</span>
          <span className="taskbar-tray-icon">📶</span>
          <span className="taskbar-tray-icon">🔋</span>
          <span className="taskbar-clock">{clock}</span>
        </div>
      </div>
    </>
  );
};

export default App;
