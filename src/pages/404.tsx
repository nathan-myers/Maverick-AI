import { Home, Search, ArrowRight, Code, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Footer } from "../components/Footer";

export function NotFound() {
  const navigate = useNavigate();

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-400 to-purple-400 bg-clip-text text-transparent">
              404
            </h1>
            <p className="text-3xl font-semibold mb-4 text-white">
              Page not found
            </p>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-12">
              It seems we couldn't find what you were looking for. Don't worry though, we've got plenty of other pages for you to explore.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl font-medium transition-colors"
            >
              <Home className="w-5 h-5" />
              Return Home
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Quick Links */}
      <motion.div 
        variants={containerAnimation}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8"
      >
        {[
          {
            icon: Code,
            title: "Features",
            description: "Explore our powerful AI-driven content moderation features",
            link: "/features",
            color: "purple"
          },
          {
            icon: Search,
            title: "Documentation",
            description: "Learn how to integrate and use our moderation tools",
            link: "/docs",
            color: "blue"
          },
          {
            icon: BookOpen,
            title: "Getting Started",
            description: "Quick start guide to using our content moderation",
            link: "/moderate-text",
            color: "green"
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={itemAnimation}
            className="group relative bg-white/5 hover:bg-white/10 rounded-2xl p-8 transition-all duration-300 cursor-pointer"
            onClick={() => navigate(item.link)}
          >
            <div className={`w-12 h-12 rounded-xl bg-${item.color}-500/10 flex items-center justify-center mb-6`}>
              <item.icon className={`w-6 h-6 text-${item.color}-400`} />
            </div>
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-neutral-400 mb-6">{item.description}</p>
            <div className="flex items-center text-sm text-neutral-300 group-hover:text-white transition-colors">
              Learn more
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Footer />
    </main>
  );
}
