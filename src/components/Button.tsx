import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  icon?: LucideIcon;
}

export function Button({ 
  children, 
  variant = 'primary', 
  icon: Icon,
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2';
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-white/10 hover:bg-white/20 text-white'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="h-5 w-5" />}
      {children && <span>{children}</span>}
    </button>
  );
}