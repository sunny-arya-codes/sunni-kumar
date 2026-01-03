
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const Cursor: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [cursorText, setCursorText] = useState("");

    // Mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the follower - slightly softer damping for fluidity
    const springConfig = { damping: 20, stiffness: 300 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16); // Center the 32px cursor
            mouseY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check for interactive elements
            const interactive = target.closest('a') || target.closest('button') || target.tagName === 'A' || target.tagName === 'BUTTON';

            // Check for data-cursor-text
            const textContainer = target.closest('[data-cursor-text]') as HTMLElement;
            const text = textContainer?.getAttribute('data-cursor-text') || "";

            setIsHovered(!!interactive || !!text);
            setCursorText(text);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Main Dot - Follows cursor exactly */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: 12,
                    translateY: 12
                }}
                animate={{
                    scale: isClicking ? 0.8 : 1
                }}
                transition={{ duration: 0.1 }}
            />

            {/* Follower Ring - Smooth spring catch-up */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] flex items-center justify-center border border-white"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
                animate={{
                    scale: cursorText ? 3 : isHovered ? 2 : isClicking ? 0.8 : 1,
                    backgroundColor: cursorText ? "rgba(255, 255, 255, 1)" : isHovered ? "rgba(255, 255, 255, 0.1)" : "transparent",
                    borderColor: cursorText ? "transparent" : isHovered ? "transparent" : "rgba(255, 255, 255, 0.5)",
                    mixBlendMode: cursorText ? "normal" : "difference"
                }}
                transition={{ duration: 0.2 }}
            >
                {cursorText && (
                    <span className="text-[3px] font-bold text-black uppercase tracking-widest">{cursorText}</span>
                )}
            </motion.div>
        </>
    );
};
