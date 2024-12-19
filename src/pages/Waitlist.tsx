import { motion } from "framer-motion";
import { useState } from "react";
import { Footer } from "../components/Footer";
import { Rocket, Shield, Users, ArrowRight, Sparkles } from "lucide-react";

interface WaitlistForm {
  fullName: string;
  email: string;
  company: string;
  role: string;
  useCase: string;
  monthlyUsers: string;
}

export function Waitlist() {
  const [formData, setFormData] = useState<WaitlistForm>({
    fullName: "",
    email: "",
    company: "",
    role: "",
    useCase: "",
    monthlyUsers: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <main className="flex-grow relative">
        {/* Professional Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            {/* AI Star Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative inline-flex items-center gap-3 backdrop-blur-xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 px-8 py-3 rounded-2xl mb-8 border border-white/10 group hover:border-purple-500/50 transition-all"
            >
              {/* AI Star Graphic */}
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 45, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-25 blur-sm group-hover:opacity-40 transition-opacity"
                />
                <Sparkles className="w-5 h-5 text-purple-400 relative z-10" />
              </div>
              <span className="text-white font-medium tracking-wide">AI-Powered Beta Access</span>
            </motion.div>

            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Join the Waitlist
            </h1>
            <p className="text-xl text-neutral-400/90 backdrop-blur-sm">
              Get exclusive early access to our enterprise-grade AI content moderation platform.
            </p>
          </motion.div>

          {!submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-200 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-white/30"
                        placeholder="John Doe"
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-200 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-white/30"
                        placeholder="you@company.com"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-200 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-white/30"
                        placeholder="Company Inc."
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-200 mb-2">
                        Your Role
                      </label>
                      <select
                        required
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      >
                        <option value="" className="bg-gray-900">Select role</option>
                        <option value="developer" className="bg-gray-900">Developer</option>
                        <option value="product_manager" className="bg-gray-900">Product Manager</option>
                        <option value="founder" className="bg-gray-900">Founder/Executive</option>
                        <option value="other" className="bg-gray-900">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-200 mb-2">
                      Primary Use Case
                    </label>
                    <textarea
                      required
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-white/30 h-24 resize-none"
                      placeholder="Tell us how you plan to use our content moderation API..."
                      onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-200 mb-2">
                      Monthly Active Users
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
                      onChange={(e) => setFormData({ ...formData, monthlyUsers: e.target.value })}
                    >
                      <option value="" className="bg-gray-900">Select range</option>
                      <option value="0-1000" className="bg-gray-900">0 - 1,000</option>
                      <option value="1000-10000" className="bg-gray-900">1,000 - 10,000</option>
                      <option value="10000-100000" className="bg-gray-900">10,000 - 100,000</option>
                      <option value="100000+" className="bg-gray-900">100,000+</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-purple-500/80 hover:bg-purple-500 backdrop-blur-sm text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center group"
                  >
                    Join Waitlist
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>

              {/* Benefits Section */}
              <div className="mt-12 grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Rocket,
                    title: "Early Access",
                    description: "Be first to try our platform"
                  },
                  {
                    icon: Shield,
                    title: "Priority Support",
                    description: "Get dedicated onboarding help"
                  },
                  {
                    icon: Users,
                    title: "Community",
                    description: "Join our beta testers group"
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    className="bg-white/5 backdrop-blur-xl rounded-xl p-6 text-center border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <benefit.icon className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-neutral-400">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-2xl mx-auto text-center bg-white/5 backdrop-blur-xl p-12 rounded-2xl border border-white/10"
            >
              <Rocket className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">You're on the List!</h2>
              <p className="text-xl text-neutral-400 mb-8">
                Thank you for joining our waitlist. We'll notify you when we're ready to launch.
              </p>
              <p className="text-neutral-400">
                Meanwhile, follow us on social media for updates and early previews.
              </p>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
} 