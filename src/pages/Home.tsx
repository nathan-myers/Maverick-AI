import { motion } from "framer-motion";
import { CheckCircle, Clock, MessageCircle, ShoppingBag, Gamepad2, Chrome, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { ScrollSection } from "../components/ScrollSection";
import { Footer } from '../components/Footer';

const SplitText = ({ text }: { text: string }) => {
  return (
    <span className="letter-glow">
      {text.split('').map((char, i) => (
        <span key={i}>{char}</span>
      ))}
    </span>
  );
};

export function Home() {
  const navigate = useNavigate();

  const founders = [
    {
      name: "Mehul Pardeshi",
      image: "/assets/IMG_3471.jpg",
      role: "Founder & ML Lead",
      linkedin: "https://www.linkedin.com/in/mehul-pardeshi/"
    },
    {
      name: "Divyesh Mali",
      image: "/assets/divyesh.jpg",
      role: "Co-founder & Intern @Silicon Valley",
      linkedin: "https://www.linkedin.com/in/divyeshmali/"
    },
    {
      name: "Siddhesh Rajale",
      image: "/assets/sid.jpeg",
      role: "Co-founder & System Architect",
      linkedin: "https://www.linkedin.com/in/siddhesh-rajale/"
    }
  ];

  return (
    <main className="relative">
      {/* Hero Section */}
      <ScrollSection className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Video with Gradient Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-10" />
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

        {/* Content */}
        <div className="relative z-20 text-center space-y-4 -mt-32 px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg sm:text-xl font-medium tracking-tighter text-neutral-400 mb-4"
          >
            Introducing
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold mb-8 tracking-tight"
          >
            <SplitText text="Maverick" />{" "}
            <span className="flowing-gradient">AI</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl lg:text-3xl text-neutral-200 font-medium"
          >
            The future of content moderation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-6 flex items-center justify-center gap-6"
          >
            <button 
              onClick={() => navigate("/moderate-text")}
              className="text-lg font-semibold text-blue-500 hover:text-blue-400 transition-colors"
            >
              Try it now <span className="ml-2">→</span>
            </button>
            
            <Link
              to="/chrome-extension"
              className="inline-flex items-center gap-2 text-lg font-semibold text-purple-400 hover:text-purple-300 transition-colors"
            >
              <Chrome className="w-5 h-5" />
              Chrome Extension
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </ScrollSection>

      {/* Chrome Extension Section */}
      <ScrollSection className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-900/30 via-blue-900/20 to-purple-900/30 rounded-3xl p-12 md:p-16 border border-purple-500/10"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 bg-purple-500/10 rounded-full px-4 py-2 border border-purple-500/20"
                >
                  <Chrome className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-medium text-purple-300">Browser Extension</span>
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Content Moderation
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Right in Your Browser
                  </span>
                </h2>
                
                <p className="text-lg text-neutral-300 leading-relaxed">
                  Experience seamless content moderation with our powerful browser extension. 
                  Get instant analysis, toxicity detection, and content filtering without 
                  leaving your current page.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    {
                      icon: <Clock className="w-5 h-5 text-purple-400" />,
                      title: 'Real-time Analysis',
                      description: 'Instant content scanning'
                    },
                    {
                      icon: <CheckCircle className="w-5 h-5 text-purple-400" />,
                      title: 'One-click Actions',
                      description: 'Effortless moderation'
                    },
                    {
                      icon: <MessageCircle className="w-5 h-5 text-purple-400" />,
                      title: 'Smart Filters',
                      description: 'Customizable rules'
                    },
                    {
                      icon: <ShoppingBag className="w-5 h-5 text-purple-400" />,
                      title: 'Free to Use',
                      description: 'No hidden costs'
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-3">
                        {feature.icon}
                        <span className="font-medium">{feature.title}</span>
                      </div>
                      <p className="text-sm text-neutral-400">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-4"
                >
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
                    to="/features"
                    className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
              
              {/* Right Content - Extension Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative z-10 bg-gradient-to-b from-black/80 to-purple-900/20 backdrop-blur-xl rounded-xl p-8 shadow-2xl border border-white/10">
                  <div className="flex items-center gap-3 mb-6">
                    <Chrome className="w-6 h-6 text-purple-400" />
                    <span className="font-medium">Maverick AI Extension</span>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="h-3 bg-white/10 rounded-full w-3/4"></div>
                      <div className="h-3 bg-white/10 rounded-full w-1/2"></div>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-8 bg-purple-500/20 rounded-lg w-24 border border-purple-500/30"></div>
                      <div className="h-8 bg-white/5 rounded-lg w-24"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-white/10 rounded-full w-2/3"></div>
                      <div className="h-3 bg-white/10 rounded-full w-5/6"></div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -z-10 inset-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 rounded-full transform rotate-12 blur-3xl"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </ScrollSection>

      {/* Meet Our Founders */}
      <ScrollSection className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Meet Our Founders
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {founders.map((founder) => (
              <motion.div 
                key={founder.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => window.open(founder.linkedin, '_blank')}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6">
                  <img 
                    src={founder.image}
                    alt={founder.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">{founder.name}</h3>
                <p className="text-neutral-400">{founder.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* Why Maverick AI */}
      <ScrollSection className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl font-bold mb-6">Why Maverick AI?</h2>
            <p className="text-xl text-neutral-400">
              Powered by Mistral's advanced language models and our proprietary algorithms, 
              we're building a safer internet through intelligent content moderation.
            </p>
          </motion.div>

          {/* Current Capabilities */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Current Features</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Chrome extension for real-time moderation</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Text content analysis and filtering</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Powered by Mistral-7B foundation model</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Basic toxicity detection</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Development Roadmap</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span>API for developers and platforms</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span>Enhanced language support</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span>Advanced content classification</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span>Custom moderation rules</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Technology Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Our Technology</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  Mistral-7B
                </div>
                <p className="text-sm text-neutral-400">Foundation Model</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  Chrome API
                </div>
                <p className="text-sm text-neutral-400">Browser Integration</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent mb-2">
                  React + TS
                </div>
                <p className="text-sm text-neutral-400">Frontend Stack</p>
              </div>
            </div>
          </motion.div>
        </div>
      </ScrollSection>

      {/* Industry Applications */}
      <ScrollSection className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl font-bold mb-6">Potential Applications</h2>
            <p className="text-xl text-neutral-400">
              Our content moderation technology can be adapted for various use cases
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Social Media",
                description: "Content moderation for comments, posts, and user-generated content",
                icon: MessageCircle
              },
              {
                title: "E-commerce",
                description: "Review and listing moderation for online marketplaces",
                icon: ShoppingBag
              },
              {
                title: "Gaming",
                description: "Chat moderation and player interaction monitoring",
                icon: Gamepad2
              }
            ].map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <industry.icon className="w-12 h-12 text-purple-400 mb-6" />
                <h3 className="text-xl font-semibold mb-3">{industry.title}</h3>
                <p className="text-neutral-400">{industry.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* Early Adopters */}
      <ScrollSection className="py-32 relative bg-gradient-to-b from-purple-900/20 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl font-bold mb-6">Join Our Early Adopters</h2>
            <p className="text-xl text-neutral-400">
              Be among the first to experience our innovative content moderation solution
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-xl p-8 relative"
            >
              <h3 className="text-2xl font-bold mb-4">Beta Program</h3>
              <p className="text-neutral-300 mb-6">
                Get early access to our Chrome extension and help shape the future of content moderation
              </p>
              <Link
                to="/chrome-extension"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300"
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 rounded-xl p-8 relative"
            >
              <h3 className="text-2xl font-bold mb-4">Developer Preview</h3>
              <p className="text-neutral-300 mb-6">
                Stay tuned for our upcoming API and developer tools
              </p>
              <Link
                to="/waitlist"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300"
              >
                Join waitlist <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </ScrollSection>

      {/* Add Footer */}
      <Footer />
    </main>
  );
}
