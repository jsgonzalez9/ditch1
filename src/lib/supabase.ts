import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          daily_limit: number | null
          quit_goal_date: string | null
          onboarding_completed: boolean | null
          current_daily_puffs: number | null
          cost_per_device: number | null
          devices_per_week: number | null
          quit_date: string | null
          longest_streak: number | null
          gender: string | null
          motivation: string | null
          vaping_duration_months: number | null
          previous_quit_attempts: number | null
          support_system: string | null
          age_range: string | null
          biggest_challenge: string | null
          success_metric: string | null
          notification_preferences: any | null
          preferred_reminder_times: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          daily_limit?: number | null
          quit_goal_date?: string | null
          onboarding_completed?: boolean | null
          current_daily_puffs?: number | null
          cost_per_device?: number | null
          devices_per_week?: number | null
          quit_date?: string | null
          longest_streak?: number | null
          gender?: string | null
          motivation?: string | null
          vaping_duration_months?: number | null
          previous_quit_attempts?: number | null
          support_system?: string | null
          age_range?: string | null
          biggest_challenge?: string | null
          success_metric?: string | null
          notification_preferences?: any | null
          preferred_reminder_times?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          daily_limit?: number | null
          quit_goal_date?: string | null
          onboarding_completed?: boolean | null
          current_daily_puffs?: number | null
          cost_per_device?: number | null
          devices_per_week?: number | null
          quit_date?: string | null
          longest_streak?: number | null
          gender?: string | null
          motivation?: string | null
          vaping_duration_months?: number | null
          previous_quit_attempts?: number | null
          support_system?: string | null
          age_range?: string | null
          biggest_challenge?: string | null
          success_metric?: string | null
          notification_preferences?: any | null
          preferred_reminder_times?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      stripe_user_subscriptions: {
        Row: {
          customer_id: string
          subscription_id: string | null
          subscription_status: string
          price_id: string | null
          current_period_start: number | null
          current_period_end: number | null
          cancel_at_period_end: boolean | null
          payment_method_brand: string | null
          payment_method_last4: string | null
        }
      }
    }
    Views: {
      stripe_user_subscriptions: {
        Row: {
          customer_id: string
          subscription_id: string | null
          subscription_status: string
          price_id: string | null
          current_period_start: number | null
          current_period_end: number | null
          cancel_at_period_end: boolean | null
          payment_method_brand: string | null
          payment_method_last4: string | null
        }
      }
    }
  }
}