import React, { useState } from 'react';
import { achievements } from '../../data/profile';
import type { Achievement } from '../../data/profile';

export const AchievementsApp: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string>('all');

    const filtered = selectedType === 'all'
        ? achievements
        : achievements.filter(a => a.type === selectedType);

    const ctfHero = achievements.find(a => a.title.includes('SAS CTF'));

    return (
        <div className="achievements-app">
            <div className="achievements-header">
                <div className="achievements-title-block">
                    <span className="achievements-icon">🏆</span>
                    <div>
                        <h2 className="achievements-title">Hall of Fame & Achievements</h2>
                        <p className="achievements-subtitle">Competitions, CTFs, Hackathons & Honors</p>
                    </div>
                </div>
            </div>

            {/* CTF Spotlight Banner */}
            {ctfHero && (
                <div className="ctf-spotlight-card">
                    <div className="ctf-spotlight-glow" />
                    <div className="ctf-spotlight-top">
                        <span className="ctf-badge-pulse">🇮🇳 RANK #1 IN INDIA</span>
                        <span className="ctf-badge-global">GLOBAL #77</span>
                        <span className="ctf-year">2026</span>
                    </div>
                    <div className="ctf-spotlight-content">
                        <div className="ctf-spotlight-heading">
                            <span className="ctf-flag-icon">🚩</span>
                            <div>
                                <h3 className="ctf-title">{ctfHero.title}</h3>
                                <p className="ctf-desc">{ctfHero.description}</p>
                            </div>
                        </div>
                        <div className="ctf-stats-row">
                            <div className="ctf-stat-item">
                                <span className="ctf-stat-num">#1</span>
                                <span className="ctf-stat-label">India Ranking</span>
                            </div>
                            <div className="ctf-stat-item">
                                <span className="ctf-stat-num">#77</span>
                                <span className="ctf-stat-label">Global Standing</span>
                            </div>
                            <div className="ctf-stat-item">
                                <span className="ctf-stat-num">CTF</span>
                                <span className="ctf-stat-label">Offensive Security</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Filter Tabs */}
            <div className="achievements-filter-bar">
                <button
                    className={`achieve-filter-btn ${selectedType === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedType('all')}
                >
                    All ({achievements.length})
                </button>
                <button
                    className={`achieve-filter-btn ${selectedType === 'ctf' ? 'active' : ''}`}
                    onClick={() => setSelectedType('ctf')}
                >
                    🚩 CTFs & Security
                </button>
                <button
                    className={`achieve-filter-btn ${selectedType === 'hackathon' ? 'active' : ''}`}
                    onClick={() => setSelectedType('hackathon')}
                >
                    🥈 Hackathons
                </button>
                <button
                    className={`achieve-filter-btn ${selectedType === 'hardware' ? 'active' : ''}`}
                    onClick={() => setSelectedType('hardware')}
                >
                    🔧 Hardware & IoT
                </button>
                <button
                    className={`achieve-filter-btn ${selectedType === 'conference' ? 'active' : ''}`}
                    onClick={() => setSelectedType('conference')}
                >
                    🌐 Conferences
                </button>
            </div>

            {/* Achievements Grid */}
            <div className="achievements-grid">
                {filtered.map((item: Achievement) => (
                    <div key={item.title} className="achievement-card">
                        <div className="achievement-card-header">
                            <div className="achievement-icon-box">{item.icon}</div>
                            <div className="achievement-card-meta">
                                <div className="achievement-year-badge">{item.year}</div>
                                <h4 className="achievement-name">{item.title}</h4>
                            </div>
                            <span className="achievement-badge">{item.badge}</span>
                        </div>
                        <div className="achievement-highlight">{item.highlight}</div>
                        <p className="achievement-description">{item.description}</p>
                        {item.details && item.details.length > 0 && (
                            <div className="achievement-details">
                                {item.details.map((d: string, idx: number) => (
                                    <span key={idx} className="achievement-pill">{d}</span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
