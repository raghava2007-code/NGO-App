import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface AnimatedLogoProps {
  className?: string;
}

export default function AnimatedLogo({ className = '' }: AnimatedLogoProps) {
  const textRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    let isCancelled = false;

    const playAnimation = () => {
      if (isCancelled || !textRef.current) return;

      // Set initial styles for drawing effect using a large dash array
      textRef.current.style.fill = 'transparent';
      textRef.current.style.strokeDasharray = '500';
      textRef.current.style.strokeDashoffset = '500';
      
      animate(textRef.current, {
        strokeDashoffset: [500, 0],
        ease: 'inOutSine',
        duration: 1800,
        delay: 300,
      });

      // Animate fill slightly after stroke starts
      setTimeout(() => {
        if (isCancelled || !textRef.current) return;
        
        animate(textRef.current, {
          fill: ['transparent', 'currentColor'],
          ease: 'outQuad',
          duration: 800,
          onComplete: () => {
            // Loop the animation after a pause
            setTimeout(() => {
              playAnimation();
            }, 4000); // Wait 4 seconds before restarting
          }
        });
      }, 1200);
    };

    playAnimation();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <svg 
      className={className} 
      viewBox="0 0 170 36" 
      style={{ height: '1.2em', width: 'auto', overflow: 'visible' }}
    >
      <text
        ref={textRef}
        x="0"
        y="28"
        fontSize="30"
        fontFamily="inherit"
        fontWeight="500"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        GanitMitra
      </text>
    </svg>
  );
}
