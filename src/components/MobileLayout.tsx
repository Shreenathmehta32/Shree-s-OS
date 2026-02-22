import React, { useState, useEffect } from 'react';
import { profile, skills, experience, education, certifications } from '../data/profile';
import { projects, languageColors } from '../data/projects';
import { GitHubStats } from './GitHubStats';
import { Terminal } from './apps/Terminal';

type Tab = 'about' | 'projects' | 'skills' | 'resume' | 'contact' | 'terminal';

const TYPING_TEXTS = [
    'Full Stack Developer',
    'Robotics Enthusiast',
    'Web3 Builder',
    'Open Source Contributor',
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
            setDeleting(false);
            setTextIndex((i) => (i + 1) % TYPING_TEXTS.length);
            return;
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
    { id: 'skills', icon: '📊', label: 'Skills' },
    { id: 'resume', icon: '📄', label: 'Resume' },
    { id: 'terminal', icon: '🖥️', label: 'Terminal' },
    { id: 'contact', icon: '📬', label: 'Contact' },
];

// ─── TAB PANELS ───

const AboutPanel: React.FC = () => (
    <div className="mobile-section">
        <div className="mobile-hero">
            <div className="mobile-avatar">SM</div>
            <h1 className="mobile-name">{profile.name}</h1>
            <p className="mobile-title">{profile.title}</p>
            <div className="mobile-status">
                <span className="status-dot" />
                <span className="status-text">Open to Internships & Collaborations</span>
            </div>
            <p className="mobile-location">📍 {profile.location}</p>
        </div>
        <div className="mobile-card">
            <h3 className="mobile-card-title">About Me</h3>
            <p className="mobile-bio">{profile.summary}</p>
        </div>
        <GitHubStats />
        <div className="mobile-links">
            <a className="mobile-link-btn" href={`mailto:${profile.email}`}>📧 Email</a>
            <a className="mobile-link-btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">🔗 LinkedIn</a>
            <a className="mobile-link-btn" href={profile.github} target="_blank" rel="noopener noreferrer">🐙 GitHub</a>
        </div>
    </div>
);

const ProjectsPanel: React.FC = () => (
    <div className="mobile-section">
        <h2 className="mobile-section-title">📁 Projects <span className="mobile-count">{projects.length} repos</span></h2>
        {projects.map((p) => (
            <div key={p.name} className="mobile-project-card">
                <div className="mobile-project-header">
                    <span className="mobile-project-name">
                        {p.liveUrl ? '🚀' : '📂'} {p.displayName}
                    </span>
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

const SkillsPanel: React.FC = () => {
    const [animated, setAnimated] = useState(false);
    useEffect(() => { const t = setTimeout(() => setAnimated(true), 100); return () => clearTimeout(t); }, []);

    const categories: Record<string, string> = {
        frontend: '🎨 Frontend', backend: '⚙️ Backend',
        blockchain: '🔗 Blockchain / Web3', hardware: '🔧 Hardware / IoT', tools: '🛠️ Dev Tools',
    };

    const grouped = skills.reduce((acc, s) => {
        if (!acc[s.category]) acc[s.category] = [];
        acc[s.category].push(s);
        return acc;
    }, {} as Record<string, typeof skills>);

    return (
        <div className="mobile-section">
            <h2 className="mobile-section-title">📊 Skills</h2>
            {Object.entries(grouped).map(([cat, items]) => (
                <div key={cat} className="mobile-card" style={{ marginBottom: 16 }}>
                    <div className="skill-category-title">{categories[cat] || cat}</div>
                    {items.map((skill) => (
                        <div key={skill.name} className="skill-item">
                            <span className="skill-name">{skill.name}</span>
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
        content += `BTech CSE'28 | Full Stack Developer | Robotics Enthusiast\n${profile.location}\n${profile.email}\n${profile.github}\n\n`;
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

            <h3 className="mobile-card-title" style={{ marginBottom: 12 }}>💼 Experience</h3>
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
        // Simulate — replace with real EmailJS call
        setTimeout(() => { setSending(false); setSent(true); }, 1500);
    };

    return (
        <div className="mobile-section">
            <h2 className="mobile-section-title">📬 Contact</h2>
            <div className="mobile-links" style={{ marginBottom: 20 }}>
                <a className="mobile-link-btn" href={`mailto:${profile.email}`}>📧 Email</a>
                <a className="mobile-link-btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">🔗 LinkedIn</a>
                <a className="mobile-link-btn" href={profile.github} target="_blank" rel="noopener noreferrer">🐙 GitHub</a>
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
