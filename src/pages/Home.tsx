import { Rocket, Shield, Zap, FileText, BarChart2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Footer } from "../components/Footer";

export function Home() {
  const navigate = useNavigate();
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  const cardContainerRef1 = useRef(null);
  const isInView1 = useInView(cardContainerRef1);
  const cardContainerRef2 = useRef(null);
  const isInView2 = useInView(cardContainerRef2);
  return (
    <main className="container mx-auto px-6 pt-20 pb-3">
      {/* Hero Section */}

      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          AI-Powered Content Moderation
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Protect your community with intelligent, real-time content moderation
          powered by advanced AI technology.
        </p>
        <div className="flex justify-center space-x-4">
          <Button icon={Rocket} onClick={() => navigate("/moderate-text")}>
            Get Started
          </Button>
          <Button variant="secondary">Learn More</Button>
        </div>
      </div>

      {/* Features Section */}
      <div ref={cardContainerRef1} className="grid md:grid-cols-3 gap-8 mt-20">
        {[
          {
            Icon: Zap,
            title: "Real-time Analysis",
            description:
              "Instant content moderation with advanced AI processing for immediate results.",
            color: "blue",
            bgcolor: "bg-blue-500/10"
          },
          {
            Icon: Shield,
            title: "Smart Protection",
            description:
              "Advanced algorithms detect and filter inappropriate content automatically.",
            color: "purple",
            bgcolor : "bg-purple-500/10"
          },
          {
            Icon: Rocket,
            title: "Easy Integration",
            description:
              "Simple API integration with your existing platforms and workflows.",
            color: "green",
            bgcolor : "bg-green-500/10"
          },
        ].map((feature, index) => (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={isInView1 ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            key={index}
          >
            <div className="bg-white/5 p-6 rounded-xl transition-transform transform hover:scale-102 hover:shadow-lg hover:bg-white/10 focus:scale-103 focus:shadow-lg">
              <div
                className={`${feature.bgcolor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
              >
                <feature.Icon className={`h-6 w-6 text-${feature.color}-400`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* How It Works Section */}
      <section className="mt-20" ref={cardContainerRef2}>
        <h2 className="text-4xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              Icon: FileText,
              title: "Input Content",
              description:
                "Submit text content through our intuitive interface or API for instant analysis.",
              color: "blue",
              bgcolor : "bg-blue-500/10"
            },
            {
              Icon: Zap,
              title: "AI Analysis",
              description:
                "Our advanced AI models analyze content for toxicity, spam, and inappropriate material.",
              color: "purple",
              bgcolor : "bg-purple-500/10"
            },
            {
              Icon: BarChart2,
              title: "Detailed Reports",
              description:
                "Receive comprehensive reports with confidence scores and specific content flags.",
              color: "green",
              bgcolor : "bg-green-500/10"
            },
          ].map((feature, index) => (
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate={isInView2 ? "visible" : "hidden"}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              key={index}
            >
              <div className="bg-white/5 p-6 rounded-xl transition-transform transform hover:scale-102 hover:shadow-lg hover:bg-white/10 focus:scale-103 focus:shadow-lg">
                <div
                  className={`${feature.bgcolor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
                >
                  <feature.Icon
                    className={`h-6 w-6 text-${feature.color}-400`}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
