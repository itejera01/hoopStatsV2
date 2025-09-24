import { supabase } from './supabase';
import { Team } from '../types';

export const teamsService = {
  // Get all teams for the current user
  async getTeams(): Promise<{ data: Team[] | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('created_at', { ascending: false });

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get a specific team by ID
  async getTeam(id: string): Promise<{ data: Team | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('id', id)
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Create a new team
  async createTeam(team: Omit<Team, 'id' | 'created_at'>): Promise<{ data: Team | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('teams')
        .insert([team])
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Update a team
  async updateTeam(id: string, updates: Partial<Team>): Promise<{ data: Team | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('teams')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Delete a team
  async deleteTeam(id: string): Promise<{ error: any }> {
    try {
      const { error } = await supabase
        .from('teams')
        .delete()
        .eq('id', id);

      return { error };
    } catch (error) {
      return { error };
    }
  },

  // Get team with players
  async getTeamWithPlayers(id: string): Promise<{ data: any | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select(`
          *,
          players (*)
        `)
        .eq('id', id)
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },
};