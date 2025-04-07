import React, { useState } from 'react';
import { Button } from './Button'; // Import your Button component
import { LucideIcon } from 'lucide-react';

interface DropdownButtonProps {
  icon?: LucideIcon;
  children?: React.ReactNode;
  items: {
    label: string;
    onClick: () => void;
  }[];
}

export function DropdownButton({ icon, children, items }: DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <Button
        icon={icon}
        onClick={toggleDropdown}
      >
        {children}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-10">
          <ul className="py-1">
            {items.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-gray-100 hover:bg-white/10"
                >
                  {item.label}  
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
