import { Code, Cpu, Layout } from 'lucide-react';
import {motion} from 'framer-motion';
export function Features() {
    const cardVariants = {
        hidden: { opacity: 0 }, 
        visible: { opacity: 1 },
      };
    return (
        <main className="container mx-auto px-6 py-20">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-yellow-500 text-transparent bg-clip-text">
                    Maverick AI Features
                </h1>
                <p className="text-xl text-gray-300 mb-12">
                    Discover the powerful features of Maverick AI that make content moderation seamless and effective.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-20">
                {
                    [
                        {Icon : Cpu , title:"Advanced AI" , description : "Leverage cutting-edge AI technology for accurate and efficient content moderation." , color : "red"},
                        {Icon : Code , title:"Customizable Rules" , description : "Tailor moderation rules to fit the unique needs of your community." , color : "yellow"},
                        {Icon : Layout , title:"User-Friendly Interface" , description : "An intuitive and easy-to-use interface for seamless integration and operation." , color : "green"},
                    ].map((feature,index) => (
                        <motion.div 
            variants={cardVariants}
            initial="hidden" 
            animate="visible" 
            transition={{ duration: 1, delay: index * 0.2 }} 
            key={index}
          >
            <div className="bg-white/5 p-6 rounded-xl transition-transform transform hover:scale-102 hover:shadow-lg hover:bg-white/10 focus:scale-103 focus:shadow-lg cursor-pointer">
                    <div className={`bg-${feature.color}-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                        <feature.Icon className={`h-6 w-6 text-${feature.color}-400`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">
                       {feature.description}
                    </p>
                </div>
          </motion.div>
                    ))
                }
            </div>
        </main>
    );
}