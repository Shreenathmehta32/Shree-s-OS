import React from 'react';
import { wallpapers } from '../data/wallpapers';
import type { Wallpaper } from '../data/wallpapers';

interface WallpaperPickerProps {
    current: string;
    onSelect: (id: string) => void;
    onClose: () => void;
}

export const WallpaperPicker: React.FC<WallpaperPickerProps> = ({ current, onSelect, onClose }) => {
    return (
        <div className="wp-picker-overlay" onClick={onClose}>
            <div className="wp-picker" onClick={(e) => e.stopPropagation()}>
                <div className="wp-picker-header">
                    <span>🖼️ Change Wallpaper</span>
                    <button className="wp-picker-close" onClick={onClose}>✕</button>
                </div>
                <div className="wp-picker-grid">
                    {wallpapers.map((wp: Wallpaper) => (
                        <div
                            key={wp.id}
                            className={`wp-thumb ${current === wp.id ? 'active' : ''}`}
                            onClick={() => { onSelect(wp.id); onClose(); }}
                        >
                            <div
                                className="wp-thumb-preview"
                                style={{ background: wp.preview }}
                            >
                                {current === wp.id && <div className="wp-thumb-check">✓</div>}
                            </div>
                            <span className="wp-thumb-name">{wp.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
