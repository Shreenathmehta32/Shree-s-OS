import React from 'react';
import { experience, education, certifications } from '../../data/profile';

export const ResumeApp: React.FC = () => {

    const handleDownload = () => {
        // Generate a simple text-based resume and download as .txt
        // For a real PDF, replace this with a link to a hosted PDF file
        let content = `SHREENATH MEHTA — RESUME\n`;
        content += `${'='.repeat(50)}\n\n`;
        content += `BTech CSE'28 | Full Stack Developer | Robotics Enthusiast\n`;
        content += `Udaipur, Rajasthan, India\n`;
        content += `Email: shreenath32s33@gmail.com\n`;
        content += `GitHub: github.com/Shreenathmehta32\n`;
        content += `LinkedIn: linkedin.com/in/shreenath-mehta-b12880255\n\n`;

        content += `EXPERIENCE\n${'─'.repeat(50)}\n\n`;
        experience.forEach(e => {
            content += `${e.role}\n${e.company} • ${e.location}\n${e.duration}\n${e.description}\n\n`;
        });

        content += `EDUCATION\n${'─'.repeat(50)}\n\n`;
        education.forEach(e => {
            content += `${e.degree}\n${e.institution}\n${e.duration}\n\n`;
        });

        content += `CERTIFICATIONS\n${'─'.repeat(50)}\n\n`;
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
