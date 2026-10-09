import React, { useState, useEffect, useMemo, useRef } from 'react';
import { profile, skills, experience, education, certifications, achievements, currentWork, roles } from '../data/profile';
import { projects, languageColors } from '../data/projects';
import type { Project } from '../data/projects';
import { GitHubStats } from './GitHubStats';
import { Terminal } from './apps/Terminal';
import { WallpaperLayer } from './WallpaperLayer';
import { wallpapers } from '../data/wallpapers';

export type AndroidAppId =
    | 'projects'
    | 'about'
    | 'achievements'
    | 'skills'
    | 'resume'
    | 'terminal'
    | 'contact'
    | 'wallpapers';

interface MobileLayoutProps {
    wallpaperId?: string;
    onSelectWallpaper?: (id: string) => void;
    visitorCount?: number;
}

const TYPING_TEXTS = [
    'Web Pentester & Security Researcher',
    'SAS CTF 2026 — Rank #1 India 🇮🇳',
    'Offensive Security & Exploit Dev',
    'Privacy-First AI & Automation',
    'Full Stack Engineer',
    'BTech CSE \'28 • Builder',
    'Hackathon Winner 🏆',
];

const useTypingAnimation = () => {
    const [text, setText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = TYPING_TEXTS[textIndex];
        const speed = deleting ? 35 : 70;
        if (!deleting && charIndex === current.length) {
            const t = setTimeout(() => setDeleting(true), 2200);
            return () => clearTimeout(t);
        }
        if (deleting && charIndex === 0) {
            const t = setTimeout(() => {
                setDeleting(false);
                setTextIndex((i) => (i + 1) % TYPING_TEXTS.length);
            }, speed);
            return () => clearTimeout(t);
        }
        const t = setTimeout(() => {
            setText(current.substring(0, deleting ? charIndex - 1 : charIndex + 1));
            setCharIndex((c) => (deleting ? c - 1 : c + 1));
        }, speed);
        return () => clearTimeout(t);
    }, [charIndex, deleting, textIndex]);

    return text;
};

// ─── APP DEFINITIONS & ICONS ───
interface AppMeta {
    id: AndroidAppId;
    title: string;
    label: string;
    icon: string;
    gradient: string;
    badge?: string;
    category?: string;
}

const APPS: AppMeta[] = [
    {
        id: 'projects',
        title: 'Files — Projects',
        label: 'Projects',
        icon: '📁',
        gradient: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
        badge: `${projects.length}`,
    },
    {
        id: 'about',
        title: 'Contacts — About Me',
        label: 'About Me',
        icon: '👤',
        gradient: 'linear-gradient(135deg, #6d28d9 0%, #a855f7 100%)',
        badge: 'Active',
    },
    {
        id: 'achievements',
        title: 'Hall of Fame — Awards',
        label: 'Awards',
        icon: '🏆',
        gradient: 'linear-gradient(135deg, #b45309 0%, #fbbf24 100%)',
        badge: '#1 IND',
    },
    {
        id: 'skills',
        title: 'Stats — Skills Matrix',
        label: 'Skills',
        icon: '📊',
        gradient: 'linear-gradient(135deg, #047857 0%, #10b981 100%)',
        badge: '9+ Tech',
    },
    {
        id: 'resume',
        title: 'Drive — Resume & CV',
        label: 'Resume',
        icon: '📄',
        gradient: 'linear-gradient(135deg, #be123c 0%, #f43f5e 100%)',
        badge: 'CV',
    },
    {
        id: 'terminal',
        title: 'Termux — Bash Shell',
        label: 'Terminal',
        icon: '💻',
        gradient: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
        badge: '>_',
    },
    {
        id: 'contact',
        title: 'Messages — Contact Me',
        label: 'Contact',
        icon: '📬',
        gradient: 'linear-gradient(135deg, #0369a1 0%, #06b6d4 100%)',
        badge: 'Ping',
    },
    {
        id: 'wallpapers',
        title: 'Settings — Wallpapers',
        label: 'Themes',
        icon: '🎨',
        gradient: 'linear-gradient(135deg, #a21caf 0%, #ec4899 50%, #f97316 100%)',
        badge: '6 Live',
    },
];

// ─── IN-APP PANELS ───

