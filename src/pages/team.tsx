
import React from 'react';

export function Team() {
    return (
        <main className="container mx-auto px-6 py-20">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
                    Our Team
                </h1>
                <p className="text-xl text-gray-300 mb-12">
                    A diverse group of experts in AI, machine learning, and community management.
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mt-20">
                <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
                    <h3 className="text-2xl font-semibold mb-2">Jane Doe</h3>
                    <p className="text-gray-400">AI Specialist</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
                    <h3 className="text-2xl font-semibold mb-2">John Smith</h3>
                    <p className="text-gray-400">Machine Learning Engineer</p>
                </div>
                {/* ...add more team members as needed... */}
            </div>
        </main>
    );
}