import { Github, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold">Maverick AI</span>
        </Link>
        <div className="flex items-center space-x-6">
          <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
          <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
          <div 
            onClick={() => window.open('https://github.com/MehulPardeshi/content-moderation', '_blank')}
            className="cursor-pointer"
          >
            <Github className="h-6 w-6" />
          </div>
        </div>
      </div>
    </nav>
  );
}