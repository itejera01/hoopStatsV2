import { supabase } from './supabase';
import { Game, GameStats } from '../types';

export const gamesService = {
  // Get all games
  async getGames(): Promise<{ data: Game[] | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('games')
        .select(`
          *,
          home_team:teams!games_home_team_id_fkey(*),
          away_team:teams!games_away_team_id_fkey(*)
        `)
        .order('game_date', { ascending: false });

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get a specific game by ID
  async getGame(id: string): Promise<{ data: Game | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('games')
        .select(`
          *,
          home_team:teams!games_home_team_id_fkey(*),
          away_team:teams!games_away_team_id_fkey(*)
        `)
        .eq('id', id)
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Create a new game
  async createGame(game: Omit<Game, 'id' | 'created_at' | 'home_team' | 'away_team'>): Promise<{ data: Game | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('games')
        .insert([game])
        .select(`
          *,
          home_team:teams!games_home_team_id_fkey(*),
          away_team:teams!games_away_team_id_fkey(*)
        `)
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Update a game
  async updateGame(id: string, updates: Partial<Game>): Promise<{ data: Game | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('games')
        .update(updates)
        .eq('id', id)
        .select(`
          *,
          home_team:teams!games_home_team_id_fkey(*),
          away_team:teams!games_away_team_id_fkey(*)
        `)
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Delete a game
  async deleteGame(id: string): Promise<{ error: any }> {
    try {
      const { error } = await supabase
        .from('games')
        .delete()
        .eq('id', id);

      return { error };
    } catch (error) {
      return { error };
    }
  },

  // Get game stats for a specific game
  async getGameStats(gameId: string): Promise<{ data: GameStats[] | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('game_stats')
        .select(`
          *,
          player:players(*),
          game:games(*)
        `)
        .eq('game_id', gameId);

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Create or update game stats for a player
  async upsertGameStats(stats: Omit<GameStats, 'id' | 'created_at' | 'player' | 'game'>): Promise<{ data: GameStats | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('game_stats')
        .upsert([stats], {
          onConflict: 'game_id,player_id'
        })
        .select(`
          *,
          player:players(*),
          game:games(*)
        `)
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get games for a specific team
  async getTeamGames(teamId: string): Promise<{ data: Game[] | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('games')
        .select(`
          *,
          home_team:teams!games_home_team_id_fkey(*),
          away_team:teams!games_away_team_id_fkey(*)
        `)
        .or(`home_team_id.eq.${teamId},away_team_id.eq.${teamId}`)
        .order('game_date', { ascending: false });

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get player stats across all games
  async getPlayerStats(playerId: string): Promise<{ data: GameStats[] | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('game_stats')
        .select(`
          *,
          player:players(*),
          game:games(
            *,
            home_team:teams!games_home_team_id_fkey(*),
            away_team:teams!games_away_team_id_fkey(*)
          )
        `)
        .eq('player_id', playerId)
        .order('created_at', { ascending: false });

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },
};