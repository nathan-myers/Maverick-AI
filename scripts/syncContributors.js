import { syncContributors } from '../lib/contributorSync';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Run the sync
console.log('Starting contributor sync...');
syncContributors()
  .then(() => {
    console.log('Contributors synced successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to sync contributors:', error);
    process.exit(1);
  });