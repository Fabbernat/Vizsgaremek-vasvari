import { createClient } from '@supabase/supabase-js';
import process from 'process';


const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://uqusahmtbaypepskpxxa.supabase.co';
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY || 'sb_publishable_IAB2JpOGhKDJI7Sao5aXUw_C6Xh0lq-';

if (!supabaseUrl) {
  throw new Error('Missing EXPO_PUBLIC_SUPABASE_URL');
}
if (!supabaseKey) {
  throw new Error('Missing EXPO_PUBLIC_SUPABASE_KEY');
}
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;