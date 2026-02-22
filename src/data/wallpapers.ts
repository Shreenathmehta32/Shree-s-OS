
export interface Wallpaper {
    id: string;
    name: string;
    preview: string; // CSS gradient for the preview thumbnail
    className: string;
}

export const wallpapers: Wallpaper[] = [
    {
        id: 'aurora',
        name: 'Aurora Borealis',
        preview: 'linear-gradient(135deg, #0d1b2a, #1a3a2a, #0d2a1a, #1a1a3a)',
        className: 'wp-aurora',
    },
    {
        id: 'matrix',
        name: 'Matrix Rain',
        preview: 'linear-gradient(135deg, #000, #001400)',
        className: 'wp-matrix',
    },
    {
        id: 'nebula',
        name: 'Deep Space Nebula',
        preview: 'linear-gradient(135deg, #0d0221, #1a0533, #170a2e)',
        className: 'wp-nebula',
    },
    {
        id: 'synthwave',
        name: 'Synthwave City',
        preview: 'linear-gradient(180deg, #0d0221 0%, #1a0533 40%, #ff2975 100%)',
        className: 'wp-synthwave',
    },
    {
        id: 'coderain',
        name: 'Cyber Grid',
        preview: 'linear-gradient(135deg, #000510, #001020)',
        className: 'wp-cybergrid',
    },
    {
        id: 'lava',
        name: 'Molten Core',
        preview: 'linear-gradient(135deg, #1a0000, #3a0800, #1a0500)',
        className: 'wp-lava',
    },
];
