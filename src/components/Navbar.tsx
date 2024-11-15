import { Github, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';

export function Navbar() {
  return (
    <nav className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold">Maverick AI</span>
        </Link>
        <div className="flex items-center space-x-6">
          <a href="/pricing" className="hover:text-blue-400 transition-colors">Pricing</a>
          <a href="/features" className="hover:text-blue-400 transition-colors">Features</a>
          <Link to="/about" className="hover:text-blue-400 transition-colors">About</Link>
          <div 
            onClick={() => window.open('https://github.com/Swifty9/Maverick-AI', '_blank')}
            className="cursor-pointer"
          >
            <Github className="h-6 w-6" />
          </div>
        </div>
      </div>
    </nav>
  );
}
