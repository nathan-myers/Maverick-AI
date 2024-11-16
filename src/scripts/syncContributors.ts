import 'dotenv/config';
import { syncContributors } from '../lib/contributorSync';

console.log('Starting contributor sync...');
console.log('Environment variables loaded:', {
  supabaseUrl: !!process.env.VITE_SUPABASE_URL,
  supabaseKey: !!process.env.VITE_SUPABASE_ANON_KEY,
  githubToken: !!process.env.VITE_GITHUB_TOKEN,
});

syncContributors()
  .then(() => {
    console.log('Contributors synced successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to sync contributors:', error);
    process.exit(1);
  }); 