import { useEffect, useState } from 'react';
import { Github } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Footer } from "../components/Footer";

interface Contributor {
  name: string;
  avatar_url: string;
  github_username: string;
  contributions: number;
  role: string;
}

export function Contributors() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContributors() {
      try {
        console.log('Fetching contributors from Supabase...');
        const { data, error } = await supabase
          .from('contributors')
          .select('*')
          .order('contributions', { ascending: false });

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        console.log('Fetched contributors:', data);
        setContributors(data || []);
      } catch (err) {
        console.error('Error loading contributors:', err);
        setError('Failed to load contributors');
      } finally {
        setLoading(false);
      }
    }

    loadContributors();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-6 py-20">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Our Contributors
        </h1>
        <p className="text-xl text-gray-300">
          Meet the talented individuals who make Maverick AI possible.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contributors.map((contributor) => (
          <div 
            key={contributor.github_username}
            className="bg-gradient-to-b from-gray-800 via-gray-900 to-black p-6 rounded-xl shadow-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex flex-col items-center mb-4">
              <img 
                src={contributor.avatar_url} 
                alt={`${contributor.name}'s avatar`}
                className="w-24 h-24 rounded-full border-2 border-blue-500 mb-4 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(contributor.name)}&background=random`;
                }}
              />
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-white mb-1">{contributor.name}</h3>
                <p className="text-blue-400">{contributor.role}</p>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm text-gray-400 border-t border-gray-700 pt-4">
              <div className="flex items-center space-x-2">
                <Github className="w-4 h-4" />
                <span>{contributor.github_username}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-blue-400 font-semibold">{contributor.contributions}</span>
                <span>contributions</span>
              </div>
            </div>
            
            <a
              href={`https://github.com/${contributor.github_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full flex items-center justify-center space-x-2 py-2 px-4 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors text-white"
            >
              <Github className="w-4 h-4" />
              <span>View Profile</span>
            </a>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto text-center mt-16 p-8 rounded-xl border border-gray-700">
        <h2 className="text-3xl font-bold mb-4 text-white">
          Join Us at Swifty9
        </h2>
        <p className="text-lg text-gray-300 mb-6">
          We always invite contributors to our projects. Be a part of our team at Swifty9 and help us build amazing things together!
        </p>
        <a
          href="https://github.com/Swifty9"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
        >
          Contribute Now
        </a>
      </div>
      <Footer />
    </main>
  );
}
