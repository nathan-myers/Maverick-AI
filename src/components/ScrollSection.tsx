import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollSection({ children, className = '' }: ScrollSectionProps) {
  const isMobile = useIsMobile();

  // If on mobile, render without motion effects
  if (isMobile) {
    return <section className={className}>{children}</section>;
  }

  // On desktop, keep the motion effects
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}