import React from 'react';

export function Mission() {
    return (
        <main className="container mx-auto px-6 py-20">
            {/* Mission Header Section */}
            <div className="max-w-3xl mx-auto text-center mb-16">
                <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                    Our Mission
                </h1>
                <p className="text-xl text-gray-300 mb-12">
                    To protect online communities with intelligent, real-time content moderation powered by AI, ensuring safe and respectful digital environments for all users.
                </p>
            </div>

            {/* Mission Detail Section */}
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-10 lg:space-y-0 lg:space-x-8">
                <div className="bg-white/10 p-8 rounded-xl w-full lg:w-1/3 text-center hover:bg-white/20 transition-colors">
                    <h3 className="text-2xl font-semibold text-white mb-4">Real-Time Moderation</h3>
                    <p className="text-gray-400">
                        Leveraging cutting-edge AI to instantly detect and filter harmful content, providing real-time analysis for your platform.
                    </p>
                </div>

                <div className="bg-white/10 p-8 rounded-xl w-full lg:w-1/3 text-center hover:bg-white/20 transition-colors">
                    <h3 className="text-2xl font-semibold text-white mb-4">Scalability & Efficiency</h3>
                    <p className="text-gray-400">
                        Our solutions scale effortlessly with the growth of your community, ensuring seamless moderation for any size platform.
                    </p>
                </div>

                <div className="bg-white/10 p-8 rounded-xl w-full lg:w-1/3 text-center hover:bg-white/20 transition-colors">
                    <h3 className="text-2xl font-semibold text-white mb-4">Community Protection</h3>
                    <p className="text-gray-400">
                        Creating safe online spaces by proactively identifying and preventing harmful, inappropriate, or offensive content before it impacts your users.
                    </p>
                </div>
            </div>

            {/* Our Vision Section */}
            <div className="mt-16 text-center">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                    Our Vision
                </h2>
                <p className="text-xl text-gray-300 mb-12">
                    To be the leading force in creating a safer, more inclusive internet where everyone can engage freely and respectfully.
                </p>
            </div>

            {/* Mission Statement Footer */}
            <div className="mt-16 text-center">
                <p className="text-lg text-gray-400">
                    At Maverick AI, our mission is not just about moderation, it's about building a trusted digital ecosystem that fosters healthy, respectful interactions across platforms.
                </p>
            </div>
        </main>
    );
}
