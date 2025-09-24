import { supabase } from './supabase';

export interface AuthError {
  message: string;
}

export interface AuthResponse {
  user: any;
  session: any;
  error: AuthError | null;
}

export const authService = {
  // Sign up with email and password
  async signUp(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      return {
        user: data.user,
        session: data.session,
        error: error ? { message: error.message } : null,
      };
    } catch (error: any) {
      return {
        user: null,
        session: null,
        error: { message: error.message || 'An unexpected error occurred' },
      };
    }
  },

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return {
        user: data.user,
        session: data.session,
        error: error ? { message: error.message } : null,
      };
    } catch (error: any) {
      return {
        user: null,
        session: null,
        error: { message: error.message || 'An unexpected error occurred' },
      };
    }
  },

  // Sign out
  async signOut(): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      return {
        error: error ? { message: error.message } : null,
      };
    } catch (error: any) {
      return {
        error: { message: error.message || 'An unexpected error occurred' },
      };
    }
  },

  // Get current session
  async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      return {
        session: data.session,
        error: error ? { message: error.message } : null,
      };
    } catch (error: any) {
      return {
        session: null,
        error: { message: error.message || 'An unexpected error occurred' },
      };
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const { data, error } = await supabase.auth.getUser();
      return {
        user: data.user,
        error: error ? { message: error.message } : null,
      };
    } catch (error: any) {
      return {
        user: null,
        error: { message: error.message || 'An unexpected error occurred' },
      };
    }
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },
};