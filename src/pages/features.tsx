import { motion } from "framer-motion";
import { ScrollSection } from "../components/ScrollSection";
import { 
  Shield, 
  Chrome,
  MessageCircle,
  Settings,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export function Features() {
  return (
    <main className="relative min-h-screen">
      {/* Hero Section */}
      <ScrollSection className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-purple-500/10 rounded-full px-4 py-2 border border-purple-500/20 mb-6"
            >
              <Chrome className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Chrome Extension Beta</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold leading-tight"
            >
              Experience Maverick AI
              <br />
              <span className="flowing-gradient-text">
                right in your browser
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-neutral-400"
            >
              Experience real-time content analysis powered by advanced AI
            </motion.p>
          </div>

          {/* Current Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-32">
            {[
              {
                icon: Shield,
                title: "Content Analysis",
                description: "Real-time detection of potentially harmful or inappropriate content",
                features: [
                  "Text content scanning",
                  "Basic toxicity detection",
                  "Instant alerts",
                  "Content warnings"
                ]
              },
              {
                icon: Settings,
                title: "Customization",
                description: "Adjust the extension settings to match your needs",
                features: [
                  "Sensitivity levels",
                  "Alert preferences",
                  "Scanning options",
                  "Language settings"
                ]
              },
              {
                icon: Zap,
                title: "Performance",
                description: "Fast and efficient content moderation",
                features: [
                  "Real-time scanning",
                  "Low latency",
                  "Browser optimized",
                  "Lightweight"
                ]
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent rounded-xl blur-xl group-hover:opacity-75 transition-opacity opacity-0" />
                <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-purple-500/50 transition-colors">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-gradient-to-b from-purple-500/20 to-transparent">
                      <feature.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-neutral-400 mb-6">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-sm text-neutral-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Roadmap Section */}
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">Development Roadmap</h2>
              <p className="text-neutral-400">
                Our vision for the future of content moderation
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-b from-purple-500/10 to-transparent backdrop-blur-sm rounded-xl p-8 border border-purple-500/20"
              >
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-purple-400" />
                  Coming Soon
                </h3>
                <ul className="space-y-4">
                  {[
                    "Advanced toxicity detection",
                    "Multi-language support",
                    "Custom filter rules",
                    "Browser extension dashboard"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-400" />
                      <span className="text-neutral-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-b from-blue-500/10 to-transparent backdrop-blur-sm rounded-xl p-8 border border-blue-500/20"
              >
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-blue-400" />
                  Future Vision
                </h3>
                <ul className="space-y-4">
                  {[
                    "Developer API access",
                    "Enterprise deployment options",
                    "Advanced analytics dashboard",
                    "Integration with popular platforms"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-400" />
                      <span className="text-neutral-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 text-center"
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to try Maverick AI?
            </h2>
            <p className="text-neutral-400 mb-8">
              Join our beta program and help shape the future of content moderation
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://chrome.google.com/webstore"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                <Chrome className="w-5 h-5" />
                Add to Chrome
              </a>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
              >
                View pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </ScrollSection>
    </main>
  );
}
