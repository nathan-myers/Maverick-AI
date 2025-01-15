import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem('isAdminAuthenticated') === 'true';
      if (!isAuth) {
        navigate('/login');
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
} 