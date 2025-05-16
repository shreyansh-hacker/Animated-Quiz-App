
import React, { useEffect, useRef } from 'react';

const QuizOrb3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // We'll use vanilla JS to create a 3D effect since we don't have Three.js installed
    const container = containerRef.current;
    const orbs: HTMLDivElement[] = [];
    const orbCount = 15;
    
    // Create orbs
    for (let i = 0; i < orbCount; i++) {
      const orb = document.createElement('div');
      const size = Math.random() * 60 + 20;
      const hue = Math.random() * 60 + 200; // Blue to purple range
      
      orb.className = 'absolute rounded-full animate-pulse';
      orb.style.width = `${size}px`;
      orb.style.height = `${size}px`;
      orb.style.backgroundColor = `hsla(${hue}, 70%, 60%, 0.2)`;
      orb.style.boxShadow = `0 0 10px 5px hsla(${hue}, 70%, 60%, 0.1)`;
      orb.style.filter = 'blur(8px)';
      
      // Position in 3D space
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const distance = Math.random() * 150 + 50;
      
      const x = distance * Math.sin(phi) * Math.cos(theta);
      const y = distance * Math.sin(phi) * Math.sin(theta);
      const z = distance * Math.cos(phi);
      
      orb.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
      
      // Add animation delay
      orb.style.animationDuration = `${Math.random() * 3 + 2}s`;
      orb.style.animationDelay = `${Math.random() * 2}s`;
      
      container.appendChild(orb);
      orbs.push(orb);
    }
    
    // Animation
    let angle = 0;
    const animate = () => {
      angle += 0.005;
      
      orbs.forEach((orb, i) => {
        const distance = parseFloat(orb.style.width) + 100;
        const speed = 0.5 + (i % 3) * 0.1;
        
        const x = distance * Math.sin(angle * speed + i);
        const y = distance * Math.cos(angle * speed + i) * 0.5;
        const z = 50 * Math.sin(angle * speed * 0.7 + i);
        
        const scale = Math.max(0.5, (200 + z) / 250);
        const opacity = Math.max(0.2, (200 + z) / 400);
        
        orb.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;
        orb.style.opacity = opacity.toString();
        orb.style.zIndex = Math.floor(z).toString();
      });
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
      orbs.forEach(orb => orb.remove());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-5"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    />
  );
};

export default QuizOrb3D;
