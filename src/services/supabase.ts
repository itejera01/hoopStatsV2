import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace these with your actual Supabase project URL and anon key
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database types for better TypeScript support
export interface Database {
  public: {
    Tables: {
      teams: {
        Row: {
          id: string;
          name: string;
          logo_url: string | null;
          created_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          logo_url?: string | null;
          created_by: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          logo_url?: string | null;
          created_by?: string;
          created_at?: string;
        };
      };
      players: {
        Row: {
          id: string;
          name: string;
          jersey_number: number;
          position: string;
          team_id: string;
          height: string | null;
          weight: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          jersey_number: number;
          position: string;
          team_id: string;
          height?: string | null;
          weight?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          jersey_number?: number;
          position?: string;
          team_id?: string;
          height?: string | null;
          weight?: number | null;
          created_at?: string;
        };
      };
      games: {
        Row: {
          id: string;
          home_team_id: string;
          away_team_id: string;
          game_date: string;
          status: string;
          final_score_home: number | null;
          final_score_away: number | null;
          created_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          home_team_id: string;
          away_team_id: string;
          game_date: string;
          status?: string;
          final_score_home?: number | null;
          final_score_away?: number | null;
          created_by: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          home_team_id?: string;
          away_team_id?: string;
          game_date?: string;
          status?: string;
          final_score_home?: number | null;
          final_score_away?: number | null;
          created_by?: string;
          created_at?: string;
        };
      };
      game_stats: {
        Row: {
          id: string;
          game_id: string;
          player_id: string;
          points: number;
          rebounds: number;
          assists: number;
          steals: number;
          blocks: number;
          fouls: number;
          minutes_played: number;
          field_goals_made: number;
          field_goals_attempted: number;
          three_pointers_made: number;
          three_pointers_attempted: number;
          free_throws_made: number;
          free_throws_attempted: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          game_id: string;
          player_id: string;
          points?: number;
          rebounds?: number;
          assists?: number;
          steals?: number;
          blocks?: number;
          fouls?: number;
          minutes_played?: number;
          field_goals_made?: number;
          field_goals_attempted?: number;
          three_pointers_made?: number;
          three_pointers_attempted?: number;
          free_throws_made?: number;
          free_throws_attempted?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          game_id?: string;
          player_id?: string;
          points?: number;
          rebounds?: number;
          assists?: number;
          steals?: number;
          blocks?: number;
          fouls?: number;
          minutes_played?: number;
          field_goals_made?: number;
          field_goals_attempted?: number;
          three_pointers_made?: number;
          three_pointers_attempted?: number;
          free_throws_made?: number;
          free_throws_attempted?: number;
          created_at?: string;
        };
      };
    };
  };
}