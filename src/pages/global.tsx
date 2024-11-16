
import React from 'react';

export function Global() {
    return (
        <main className="container mx-auto px-6 py-20">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                    Global Reach
                </h1>
                <p className="text-xl text-gray-300 mb-12">
                    Serving communities worldwide with scalable and reliable AI solutions.
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mt-20">
                <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
                    <h3 className="text-2xl font-semibold mb-2">North America</h3>
                    <p className="text-gray-400">Providing AI solutions across the continent.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
                    <h3 className="text-2xl font-semibold mb-2">Europe</h3>
                    <p className="text-gray-400">Supporting communities with advanced AI technology.</p>
                </div>
                {/* ...add more regions as needed... */}
            </div>
        </main>
    );
}