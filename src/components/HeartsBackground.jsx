import { useMemo } from "react";

const HEART_COUNT = 22;

export default function HeartsBackground() {
  // Generate a stable set of floating hearts once per load.
  const hearts = useMemo(() => {
    return Array.from({ length: HEART_COUNT }, (_, index) => {
      const size = 12 + Math.random() * 32;
      const left = Math.random() * 100;
      const duration = 14 + Math.random() * 18;
      const delay = Math.random() * -20;
      const drift = (Math.random() * 40 - 20).toFixed(2);
      const opacity = 0.25 + Math.random() * 0.35;
      const blur = Math.random() * 1.2;

      return {
        id: `heart-${index}`,
        size,
        left,
        duration,
        delay,
        drift,
        opacity,
        blur
      };
    });
  }, []);

  return (
    <div className="hearts" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart"
          style={{
            "--size": `${heart.size}px`,
            "--left": `${heart.left}%`,
            "--duration": `${heart.duration}s`,
            "--delay": `${heart.delay}s`,
            "--drift": `${heart.drift}px`,
            "--opacity": heart.opacity,
            "--blur": `${heart.blur}px`
          }}
        />
      ))}
    </div>
  );
}
