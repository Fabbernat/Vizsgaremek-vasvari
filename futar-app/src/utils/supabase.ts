import { createClient, processLock } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto'

let AsyncStorage = undefined
let supabase = undefined
try {
     AsyncStorage = require('@react-native-async-storage/async-storage').default
     supabase = createClient(
       process.env.EXPO_PUBLIC_SUPABASE_URL!,
       process.env.EXPO_PUBLIC_SUPABASE_KEY!,
       {
         auth: {
           storage: AsyncStorage,
           autoRefreshToken: true,
           persistSession: true,
           detectSessionInUrl: false,
           lock: processLock,
         },
       })
} catch (error) {
    
}

export default supabase