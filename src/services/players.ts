import { supabase } from './supabase';
import { Player } from '../types';

export const playersService = {
  // Get all players
  async getPlayers(): Promise<{ data: Player[] | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('players')
        .select(`
          *,
          team:teams(*)
        `)
        .order('created_at', { ascending: false });

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get players by team
  async getPlayersByTeam(teamId: string): Promise<{ data: Player[] | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('players')
        .select(`
          *,
          team:teams(*)
        `)
        .eq('team_id', teamId)
        .order('jersey_number', { ascending: true });

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get a specific player by ID
  async getPlayer(id: string): Promise<{ data: Player | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('players')
        .select(`
          *,
          team:teams(*)
        `)
        .eq('id', id)
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Create a new player
  async createPlayer(player: Omit<Player, 'id' | 'created_at' | 'team'>): Promise<{ data: Player | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('players')
        .insert([player])
        .select(`
          *,
          team:teams(*)
        `)
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Update a player
  async updatePlayer(id: string, updates: Partial<Player>): Promise<{ data: Player | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('players')
        .update(updates)
        .eq('id', id)
        .select(`
          *,
          team:teams(*)
        `)
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Delete a player
  async deletePlayer(id: string): Promise<{ error: any }> {
    try {
      const { error } = await supabase
        .from('players')
        .delete()
        .eq('id', id);

      return { error };
    } catch (error) {
      return { error };
    }
  },

  // Check if jersey number is available for a team
  async isJerseyNumberAvailable(teamId: string, jerseyNumber: number, excludePlayerId?: string): Promise<{ available: boolean; error: any }> {
    try {
      let query = supabase
        .from('players')
        .select('id')
        .eq('team_id', teamId)
        .eq('jersey_number', jerseyNumber);

      if (excludePlayerId) {
        query = query.neq('id', excludePlayerId);
      }

      const { data, error } = await query;

      if (error) {
        return { available: false, error };
      }

      return { available: data.length === 0, error: null };
    } catch (error) {
      return { available: false, error };
    }
  },
};