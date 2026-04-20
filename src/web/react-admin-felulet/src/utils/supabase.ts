
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uqusahmtbaypepskpxxa.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'sb_publishable_IAB2JpOGhKDJI7Sao5aXUw_C6Xh0lq-';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase
        