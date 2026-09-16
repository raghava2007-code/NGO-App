import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only mount the custom cursor if the device has a fine pointer (like a mouse)
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted || !cursorRef.current) return;

    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible && cursorRef.current) {
        cursorRef.current.style.opacity = '1';
        isVisible = true;
      }
    };

    const onMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
      isVisible = false;
    };

    const onMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
      isVisible = true;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, input, select, textarea, [role="button"], label');
      if (isInteractive && cursorRef.current) {
        cursorRef.current.classList.add('is-hovering');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, input, select, textarea, [role="button"], label');
      if (isInteractive && cursorRef.current) {
        cursorRef.current.classList.remove('is-hovering');
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    let animationFrameId: number;
    
    // Smooth interpolation factor. 
    // 0.3 provides a very responsive yet noticeably smooth follow, 
    // similar to anime.js easeOut spring characteristics.
    const lerp = 0.3;

    const render = () => {
      currentX += (targetX - currentX) * lerp;
      currentY += (targetY - currentY) * lerp;

      if (cursorRef.current) {
        // The translate(-50%, -50%) ensures the precise mathematical center of the wrapper
        // aligns exactly with the mouse coordinates.
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };
    
    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 pointer-events-none z-[99999] opacity-0 custom-cursor-wrapper mix-blend-difference"
      style={{ willChange: 'transform' }}
    >
      {/* 
        This wrapper groups the ring and dot together. 
        They inherently share the same exact center coordinate.
      */}
      <div className="relative flex items-center justify-center w-4 h-4">
        
        {/* Outer Hollow Ring */}
        <div 
          className="absolute inset-0 rounded-full border-[1.5px] border-white cursor-ring transition-all duration-300 ease-out shadow-[0_0_6px_rgba(255,255,255,0.5)]"
          style={{ willChange: 'transform' }}
        ></div>
        
        {/* Center Solid Dot */}
        <div className="absolute w-1 h-1 bg-white rounded-full cursor-dot"></div>
        
      </div>
    </div>
  );
}
