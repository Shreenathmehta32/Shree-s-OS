import React, { useState, useRef, useEffect, useCallback } from 'react';

interface WindowProps {
    id: string;
    title: string;
    icon: string;
    children: React.ReactNode;
    isActive: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
    defaultWidth?: number;
    defaultHeight?: number;
    defaultX?: number;
    defaultY?: number;
    onFocus: () => void;
    onClose: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
}

export const Window: React.FC<WindowProps> = ({
    title,
    icon,
    children,
    isActive,
    isMinimized,
    isMaximized,
    zIndex,
    defaultWidth = 700,
    defaultHeight = 500,
    defaultX,
    defaultY,
    onFocus,
    onClose,
    onMinimize,
    onMaximize,
}) => {
    const [pos, setPos] = useState({
        x: defaultX ?? Math.random() * (window.innerWidth - defaultWidth - 100) + 50,
        y: defaultY ?? Math.random() * (window.innerHeight - defaultHeight - 150) + 30,
    });
    const [size, setSize] = useState({ w: defaultWidth, h: defaultHeight });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

    const handleMouseDownDrag = useCallback((e: React.MouseEvent) => {
        if (isMaximized) return;
        e.preventDefault();
        setIsDragging(true);
        dragStart.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
        onFocus();
    }, [isMaximized, pos.x, pos.y, onFocus]);

    const handleMouseDownResize = useCallback((e: React.MouseEvent) => {
        if (isMaximized) return;
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
        resizeStart.current = { x: e.clientX, y: e.clientY, w: size.w, h: size.h };
        onFocus();
    }, [isMaximized, size.w, size.h, onFocus]);

    useEffect(() => {
        if (!isDragging && !isResizing) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                setPos({
                    x: Math.max(0, e.clientX - dragStart.current.x),
                    y: Math.max(0, e.clientY - dragStart.current.y),
                });
            }
            if (isResizing) {
                setSize({
                    w: Math.max(400, resizeStart.current.w + (e.clientX - resizeStart.current.x)),
                    h: Math.max(300, resizeStart.current.h + (e.clientY - resizeStart.current.y)),
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setIsResizing(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing]);

    return (
        <div
            className={`window ${isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''}`}
            style={{
                left: isMaximized ? 0 : pos.x,
                top: isMaximized ? 0 : pos.y,
                width: isMaximized ? '100%' : size.w,
                height: isMaximized ? `calc(100vh - 48px)` : size.h,
                zIndex,
                borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-color)',
            }}
            onMouseDown={onFocus}
        >
            <div className="window-titlebar" onMouseDown={handleMouseDownDrag} onDoubleClick={onMaximize}>
                <div className="window-buttons">
                    <button className="window-btn close" onClick={(e) => { e.stopPropagation(); onClose(); }} title="Close" />
                    <button className="window-btn minimize" onClick={(e) => { e.stopPropagation(); onMinimize(); }} title="Minimize" />
                    <button className="window-btn maximize" onClick={(e) => { e.stopPropagation(); onMaximize(); }} title="Maximize" />
                </div>
                <div className="window-title">{icon} {title}</div>
            </div>
            <div className="window-content">
                {children}
            </div>
            {!isMaximized && (
                <div
                    onMouseDown={handleMouseDownResize}
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: 16,
                        height: 16,
                        cursor: 'nwse-resize',
                    }}
                />
            )}
        </div>
    );
};
