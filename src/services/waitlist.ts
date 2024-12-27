import { supabase } from '../lib/supabaseClient';
import { WaitlistEntry } from '../types/waitlist';

export const waitlistService = {
  async addToWaitlist(entry: Omit<WaitlistEntry, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .insert([entry])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  }
}; 