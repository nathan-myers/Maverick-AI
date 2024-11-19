import React, { useState } from 'react';
import { Button } from './Button'; // Import your Button component
import { ChevronDown } from 'lucide-react';

interface DropdownButtonProps {
  label: string;
  items: { label: string; onClick: () => void }[];
}

export function DropdownButton({ label, items }: DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      <Button 
        onClick={toggleDropdown} 
        variant="secondary" 
        icon={ChevronDown} 
      >
        {label}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white/10 rounded-lg shadow-lg z-10">
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
