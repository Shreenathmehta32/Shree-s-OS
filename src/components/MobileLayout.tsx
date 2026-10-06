import React, { useState, useEffect, useMemo } from 'react';
import { profile, skills, experience, education, certifications, achievements, currentWork, roles } from '../data/profile';
import { projects, languageColors } from '../data/projects';
import type { Project } from '../data/projects';
import { GitHubStats } from './GitHubStats';
import { Terminal } from './apps/Terminal';

type Tab = 'about' | 'projects' | 'achievements' | 'skills' | 'resume' | 'terminal' | 'contact';

const TYPING_TEXTS = [
    'Web Pentester & Security Builder',
    'Offensive Security Researcher',
    'SAS CTF 2026 — Rank #1 India 🇮🇳',
    'Privacy-First AI & Automation',
    'Full Stack Developer',
    'Robotics Enthusiast & Webmaster',
    "BTech CSE '28",
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
            const t = setTimeout(() => setDeleting(true), 2000);
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

const tabs: { id: Tab; icon: string; label: string }[] = [
    { id: 'about', icon: '👤', label: 'About' },
    { id: 'projects', icon: '📁', label: 'Projects' },
    { id: 'achievements', icon: '🏆', label: 'Awards' },
    { id: 'skills', icon: '📊', label: 'Skills' },
    { id: 'resume', icon: '📄', label: 'Resume' },
    { id: 'terminal', icon: '🖥️', label: 'Terminal' },
    { id: 'contact', icon: '📬', label: 'Contact' },
];

// ─── TAB PANELS ───

const AboutPanel: React.FC = () => {
    const ctf = achievements.find(a => a.title.includes('SAS CTF'));

    return (
        <div className="mobile-section">
            <div className="mobile-hero">
                <div className="mobile-avatar">SM</div>
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
                <div className="mobile-ctf-card">
                    <div className="mobile-ctf-top">
                        <span className="mobile-ctf-badge">🏆 TOP ACHIEVEMENT</span>
                        <span className="mobile-ctf-rank">INDIA #1</span>
                    </div>
                    <div className="mobile-ctf-title">{ctf.title}</div>
                    <div className="mobile-ctf-highlight">{ctf.highlight}</div>
                    <p className="mobile-ctf-desc">{ctf.description}</p>
                </div>
            )}

            <div className="mobile-card">
                <h3 className="mobile-card-title">About Me</h3>
                <p className="mobile-bio">{profile.summary}</p>
            </div>

            {/* Current Work */}
            <div className="mobile-card">
                <h3 className="mobile-card-title">⚡ Current Work ($ ./current-work)</h3>
                <div className="mobile-work-list">
                    {currentWork.map(w => (
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
            <div className="mobile-card">
                <h3 className="mobile-card-title">💼 Roles & Leadership</h3>
                {roles.map(r => (
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
        return projects.filter(p => {
            const matchesCat = selectedCat === 'all' || p.category === selectedCat;
            const q = search.toLowerCase().trim();
            const matchesSearch = !q ||
                p.displayName.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.language.toLowerCase().includes(q) ||
                p.topics.some(t => t.toLowerCase().includes(q));
            return matchesCat && matchesSearch;
        });
    }, [selectedCat, search]);

    return (
        <div className="mobile-section">
            <h2 className="mobile-section-title">📁 Projects <span className="mobile-count">{projects.length} repos</span></h2>

            {/* Search */}
            <input
                type="text"
                className="mobile-search-input"
                placeholder="Search projects..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            {/* Categories */}
            <div className="mobile-cat-scroll">
                {['all', 'security', 'ai', 'blockchain', 'cloud', 'game', 'hardware', 'web'].map(cat => (
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

            {filtered.map((p: Project) => (
                <div key={p.name} className={`mobile-project-card ${p.featured ? 'featured' : ''}`}>
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
                            {p.topics.map((t) => <span key={t} className="project-topic">{t}</span>)}
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
        <div className="mobile-section">
            <h2 className="mobile-section-title">🏆 Hall of Fame & Achievements</h2>

            {achievements.map((item, i) => (
                <div key={i} className="mobile-card" style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontSize: 24 }}>{item.icon}</span>
                        <span className="mobile-achieve-year">{item.year}</span>
                    </div>
                    <h3 className="mobile-achieve-title">{item.title}</h3>
                    <div className="mobile-achieve-highlight">{item.highlight}</div>
                    <p className="mobile-achieve-desc">{item.description}</p>
                    {item.details && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
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
    useEffect(() => { const t = setTimeout(() => setAnimated(true), 100); return () => clearTimeout(t); }, []);

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
        <div className="mobile-section">
            <h2 className="mobile-section-title">📊 Skills & Competencies</h2>
            {Object.entries(grouped).map(([cat, items]) => (
                <div key={cat} className="mobile-card" style={{ marginBottom: 16 }}>
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
        achievements.forEach(a => { content += `[${a.year}] ${a.title} — ${a.highlight}\n${a.description}\n\n`; });
        content += `EXPERIENCE\n${'─'.repeat(50)}\n\n`;
        experience.forEach(e => { content += `${e.role}\n${e.company} • ${e.location}\n${e.duration}\n${e.description}\n\n`; });
        content += `EDUCATION\n${'─'.repeat(50)}\n\n`;
        education.forEach(e => { content += `${e.degree}\n${e.institution}\n${e.duration}\n\n`; });
        content += `CERTIFICATIONS\n${'─'.repeat(50)}\n\n`;
        certifications.forEach(c => { content += `• ${c}\n`; });
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'Shreenath_Mehta_Resume.txt'; a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="mobile-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 className="mobile-section-title" style={{ marginBottom: 0 }}>📄 Resume</h2>
                <button className="resume-download-btn" onClick={handleDownload}>⬇ Download</button>
            </div>

            <h3 className="mobile-card-title" style={{ marginBottom: 12 }}>🏆 Achievements</h3>
            {achievements.map((a, i) => (
                <div key={i} className="mobile-card" style={{ marginBottom: 10 }}>
                    <div className="timeline-role">{a.title} <span className="mobile-achieve-year">({a.year})</span></div>
                    <div className="mobile-achieve-highlight">{a.highlight}</div>
                    <div className="timeline-desc">{a.description}</div>
                </div>
            ))}

            <h3 className="mobile-card-title" style={{ margin: '20px 0 12px' }}>💼 Experience</h3>
            {experience.map((exp, i) => (
                <div key={i} className="mobile-card" style={{ marginBottom: 12 }}>
                    <div className="timeline-role">{exp.role}</div>
                    <div className="timeline-company">{exp.company} • {exp.location}</div>
                    <div className="timeline-duration">{exp.duration}</div>
                    <div className="timeline-desc">{exp.description}</div>
                </div>
            ))}

            <h3 className="mobile-card-title" style={{ margin: '20px 0 12px' }}>🎓 Education</h3>
            {education.map((edu, i) => (
                <div key={i} className="mobile-card" style={{ marginBottom: 12 }}>
                    <div className="edu-degree">{edu.degree}</div>
                    <div className="edu-institution">{edu.institution}</div>
                    <div className="edu-duration">{edu.duration}</div>
                </div>
            ))}

            <h3 className="mobile-card-title" style={{ margin: '20px 0 12px' }}>📜 Certifications</h3>
            <div className="mobile-card">
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
        setTimeout(() => { setSending(false); setSent(true); }, 1200);
    };

    return (
        <div className="mobile-section">
            <h2 className="mobile-section-title">📬 Contact & Connect</h2>
            <div className="mobile-links" style={{ marginBottom: 20 }}>
                <a className="mobile-link-btn" href={`mailto:${profile.email}`}>📧 Email</a>
                <a className="mobile-link-btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">🔗 LinkedIn</a>
                <a className="mobile-link-btn" href={profile.github} target="_blank" rel="noopener noreferrer">🐙 GitHub</a>
                <a className="mobile-link-btn" href={profile.x} target="_blank" rel="noopener noreferrer">𝕏 Twitter</a>
            </div>
            <div className="mobile-card">
                <h3 className="mobile-card-title" style={{ marginBottom: 14 }}>📝 Send a Message</h3>
                {sent ? (
                    <div className="contact-status success">✅ Message sent! I'll get back to you soon.</div>
                ) : (
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="contact-field">
                            <label className="contact-label">Name</label>
                            <input className="contact-input" value={name} onChange={e => setName(e.target.value)} required placeholder="Your name" />
                        </div>
                        <div className="contact-field">
                            <label className="contact-label">Email</label>
                            <input className="contact-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" />
                        </div>
                        <div className="contact-field">
                            <label className="contact-label">Message</label>
                            <textarea className="contact-textarea" rows={4} value={message} onChange={e => setMessage(e.target.value)} required placeholder="Hey Shreenath..." />
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

// ─── MAIN MOBILE LAYOUT ───
export const MobileLayout: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('about');
    const typingText = useTypingAnimation();

    return (
        <div className="mobile-root">
            {/* Top header bar */}
            <div className="mobile-header">
                <div className="mobile-header-brand">
                    <span className="mobile-header-logo">🐧</span>
                    <span className="mobile-header-title">Shree's OS</span>
                </div>
                <div className="mobile-header-typing">
                    <span className="typing-prompt">&gt;</span>
                    <span className="typing-text"> {typingText}</span>
                    <span className="typing-cursor">|</span>
                </div>
            </div>

            {/* Tab content */}
            <div className="mobile-content">
                {activeTab === 'about' && <AboutPanel />}
                {activeTab === 'projects' && <ProjectsPanel />}
                {activeTab === 'achievements' && <AchievementsPanel />}
                {activeTab === 'skills' && <SkillsPanel />}
                {activeTab === 'resume' && <ResumePanel />}
                {activeTab === 'contact' && <ContactPanel />}
                {activeTab === 'terminal' && (
                    <div className="mobile-terminal-wrapper">
                        <Terminal />
                    </div>
                )}
            </div>

            {/* Bottom tab bar */}
            <nav className="mobile-tabbar">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`mobile-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <span className="mobile-tab-icon">{tab.icon}</span>
                        <span className="mobile-tab-label">{tab.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};
