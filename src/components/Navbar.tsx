import { Github, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold">CleanText</span>
        </Link>
        <div className="flex items-center space-x-6">
          <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
          <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
          <a href="https://github.com" className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
            <Github className="h-5 w-5" />
            <span>Github</span>
          </a>
        </div>
      </div>
    </nav>
  );
}