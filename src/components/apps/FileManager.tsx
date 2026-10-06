import React, { useState, useMemo } from 'react';
import { projects, languageColors } from '../../data/projects';
import type { Project } from '../../data/projects';

type CategoryFilter = 'all' | 'security' | 'ai' | 'blockchain' | 'cloud' | 'game' | 'hardware' | 'web';

export const FileManager: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProjects = useMemo(() => {
        return projects.filter((p: Project) => {
            const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
            const q = searchQuery.toLowerCase().trim();
            const matchesSearch =
                !q ||
                p.displayName.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.language.toLowerCase().includes(q) ||
                p.topics.some((t) => t.toLowerCase().includes(q));
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { all: projects.length };
        projects.forEach((p) => {
            counts[p.category] = (counts[p.category] || 0) + 1;
        });
        return counts;
    }, []);

    return (
        <div className="file-manager">
            {/* Toolbar */}
            <div className="file-manager-toolbar">
                <span style={{ fontSize: 16 }}>📁</span>
                <div className="file-manager-path">~/projects</div>
                <input
                    type="text"
                    className="file-manager-search"
                    placeholder="Search projects by name, tech, tag..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="file-manager-count">
                    {filteredProjects.length} of {projects.length} repos
                </span>
            </div>

            {/* Category Filter Pills */}
            <div className="file-manager-categories">
                <button
                    className={`fm-category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('all')}
                >
                    All ({categoryCounts['all'] || 0})
                </button>
                <button
                    className={`fm-category-btn ${selectedCategory === 'security' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('security')}
                >
                    🛡️ Security ({categoryCounts['security'] || 0})
                </button>
                <button
                    className={`fm-category-btn ${selectedCategory === 'ai' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('ai')}
                >
                    🤖 AI & Privacy ({categoryCounts['ai'] || 0})
                </button>
                <button
                    className={`fm-category-btn ${selectedCategory === 'blockchain' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('blockchain')}
                >
                    🔗 Web3 & Blockchain ({categoryCounts['blockchain'] || 0})
                </button>
                <button
                    className={`fm-category-btn ${selectedCategory === 'cloud' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('cloud')}
                >
                    ☁️ Cloud & Linux ({categoryCounts['cloud'] || 0})
                </button>
                <button
                    className={`fm-category-btn ${selectedCategory === 'game' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('game')}
                >
                    🎮 Games & Space ({categoryCounts['game'] || 0})
                </button>
                <button
                    className={`fm-category-btn ${selectedCategory === 'hardware' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('hardware')}
                >
                    🔧 Hardware ({categoryCounts['hardware'] || 0})
                </button>
                <button
                    className={`fm-category-btn ${selectedCategory === 'web' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('web')}
                >
                    🌐 Web Apps ({categoryCounts['web'] || 0})
                </button>
            </div>

            {/* Grid */}
            <div className="file-manager-grid">
                {filteredProjects.length === 0 ? (
                    <div className="file-manager-empty">
                        <span>🔍 No projects found matching "{searchQuery}"</span>
                    </div>
                ) : (
                    filteredProjects.map((project: Project) => (
                        <div key={project.name} className={`project-card ${project.featured ? 'featured' : ''}`}>
                            <div className="project-card-header">
                                <span className="project-card-icon">
                                    {project.liveUrl ? '🚀' : project.category === 'security' ? '🛡️' : project.category === 'ai' ? '🤖' : '📂'}
                                </span>
                                <div className="project-card-title-group">
                                    <span className="project-card-name">{project.displayName}</span>
                                    {project.featured && <span className="project-featured-badge">⭐ FEATURED</span>}
                                </div>
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
                    ))
                )}
            </div>
        </div>
    );
};
