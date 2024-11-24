import { useState, useEffect } from 'react';

interface DemoStats {
  totalRequests: number;
  avgResponseTime: number;
}

export function useDemoStats() {
  const [stats, setStats] = useState<DemoStats>({
    totalRequests: 0,
    avgResponseTime: 0
  });

  useEffect(() => {
    // Get stats from localStorage or your backend
    const savedStats = localStorage.getItem('demoStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  return stats;
}