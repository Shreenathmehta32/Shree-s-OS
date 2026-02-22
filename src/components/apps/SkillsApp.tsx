import React, { useEffect, useState } from 'react';
import { skills } from '../../data/profile';

const categories: Record<string, string> = {
    frontend: '🎨 Frontend',
    backend: '⚙️ Backend',
    blockchain: '🔗 Blockchain / Web3',
    hardware: '🔧 Hardware / IoT',
    tools: '🛠️ Dev Tools',
};

export const SkillsApp: React.FC = () => {
    const [animated, setAnimated] = useState(false);

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
            <div className="skills-header">$ htop --skills</div>
            {Object.entries(grouped).map(([cat, items]) => (
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
            ))}
        </div>
    );
};
