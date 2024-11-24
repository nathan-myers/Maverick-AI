import { motion } from "framer-motion";
import { ScrollSection } from "../components/ScrollSection";
import { Check, Zap, Shield, Globe } from "lucide-react";
import { Footer } from "../components/Footer";

export function Pricing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const planVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const plans = [
    {
      name: "Starter",
      price: "9",
      description: "Perfect for small projects and individual creators",
      features: [
        "Up to 1,000 content checks/month",
        "Basic content moderation",
        "Email support",
        "API access",
        "24-hour response time"
      ],
      icon: Zap,
      accent: "from-blue-400 to-blue-600"
    },
    {
      name: "Professional",
      price: "49",
      description: "Ideal for growing businesses and teams",
      features: [
        "Up to 10,000 content checks/month",
        "Advanced content moderation",
        "Priority support",
        "Custom API integration",
        "4-hour response time",
        "Custom rules engine"
      ],
      icon: Shield,
      accent: "from-purple-400 to-purple-600",
      featured: true
    },
    {
      name: "Enterprise",
      price: "199",
      description: "For large-scale operations and platforms",
      features: [
        "Unlimited content checks",
        "Enterprise-grade moderation",
        "24/7 dedicated support",
        "Custom AI model training",
        "1-hour response time",
        "Advanced analytics",
        "SLA guarantee"
      ],
      icon: Globe,
      accent: "from-indigo-400 to-indigo-600"
    }
  ];

  return (
    <main className="relative min-h-screen">
      {/* Hero Section */}
      <ScrollSection className="pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-neutral-400 mb-4"
            >
              Simple, transparent pricing
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent"
            >
              Choose your plan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-neutral-300"
            >
              Start with our flexible pricing options. Scale as you grow.
            </motion.p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-3 gap-8 relative z-10"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={planVariants}
                className={`
                  relative rounded-2xl backdrop-blur-xl
                  ${plan.featured 
                    ? 'bg-white/10 ring-1 ring-white/20 shadow-2xl' 
                    : 'bg-white/5 hover:bg-white/10'}
                  transition-all duration-300 p-8
                `}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-400 to-purple-600 px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                    <p className="text-neutral-400">{plan.description}</p>
                  </div>
                  <plan.icon className={`w-8 h-8 bg-gradient-to-r ${plan.accent} bg-clip-text text-transparent`} />
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-semibold">$</span>
                    <span className="text-6xl font-bold mx-1">{plan.price}</span>
                    <span className="text-neutral-400">/month</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-400 mr-3" />
                      <span className="text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`
                    w-full py-4 rounded-xl font-medium transition-all duration-300
                    ${plan.featured
                      ? 'bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700'
                      : 'bg-white/10 hover:bg-white/20'}
                  `}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ScrollSection>

      {/* FAQ Section */}
      <ScrollSection className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                q: "Can I switch plans later?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and wire transfers for enterprise customers."
              },
              {
                q: "Is there a free trial available?",
                a: "Yes, all plans come with a 14-day free trial. No credit card required."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={planVariants}
                className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">{item.q}</h3>
                <p className="text-neutral-400">{item.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ScrollSection>

      <Footer />
    </main>
  );
}
