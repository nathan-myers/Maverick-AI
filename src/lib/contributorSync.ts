import { createClient } from '@supabase/supabase-js';

// Define Contributor type
interface Contributor {
  login: string;
  avatar_url: string;
  contributions: number;
}

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Role mapping for contributors
const ROLE_MAPPING: { [key: string]: string } = {
  john_doe: 'Maintainer',
  jane_doe: 'Admin',
  // Add more mappings as needed
};

// Fetch contributors from a GitHub repository
async function fetchContributorsFromRepo(
  owner: string,
  repo: string
): Promise<Contributor[]> {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contributors`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // Use GitHub token for higher rate limits
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch contributors: ${response.statusText}`);
  }

  const contributors = await response.json();
  return contributors.map((contributor: { login: string; avatar_url: string; contributions: number }) => ({
    login: contributor.login,
    avatar_url: contributor.avatar_url,
    contributions: contributor.contributions,
  }));
}

// Fetch user details from GitHub
async function fetchUserDetails(username: string) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user details for ${username}`);
  }
  return await response.json();
}

// Sync contributors to Supabase
async function syncContributors(owner: string, repo: string): Promise<void> {
  const contributors = await fetchContributorsFromRepo(owner, repo);

  for (const contributor of contributors) {
    try {
      // Fetch additional user details
      const userDetails = await fetchUserDetails(contributor.login);

      // Perform upsert operation
      const { error } = await supabase
        .from('contributors')
        .upsert(
          {
            github_username: contributor.login,
            name: userDetails.name || contributor.login, // Fallback to GitHub username if name is unavailable
            avatar_url: contributor.avatar_url,
            contributions: contributor.contributions,
            role: ROLE_MAPPING[contributor.login] || 'Contributor', // Default role
            last_updated: new Date().toISOString(),
          },
          {
            onConflict: 'github_username', // Unique constraint
          }
        );

      if (error) {
        console.error(
          `Failed to upsert contributor ${contributor.login}:`,
          error
        );
      } else {
        console.log(`Successfully synced contributor: ${contributor.login}`);
      }
    } catch (err) {
      console.error(`Error processing contributor ${contributor.login}:`, err);
    }
  }
}

// Main function to run the script
(async function main() {
  try {
    const owner = 'YOUR_GITHUB_USERNAME_OR_ORGANIZATION';
    const repo = 'YOUR_REPOSITORY_NAME';

    console.log(`Syncing contributors for ${owner}/${repo}...`);
    await syncContributors(owner, repo);
    console.log('Contributors synced successfully!');
  } catch (error) {
    console.error('Error syncing contributors:', error);
  }
})();
