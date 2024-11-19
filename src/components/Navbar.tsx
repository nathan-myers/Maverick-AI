import { Github, Shield, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold">Maverick AI</span>
        </Link>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link to="/pricing" className="hover:text-blue-400 transition-colors py-2">Pricing</Link>
          <Link to="/features" className="hover:text-blue-400 transition-colors py-2">Features</Link>
          <Link to="/about" className="hover:text-blue-400 transition-colors py-2">About</Link>
          <Link to="/contributors" className="hover:text-blue-400 transition-colors py-2">Contributors</Link>
          <Link to="/login" className="hover:text-blue-400 transition-colors py-2">Log In</Link>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {isOpen && (
        <div className="lg:hidden flex flex-col space-y-2 mt-4">
          <Link to="/pricing" className="hover:text-blue-400 transition-colors py-2">Pricing</Link>
          <Link to="/features" className="hover:text-blue-400 transition-colors py-2">Features</Link>
          <Link to="/about" className="hover:text-blue-400 transition-colors py-2">About</Link>
          <Link to="/contributors" className="hover:text-blue-400 transition-colors py-2">Contributors</Link>
          <Link to="/login" className="hover:text-blue-400 transition-colors py-2">Log In</Link>
        </div>
      )}
    </nav>
  );
}
