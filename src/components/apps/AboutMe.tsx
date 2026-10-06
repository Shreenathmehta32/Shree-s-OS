import React from 'react';
import { profile, currentWork, roles, achievements } from '../../data/profile';
import { GitHubStats } from '../GitHubStats';

export const AboutMe: React.FC = () => {
    const ctf = achievements.find(a => a.title.includes('SAS CTF'));

    return (
        <div className="about-app">
            {/* Header / Avatar */}
            <div className="about-header">
                <div className="about-avatar">SM</div>
                <div className="about-header-info">
                    <h1 className="about-name">{profile.name}</h1>
                    <p className="about-title">{profile.title}</p>
                    <div className="about-meta-row">
                        <span className="about-location">📍 {profile.location}</span>
                        <span className="about-role-pill">🛡️ {profile.role}</span>
                    </div>
                    <div className="about-status">
                        <span className="status-dot" />
                        <span className="status-text">{profile.status}</span>
                    </div>
                </div>
            </div>

            {/* Mission Statement */}
            <div className="about-mission-banner">
                <span className="mission-label">$ echo $MISSION</span>
                <span className="mission-text">"{profile.mission}"</span>
            </div>

            {/* CTF & Competition Highlight */}
            {ctf && (
                <div className="about-ctf-highlight">
                    <span className="about-ctf-badge">🏆 TOP ACHIEVEMENT</span>
                    <div className="about-ctf-content">
                        <strong>{ctf.title}</strong> — <span className="highlight-gold">{ctf.highlight}</span>
                        <p>{ctf.description}</p>
                    </div>
                </div>
            )}

            {/* Summary Bio */}
            <div className="about-summary">
                {profile.summary}
            </div>

            {/* Current Work & Focus */}
            <div className="about-section">
                <h3 className="about-section-heading">⚡ Current Work & Focus</h3>
                <div className="current-work-grid">
                    {currentWork.map((item) => (
                        <div key={item.label} className="current-work-item">
                            <span className="current-work-icon">{item.icon}</span>
                            <div className="current-work-body">
                                <span className="current-work-label">[+] {item.label}</span>
                                <span className="current-work-val">{item.value}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Roles & Leadership */}
            <div className="about-section">
                <h3 className="about-section-heading">💼 Current Roles</h3>
                <div className="about-roles-grid">
                    {roles.map((r) => (
                        <div key={r.role} className="about-role-card">
                            <div className="about-role-header">
                                <span className="about-role-title">{r.role}</span>
                                <span className="about-role-org">{r.organization}</span>
                            </div>
                            <span className="about-role-type">{r.type}</span>
                            <p className="about-role-desc">{r.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Social Links */}
            <div className="about-social-row">
                <a className="about-social-btn" href={profile.github} target="_blank" rel="noopener noreferrer">
                    🐙 GitHub
                </a>
                <a className="about-social-btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                    🔗 LinkedIn
                </a>
                <a className="about-social-btn x-btn" href={profile.x} target="_blank" rel="noopener noreferrer">
                    𝕏 Twitter / X
                </a>
                <a className="about-social-btn" href={`mailto:${profile.email}`}>
                    📧 Email Me
                </a>
            </div>

            {/* GitHub Stats & Heatmap */}
            <GitHubStats />
        </div>
    );
};