const AboutPanel: React.FC = () => {
    const ctf = achievements.find((a) => a.title.includes('SAS CTF'));

    return (
        <div className="mobile-section android-app-body">
            <div className="mobile-hero android-hero-card">
                <div className="android-hero-avatar-wrap">
                    <div className="mobile-avatar">SM</div>
                    <span className="android-avatar-badge" title="Verified Security Researcher">🛡️</span>
                </div>
                <h1 className="mobile-name">{profile.name}</h1>
                <p className="mobile-title">{profile.title}</p>
                <div className="mobile-role-pill">🛡️ {profile.role}</div>
                <div className="mobile-status">
                    <span className="status-dot" />
                    <span className="status-text">{profile.status}</span>
                </div>
                <p className="mobile-location">📍 {profile.location}</p>
            </div>

            {/* Mission banner */}
            <div className="mobile-mission-banner">
                <div className="mobile-mission-cmd">$ echo $MISSION</div>
                <div className="mobile-mission-val">"{profile.mission}"</div>
            </div>

            {/* CTF Spotlight */}
            {ctf && (
                <div className="mobile-ctf-card android-elevated">
                    <div className="mobile-ctf-top">
                        <span className="mobile-ctf-badge">🏆 TOP ACHIEVEMENT</span>
                        <span className="mobile-ctf-rank">INDIA #1</span>
                    </div>
                    <div className="mobile-ctf-title">{ctf.title}</div>
                    <div className="mobile-ctf-highlight">{ctf.highlight}</div>
                    <p className="mobile-ctf-desc">{ctf.description}</p>
                </div>
            )}

            <div className="mobile-card android-elevated">
                <h3 className="mobile-card-title">About Me</h3>
                <p className="mobile-bio">{profile.summary}</p>
            </div>

            {/* Current Work */}
            <div className="mobile-card android-elevated">
                <h3 className="mobile-card-title">⚡ Current Work ($ ./current-work)</h3>
                <div className="mobile-work-list">
                    {currentWork.map((w) => (
                        <div key={w.label} className="mobile-work-item">
                            <span className="mobile-work-icon">{w.icon}</span>
                            <div>
                                <strong className="mobile-work-label">[+] {w.label}</strong>
                                <div className="mobile-work-val">{w.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Roles */}
            <div className="mobile-card android-elevated">
                <h3 className="mobile-card-title">💼 Roles & Leadership</h3>
                {roles.map((r) => (
                    <div key={r.role} className="mobile-role-item">
                        <div className="mobile-role-name">{r.role}</div>
                        <div className="mobile-role-org">{r.organization} • {r.type}</div>
                        <div className="mobile-role-desc">{r.description}</div>
                    </div>
                ))}
            </div>

            <GitHubStats />

            <div className="mobile-links">
                <a className="mobile-link-btn" href={`mailto:${profile.email}`}>📧 Email</a>
                <a className="mobile-link-btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">🔗 LinkedIn</a>
                <a className="mobile-link-btn" href={profile.github} target="_blank" rel="noopener noreferrer">🐙 GitHub</a>
                <a className="mobile-link-btn" href={profile.x} target="_blank" rel="noopener noreferrer">𝕏 Twitter</a>
            </div>
        </div>
    );
};

const ProjectsPanel: React.FC = () => {
    const [selectedCat, setSelectedCat] = useState<string>('all');
    const [search, setSearch] = useState<string>('');

    const filtered = useMemo(() => {
        return projects.filter((p) => {
            const matchesCat = selectedCat === 'all' || p.category === selectedCat;
            const q = search.toLowerCase().trim();
            const matchesSearch =
                !q ||
                p.displayName.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.language.toLowerCase().includes(q) ||
                p.topics.some((t) => t.toLowerCase().includes(q));
            return matchesCat && matchesSearch;
        });
    }, [selectedCat, search]);

    return (
        <div className="mobile-section android-app-body">
            <div className="android-search-container">
                <span className="android-search-icon">🔍</span>
                <input
                    type="text"
                    className="android-search-input"
                    placeholder="Search projects, stack, tags..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                    <button className="android-search-clear" onClick={() => setSearch('')}>✕</button>
                )}
            </div>

            {/* Categories */}
            <div className="mobile-cat-scroll">
                {['all', 'security', 'ai', 'blockchain', 'cloud', 'game', 'hardware', 'web'].map((cat) => (
                    <button
                        key={cat}
                        className={`mobile-cat-pill ${selectedCat === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCat(cat)}
                    >
                        {cat === 'all' ? 'All' :
                            cat === 'security' ? '🛡️ Security' :
                            cat === 'ai' ? '🤖 AI' :
                            cat === 'blockchain' ? '🔗 Web3' :
                            cat === 'cloud' ? '☁️ Cloud' :
                            cat === 'game' ? '🎮 Games' :
                            cat === 'hardware' ? '🔧 Hardware' : '🌐 Web'}
                    </button>
                ))}
            </div>

            <div className="android-results-counter">
                Showing {filtered.length} of {projects.length} repositories
            </div>

            {filtered.map((p: Project) => (
                <div key={p.name} className={`mobile-project-card android-elevated ${p.featured ? 'featured' : ''}`}>
                    <div className="mobile-project-header">
                        <span className="mobile-project-name">
                            {p.liveUrl ? '🚀' : p.category === 'security' ? '🛡️' : p.category === 'ai' ? '🤖' : '📂'} {p.displayName}
                        </span>
                        {p.featured && <span className="mobile-featured-tag">⭐ FEATURED</span>}
                        <span
                            className="project-card-lang"
                            style={{ background: languageColors[p.language] || '#6c7086' }}
                        >
                            {p.language}
                        </span>
                    </div>
                    <p className="mobile-project-desc">{p.description}</p>
                    {p.topics.length > 0 && (
                        <div className="project-card-topics" style={{ marginBottom: 10 }}>
                            {p.topics.map((t) => (
                                <span key={t} className="project-topic">{t}</span>
                            ))}
                        </div>
                    )}
                    <div className="mobile-project-links">
                        <a className="project-card-link" href={p.githubUrl} target="_blank" rel="noopener noreferrer">
                            🐙 GitHub
                        </a>
                        {p.liveUrl && (
                            <a className="project-card-link live" href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                                🌐 Live Demo
                            </a>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

const AchievementsPanel: React.FC = () => {
    return (
        <div className="mobile-section android-app-body">
            <div className="android-banner-gold">
                <div className="android-banner-icon">🏆</div>
                <div>
                    <h3 className="android-banner-title">SAS CTF 2026 Champion</h3>
                    <p className="android-banner-sub">Rank #1 India 🇮🇳 • Global Rank #77 / 2,400+ Teams</p>
                </div>
            </div>

            {achievements.map((item, i) => (
                <div key={i} className="mobile-card android-elevated" style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontSize: 28 }}>{item.icon}</span>
                        <span className="mobile-achieve-year">{item.year}</span>
                    </div>
                    <h3 className="mobile-achieve-title">{item.title}</h3>
                    <div className="mobile-achieve-highlight">{item.highlight}</div>
                    <p className="mobile-achieve-desc">{item.description}</p>
                    {item.details && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                            {item.details.map((d, di) => (
                                <span key={di} className="project-topic">{d}</span>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

const SkillsPanel: React.FC = () => {
    const [animated, setAnimated] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setAnimated(true), 150);
        return () => clearTimeout(t);
    }, []);

    const categories: Record<string, string> = {
        security: '🛡️ Offensive Security & Pentesting',
        systems: '🐧 Systems & Cloud / Linux',
        ai: '🤖 AI & Automation',
        frontend: '🎨 Frontend Development',
        backend: '⚙️ Backend & API',
        blockchain: '🔗 Blockchain / Web3',
        hardware: '🔧 Hardware & IoT',
        tools: '🛠️ Dev Tools',
    };

    const grouped = skills.reduce((acc, s) => {
        if (!acc[s.category]) acc[s.category] = [];
        acc[s.category].push(s);
        return acc;
    }, {} as Record<string, typeof skills>);

    return (
        <div className="mobile-section android-app-body">
            {Object.entries(grouped).map(([cat, items]) => (
                <div key={cat} className="mobile-card android-elevated" style={{ marginBottom: 16 }}>
                    <div className="skill-category-title">{categories[cat] || cat}</div>
                    {items.map((skill) => (
                        <div key={skill.name} className="skill-item">
                            <span className="skill-name" style={{ width: 140 }}>{skill.name}</span>
                            <div className="skill-bar-bg">
                                <div className="skill-bar" style={{ width: animated ? `${skill.level}%` : '0%' }} />
                            </div>
                            <span className="skill-value">{skill.level}%</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

const ResumePanel: React.FC = () => {
    const handleDownload = () => {
        let content = `SHREENATH MEHTA — RESUME\n${'='.repeat(50)}\n\n`;
        content += `${profile.title}\n${profile.location}\n${profile.email}\n${profile.github}\n${profile.x}\n\n`;
        content += `MISSION: "${profile.mission}"\n\n`;
        content += `ACHIEVEMENTS\n${'─'.repeat(50)}\n\n`;
        achievements.forEach((a) => {
            content += `[${a.year}] ${a.title} — ${a.highlight}\n${a.description}\n\n`;
        });
        content += `EXPERIENCE\n${'─'.repeat(50)}\n\n`;
        experience.forEach((e) => {
            content += `${e.role}\n${e.company} • ${e.location}\n${e.duration}\n${e.description}\n\n`;
        });
        content += `EDUCATION\n${'─'.repeat(50)}\n\n`;
        education.forEach((e) => {
            content += `${e.degree}\n${e.institution}\n${e.duration}\n\n`;
        });
        content += `CERTIFICATIONS\n${'─'.repeat(50)}\n\n`;
        certifications.forEach((c) => {
            content += `• ${c}\n`;
        });
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Shreenath_Mehta_Resume.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="mobile-section android-app-body">
            <div className="android-resume-hero">
                <div>
                    <h2 className="android-resume-name">{profile.name}</h2>
                    <p className="android-resume-sub">{profile.title}</p>
                </div>
                <button className="resume-download-btn android-fab-btn" onClick={handleDownload}>
                    ⬇ Download
                </button>
            </div>

            <h3 className="mobile-card-title" style={{ marginTop: 16, marginBottom: 12 }}>🏆 Achievements</h3>
            {achievements.map((a, i) => (
                <div key={i} className="mobile-card android-elevated" style={{ marginBottom: 10 }}>
                    <div className="timeline-role">
                        {a.title} <span className="mobile-achieve-year">({a.year})</span>
                    </div>
                    <div className="mobile-achieve-highlight">{a.highlight}</div>
                    <div className="timeline-desc">{a.description}</div>
                </div>
            ))}

            <h3 className="mobile-card-title" style={{ margin: '20px 0 12px' }}>💼 Experience</h3>
            {experience.map((exp, i) => (
                <div key={i} className="mobile-card android-elevated" style={{ marginBottom: 12 }}>
                    <div className="timeline-role">{exp.role}</div>
                    <div className="timeline-company">{exp.company} • {exp.location}</div>
                    <div className="timeline-duration">{exp.duration}</div>
                    <div className="timeline-desc">{exp.description}</div>
                </div>
            ))}

            <h3 className="mobile-card-title" style={{ margin: '20px 0 12px' }}>🎓 Education</h3>
            {education.map((edu, i) => (
                <div key={i} className="mobile-card android-elevated" style={{ marginBottom: 12 }}>
                    <div className="edu-degree">{edu.degree}</div>
                    <div className="edu-institution">{edu.institution}</div>
                    <div className="edu-duration">{edu.duration}</div>
                </div>
            ))}

            <h3 className="mobile-card-title" style={{ margin: '20px 0 12px' }}>📜 Certifications</h3>
            <div className="mobile-card android-elevated">
                {certifications.map((cert, i) => (
                    <div key={i} className="cert-item">
                        <span className="cert-icon">🏅</span>
                        <span>{cert}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ContactPanel: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setSent(true);
        }, 1200);
    };

    return (
        <div className="mobile-section android-app-body">
            <div className="mobile-links" style={{ marginBottom: 20 }}>
                <a className="mobile-link-btn" href={`mailto:${profile.email}`}>📧 Email</a>
                <a className="mobile-link-btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">🔗 LinkedIn</a>
                <a className="mobile-link-btn" href={profile.github} target="_blank" rel="noopener noreferrer">🐙 GitHub</a>
                <a className="mobile-link-btn" href={profile.x} target="_blank" rel="noopener noreferrer">𝕏 Twitter</a>
            </div>
            <div className="mobile-card android-elevated">
                <h3 className="mobile-card-title" style={{ marginBottom: 14 }}>📝 Send a Message</h3>
                {sent ? (
                    <div className="contact-status success">
                        ✅ Message sent! I'll get back to you soon.
                        <button
                            className="android-reset-btn"
                            onClick={() => {
                                setSent(false);
                                setMessage('');
                            }}
                        >
                            Send another
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="contact-field">
                            <label className="contact-label">Name</label>
                            <input
                                className="contact-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Your name"
                            />
                        </div>
                        <div className="contact-field">
                            <label className="contact-label">Email</label>
                            <input
                                className="contact-input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="your@email.com"
                            />
                        </div>
                        <div className="contact-field">
                            <label className="contact-label">Message</label>
                            <textarea
                                className="contact-textarea"
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                placeholder="Hey Shreenath, let's connect..."
                            />
                        </div>
                        <button type="submit" className="contact-submit" disabled={sending}>
                            {sending ? '⏳ Sending...' : '🚀 Send Message'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

// ─── WALLPAPERS PANEL ───
const WallpapersPanel: React.FC<{
    current: string;
    onSelect: (id: string) => void;
}> = ({ current, onSelect }) => {
    return (
        <div className="mobile-section android-app-body">
            <div className="android-card-header-note">
                🎨 Choose a dynamic live wallpaper for ShreeOS Android Edition. Changes sync across mobile & desktop.
            </div>
            <div className="android-wallpaper-grid">
                {wallpapers.map((wp) => (
                    <div
                        key={wp.id}
                        className={`android-wp-card ${current === wp.id ? 'active' : ''}`}
                        onClick={() => onSelect(wp.id)}
                    >
                        <div className="android-wp-preview" style={{ background: wp.preview }}>
                            {current === wp.id && (
                                <div className="android-wp-active-check">✓ Active</div>
                            )}
                        </div>
                        <div className="android-wp-name">{wp.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── TERMINAL PANEL WITH SHORTCUT BAR ───
const TermuxPanel: React.FC = () => {
    const [shortcutCmd, setShortcutCmd] = useState<string>('');

    const runCmd = (cmd: string) => {
        setShortcutCmd(cmd);
        // Reset after short delay so same command can be triggered again
        setTimeout(() => setShortcutCmd(''), 300);
    };

    return (
        <div className="android-termux-wrapper">
            {/* Quick Hacker Toolbar */}
            <div className="android-termux-toolbar">
                <span className="android-termux-tag">TERMUX KEYS:</span>
                <button className="android-key-btn" onClick={() => runCmd('ls')}>ls</button>
                <button className="android-key-btn" onClick={() => runCmd('pwd')}>pwd</button>
                <button className="android-key-btn" onClick={() => runCmd('neofetch')}>neofetch</button>
                <button className="android-key-btn" onClick={() => runCmd('achievements')}>awards</button>
                <button className="android-key-btn" onClick={() => runCmd('sudo hire-me')}>sudo hire-me</button>
                <button className="android-key-btn" onClick={() => runCmd('cat about.txt')}>cat about</button>
                <button className="android-key-btn" onClick={() => runCmd('clear')}>clear</button>
                <button className="android-key-btn" onClick={() => runCmd('help')}>help</button>
            </div>
            <div className="android-termux-body">
                <Terminal shortcutCommand={shortcutCmd} />
            </div>
        </div>
    );
};

// ─── MAIN ANDROID OS MOBILE LAYOUT ───
export const MobileLayout: React.FC<MobileLayoutProps> = ({
    wallpaperId: propWallpaperId,
    onSelectWallpaper: propOnSelectWallpaper,
    visitorCount = 0,
}) => {
    const [wallpaper, setWallpaper] = useState<string>(() => {
        return propWallpaperId || localStorage.getItem('shreeos-wallpaper') || 'aurora';
    });
    const [activeApp, setActiveApp] = useState<AndroidAppId | null>(null);
    const [recentApps, setRecentApps] = useState<AndroidAppId[]>([]);
    const [showRecents, setShowRecents] = useState<boolean>(false);
    const [showNotificationShade, setShowNotificationShade] = useState<boolean>(false);
    const [searchFilter, setSearchFilter] = useState<string>('');
    const [clockTime, setClockTime] = useState<string>('12:00');
    const [dateStr, setDateStr] = useState<string>('Thursday, Oct 9');
    const [batteryLevel, setBatteryLevel] = useState<number>(98);
    const [quickSettings, setQuickSettings] = useState({
        wifi: true,
        secShield: true,
        dnd: false,
        sound: true,
    });

    const typingText = useTypingAnimation();
    const launcherRef = useRef<HTMLDivElement>(null);

    // Sync wallpaper with props or localStorage
    useEffect(() => {
        if (propWallpaperId) setWallpaper(propWallpaperId);
    }, [propWallpaperId]);

    const handleSelectWallpaper = (id: string) => {
        setWallpaper(id);
        localStorage.setItem('shreeos-wallpaper', id);
        if (propOnSelectWallpaper) {
            propOnSelectWallpaper(id);
        }
    };

    // Live clock & battery
    useEffect(() => {
        const update = () => {
            const now = new Date();
            setClockTime(
                now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
            );
            setDateStr(
                now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
            );
        };
        update();
        const t = setInterval(update, 10000);
        return () => clearInterval(t);
    }, []);

    // Try reading real battery if available
    useEffect(() => {
        if ('getBattery' in navigator) {
            (navigator as any).getBattery().then((battery: any) => {
                setBatteryLevel(Math.round(battery.level * 100));
                battery.addEventListener('levelchange', () => {
                    setBatteryLevel(Math.round(battery.level * 100));
                });
            }).catch(() => {});
        }
    }, []);

    // App launch helper
    const openApp = (id: AndroidAppId) => {
        setActiveApp(id);
        setShowRecents(false);
        setShowNotificationShade(false);
        setRecentApps((prev) => [id, ...prev.filter((item) => item !== id)].slice(0, 8));
    };

    // Navigation bar controls
    const handleHome = () => {
        setActiveApp(null);
        setShowRecents(false);
        setShowNotificationShade(false);
    };

    const handleBack = () => {
        if (showNotificationShade) {
            setShowNotificationShade(false);
        } else if (showRecents) {
            setShowRecents(false);
        } else if (activeApp) {
            setActiveApp(null);
        }
    };

    const handleToggleRecents = () => {
        setShowNotificationShade(false);
        setShowRecents((prev) => !prev);
    };

    const currentAppMeta = APPS.find((a) => a.id === activeApp);

    // Filter launcher apps when search is active
    const displayedApps = useMemo(() => {
        if (!searchFilter.trim()) return APPS;
        const q = searchFilter.toLowerCase().trim();
        return APPS.filter(
            (a) =>
                a.label.toLowerCase().includes(q) ||
                a.title.toLowerCase().includes(q) ||
                (a.badge && a.badge.toLowerCase().includes(q))
        );
    }, [searchFilter]);

    return (
        <div className="android-root">
            {/* Live Wallpaper Background */}
            <div className="android-wallpaper-container">
                <WallpaperLayer id={wallpaper} />
                <div className="android-wallpaper-scrim" />
            </div>

            {/* ── TOP ANDROID STATUS BAR ── */}
            <header
                className="android-status-bar"
                onClick={() => setShowNotificationShade((prev) => !prev)}
                title="Tap to open Notifications & Quick Settings"
            >
                <div className="android-status-left">
                    <span className="android-status-time">{clockTime}</span>
                    <span className="android-status-pill-badge" title="SAS CTF #1 India">🏆</span>
                    <span className="android-status-pill-badge" title="Offensive Sec Active">🛡️</span>
                </div>
                <div className="android-status-right">
                    <span className="android-status-icon" title="5G Ultra Connected">5G</span>
                    <span className="android-status-icon" title="Wi-Fi Connected">📶</span>
                    <span className="android-status-icon" title="Sound Mode">
                        {quickSettings.sound ? '🔔' : '🔕'}
                    </span>
                    <div className="android-status-battery" title={`${batteryLevel}% Battery`}>
                        <span className="android-battery-level" style={{ width: `${batteryLevel}%` }} />
                        <span className="android-battery-text">{batteryLevel}%</span>
                    </div>
                </div>
            </header>

            {/* ── ANDROID NOTIFICATION & QUICK SETTINGS SHADE ── */}
            {showNotificationShade && (
                <div className="android-shade-backdrop" onClick={() => setShowNotificationShade(false)}>
                    <div className="android-shade-panel" onClick={(e) => e.stopPropagation()}>
                        <div className="android-shade-handle" />

                        {/* Quick Settings Header */}
                        <div className="android-shade-header">
                            <div>
                                <div className="android-shade-clock">{clockTime}</div>
                                <div className="android-shade-date">{dateStr}</div>
                            </div>
                            <button
                                className="android-shade-close-btn"
                                onClick={() => setShowNotificationShade(false)}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Quick Setting Tiles */}
                        <div className="android-tiles-grid">
                            <div
                                className={`android-tile ${quickSettings.wifi ? 'active' : ''}`}
                                onClick={() =>
                                    setQuickSettings((s) => ({ ...s, wifi: !s.wifi }))
                                }
                            >
                                <span className="android-tile-icon">📶</span>
                                <div className="android-tile-text">
                                    <div className="android-tile-label">Wi-Fi</div>
                                    <div className="android-tile-sub">ShreeNet 5G</div>
                                </div>
                            </div>

                            <div
                                className={`android-tile ${quickSettings.secShield ? 'active' : ''}`}
                                onClick={() =>
                                    setQuickSettings((s) => ({ ...s, secShield: !s.secShield }))
                                }
                            >
                                <span className="android-tile-icon">🛡️</span>
                                <div className="android-tile-text">
                                    <div className="android-tile-label">OffSec Mode</div>
                                    <div className="android-tile-sub">Active & Armed</div>
                                </div>
                            </div>

                            <div
                                className="android-tile active"
                                onClick={() => {
                                    setShowNotificationShade(false);
                                    openApp('wallpapers');
                                }}
                            >
                                <span className="android-tile-icon">🎨</span>
                                <div className="android-tile-text">
                                    <div className="android-tile-label">Wallpaper</div>
                                    <div className="android-tile-sub">{wallpaper}</div>
                                </div>
                            </div>

                            <div
                                className="android-tile active"
                                onClick={() => {
                                    setShowNotificationShade(false);
                                    openApp('terminal');
                                }}
                            >
                                <span className="android-tile-icon">💻</span>
                                <div className="android-tile-text">
                                    <div className="android-tile-label">Termux</div>
                                    <div className="android-tile-sub">CLI Shell</div>
                                </div>
                            </div>

                            <div
                                className={`android-tile ${quickSettings.dnd ? 'active' : ''}`}
                                onClick={() =>
                                    setQuickSettings((s) => ({ ...s, dnd: !s.dnd }))
                                }
                            >
                                <span className="android-tile-icon">🌙</span>
                                <div className="android-tile-text">
                                    <div className="android-tile-label">DND</div>
                                    <div className="android-tile-sub">Hacker Flow</div>
                                </div>
                            </div>

                            <div
                                className={`android-tile ${quickSettings.sound ? 'active' : ''}`}
                                onClick={() =>
                                    setQuickSettings((s) => ({ ...s, sound: !s.sound }))
                                }
                            >
                                <span className="android-tile-icon">🔊</span>
                                <div className="android-tile-text">
                                    <div className="android-tile-label">Sound</div>
                                    <div className="android-tile-sub">Vibrate</div>
                                </div>
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="android-notif-header">
                            <span>Notifications</span>
                            <span className="android-notif-clear">Clear</span>
                        </div>

                        <div className="android-notif-card" onClick={() => { setShowNotificationShade(false); openApp('achievements'); }}>
                            <div className="android-notif-icon">🏆</div>
                            <div className="android-notif-body">
                                <div className="android-notif-title">SAS CTF 2026 — Rank #1 India 🇮🇳</div>
                                <div className="android-notif-desc">Global Rank #77 out of 2,400+ international cybersecurity teams.</div>
                            </div>
                            <span className="android-notif-badge">Tap</span>
                        </div>

                        <div className="android-notif-card" onClick={() => { setShowNotificationShade(false); openApp('resume'); }}>
                            <div className="android-notif-icon">💼</div>
                            <div className="android-notif-body">
                                <div className="android-notif-title">Available for Offensive Sec & Dev Roles</div>
                                <div className="android-notif-desc">Tap to view resume timeline, credentials & downloadable CV.</div>
                            </div>
                            <span className="android-notif-badge">View</span>
                        </div>

                        <div className="android-notif-card" onClick={() => { setShowNotificationShade(false); openApp('contact'); }}>
                            <div className="android-notif-icon">📬</div>
                            <div className="android-notif-body">
                                <div className="android-notif-title">Direct Connect Available</div>
                                <div className="android-notif-desc">Send a direct message to Shreenath or copy email/LinkedIn.</div>
                            </div>
                            <span className="android-notif-badge">Chat</span>
                        </div>
                    </div>
                </div>
            )}

            {/* ── ANDROID HOME SCREEN LAUNCHER (When no app is full-screen) ── */}
            {!activeApp && !showRecents && (
                <main className="android-launcher" ref={launcherRef}>
                    {/* Google At A Glance Widget */}
                    <div className="android-glance-widget">
                        <div className="android-glance-date">{dateStr}</div>
                        <div className="android-glance-typing">
                            <span className="android-glance-prompt">&gt;</span>
                            <span className="android-glance-text"> {typingText}</span>
                            <span className="android-glance-cursor">|</span>
                        </div>
                        <div className="android-glance-sub">
                            <span className="android-glance-badge">📍 {profile.location}</span>
                            <span className="android-glance-badge">🛡️ {profile.status}</span>
                            {visitorCount > 0 && (
                                <span className="android-glance-badge">👁️ #{visitorCount}</span>
                            )}
                        </div>
                    </div>

                    {/* Google Search / Termux Quick Bar */}
                    <div className="android-search-bar">
                        <span className="android-search-logo" title="ShreeDroid">🐧</span>
                        <input
                            type="text"
                            className="android-search-pill-input"
                            placeholder="Search apps, projects, commands..."
                            value={searchFilter}
                            onChange={(e) => setSearchFilter(e.target.value)}
                        />
                        {searchFilter ? (
                            <button className="android-search-btn" onClick={() => setSearchFilter('')}>✕</button>
                        ) : (
                            <button
                                className="android-search-btn"
                                onClick={() => openApp('terminal')}
                                title="Launch Termux"
                            >
                                💻
                            </button>
                        )}
                    </div>

                    {/* Android App Icons Grid */}
                    <div className="android-apps-grid">
                        {displayedApps.map((app) => (
                            <div
                                key={app.id}
                                className="android-app-item"
                                onClick={() => openApp(app.id)}
                            >
                                <div
                                    className="android-app-icon-squircle"
                                    style={{ background: app.gradient }}
                                >
                                    <span className="android-app-icon-glyph">{app.icon}</span>
                                    {app.badge && (
                                        <span className="android-app-badge">{app.badge}</span>
                                    )}
                                </div>
                                <span className="android-app-label">{app.label}</span>
                            </div>
                        ))}

                        {/* Direct Social Links App Icons */}
                        <a
                            href={profile.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="android-app-item"
                        >
                            <div
                                className="android-app-icon-squircle"
                                style={{ background: 'linear-gradient(135deg, #181825 0%, #313244 100%)' }}
                            >
                                <span className="android-app-icon-glyph">🐙</span>
                                <span className="android-app-badge">22</span>
                            </div>
                            <span className="android-app-label">GitHub</span>
                        </a>

                        <a
                            href={profile.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="android-app-item"
                        >
                            <div
                                className="android-app-icon-squircle"
                                style={{ background: 'linear-gradient(135deg, #0077b5 0%, #0a66c2 100%)' }}
                            >
                                <span className="android-app-icon-glyph">💼</span>
                                <span className="android-app-badge">Link</span>
                            </div>
                            <span className="android-app-label">LinkedIn</span>
                        </a>
                    </div>

                    {/* Android Pinned Dock */}
                    <div className="android-dock-shelf">
                        <div
                            className="android-dock-app"
                            onClick={() => openApp('contact')}
                            title="Messages"
                        >
                            <div
                                className="android-dock-icon"
                                style={{ background: 'linear-gradient(135deg, #0369a1 0%, #06b6d4 100%)' }}
                            >
                                📬
                            </div>
                            <span className="android-dock-label">Contact</span>
                        </div>

                        <div
                            className="android-dock-app"
                            onClick={() => openApp('projects')}
                            title="Files"
                        >
                            <div
                                className="android-dock-icon"
                                style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)' }}
                            >
                                📁
                            </div>
                            <span className="android-dock-label">Projects</span>
                        </div>

                        <div
                            className="android-dock-app"
                            onClick={() => openApp('terminal')}
                            title="Termux"
                        >
                            <div
                                className="android-dock-icon"
                                style={{ background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)' }}
                            >
                                💻
                            </div>
                            <span className="android-dock-label">Termux</span>
                        </div>

                        <div
                            className="android-dock-app"
                            onClick={() => openApp('about')}
                            title="Profile"
                        >
                            <div
                                className="android-dock-icon"
                                style={{ background: 'linear-gradient(135deg, #6d28d9 0%, #a855f7 100%)' }}
                            >
                                👤
                            </div>
                            <span className="android-dock-label">About</span>
                        </div>
                    </div>
                </main>
            )}

            {/* ── ANDROID RECENTS / APP SWITCHER (MULTITASKING) ── */}
            {showRecents && (
                <div className="android-recents-container">
                    <div className="android-recents-header">
                        <span>Running Apps</span>
                        <button
                            className="android-recents-clear-btn"
                            onClick={() => {
                                setRecentApps([]);
                                setShowRecents(false);
                            }}
                        >
                            Clear All
                        </button>
                    </div>

                    {recentApps.length === 0 ? (
                        <div className="android-recents-empty">
                            <span style={{ fontSize: 36 }}>📱</span>
                            <p>No recent apps</p>
                        </div>
                    ) : (
                        <div className="android-recents-deck">
                            {recentApps.map((id) => {
                                const appMeta = APPS.find((a) => a.id === id);
                                if (!appMeta) return null;
                                return (
                                    <div
                                        key={id}
                                        className="android-recent-card"
                                        onClick={() => openApp(id)}
                                    >
                                        <div className="android-recent-card-top">
                                            <div className="android-recent-card-identity">
                                                <span className="android-recent-icon">{appMeta.icon}</span>
                                                <span className="android-recent-title">{appMeta.label}</span>
                                            </div>
                                            <button
                                                className="android-recent-close"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setRecentApps((r) => r.filter((x) => x !== id));
                                                }}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                        <div className="android-recent-card-preview">
                                            <div className="android-recent-preview-badge">
                                                {appMeta.title}
                                            </div>
                                            <div className="android-recent-preview-desc">
                                                Tap to resume session
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* ── ANDROID ACTIVE APP FULL-SCREEN VIEW ── */}
            {activeApp && !showRecents && (
                <div className="android-app-window">
                    {/* Android App Top Bar */}
                    <div className="android-app-header">
                        <button className="android-app-back-btn" onClick={handleBack} title="Back to Home">
                            <span className="android-back-arrow">←</span>
                        </button>
                        <div className="android-app-title-group">
                            <span className="android-app-header-icon">{currentAppMeta?.icon}</span>
                            <span className="android-app-header-title">{currentAppMeta?.title}</span>
                        </div>
                        <div className="android-app-actions">
                            <button
                                className="android-app-action-btn"
                                onClick={() => handleToggleRecents()}
                                title="Recents"
                            >
                                ◼
                            </button>
                            <button
                                className="android-app-action-btn"
                                onClick={handleHome}
                                title="Close to Home"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* App Content */}
                    <div className="android-app-scroll-content">
                        {activeApp === 'projects' && <ProjectsPanel />}
                        {activeApp === 'about' && <AboutPanel />}
                        {activeApp === 'achievements' && <AchievementsPanel />}
                        {activeApp === 'skills' && <SkillsPanel />}
                        {activeApp === 'resume' && <ResumePanel />}
                        {activeApp === 'contact' && <ContactPanel />}
                        {activeApp === 'wallpapers' && (
                            <WallpapersPanel
                                current={wallpaper}
                                onSelect={handleSelectWallpaper}
                            />
                        )}
                        {activeApp === 'terminal' && <TermuxPanel />}
                    </div>
                </div>
            )}

            {/* ── ANDROID 3-BUTTON NAVIGATION BAR ── */}
            <nav className="android-nav-bar">
                <button
                    className="android-nav-btn"
                    onClick={handleBack}
                    title="Back"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="19,4 6,12 19,20" />
                    </svg>
                </button>
                <button
                    className="android-nav-btn"
                    onClick={handleHome}
                    title="Home"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="9" />
                    </svg>
                </button>
                <button
                    className="android-nav-btn"
                    onClick={handleToggleRecents}
                    title="Recent Apps"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="5" y="5" width="14" height="14" rx="2" />
                    </svg>
                </button>
            </nav>
        </div>
    );
};
