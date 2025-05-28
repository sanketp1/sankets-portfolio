import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Profile {
  id: string
  name: string
  title?: string
  bio?: string
  profile_image_url?: string
  email?: string
  phone?: string
  location?: string
  linkedin_url?: string
  github_url?: string
  twitter_url?: string
  resume_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  name: string
  category: string
  proficiency_level: number
  icon_url?: string
  is_visible: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Experience {
  id: string
  company: string
  position: string
  description?: string
  start_date: string
  end_date?: string
  is_current: boolean
  company_logo_url?: string
  location?: string
  is_visible: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  description?: string
  long_description?: string
  image_url?: string
  demo_url?: string
  github_url?: string
  category?: string
  technologies: string[]
  is_featured: boolean
  is_visible: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  is_read: boolean
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image_url?: string
  is_published: boolean
  published_at?: string
  tags: string[]
  created_at: string
  updated_at: string
}
