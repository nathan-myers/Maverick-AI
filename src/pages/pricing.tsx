import React from 'react';
import { DollarSign, CreditCard, TrendingUp } from 'lucide-react';

export function Pricing() {
    return (
        <main className="container mx-auto px-6 py-20">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                    Premium Plans
                </h1>
                <p className="text-xl text-gray-300 mb-12">
                    Choose a plan that fits your needs and start moderating content with Maverick AI today.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-20">
                <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <DollarSign className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Basic Plan</h3>
                    <p className="text-gray-400 mb-4">$7 per month</p>
                    <ul className="text-gray-400 space-y-2 mb-6 list-disc list-inside">
                        <li>Basic content moderation</li>
                        <li>Email support</li>
                        <li>Access to community forums</li>
                        <li>Weekly analytics report</li>
                    </ul>
                    <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Buy Now
                    </button>
                </div>
                <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="bg-yellow-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <CreditCard className="h-6 w-6 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Pro Plan</h3>
                    <p className="text-gray-400 mb-4">$10 per month</p>
                    <ul className="text-gray-400 space-y-2 mb-6 list-disc list-inside">
                        <li>Advanced content moderation</li>
                        <li>Priority email support</li>
                        <li>Access to community forums</li>
                        <li>Monthly analytics report</li>
                    </ul>
                    <button className="w-full py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                        Buy Now
                    </button>
                </div>
                <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="bg-green-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <TrendingUp className="h-6 w-6 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Pay-As-You-Go</h3>
                    <p className="text-gray-400 mb-4">Flexible pricing</p>
                    <ul className="text-gray-400 space-y-2 mb-6 list-disc list-inside">
                        <li>Pay for what you use</li>
                        <li>Scalable content moderation</li>
                        <li>24/7 support</li>
                        <li>Custom analytics report</li>
                    </ul>
                    <button className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                        Buy Now
                    </button>
                </div>
            </div>
        </main>
    );
}