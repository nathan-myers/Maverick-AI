import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Footer } from "../components/Footer";

export function SignUp() {
  const navigate = useNavigate();

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

        {/* Waitlist Overlay */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-2xl bg-white/5 backdrop-blur-xl p-12 rounded-2xl shadow-xl text-center"
          >
            <h1 className="text-4xl font-bold mb-6">Coming Soon!</h1>
            <p className="text-xl text-neutral-400 mb-8">
              We're currently in private beta. Join our waitlist to get early access when we launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/waitlist"
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Join Waitlist
              </Link>
              <button
                onClick={() => navigate('/')}
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
