import { motion } from "framer-motion";
import { ScrollSection } from "../components/ScrollSection";
import { Check, Zap, Shield, Globe, ArrowRight, X } from "lucide-react";
import { Footer } from "../components/Footer";
import { Fragment } from "react";

export function Pricing() {
  const plans = [
    {
      name: "Community",
      description: "Perfect for individuals and small communities",
      price: "Free",
      period: "during beta",
      features: [
        "Chrome extension access",
        "Real-time content analysis",
        "Basic toxicity detection",
        "100 daily checks",
        "Community support"
      ],
      cta: "Get Started",
      href: "/signup",
      gradient: "from-blue-600/20 via-blue-800/20 to-blue-600/20",
      border: "border-blue-500/20",
      icon: Zap
    },
    {
      name: "Pro",
      description: "Advanced features for growing communities",
      price: "$19",
      period: "per month",
      features: [
        "Everything in Community",
        "Advanced content filtering",
        "Custom moderation rules",
        "1,000 daily checks",
        "Priority email support",
        "Early access to new features"
      ],
      cta: "Upgrade to Pro",
      href: "/signup?plan=pro",
      gradient: "from-purple-600/20 via-purple-800/20 to-purple-600/20",
      border: "border-purple-500/20",
      featured: true,
      icon: Shield
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations",
      price: "Custom",
      period: "based on needs",
      features: [
        "Everything in Pro",
        "Unlimited daily checks",
        "Custom deployment options",
        "Dedicated support",
        "SLA guarantees",
        "Priority feature requests"
      ],
      cta: "Contact Sales",
      href: "/contact",
      gradient: "from-indigo-600/20 via-indigo-800/20 to-indigo-600/20",
      border: "border-indigo-500/20",
      icon: Globe
    }
  ];

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-400 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-neutral-600 mx-auto" />
      );
    }
    return <span className="text-sm text-neutral-300">{value}</span>;
  };

  return (
    <main className="min-h-screen">
      <ScrollSection className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-purple-500/10 rounded-full px-4 py-2 border border-purple-500/20 mb-6"
            >
              <AlertCircle className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Beta Access Available</span>
            </motion.div> */}
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-center mb-4"
            >
              Simple, transparent pricing
              <br />
              <span className="flowing-gradient-community">
                for any size community
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-neutral-400"
            >
              Start protecting your community for free. Upgrade as you grow.
            </motion.p>
          </div>

          {/* Pricing Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className={`
                  relative rounded-2xl border backdrop-blur-xl
                  ${plan.featured ? 'bg-gradient-to-b from-purple-500/10 to-transparent' : 'bg-white/5'}
                  ${plan.border}
                  hover:border-white/20 transition-colors
                  p-6
                `}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-1 rounded-full">
                      <span className="text-sm font-medium">Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-b ${plan.gradient}`}>
                      <plan.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                  </div>
                  <p className="text-neutral-400 text-sm">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-neutral-400 text-sm">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.href}
                  className={`
                    group flex items-center justify-center gap-2 w-full py-3 rounded-lg
                    text-sm font-medium transition-all
                    ${plan.featured
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
                      : 'bg-white/5 hover:bg-white/10'}
                    h-12 flex items-center justify-center
                  `}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ))}
          </div>

          {/* Feature Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 max-w-5xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Compare Plans
            </h2>
            
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                <div className="border border-white/10 rounded-xl backdrop-blur-xl">
                  <table className="min-w-full divide-y divide-white/10">
                    <thead>
                      <tr className="bg-white/5">
                        <th scope="col" className="py-6 px-6 text-left text-sm font-semibold text-white">
                          Features
                        </th>
                        <th scope="col" className="py-6 px-6 text-center text-sm font-semibold text-white">
                          Community
                        </th>
                        <th scope="col" className="py-6 px-6 text-center text-sm font-semibold text-white bg-purple-500/10">
                          Pro
                        </th>
                        <th scope="col" className="py-6 px-6 text-center text-sm font-semibold text-white">
                          Enterprise
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {[
                        {
                          category: "Content Analysis",
                          features: [
                            {
                              name: "Basic Toxicity Detection",
                              community: true,
                              pro: true,
                              enterprise: true
                            },
                            {
                              name: "Advanced Content Filtering",
                              community: false,
                              pro: true,
                              enterprise: true
                            },
                            {
                              name: "Custom Filter Rules",
                              community: false,
                              pro: true,
                              enterprise: true
                            },
                            {
                              name: "Multi-language Support",
                              community: false,
                              pro: "Limited",
                              enterprise: true
                            }
                          ]
                        },
                        {
                          category: "Usage & Limits",
                          features: [
                            {
                              name: "Daily API Checks",
                              community: "100",
                              pro: "1,000",
                              enterprise: "Unlimited"
                            },
                            {
                              name: "Response Time",
                              community: "< 2s",
                              pro: "< 1s",
                              enterprise: "< 500ms"
                            },
                            {
                              name: "Concurrent Requests",
                              community: "5",
                              pro: "20",
                              enterprise: "Unlimited"
                            }
                          ]
                        },
                        {
                          category: "Support & Services",
                          features: [
                            {
                              name: "Community Support",
                              community: true,
                              pro: true,
                              enterprise: true
                            },
                            {
                              name: "Email Support",
                              community: false,
                              pro: true,
                              enterprise: true
                            },
                            {
                              name: "Dedicated Support",
                              community: false,
                              pro: false,
                              enterprise: true
                            },
                            {
                              name: "Custom Integration",
                              community: false,
                              pro: false,
                              enterprise: true
                            }
                          ]
                        }
                      ].map((section) => (
                        <Fragment key={section.category}>
                          <tr className="bg-white/5">
                            <th
                              colSpan={4}
                              scope="colgroup"
                              className="py-3 px-6 text-left text-sm font-semibold text-neutral-400"
                            >
                              {section.category}
                            </th>
                          </tr>
                          {section.features.map((feature, featureIndex) => (
                            <tr
                              key={feature.name}
                              className={featureIndex % 2 === 0 ? 'bg-white/[0.02]' : ''}
                            >
                              <td className="py-4 px-6 text-sm text-neutral-300">
                                {feature.name}
                              </td>
                              <td className="py-4 px-6 text-center">
                                {renderFeatureValue(feature.community)}
                              </td>
                              <td className="py-4 px-6 text-center bg-purple-500/5">
                                {renderFeatureValue(feature.pro)}
                              </td>
                              <td className="py-4 px-6 text-center">
                                {renderFeatureValue(feature.enterprise)}
                              </td>
                            </tr>
                          ))}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Frequently asked questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: "Can I switch plans later?",
                  a: "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes will be reflected in your next billing cycle."
                },
                {
                  q: "What happens after the beta period?",
                  a: "Beta users will receive special pricing and priority access to new features when we launch officially."
                },
                {
                  q: "Do you offer a free trial of Pro features?",
                  a: "Yes, you can try Pro features for 14 days with our free trial. No credit card required."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
                >
                  <h3 className="text-lg font-semibold mb-2">{item.q}</h3>
                  <p className="text-neutral-400">{item.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </ScrollSection>
      
      <Footer />
    </main>
  );
}
