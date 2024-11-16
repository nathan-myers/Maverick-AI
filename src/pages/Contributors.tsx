import { useEffect, useState } from 'react';
import { Github } from 'lucide-react';
import { supabase } from '../lib/supabase';

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
            className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src={contributor.avatar_url} 
                alt={`${contributor.name}'s avatar`}
                className="w-16 h-16 rounded-full bg-gray-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(contributor.name)}&background=random`;
                }}
              />
              <div>
                <h3 className="text-xl font-semibold text-white">{contributor.name}</h3>
                <p className="text-sm text-gray-400">{contributor.role}</p>
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
              className="mt-4 w-full flex items-center justify-center space-x-2 py-2 px-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white"
            >
              <Github className="w-4 h-4" />
              <span>View Profile</span>
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}