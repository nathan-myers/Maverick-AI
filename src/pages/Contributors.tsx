import { motion } from "framer-motion";
import { ScrollSection } from "../components/ScrollSection";
import { 
  Github,
  Code,
  BookOpen,
  MessageSquare,
  Bug,
  Star,
  GitPullRequest,
  Users,
  ArrowRight,
  Chrome,
  ClipboardCopy,
  FileText,
  HelpCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";

export function Contributors() {
  return (
    <main className="relative min-h-screen">
      <ScrollSection className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 bg-purple-500/10 rounded-full px-4 py-2 border border-purple-500/20 mb-6"
            >
              <Github className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Open Source</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Join our community of
              <br />
              <span className="flowing-gradient-text">
                open source contributors
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-neutral-400"
            >
              Help us build the future of content moderation through collaborative development
            </motion.p>
          </div>

          {/* Why Contribute Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20">
                <h2 className="text-2xl font-bold mb-6">Why Contribute?</h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: Code,
                      title: "Gain Experience",
                      description: "Work with modern technologies and improve your development skills"
                    },
                    {
                      icon: Users,
                      title: "Join Our Community",
                      description: "Connect with other developers passionate about AI and content moderation"
                    },
                    {
                      icon: Star,
                      title: "Make an Impact",
                      description: "Help create safer online spaces for millions of users"
                    },
                    {
                      icon: GitPullRequest,
                      title: "Shape the Future",
                      description: "Influence the direction of open-source content moderation"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                        <item.icon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-neutral-400">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20">
                <h2 className="text-2xl font-bold mb-6">Current Focus Areas</h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: Chrome,
                      title: "Chrome Extension",
                      description: "Enhance our browser extension with new features and improvements",
                      progress: 65
                    },
                    {
                      icon: BookOpen,
                      title: "Documentation",
                      description: "Help make our documentation more comprehensive and user-friendly",
                      progress: 40
                    },
                    {
                      icon: MessageSquare,
                      title: "Community Tools",
                      description: "Build tools to help manage and grow our contributor community",
                      progress: 25
                    },
                    {
                      icon: Bug,
                      title: "Bug Fixes",
                      description: "Help identify and fix issues to improve stability",
                      progress: 80
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-blue-500/20">
                            <item.icon className="w-5 h-5 text-blue-400" />
                          </div>
                          <h3 className="font-semibold">{item.title}</h3>
                        </div>
                        <span className="text-sm text-neutral-400">
                          {item.progress}% complete
                        </span>
                      </div>
                      <p className="text-sm text-neutral-400">{item.description}</p>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ways to Contribute */}
          <div className="max-w-5xl mx-auto mb-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">Ways to Contribute</h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                Whether you're a developer, writer, or community member, there are many ways to help
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Code,
                  title: "Code Contributions",
                  description: "Help improve our Chrome extension and core functionality",
                  items: [
                    "Bug fixes",
                    "Feature implementation",
                    "Performance improvements",
                    "Code reviews"
                  ]
                },
                {
                  icon: BookOpen,
                  title: "Documentation",
                  description: "Help make our docs more comprehensive and user-friendly",
                  items: [
                    "Installation guides",
                    "API documentation",
                    "Usage examples",
                    "Troubleshooting guides"
                  ]
                },
                {
                  icon: MessageSquare,
                  title: "Community Support",
                  description: "Help others and share your knowledge",
                  items: [
                    "Answer questions",
                    "Report bugs",
                    "Feature requests",
                    "User feedback"
                  ]
                }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent rounded-xl blur-xl group-hover:opacity-75 transition-opacity opacity-0" />
                    <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 h-full">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-lg bg-gradient-to-b from-purple-500/20 to-transparent">
                          <category.icon className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-semibold">{category.title}</h3>
                      </div>
                      <p className="text-neutral-400 mb-6">{category.description}</p>
                      <ul className="space-y-3">
                        {category.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                            <span className="text-sm text-neutral-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Getting Started Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto mb-32"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Getting Started</h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                Follow these steps to begin contributing to Maverick AI
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Setup Guide */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-purple-500/10 backdrop-blur-sm rounded-xl border border-purple-500/20 overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                    <Code className="w-5 h-5 text-purple-400" />
                    Quick Setup Guide
                  </h3>
                  
                  <div className="space-y-6">
                    {[
                      {
                        step: 1,
                        title: "Clone the Repository",
                        code: "git clone https://github.com/Swifty9/Maverick-AI.git",
                        description: "Clone the repository to your local machine"
                      },
                      {
                        step: 2,
                        title: "Install Dependencies",
                        code: "cd Maverick-AI && npm install",
                        description: "Navigate to the project directory and install dependencies"
                      },
                      {
                        step: 3,
                        title: "Start Development Server",
                        code: "npm run dev",
                        description: "Launch the development server and start coding"
                      }
                    ].map((item, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-sm font-medium shrink-0">
                            {item.step}
                          </div>
                          <div className="space-y-3 w-full min-w-0">
                            <div className="font-medium text-neutral-200">
                              {item.title}
                            </div>
                            <div className="bg-black/30 rounded-lg p-3 group relative overflow-x-auto">
                              <code className="text-sm text-neutral-300 font-mono whitespace-pre-wrap break-all md:break-normal">
                                {item.code}
                              </code>
                              <button
                                onClick={() => navigator.clipboard.writeText(item.code)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-white/10 transition-all"
                                title="Copy to clipboard"
                              >
                                <ClipboardCopy className="w-4 h-4 text-neutral-400" />
                              </button>
                            </div>
                            <p className="text-sm text-neutral-400">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        {index < 2 && (
                          <div className="absolute left-4 top-12 bottom-0 w-px bg-gradient-to-b from-purple-500/20 to-transparent" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Additional Resources */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-blue-500/10 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                    Helpful Resources
                  </h3>
                  <ul className="space-y-3">
                    {[
                      {
                        title: "Documentation",
                        description: "Read our comprehensive guides",
                        icon: FileText,
                        href: "/docs"
                      },
                      {
                        title: "GitHub Issues",
                        description: "Find tasks to work on",
                        icon: Github,
                        href: "https://github.com/Swifty9/Maverick-AI/issues"
                      },
                      {
                        title: "Chrome Extension",
                        description: "Test the latest version",
                        icon: Chrome,
                        href: "https://chrome.google.com/webstore"
                      }
                    ].map((resource, index) => (
                      <li key={index}>
                        <Link
                          to={resource.href}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <resource.icon className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium text-neutral-200">
                              {resource.title}
                            </div>
                            <div className="text-sm text-neutral-400">
                              {resource.description}
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-purple-500/10 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-purple-400" />
                    Need Help?
                  </h3>
                  <p className="text-sm text-neutral-400 mb-4">
                    Having trouble getting started? Check out our GitHub issues or documentation.
                  </p>
                  <a
                    href="https://github.com/Swifty9/Maverick-AI/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors text-sm"
                  >
                    View issues
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to contribute?
            </h2>
            <p className="text-neutral-400 mb-8">
              Join our GitHub community and help make the internet safer for everyone
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://github.com/Swifty9/Maverick-AI"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
              <Link
                to="/docs"
                className="inline-flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Read the docs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </ScrollSection>

      <Footer />
    </main>
  );
}