import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    "https://pwtyqtdrwfzvtyfpfbpz.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dHlxdGRyd2Z6dnR5ZnBmYnB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxNzA0NjMsImV4cCI6MjAxNTc0NjQ2M30.CLxdPSY9-tf2vC7m_4BuaWy4IHRwDOQub5b7-U7gj_4",
);