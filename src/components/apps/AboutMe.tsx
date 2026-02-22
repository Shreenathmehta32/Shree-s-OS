import React from 'react';
import { profile } from '../../data/profile';
import { GitHubStats } from '../GitHubStats';

export const AboutMe: React.FC = () => {
    return (
        <div className="about-app">
            <div className="about-header">
                <div className="about-avatar">SM</div>
                <div>
                    <h1 className="about-name">{profile.name}</h1>
                    <p className="about-title">{profile.title}</p>
                    <p className="about-location">📍 {profile.location}</p>
                    <div className="about-status">
                        <span className="status-dot" />
                        <span className="status-text">Open to Internships & Collaborations</span>
                    </div>
                </div>
            </div>
            <div className="about-summary">
                {profile.summary}
            </div>
            <GitHubStats />
        </div>
    );
};
