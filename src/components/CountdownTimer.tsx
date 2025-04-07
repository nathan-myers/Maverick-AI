import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-01-01T00:00:00');

    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds }
  ];

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center gap-4 md:gap-8 min-w-[320px] px-2"
      >
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            className="flex flex-col items-center"
          >
            <div className="letter-glow">
              {unit.value.toString().padStart(2, '0').split('').map((digit, i) => (
                <span
                  key={i}
                  style={{
                    animationDelay: `${(index * 2 + i) * 0.2}s`,
                    fontFamily: "'Digital-7 Mono', monospace",
                    fontSize: 'clamp(2rem, 4vw, 4rem)',
                    lineHeight: '1',
                    display: 'inline-block',
                    margin: '0 1px'
                  }}
                  className="desert-gold-glow"
                >
                  {digit}
                </span>
              ))}
            </div>
            <span className="text-xs sm:text-sm tracking-wider text-neutral-400 font-medium mt-2">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 