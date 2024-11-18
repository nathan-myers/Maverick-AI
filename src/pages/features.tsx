import { Code, Cpu, Layout } from 'lucide-react';

export function Features() {
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
                <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="bg-red-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <Cpu className="h-6 w-6 text-red-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Advanced AI</h3>
                    <p className="text-gray-400">
                        Leverage cutting-edge AI technology for accurate and efficient content moderation.
                    </p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="bg-yellow-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <Code className="h-6 w-6 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Customizable Rules</h3>
                    <p className="text-gray-400">
                        Tailor moderation rules to fit the unique needs of your community.
                    </p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="bg-green-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <Layout className="h-6 w-6 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">User-Friendly Interface</h3>
                    <p className="text-gray-400">
                        An intuitive and easy-to-use interface for seamless integration and operation.
                    </p>
                </div>
            </div>
        </main>
    );
}