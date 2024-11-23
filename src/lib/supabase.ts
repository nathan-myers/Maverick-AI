import { createClient } from '@supabase/supabase-js';

// Handle both Vite and Node.js environments
const getEnvVariable = (key: string) => {
  // Check for Vite's import.meta.env first since we're primarily a Vite app
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[`VITE_${key}`];
  }
  // Fallback to process.env for Node.js environment
  if (typeof process !== 'undefined' && process.env) {
    return process.env[`VITE_${key}`];
  }
  return undefined;
};

const supabaseUrl = getEnvVariable('SUPABASE_URL');
const supabaseAnonKey = getEnvVariable('SUPABASE_ANON_KEY');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing:', {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey,
    env: typeof import.meta !== 'undefined' ? import.meta.env : process.env
  });
  throw new Error('Missing Supabase credentials. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

