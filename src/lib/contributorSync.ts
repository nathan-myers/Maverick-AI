import { supabase } from './supabase';
import { fetchGitHubContributors, fetchUserDetails } from './github';

const ROLE_MAPPING: Record<string, string> = {
  'MehulPardeshi': 'AI/ML Engineer',
  'Siddheshuncodes': 'Full Stack Web & App Developer',
  'divyesh-mali': 'Full Stack Web & App Developer',
};

export async function syncContributors() {
  try {
    console.log('Fetching contributors from GitHub...');
    const contributors = await fetchGitHubContributors();
    console.log(`Found ${contributors.length} contributors`);

    for (const contributor of contributors) {
      console.log(`Processing ${contributor.login}...`);
      const userDetails = await fetchUserDetails(contributor.login);
      
      const { error } = await supabase
        .from('contributors')
        .upsert({
          github_username: contributor.login,
          name: userDetails.name || contributor.login,
          avatar_url: contributor.avatar_url,
          contributions: contributor.contributions,
          role: ROLE_MAPPING[contributor.login] || 'Contributor',
          last_updated: new Date().toISOString(),
        });

      if (error) {
        console.error(`Error updating contributor ${contributor.login}:`, error);
      } else {
        console.log(`Successfully updated ${contributor.login}`);
      }
    }
  } catch (error) {
    console.error('Error syncing contributors:', error);
    throw error;
  }
}