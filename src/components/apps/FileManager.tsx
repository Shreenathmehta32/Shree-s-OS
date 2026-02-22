import React from 'react';
import { projects, languageColors } from '../../data/projects';

export const FileManager: React.FC = () => {
    return (
        <div className="file-manager">
            <div className="file-manager-toolbar">
                <span style={{ fontSize: 14 }}>📁</span>
                <div className="file-manager-path">~/projects</div>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{projects.length} items</span>
            </div>
            <div className="file-manager-grid">
                {projects.map((project) => (
                    <div key={project.name} className="project-card">
                        <div className="project-card-header">
                            <span className="project-card-icon">
                                {project.liveUrl ? '🚀' : '📂'}
                            </span>
                            <span className="project-card-name">{project.displayName}</span>
                            <span
                                className="project-card-lang"
                                style={{ background: languageColors[project.language] || '#6c7086' }}
                            >
                                {project.language}
                            </span>
                        </div>
                        <p className="project-card-desc">{project.description}</p>
                        {project.topics.length > 0 && (
                            <div className="project-card-topics">
                                {project.topics.map((t) => (
                                    <span key={t} className="project-topic">{t}</span>
                                ))}
                            </div>
                        )}
                        <div className="project-card-footer">
                            <a
                                className="project-card-link"
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                            >
                                🐙 GitHub
                            </a>
                            {project.liveUrl && (
                                <a
                                    className="project-card-link live"
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    🌐 Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
