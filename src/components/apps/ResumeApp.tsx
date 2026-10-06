import React from 'react';
import { experience, education, certifications, achievements, roles, profile } from '../../data/profile';

export const ResumeApp: React.FC = () => {

    const handleDownload = () => {
        let content = `SHREENATH MEHTA — RESUME\n`;
        content += `${'='.repeat(55)}\n\n`;
        content += `${profile.title}\n`;
        content += `${profile.location}\n`;
        content += `Email:    ${profile.email}\n`;
        content += `GitHub:   ${profile.github}\n`;
        content += `LinkedIn: ${profile.linkedin}\n`;
        content += `X/Twitter:${profile.x}\n\n`;

        content += `MISSION: "${profile.mission}"\n\n`;

        content += `HONORS & ACHIEVEMENTS\n${'─'.repeat(55)}\n\n`;
        achievements.forEach(a => {
            content += `[${a.year}] ${a.title}\n`;
            content += `      ${a.highlight}\n`;
            content += `      ${a.description}\n\n`;
        });

        content += `CURRENT ROLES\n${'─'.repeat(55)}\n\n`;
        roles.forEach(r => {
            content += `${r.role} — ${r.organization} (${r.type})\n`;
            content += `${r.description}\n\n`;
        });

        content += `EXPERIENCE\n${'─'.repeat(55)}\n\n`;
        experience.forEach(e => {
            content += `${e.role}\n${e.company} • ${e.location}\n${e.duration}\n${e.description}\n\n`;
        });

        content += `EDUCATION\n${'─'.repeat(55)}\n\n`;
        education.forEach(e => {
            content += `${e.degree}\n${e.institution}\n${e.duration}\n\n`;
        });

        content += `CERTIFICATIONS\n${'─'.repeat(55)}\n\n`;
        certifications.forEach(c => {
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
        <div className="resume-app">
            {/* Download button */}
            <div className="resume-download-bar">
                <span className="resume-download-label">📄 Shreenath_Mehta_Resume</span>
                <button className="resume-download-btn" onClick={handleDownload}>
                    ⬇ Download Resume
                </button>
            </div>

            {/* Achievements Section */}
            <div className="resume-section">
                <div className="resume-section-title">🏆 Honors & Achievements</div>
                <div className="resume-achievements-list">
                    {achievements.map((item, i) => (
                        <div key={i} className="resume-achievement-card">
                            <div className="resume-achievement-header">
                                <span className="resume-achieve-icon">{item.icon}</span>
                                <span className="resume-achieve-title">{item.title}</span>
                                <span className="resume-achieve-year">{item.year}</span>
                            </div>
                            <div className="resume-achieve-badge">{item.highlight}</div>
                            <div className="resume-achieve-desc">{item.description}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Current Roles */}
            <div className="resume-section">
                <div className="resume-section-title">🛡️ Leadership & Roles</div>
                <div className="resume-roles-list">
                    {roles.map((r, i) => (
                        <div key={i} className="resume-role-card">
                            <div className="resume-role-title">{r.role}</div>
                            <div className="resume-role-org">{r.organization} • {r.type}</div>
                            <div className="resume-role-desc">{r.description}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Experience */}
            <div className="resume-section">
                <div className="resume-section-title">💼 Experience</div>
                <div className="timeline">
                    {experience.map((exp, i) => (
                        <div key={i} className="timeline-item">
                            <div className="timeline-role">{exp.role}</div>
                            <div className="timeline-company">{exp.company} • {exp.location}</div>
                            <div className="timeline-duration">{exp.duration}</div>
                            <div className="timeline-desc">{exp.description}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Education */}
            <div className="resume-section">
                <div className="resume-section-title">🎓 Education</div>
                {education.map((edu, i) => (
                    <div key={i} className="edu-item">
                        <div className="edu-degree">{edu.degree}</div>
                        <div className="edu-institution">{edu.institution}</div>
                        <div className="edu-duration">{edu.duration}</div>
                    </div>
                ))}
            </div>

            {/* Certifications */}
            <div className="resume-section">
                <div className="resume-section-title">📜 Certifications</div>
                <div className="cert-list">
                    {certifications.map((cert, i) => (
                        <div key={i} className="cert-item">
                            <span className="cert-icon">🏅</span>
                            <span>{cert}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
