import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ytsahultzpmipdqnpxbu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0c2FodWx0enBtaXBkcW5weGJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4NjI0NjIsImV4cCI6MjA0NzQzODQ2Mn0.Fyh1SGDqzWuKsM3ZGKHMlgZMqpw7lmiI1nq4WCn-0B8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
