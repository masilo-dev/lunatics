import { createClient } from '@supabase/supabase-js'

// Supabase configuration
// You can override these with environment variables, or use the defaults below
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qwlbgzkzzzrxmcitmnya.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3bGJnemt6enpyeG1jaXRtbnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NTAzOTksImV4cCI6MjA4MDQyNjM5OX0.p7LBnJdh1tY3ZXSLMnSgpgCKZm6XLFHsSXITwmp0aOk'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export { supabase }


