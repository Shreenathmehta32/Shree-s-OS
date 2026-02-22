import React, { useEffect, useState } from 'react';

interface DayContrib {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubData {
    publicRepos: number;
    followers: number;
    following: number;
    createdAt: string;
    avatar: string;
    bio: string | null;
}

const GITHUB_USERNAME = 'Shreenathmehta32';

// ─── Contribution Heatmap ───
const ContributionGraph: React.FC = () => {
    const [weeks, setWeeks] = useState<DayContrib[][]>([]);
    const [total, setTotal] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
            .then((r) => {
                if (!r.ok) throw new Error('Failed');
                return r.json();
            })
            .then((data: { contributions: DayContrib[]; total: Record<string, number> }) => {
                // Group days into calendar weeks (Sun→Sat)
                const days: DayContrib[] = data.contributions;
                const grouped: DayContrib[][] = [];
                let week: DayContrib[] = [];

                // Pad the first week with empty days
                const firstDay = new Date(days[0].date).getDay(); // 0=Sun
                for (let i = 0; i < firstDay; i++) {
                    week.push({ date: '', count: 0, level: 0 });
                }

                days.forEach((d) => {
                    week.push(d);
                    if (week.length === 7) {
                        grouped.push(week);
                        week = [];
                    }
                });
                if (week.length > 0) grouped.push(week);

                setWeeks(grouped);
                setTotal(data.total['lastYear'] ?? Object.values(data.total).reduce((a, b) => a + b, 0));
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="contrib-loading">
                <div className="github-stats-shimmer" />
            </div>
        );
    }

    if (error || weeks.length === 0) {
        return (
            <div className="contrib-error">
                ⚠️ Could not load contribution data. Check your connection.
            </div>
        );
    }

    // Level → CSS class
    const levelClass = (level: number) => {
        if (level === 0) return 'cl-0';
        if (level === 1) return 'cl-1';
        if (level === 2) return 'cl-2';
        if (level === 3) return 'cl-3';
        return 'cl-4';
    };

    // Month labels
    const monthLabels: { label: string; col: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
        const first = week.find((d) => d.date);
        if (!first) return;
        const m = new Date(first.date).getMonth();
        if (m !== lastMonth) {
            monthLabels.push({ label: new Date(first.date).toLocaleString('en', { month: 'short' }), col: wi });
            lastMonth = m;
        }
    });

    return (
        <div className="contrib-wrapper">
            <div className="contrib-header">
                <span className="contrib-title">📅 Contributions — Past Year</span>
                {total !== null && (
                    <span className="contrib-total">{total} contributions</span>
                )}
            </div>

            {/* Month row */}
            <div className="contrib-months" style={{ gridTemplateColumns: `repeat(${weeks.length}, 11px)` }}>
                {monthLabels.map(({ label, col }) => (
                    <span key={col} className="contrib-month" style={{ gridColumn: col + 1 }}>
                        {label}
                    </span>
                ))}
            </div>

            {/* Grid */}
            <div className="contrib-grid" style={{ gridTemplateColumns: `repeat(${weeks.length}, 11px)` }}>
                {weeks.map((week, wi) =>
                    week.map((day, di) => (
                        <div
                            key={`${wi}-${di}`}
                            className={`contrib-cell ${levelClass(day.level)}`}
                            title={day.date ? `${day.date}: ${day.count} contributions` : ''}
                            style={{ gridColumn: wi + 1, gridRow: di + 1 }}
                        />
                    ))
                )}
            </div>

            {/* Legend */}
            <div className="contrib-legend">
                <span className="contrib-legend-label">Less</span>
                {[0, 1, 2, 3, 4].map((l) => (
                    <div key={l} className={`contrib-cell ${levelClass(l)}`} />
                ))}
                <span className="contrib-legend-label">More</span>
            </div>
        </div>
    );
};

// ─── GitHub Stats ───
export const GitHubStats: React.FC = () => {
    const [data, setData] = useState<GitHubData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
            .then((r) => r.json())
            .then((d) => {
                setData({
                    publicRepos: d.public_repos,
                    followers: d.followers,
                    following: d.following,
                    createdAt: d.created_at,
                    avatar: d.avatar_url,
                    bio: d.bio,
                });
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="github-stats loading">
                <div className="github-stats-shimmer" />
            </div>
        );
    }

    if (!data) return null;

    const yearsSince = Math.floor(
        (Date.now() - new Date(data.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 365)
    );

    return (
        <div className="github-stats">
            {/* Header */}
            <div className="github-stats-header">
                <img src={data.avatar} alt="GitHub avatar" className="github-avatar" />
                <div>
                    <div className="github-stats-name">{GITHUB_USERNAME}</div>
                    {data.bio && <div className="github-stats-bio">{data.bio}</div>}
                </div>
            </div>

            {/* Stat pills */}
            <div className="github-stats-grid">
                <div className="github-stat">
                    <span className="github-stat-value">{data.publicRepos}</span>
                    <span className="github-stat-label">Repos</span>
                </div>
                <div className="github-stat">
                    <span className="github-stat-value">{data.followers}</span>
                    <span className="github-stat-label">Followers</span>
                </div>
                <div className="github-stat">
                    <span className="github-stat-value">{data.following}</span>
                    <span className="github-stat-label">Following</span>
                </div>
                <div className="github-stat">
                    <span className="github-stat-value">{yearsSince}+</span>
                    <span className="github-stat-label">Years</span>
                </div>
            </div>

            {/* Real contribution heatmap */}
            <ContributionGraph />
        </div>
    );
};
