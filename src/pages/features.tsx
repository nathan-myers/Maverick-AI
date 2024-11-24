import { motion } from "framer-motion";
import { ScrollSection } from "../components/ScrollSection";
import { 
  Shield, 
  Zap, 
  Globe, 
  Bot, 
  Settings,
  Code,
  CheckCircle,
  Target,
  Clock,
} from "lucide-react";
import { Footer } from "../components/Footer";

export interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  features?: string[];
  items?: string[];
}

const FeatureSection = () => {
  return (
    <ScrollSection className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Core Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl font-bold mb-6">Powerful Features</h2>
          <p className="text-xl text-neutral-400">
            Advanced AI-powered content moderation that scales with your needs, 
            providing real-time protection across multiple platforms and languages.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            {
              icon: Shield,
              title: "Content Safety",
              description: "Real-time detection of harmful content, hate speech, and inappropriate material with 99.9% accuracy.",
              features: [
                "Toxicity Detection",
                "Hate Speech Filtering",
                "NSFW Content Blocking",
                "Custom Safety Rules"
              ]
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              description: "Process millions of content pieces in milliseconds with our optimized AI pipeline.",
              features: [
                "<50ms Response Time",
                "Parallel Processing",
                "Real-time Moderation",
                "Bulk Analysis Support"
              ]
            },
            {
              icon: Globe,
              title: "Global Scale",
              description: "Support for multiple languages and regional content moderation requirements.",
              features: [
                "30+ Languages",
                "Regional Compliance",
                "Cultural Context",
                "24/7 Availability"
              ]
            },
            {
              icon: Bot,
              title: "AI Intelligence",
              description: "Powered by advanced language models for superior understanding and accuracy.",
              features: [
                "Context Awareness",
                "Sentiment Analysis",
                "Intent Recognition",
                "Adaptive Learning"
              ]
            },
            {
              icon: Code,
              title: "Easy Integration",
              description: "Simple API integration with comprehensive documentation and support.",
              features: [
                "RESTful API",
                "WebSocket Support",
                "SDK Libraries",
                "Custom Webhooks"
              ]
            },
            {
              icon: Settings,
              title: "Customization",
              description: "Tailor the moderation rules and thresholds to your specific needs.",
              features: [
                "Custom Rulesets",
                "Threshold Control",
                "Category Management",
                "Workflow Automation"
              ]
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 rounded-xl p-8 hover:bg-white/10 transition-all duration-300"
            >
              <feature.icon className="w-12 h-12 text-purple-400 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-neutral-400 mb-6">{feature.description}</p>
              <ul className="space-y-3">
                {feature.features.map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-neutral-300">
                    <CheckCircle className="w-4 h-4 text-purple-400 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Integration Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-12 text-center"
        >
          <h3 className="text-3xl font-bold mb-6">Ready to Get Started?</h3>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Join thousands of platforms using Maverick AI to create safer online communities.
          </p>
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Start Free Trial
          </button>
        </motion.div>
      </div>
    </ScrollSection>
  );
};

const WhyChooseUs = () => {
  return (
    <ScrollSection className="py-32 relative bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl font-bold mb-6">Why Choose Us?</h2>
          <p className="text-xl text-neutral-400">
            Our AI-powered platform delivers unmatched performance and reliability for content moderation at any scale.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              value: "0.05s",
              label: "Average Response Time",
              description: "Lightning-fast processing for real-time moderation",
              icon: Zap,
              color: "purple"
            },
            {
              value: "99.9%",
              label: "Accuracy Rate",
              description: "Industry-leading precision in content classification",
              icon: Target,
              color: "blue"
            },
            {
              value: "24/7",
              label: "Availability",
              description: "Continuous monitoring and protection",
              icon: Clock,
              color: "green"
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-gradient-to-b from-white/10 to-white/5 rounded-2xl p-8 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
              <stat.icon className={`w-12 h-12 mb-4 text-${stat.color}-400`} />
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-lg font-medium text-white/90 mb-2">{stat.label}</div>
              <p className="text-sm text-neutral-400">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">How We Compare</h3>
          <div className="space-y-6">
            {[
              {
                feature: "Processing Speed",
                us: "0.05s",
                others: "2-5s",
                advantage: "40x faster response time"
              },
              {
                feature: "Accuracy",
                us: "99.9%",
                others: "95%",
                advantage: "5x fewer false positives"
              },
              {
                feature: "Language Support",
                us: "30+",
                others: "5-10",
                advantage: "3x more language coverage"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-8 p-4 rounded-xl bg-white/5">
                <div className="w-1/4 font-medium">{item.feature}</div>
                <div className="w-1/4 text-green-400 font-semibold">{item.us}</div>
                <div className="w-1/4 text-neutral-500">{item.others}</div>
                <div className="w-1/4 text-sm text-purple-400">{item.advantage}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </ScrollSection>
  );
};

export function Features() {
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

        <div className="relative z-20 max-w-7xl mx-auto px-6">
          {/* Hero Content */}
          <div className="text-center space-y-6 mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl font-bold tracking-tight mb-6"
            >
              <span className="flowing-gradient-grey">Powerful Features</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl text-white max-w-3xl mx-auto"
            >
              Experience the next generation of content moderation with our AI-powered platform
            </motion.p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 relative z-30">
            {[
              {
                icon: Shield,
                title: "Advanced Protection",
                description: "Real-time threat detection and content filtering"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Process millions of requests in milliseconds"
              },
              {
                icon: Globe,
                title: "Global Scale",
                description: "Support for 30+ languages and regional content"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
              >
                <feature.icon className="w-12 h-12 mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* Features Section */}
      <FeatureSection />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Footer */}
      <Footer />
    </main>
  );
}
