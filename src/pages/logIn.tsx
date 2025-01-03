import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Github, ArrowRight, Chrome } from "lucide-react";

export function LogIn() {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-black to-black" />
      
      {/* Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-xl"
        >
          {/* Badge */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 bg-purple-500/10 rounded-full px-4 py-2 border border-purple-500/20"
            >
              <Chrome className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Chrome Extension Beta</span>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Welcome to Maverick AI
            </h1>
            <p className="text-neutral-400 text-center mb-8">
              Our platform is currently in private beta. Join the waitlist to be among the first to experience our AI-powered content moderation.
            </p>

            <div className="space-y-4 mb-8">
              {/* <a
                href="https://github.com/Swifty9/Maverick-AI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-white/10 hover:bg-white/15 transition-colors rounded-lg px-6 py-3 font-medium"
              >
                <Github className="w-5 h-5" />
                Continue with GitHub
              </a> */}
{/*               
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black text-neutral-500">or</span>
                </div>
              </div> */}

              <Link
                to="/waitlist"
                className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-opacity rounded-lg px-6 py-3 font-medium"
              >
                Join Waitlist
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="text-center space-y-4">
              <p className="text-sm text-neutral-500">
                By signing up, you agree to our{" "}
                <Link to="/terms" className="text-purple-400 hover:text-purple-300">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-purple-400 hover:text-purple-300">
                  Privacy Policy
                </Link>
              </p>
              
              <button
                onClick={() => navigate('/')}
                className="text-sm text-neutral-400 hover:text-white transition-colors"
              >
                Back to home
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
