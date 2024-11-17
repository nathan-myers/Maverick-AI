import { syncContributors } from '../lib/contributorSync.js';  // Note the .js extension
import dotenv from 'dotenv';

dotenv.config();

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