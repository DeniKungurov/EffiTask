import React, { useEffect, useRef } from 'react';

const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Проверка на существование canvas
    const ctx = canvas.getContext('2d');
    const stars = [];
    const starCount = 200;

    // Устанавливаем размеры canvas
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    // Функция для создания звезд
    const createStars = () => {
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          alpha: Math.random(),
        });
      }
    };

    // Рисуем звезды
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });
    };

    // Обновляем кадр для мерцания
    const updateStars = () => {
      stars.forEach((star) => {
        star.alpha += Math.random() * 0.05 - 0.025;
        if (star.alpha < 0) {
          star.alpha = 0;
        } else if (star.alpha > 1) {
          star.alpha = 1;
        }
      });
    };

    // Анимация
    const animate = () => {
      drawStars();
      updateStars();
      requestAnimationFrame(animate);
    };

    createStars();
    animate();

    // Обработчик изменения размера окна
    const handleResize = () => {
      setCanvasSize();
      stars.length = 0; // Очищаем массив звезд
      createStars(); // Пересоздаем звезды
    };

    window.addEventListener('resize', handleResize);
    console.log('StarryBackground component mounted');
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }} />;
};

export default StarryBackground;