import { motion } from "framer-motion";
import { CheckCircle, Clock, MessageCircle, ShoppingBag, Gamepad2, Chrome, ArrowRight, PlayCircle, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
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
  const founders = [
    {
      name: "Mehul Pardeshi",
      image: "/assets/IMG_3471.jpg",
      role: "Founder & ML Lead",
      linkedin: "https://www.linkedin.com/in/mehul-pardeshi/"
    },
    {
      name: "Divyesh Mali",
      image: "/assets/divyeshmali.jpg",
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
            className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
          >
            <Link
              to="/moderate-text"
              className="w-full sm:w-auto px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all backdrop-blur-sm border border-blue-500/20 text-center flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-4 h-4" />
              Demo
            </Link>
            
            <Link
              to="/waitlist"
              className="w-full sm:w-auto px-6 py-3 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg transition-all backdrop-blur-sm border border-green-500/20 text-center flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Join Waitlist
            </Link>
            
            <Link
              to="/chrome-extension"
              className="w-full sm:w-auto px-6 py-3 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-lg transition-all flex items-center justify-center gap-2 backdrop-blur-sm border border-purple-500/20"
            >
              <Chrome className="w-4 h-4" />
              Chrome Extension
            </Link>
          </motion.div>

          {/* Countdown Timer */}
          {/* <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-32"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center text-neutral-400 mb-8"
            >
              Chrome Extension Launching in
            </motion.p>
            <CountdownTimer />
          </motion.div> */}
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

      {/* Chat Simulator Section */}
      <ScrollSection className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-900/30 via-purple-900/20 to-blue-900/30 rounded-3xl p-12 md:p-16 border border-blue-500/10"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 bg-blue-500/10 rounded-full px-4 py-2 border border-blue-500/20"
                >
                  <MessageCircle className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium text-blue-300">Chat Simulator</span>
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  AI-Powered Chat
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                    For Social Media
                  </span>
                </h2>
                
                <p className="text-lg text-neutral-300 leading-relaxed">
                  Transform your social media interactions with our advanced chat simulator. 
                  Experience realistic conversations, automated responses, and intelligent 
                  content moderation in real-time.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    {
                      icon: <MessageCircle className="w-5 h-5 text-blue-400" />,
                      title: 'Smart Responses',
                      description: 'AI-powered conversation'
                    },
                    {
                      icon: <CheckCircle className="w-5 h-5 text-blue-400" />,
                      title: 'Content Safety',
                      description: 'Real-time moderation'
                    },
                    {
                      icon: <Gamepad2 className="w-5 h-5 text-blue-400" />,
                      title: 'Interactive Demo',
                      description: 'Try it yourself'
                    },
                    {
                      icon: <ShoppingBag className="w-5 h-5 text-blue-400" />,
                      title: 'Easy Integration',
                      description: 'Works with any platform'
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
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  <Link
                    to="/moderate-text"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
                  >
                    <PlayCircle className="w-5 h-5" />
                    Try Chat Simulator
                  </Link>
                  <Link
                    to="/features"
                    className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors px-2"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>

              {/* Right Content - Chat Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-black/50 rounded-2xl p-6 border border-blue-500/20">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="bg-blue-500/10 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm text-neutral-200">Hi there! How can I help you today?</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-purple-500/10 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm text-neutral-200">I'm interested in learning about your chat features</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="bg-blue-500/10 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm text-neutral-200">Great! Our chat simulator offers real-time AI responses, content moderation, and seamless integration with social media platforms.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </ScrollSection>

      {/* Social Media Integration Section */}
      <ScrollSection className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-900/30 via-blue-900/20 to-purple-900/30 rounded-3xl p-12 md:p-16 border border-purple-500/10"
          >
            <div className="text-center max-w-3xl mx-auto space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-purple-500/10 rounded-full px-4 py-2 border border-purple-500/20 mx-auto"
              >
                <Chrome className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">Platform Integration</span>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Seamless Integration with
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Your Favorite Platforms
                </span>
              </h2>
              
              <p className="text-lg text-neutral-300 leading-relaxed">
                Our chat simulator works seamlessly with major social media platforms, 
                providing consistent and reliable AI-powered interactions across all your 
                customer touchpoints.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
                {[
                  { 
                    name: 'X (Twitter)', 
                    icon: <img src="/assets/social-logos/x-logo.png" alt="X" className="w-8 h-8" />,
                    description: 'Social Media'
                  },
                  { 
                    name: 'Instagram', 
                    icon: <img src="/assets/social-logos/instagram-logo.png" alt="Instagram" className="w-8 h-8" />,
                    description: 'Social Media'
                  },
                  { 
                    name: 'Discord', 
                    icon: <img src="/assets/social-logos/discord-logo.png" alt="Discord" className="w-8 h-8" />,
                    description: 'Community'
                  },
                  { 
                    name: 'WhatsApp', 
                    icon: <img src="/assets/social-logos/whatsapp-logo.png" alt="WhatsApp" className="w-8 h-8" />,
                    description: 'Messaging'
                  }
                ].map((platform, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/50 rounded-xl p-6 border border-purple-500/10 text-center hover:bg-black/70 transition-colors"
                  >
                    <div className="flex justify-center mb-4">{platform.icon}</div>
                    <h3 className="font-medium mb-2">{platform.name}</h3>
                    <p className="text-sm text-neutral-400">{platform.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6 text-center">And Many More...</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {[
                    { name: 'Ride-Sharing', examples: 'Uber, Ola, Lyft' },
                    { name: 'Food Delivery', examples: 'Zomato, Swiggy, DoorDash' },
                    { name: 'E-commerce', examples: 'Amazon, Flipkart, Shopify' },
                    { name: 'Gaming', examples: 'Discord, Steam, Twitch' },
                    { name: 'Customer Support', examples: 'Zendesk, Intercom' },
                    { name: 'Custom Apps', examples: 'Your Platform' }
                  ].map((category, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-black/30 rounded-lg p-4 border border-purple-500/10 hover:bg-black/50 transition-colors"
                    >
                      <h4 className="font-medium mb-1">{category.name}</h4>
                      <p className="text-sm text-neutral-400">{category.examples}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
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
              Powered by advanced language models and our proprietary technology, 
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