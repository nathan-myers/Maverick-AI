import { motion } from "framer-motion";
import { CheckCircle, Code, FileText, MessageSquare, Github } from "lucide-react";
import { ScrollSection } from "../components/ScrollSection";
import { Footer } from "../components/Footer";

export function Contributors() {
  return (
    <main className="relative bg-black min-h-screen">
      {/* Hero Section */}
      <ScrollSection className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-black z-10" />
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-40"
          >
            <source src="https://www.apple.com/105/media/us/mac-pro/2019/466faaf3-8832-4c68-903f-74f86f58e0e5/anim/hero/large.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-20 text-center space-y-6 max-w-4xl mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl font-bold tracking-tight"
          >
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Join Our Community
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-white max-w-3xl mx-auto"
          >
            Help shape the future of AI-powered content moderation
          </motion.p>
        </div>
      </ScrollSection>

      {/* GitHub CTA Section */}
      <ScrollSection className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-12 text-center"
          >
            <Github className="w-16 h-16 text-white mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">Open Source Project</h3>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              Maverick AI is open source and welcomes contributions from developers like you.
              Check out our GitHub repository to get started.
            </p>
            <a 
              href="https://github.com/Swifty9/Maverick-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </motion.div>
        </div>
      </ScrollSection>

      {/* Ways to Contribute Section */}
      <ScrollSection className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl font-bold mb-6">Ways to Contribute</h2>
            <p className="text-xl text-neutral-400">
              Whether you're a developer, researcher, or AI enthusiast, there are many ways 
              to contribute to Maverick AI's open-source ecosystem.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "Code Contributions",
                description: "Help improve our codebase through bug fixes, feature implementations, and optimizations.",
                items: [
                  "Submit Pull Requests",
                  "Code Review",
                  "Bug Fixes",
                  "Feature Development"
                ]
              },
              {
                icon: FileText,
                title: "Documentation",
                description: "Enhance our documentation to help others understand and use Maverick AI better.",
                items: [
                  "API Documentation",
                  "Usage Guides",
                  "Code Examples",
                  "Tutorials"
                ]
              },
              {
                icon: MessageSquare,
                title: "Community Support",
                description: "Help other developers and share your knowledge with the community.",
                items: [
                  "Answer Questions",
                  "Share Experience",
                  "Write Blog Posts",
                  "Create Tutorials"
                ]
              }
            ].map((way, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 p-8 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <way.icon className="w-12 h-12 text-purple-400 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">{way.title}</h3>
                <p className="text-neutral-400 mb-6">{way.description}</p>
                <ul className="space-y-3">
                  {way.items.map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-neutral-300">
                      <CheckCircle className="w-4 h-4 text-purple-400 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollSection>

      <Footer />
    </main>
  );
}