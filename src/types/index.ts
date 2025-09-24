export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Team {
  id: string;
  name: string;
  logo_url?: string;
  created_by: string;
  created_at: string;
}

export interface Player {
  id: string;
  name: string;
  jersey_number: number;
  position: 'PG' | 'SG' | 'SF' | 'PF' | 'C';
  team_id: string;
  height?: string;
  weight?: number;
  created_at: string;
  team?: Team;
}

export interface Game {
  id: string;
  home_team_id: string;
  away_team_id: string;
  game_date: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  final_score_home?: number;
  final_score_away?: number;
  created_by: string;
  created_at: string;
  home_team?: Team;
  away_team?: Team;
}

export interface GameStats {
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
  player?: Player;
  game?: Game;
}

export interface PlayerSeasonStats {
  player_id: string;
  games_played: number;
  total_points: number;
  total_rebounds: number;
  total_assists: number;
  total_steals: number;
  total_blocks: number;
  total_fouls: number;
  total_minutes: number;
  field_goal_percentage: number;
  three_point_percentage: number;
  free_throw_percentage: number;
  points_per_game: number;
  rebounds_per_game: number;
  assists_per_game: number;
}

export interface TeamSeasonStats {
  team_id: string;
  games_played: number;
  wins: number;
  losses: number;
  total_points_for: number;
  total_points_against: number;
  average_points_for: number;
  average_points_against: number;
}

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Teams: undefined;
  Players: undefined;
  Games: undefined;
  Stats: undefined;
};

export type TeamsStackParamList = {
  TeamsList: undefined;
  TeamDetail: { teamId: string };
  CreateTeam: undefined;
  EditTeam: { teamId: string };
};

export type PlayersStackParamList = {
  PlayersList: undefined;
  PlayerDetail: { playerId: string };
  CreatePlayer: { teamId?: string };
  EditPlayer: { playerId: string };
};

export type GamesStackParamList = {
  GamesList: undefined;
  GameDetail: { gameId: string };
  CreateGame: undefined;
  LiveGame: { gameId: string };
};