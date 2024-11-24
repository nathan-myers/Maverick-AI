import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface StickySectionProps {
  children: React.ReactNode;
  className?: string;
}

export function StickySection({ children, className = "" }: StickySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className={`min-h-screen flex items-center justify-center sticky top-0 ${className}`}
    >
      {children}
    </motion.div>
  );
}