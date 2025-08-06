import React, { useRef, useEffect, useCallback } from 'react';

// --- Configuration ---
const NUM_STATIC_STARS = 150;
// NUM_SHOOTING_STARS is now randomized inside the component

// Debounce helper for resizing
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

const StarryBackground = () => {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  // Memoize the setup function to avoid re-creating it on every render
  const setupAndRun = useCallback((canvas) => {
    const ctx = canvas.getContext('2d');
    let stars = [];
    let shootingStars = [];
    let animationFrameId;

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createShootingStar = () => {
      // FIX: Randomize if the star starts from the top or the left edge
      const fromTop = Math.random() > 0.5;
      return {
        x: fromTop ? Math.random() * canvas.width : -100,
        y: fromTop ? -100 : Math.random() * canvas.height,
        len: Math.random() * 80 + 10,
        speed: Math.random() * 5 + 2,
        opacity: Math.random() * 0.5 + 0.5,
      };
    };

    const generateStars = () => {
      // Static Stars
      stars = [];
      for (let i = 0; i < NUM_STATIC_STARS; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          twinkleSpeed: Math.random() * 0.015,
        });
      }

      // Shooting Stars
      // FIX: Generate a random number of shooting stars between 3 and 6
      const numShootingStars = Math.floor(Math.random() * 4) + 3; // Result is 3, 4, 5, or 6
      shootingStars = [];
      for (let i = 0; i < numShootingStars; i++) {
        shootingStars.push(createShootingStar());
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw static stars
      stars.forEach(star => {
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 0.7 || star.opacity < 0.2) {
          star.twinkleSpeed *= -1;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      // Draw and update shooting stars
      shootingStars.forEach((star, index) => {
        star.x += star.speed;
        star.y += star.speed * 0.6; // Diagonal fall

        ctx.beginPath();
        const gradient = ctx.createLinearGradient(star.x, star.y, star.x - star.len, star.y - star.len * 0.6);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.len, star.y - star.len * 0.6);
        ctx.stroke();

        // When a star goes off-screen, create a new one with a new random start position
        if (star.x > canvas.width + star.len || star.y > canvas.height + star.len) {
          shootingStars[index] = createShootingStar();
        }
      });
      

      animationFrameId = requestAnimationFrame(draw);
    };

   
    setCanvasDimensions();
    generateStars();
    draw();

    // --- Event Listeners ---
    const handleResize = debounce(() => {
      setCanvasDimensions();
      generateStars();
    }, 200);

    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const cleanup = setupAndRun(canvas);
      return cleanup;
    }
  }, [setupAndRun]);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, background: '#000' }} />;
};

export default StarryBackground;
