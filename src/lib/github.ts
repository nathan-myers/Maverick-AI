import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN;
const REPO_OWNER = 'Swifty9';
const REPO_NAME = 'Maverick-AI';

if (!GITHUB_TOKEN) {
  throw new Error('Missing GitHub token in environment variables');
}

interface GitHubContributor {
  login: string;
  avatar_url: string;
  contributions: number;
}

interface GitHubUserDetails {
  name?: string;
  login: string;
  avatar_url: string;
}

export async function fetchGitHubContributors() {
  try {
    console.log(`Fetching contributors from: https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors`);
    
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Maverick-AI'
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as GitHubContributor[];
    console.log(`Successfully fetched ${data.length} contributors`);
    return data;
  } catch (error) {
    console.error('Error in fetchGitHubContributors:', error);
    throw error;
  }
}

export async function fetchUserDetails(username: string): Promise<GitHubUserDetails> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Maverick-AI'
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<GitHubUserDetails>;
  } catch (error) {
    console.error(`Error fetching details for user ${username}:`, error);
    throw error;
  }
}