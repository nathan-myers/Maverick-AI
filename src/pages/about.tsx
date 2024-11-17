import { Shield, Users, Globe } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function About() {
    const navigate = useNavigate();

    return (
        <main className="container mx-auto px-6 py-20">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                    About Maverick AI
                </h1>
                <p className="text-xl text-gray-300 mb-12">
                    Maverick AI is dedicated to providing cutting-edge AI solutions for content moderation, ensuring a safe and engaging community experience.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-20">
                <div 
                    className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors cursor-pointer" 
                    onClick={() => navigate('/mission')}
                >
                    <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <Shield className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                    <p className="text-gray-400">
                        To protect online communities with intelligent, real-time content moderation.
                    </p>
                </div>
                <div 
                    className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors cursor-pointer" 
                    onClick={() => navigate('/team')}
                >
                    <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <Users className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Our Team</h3>
                    <p className="text-gray-400">
                        A diverse group of experts in AI, machine learning, and community management.
                    </p>
                </div>
                <div 
                    className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors cursor-pointer" 
                    onClick={() => navigate('/global')}
                >
                    <div className="bg-green-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <Globe className="h-6 w-6 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
                    <p className="text-gray-400">
                        Serving communities worldwide with scalable and reliable AI solutions.
                    </p>
                </div>
            </div>
        </main>
    );
}