import React from 'react';
import { useNavigate } from 'react-router-dom';


export function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      {/* <Navbar /> */}
      {/* Main Content */}
      <main className="flex flex-col md:flex-row items-center justify-between px-12 py-16 gap-12 w-full max-w-6xl">
        {/* Left Section */}
        <div className="text-center md:text-left md:w-1/2">
          <h2 className="text-5xl font-bold text-purple-700 mb-4">
            JOIN THE CRAZIEST AI COMMUNITY
          </h2>
          <p className="text-gray-700 mb-6">
            POWERED BY <span className="line-through">Creators</span> Innovators AROUND THE WORLD.
          </p>
          <p className="text-gray-500">
            Maverick AI offers cutting-edge AI solutions that push the boundaries of what's possible.{" "}
            <a
              href="/login"
              className="text-purple-600 underline hover:text-purple-800"
            >
              →
            </a>
          </p>
        </div>

        {/* Right Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 md:w-1/3">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Sign Up
          </h2>
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="********"
                className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate('/login')}
              className="text-purple-600 underline cursor-pointer hover:text-purple-800"
            >
              Log In
            </span>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-8 w-full">
        <div className="container mx-auto px-8 flex items-center">
          <img src="/assets/Maverick-AI.png" alt="Maverick-AI logo" className="w-10 h-10 mr-4" />
          <p className="text-sm">
            We build software that helps people all around the world. We make
            sure that we are building to ship.
          </p>
        </div>
      </footer>
    </div>
  );
}
