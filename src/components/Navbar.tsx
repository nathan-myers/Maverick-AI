import { Github, Shield, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

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
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? (
              <X className="h-6 w-6 transition-transform duration-500 hover:rotate-180" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-6">

          <Link
            to="/pricing"
            className="hover:text-blue-400 transition-colors py-2"
          >
            Pricing
          </Link>
          <Link
            to="/features"
            className="hover:text-blue-400 transition-colors py-2"
          >
            Features
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-400 transition-colors py-2"
          >
            About
          </Link>
          <Link
            to="/contributors"
            className="hover:text-blue-400 transition-colors py-2"
          >
            Contributors
          </Link>
          <Link
            to="/login"
            className="hover:text-blue-400 transition-colors py-2"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Smooth Animations */}
      <div
        className={`lg:hidden flex flex-col mt-4 rounded-lg shadow-lg overflow-hidden transition-all duration-700 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Animate Items */}
          {[
            { label: "Pricing", delay: 0 },
            { label: "Features", delay: 100 },
            { label: "About", delay: 200 },
            { label: "Contributors", delay: 300 },
          ].map(({ label, delay }) => (
            <Link
              key={label}
              to={`/${label.toLowerCase()}`}
              style={{
                transitionDelay: `${isOpen ? delay : 0}ms`,
              }}
              className={`py-2 hover:text-blue-400 transition-colors transition-transform duration-500 ease-in-out ${
                isOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-[-100%]"
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Login Link */}
          <Link
            to="/login"
            style={{
              transitionDelay: `${isOpen ? 400 : 0}ms`,
            }}
            className={`py-2 hover:text-blue-400 transition-colors transition-transform duration-500 ease-in-out ${
              isOpen
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-[-100%]"
            }`}
          >
            Login
          </Link>

          {/* GitHub Link */}
          <div
            onClick={() =>
              window.open("https://github.com/Swifty9/Maverick-AI", "_blank")
            }
            style={{
              transitionDelay: `${isOpen ? 300 : 0}ms`,
            }}
            className={`cursor-pointer mb-2 hover:text-blue-400 transition-colors py-2 transition-transform duration-700 ease-in-out ${
              isOpen
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-[-100%]"
            }`}
          >
            <Github className="h-6 w-6" />
          </div>
      </div>

    </nav>
  );
}
