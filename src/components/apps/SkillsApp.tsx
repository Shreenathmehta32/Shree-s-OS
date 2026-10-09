import React, { useEffect, useState } from 'react';
import { skills, securityConf } from '../../data/profile';

const categories: Record<string, string> = {
    security: '🛡️ Offensive Security & Pentesting',
    systems: '🐧 Systems & Cloud / Linux',
    ai: '🤖 AI & Automation Pipelines',
    frontend: '🎨 Frontend Development',
    backend: '⚙️ Backend & API Development',
    blockchain: '🔗 Blockchain / Web3',
    hardware: '🔧 Hardware & Robotics / IoT',
    tools: '🛠️ Dev Tools & Environments',
};

export const SkillsApp: React.FC = () => {
    const [animated, setAnimated] = useState(false);
    const [activeTab, setActiveTab] = useState<'bars' | 'security-domains'>('bars');

    useEffect(() => {
        const timer = setTimeout(() => setAnimated(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const grouped = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, typeof skills>);

    return (
        <div className="skills-app">
            <div className="skills-nav-header">
                <div className="skills-header">$ htop --skills --security</div>
                <div className="skills-view-toggle">
                    <button
                        className={`skills-toggle-btn ${activeTab === 'bars' ? 'active' : ''}`}
                        onClick={() => setActiveTab('bars')}
                    >
                        📊 Proficiency Bars
                    </button>
                    <button
                        className={`skills-toggle-btn ${activeTab === 'security-domains' ? 'active' : ''}`}
                        onClick={() => setActiveTab('security-domains')}
                    >
                        🛡️ Security Domains
                    </button>
                </div>
            </div>

            {activeTab === 'security-domains' ? (
                <div className="security-domains-container">
                    <div className="security-tree-block">
                        <pre className="security-tree-ascii">{securityConf.tree}</pre>
                    </div>
                    <div className="security-domains-grid">
                        {securityConf.domains.map((dom) => (
                            <div key={dom.name} className="security-domain-card">
                                <div className="security-domain-title">⚡ {dom.name}</div>
                                <div className="security-domain-desc">{dom.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                Object.entries(grouped).map(([cat, items]) => (
                    <div key={cat} className="skill-category">
                        <div className="skill-category-title">{categories[cat] || cat}</div>
                        {items.map((skill) => (
                            <div key={skill.name} className="skill-item">
                                <span className="skill-name">{skill.name}</span>
                                <div className="skill-bar-bg">
                                    <div
                                        className="skill-bar"
                                        style={{ width: animated ? `${skill.level}%` : '0%' }}
                                    />
                                </div>
                                <span className="skill-value">{skill.level}%</span>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
};
