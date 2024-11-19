import { SearchCheck, FileQuestion, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function NotFound() {
    const navigate = useNavigate();

    const containerAnimation = {
        hidden: {opacity: 0},
        visible: {opacity: 1, transition: {staggerChildren: 0.3}}
    };

    const itemAnimation = {
        hidden: {opacity: 0, y: 50},
        visible: {opacity: 1, y: 0, transition: {duration: 0.5}}
    };

    return (
        <main className="container mx-auto px-6 py-20">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-yellow-500 text-transparent bg-clip-text">
                    Looks like we couldn't find that
                </h1>
                <p className="text-xl text-gray-300 mb-12">
                    It seems we couldn't find what you were looking for. If you're lost, below are some helpful links to get you started.
                </p>
            </div>

            <motion.div
                className="grid md:grid-cols-3 gap-8 mt-20"
                variants={containerAnimation}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => navigate('/features')}
                    variants={itemAnimation}
                >
                    <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <Code className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Features</h3>
                    <p className="text-gray-400">
                        Learn about the powerful features of MaverickAI.
                    </p>
                </motion.div>
                <motion.div
                    className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => navigate('/moderate-text')}
                    variants={itemAnimation}
                >
                    <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <SearchCheck className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Getting started</h3>
                    <p className="text-gray-400">
                        Jump right into using our advanced content moderation tool.
                    </p>
                </motion.div>
                <motion.div
                    className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => navigate('/about')}
                    variants={itemAnimation}
                >
                    <div className="bg-green-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <FileQuestion className="h-6 w-6 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">About</h3>
                    <p className="text-gray-400">
                        Discover more about MaverickAI.
                    </p>
                </motion.div>
            </motion.div>
        </main>
    );
}
