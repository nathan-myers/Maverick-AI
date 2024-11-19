import { Shield, Users, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
export function About() {
  const navigate = useNavigate();
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <main className="container mx-auto px-6 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          About Maverick AI
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Maverick AI is dedicated to providing cutting-edge AI solutions for
          content moderation, ensuring a safe and engaging community experience.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-20">
        {[
          {
            Icon: Shield,
            title: "Our Mission",
            description:
              "To protect online communities with intelligent, real-time content moderation.",
            color: "blue",
            navigate: "mission",
          },
          {
            Icon: Users,
            title: "Our Team",
            description:
              "A diverse group of experts in AI, machine learning, and community management.",
            color: "purple",
            navigate: "team",
          },
          {
            Icon: Globe,
            title: "Global Reach",
            description:
              " Serving communities worldwide with scalable and reliable AI solutions.",
            color: "green",
            navigate: "global",
          },
        ].map((feature, index) => (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.2 }}
            key={index}
          >
            <div
              className="bg-white/5 p-6 rounded-xl transition-transform transform hover:scale-102 hover:shadow-lg hover:bg-white/10 focus:scale-103 focus:shadow-lg cursor-pointer"
              onClick={() => navigate(`/${feature.navigate}`)}
            >
              <div
                className={`bg-${feature.color}-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
              >
                <feature.Icon className={`h-6 w-6 text-${feature.color}-400`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
