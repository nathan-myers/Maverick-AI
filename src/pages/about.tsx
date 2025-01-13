import { motion } from "framer-motion";
import { ScrollSection } from "../components/ScrollSection";
import { 
  Shield, 
  Code,
  Users,
  Globe,
  ArrowRight,
  Chrome
} from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";

export function About() {
  return (
    <main className="relative min-h-screen">
      {/* Hero Section */}
      <ScrollSection className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-purple-500/10 rounded-full px-4 py-2 border border-purple-500/20">
                <Shield className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">Our Mission</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Making the internet 
                <br />
                <span className="flowing-gradient-text">
                  safer for everyone
                </span>
              </h1>
              
              <p className="text-lg text-neutral-400 leading-relaxed">
                We're building AI-powered tools to help communities and platforms 
                maintain healthy online spaces through effective content moderation.
              </p>

              <div className="flex items-center gap-4 pt-4">
                <Link
                  to="/contributors"
                  className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
                >
                  Join our community
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-gradient-to-b from-purple-900/20 to-transparent backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration"
                  className="rounded-lg w-full"
                />
              </div>
              <div className="absolute -z-10 inset-0 blur-3xl">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 rounded-full transform rotate-12"></div>
              </div>
            </motion.div>
          </div>

          {/* What We Do Section */}
          <div className="max-w-5xl mx-auto mb-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">What We Do</h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                Our current focus is on providing accessible content moderation tools
                through our Chrome extension, with plans to expand our offerings.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
              >
                <Chrome className="w-12 h-12 text-purple-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4">Browser Extension</h3>
                <p className="text-neutral-400 mb-6">
                  Our Chrome extension provides real-time content analysis and moderation
                  capabilities directly in your browser.
                </p>
                <ul className="space-y-3">
                  {[
                    "Text content analysis",
                    "Basic toxicity detection",
                    "Customizable settings",
                    "Real-time alerts"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm text-neutral-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
              >
                <Code className="w-12 h-12 text-blue-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4">Enterprise Ready</h3>
                <p className="text-neutral-400 mb-6">
                  Built with scalability and reliability in mind, our solution is ready
                  for enterprise-level content moderation needs.
                </p>
                <ul className="space-y-3">
                  {[
                    "99.9% Uptime",
                    "Enterprise support",
                    "Custom solutions",
                    "Regular updates"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm text-neutral-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Our Values Section */}
          <div className="max-w-5xl mx-auto mb-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                These core principles guide our development and decision-making
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Safety First",
                  description: "We prioritize user safety and content integrity in everything we build"
                },
                {
                  icon: Users,
                  title: "Community Driven",
                  description: "Our development is guided by real community needs and feedback"
                },
                {
                  icon: Globe,
                  title: "Accessibility",
                  description: "Making content moderation tools accessible to everyone"
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center group hover:bg-white/10 transition-colors"
                >
                  <div className="inline-flex p-4 rounded-xl bg-gradient-to-b from-purple-500/20 to-transparent mb-6 group-hover:scale-110 transition-transform">
                    <value.icon className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-neutral-400">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">
              Join us in making the internet safer
            </h2>
            <p className="text-neutral-400 mb-8">
              Whether you're a developer, content creator, or community manager,
              there's a place for you in our mission.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contributors"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Get Involved
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://chrome.google.com/webstore"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                <Chrome className="w-5 h-5" />
                Try the Extension
              </a>
            </div>
          </motion.div>
        </div>
      </ScrollSection>

      <Footer />
    </main>
  );
}
