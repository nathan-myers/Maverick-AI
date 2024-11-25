import { motion } from "framer-motion";
import { CheckCircle, Clock, MessageCircle, ShoppingBag, Gamepad2, GraduationCap, Stethoscope, DollarSign, Quote } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
      name: "Siddhesh Rajale",
      image: "/assets/sid.jpeg",
      role: "Co-founder & System Architect",
      linkedin: "https://www.linkedin.com/in/siddhesh-rajale/"
    },
    {
      name: "Divyesh Mali",
      image: "/assets/dd.jpeg",
      role: "Co-founder & React Expert",
      linkedin: "https://www.linkedin.com/in/divyeshmali/"
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
            className="pt-6"
          >
            <button 
              onClick={() => navigate("/moderate-text")}
              className="text-lg font-semibold text-blue-500 hover:text-blue-400 transition-colors"
            >
              Try it now <span className="ml-2">→</span>
            </button>
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
              we deliver state-of-the-art content moderation that adapts and scales with your needs.
            </p>
          </motion.div>

          {/* AI Model Stats */}
          <div className="grid md:grid-cols-4 gap-8 mb-20">
            {[
              {
                metric: "99.9%",
                label: "Accuracy Rate",
                description: "Industry-leading precision in content classification"
              },
              {
                metric: "<100ms",
                label: "Response Time",
                description: "Real-time moderation at scale"
              },
              {
                metric: "7B+",
                label: "Parameters",
                description: "Powered by Mistral-7B foundation model"
              },
              {
                metric: "30+",
                label: "Languages",
                description: "Multilingual content support"
              }
            ].map((stat, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                key={index}
                className="text-center p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.metric}
                </div>
                <div className="text-lg font-semibold text-white mb-2">{stat.label}</div>
                <p className="text-sm text-neutral-400">{stat.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Capabilities Graph */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 rounded-xl p-8 mb-20"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">AI Model Capabilities</h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                {[
                  {
                    category: "Text Classification",
                    score: 98,
                    color: "from-blue-500 to-purple-500"
                  },
                  {
                    category: "Sentiment Analysis",
                    score: 96,
                    color: "from-purple-500 to-pink-500"
                  },
                  {
                    category: "Language Detection",
                    score: 99,
                    color: "from-pink-500 to-red-500"
                  },
                  {
                    category: "Content Toxicity",
                    score: 97,
                    color: "from-red-500 to-orange-500"
                  }
                ].map((capability, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{capability.category}</span>
                      <span>{capability.score}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${capability.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-full bg-gradient-to-r ${capability.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-4">Key Features</h4>
                  <ul className="space-y-3 text-neutral-400">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Zero-shot classification capabilities
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Context-aware content analysis
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Custom moderation rule support
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Real-time content filtering
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-4">Future Roadmap</h4>
                  <ul className="space-y-3 text-neutral-400">
                    <li className="flex items-center">
                      <Clock className="w-5 h-5 text-blue-500 mr-2" />
                      Advanced image moderation
                    </li>
                    <li className="flex items-center">
                      <Clock className="w-5 h-5 text-blue-500 mr-2" />
                      Audio content analysis
                    </li>
                    <li className="flex items-center">
                      <Clock className="w-5 h-5 text-blue-500 mr-2" />
                      Enhanced multi-language support
                    </li>
                  </ul>
                </div>
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
            <h2 className="text-4xl font-bold mb-6">Industry Applications</h2>
            <p className="text-xl text-neutral-400">
              Discover how Maverick AI is transforming content moderation across different sectors
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Social Media",
                description: "Real-time moderation for user-generated content, comments, and posts",
                icon: MessageCircle,
                metrics: "500M+ posts moderated daily"
              },
              {
                title: "E-commerce",
                description: "Product review and marketplace listing moderation",
                icon: ShoppingBag,
                metrics: "99.9% accuracy in fraud detection"
              },
              {
                title: "Gaming",
                description: "In-game chat and user interaction monitoring",
                icon: Gamepad2,
                metrics: "50ms average response time"
              },
              {
                title: "Education",
                description: "Safe learning environments for online education platforms",
                icon: GraduationCap,
                metrics: "Used by 1000+ institutions"
              },
              {
                title: "Healthcare",
                description: "HIPAA-compliant content monitoring for telehealth",
                icon: Stethoscope,
                metrics: "100% privacy compliance"
              },
              {
                title: "Finance",
                description: "Fraud prevention and compliance monitoring",
                icon: DollarSign,
                metrics: "50% reduction in fraud cases"
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
                <p className="text-neutral-400 mb-4">{industry.description}</p>
                <div className="text-sm text-purple-400 font-medium">{industry.metrics}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* Success Stories */}
      <ScrollSection className="py-32 relative bg-gradient-to-b from-purple-900/20 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl font-bold mb-6">Success Stories</h2>
            <p className="text-xl text-neutral-400">
              See how leading companies are using Maverick AI to protect their communities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                company: "SocialConnect",
                quote: "Maverick AI helped us reduce toxic content by 95% while cutting moderation costs in half.",
                author: "Sarah Chen",
                role: "Head of Trust & Safety"
              },
              {
                company: "GameVerse",
                quote: "Real-time chat moderation that scales with millions of concurrent players.",
                author: "Michael Rodriguez",
                role: "Platform Director"
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-xl p-8 relative"
              >
                <Quote className="w-10 h-10 text-purple-400/20 absolute top-6 right-6" />
                <p className="text-xl text-neutral-200 mb-6">{story.quote}</p>
                <div>
                  <div className="font-semibold text-white">{story.author}</div>
                  <div className="text-sm text-neutral-400">
                    {story.role}, {story.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* Add Footer */}
      <Footer />
    </main>
  );
}
