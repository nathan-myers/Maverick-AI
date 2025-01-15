import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Chrome, Lock } from "lucide-react";
import { useState } from "react";
import { adminAuthService } from '../services/adminAuth';

export function LogIn() {
  const navigate = useNavigate();
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const success = await adminAuthService.login(credentials.email, credentials.password);
      if (success) {
        localStorage.setItem('isAdminAuthenticated', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials');
    }
  };

  return (
    <main className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-black to-black" />
      
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
              {isAdminMode ? (
                <>
                  <Lock className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-medium text-purple-300">Administrator Access</span>
                </>
              ) : (
                <>
                  <Chrome className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-medium text-purple-300">Chrome Extension Beta</span>
                </>
              )}
            </motion.div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 md:p-12">
            {isAdminMode ? (
              <>
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
                  Administrator Login
                </h1>
                <p className="text-neutral-400 text-center mb-8">
                  Access the administrator dashboard and experimental features.
                </p>

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  {error && (
                    <div className="text-red-400 text-sm text-center">{error}</div>
                  )}
                  <div>
                    <input
                      type="email"
                      placeholder="Admin Email"
                      className="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10 focus:border-purple-500 transition-colors"
                      value={credentials.email}
                      onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10 focus:border-purple-500 transition-colors"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-lg px-6 py-3 font-medium transition-colors"
                  >
                    Login to Dashboard
                  </button>
                </form>
              </>
            ) : (
              <>
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
                  Welcome to Maverick AI
                </h1>
                <p className="text-neutral-400 text-center mb-8">
                  Our platform is currently in private beta. Join the waitlist to be among the first to experience our AI-powered content moderation.
                </p>

                <div className="space-y-4">
                  <Link
                    to="/waitlist"
                    className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-opacity rounded-lg px-6 py-3 font-medium"
                  >
                    Join Waitlist
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </>
            )}

            <div className="text-center space-y-4 mt-8">
              <button
                onClick={() => setIsAdminMode(!isAdminMode)}
                className="text-sm text-neutral-400 hover:text-white transition-colors"
              >
                {isAdminMode ? "Back to waitlist" : "Administrator login"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
