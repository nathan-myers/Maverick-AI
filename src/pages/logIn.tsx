import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";

export function LogIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <main className="flex-grow relative">
        {/* Background with overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-black z-10" />
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-20"
          >
            <source src="https://www.apple.com/105/media/us/mac-pro/2019/466faaf3-8832-4c68-903f-74f86f58e0e5/anim/hero/large.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Login Form */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
              <p className="text-neutral-400">Sign in to continue to Maverick AI</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-200 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-white"
                    placeholder="you@example.com"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-200 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-white"
                    placeholder="Enter your password"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-neutral-400">
                  Don't have an account?{" "}
                  <button
                    onClick={() => navigate('/signup')}
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
