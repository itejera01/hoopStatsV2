-- HoopStats Database Schema
-- Run this in your Supabase SQL editor to create the database structure

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo_url TEXT,
    created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create players table
CREATE TABLE IF NOT EXISTS players (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    jersey_number INTEGER NOT NULL,
    position VARCHAR(2) NOT NULL CHECK (position IN ('PG', 'SG', 'SF', 'PF', 'C')),
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    height VARCHAR(10),
    weight INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(team_id, jersey_number)
);

-- Create games table
CREATE TABLE IF NOT EXISTS games (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    home_team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    away_team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    game_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
    final_score_home INTEGER,
    final_score_away INTEGER,
    created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CHECK (home_team_id != away_team_id)
);

-- Create game_stats table
CREATE TABLE IF NOT EXISTS game_stats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    game_id UUID REFERENCES games(id) ON DELETE CASCADE,
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    points INTEGER DEFAULT 0,
    rebounds INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    steals INTEGER DEFAULT 0,
    blocks INTEGER DEFAULT 0,
    fouls INTEGER DEFAULT 0,
    minutes_played INTEGER DEFAULT 0,
    field_goals_made INTEGER DEFAULT 0,
    field_goals_attempted INTEGER DEFAULT 0,
    three_pointers_made INTEGER DEFAULT 0,
    three_pointers_attempted INTEGER DEFAULT 0,
    free_throws_made INTEGER DEFAULT 0,
    free_throws_attempted INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(game_id, player_id)
);

-- Enable Row Level Security on all tables
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_stats ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for teams
CREATE POLICY "Users can view teams they created" ON teams
    FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Users can insert their own teams" ON teams
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own teams" ON teams
    FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own teams" ON teams
    FOR DELETE USING (auth.uid() = created_by);

-- Create RLS policies for players
CREATE POLICY "Users can view players from their teams" ON players
    FOR SELECT USING (
        team_id IN (
            SELECT id FROM teams WHERE created_by = auth.uid()
        )
    );

CREATE POLICY "Users can insert players to their teams" ON players
    FOR INSERT WITH CHECK (
        team_id IN (
            SELECT id FROM teams WHERE created_by = auth.uid()
        )
    );

CREATE POLICY "Users can update players from their teams" ON players
    FOR UPDATE USING (
        team_id IN (
            SELECT id FROM teams WHERE created_by = auth.uid()
        )
    );

CREATE POLICY "Users can delete players from their teams" ON players
    FOR DELETE USING (
        team_id IN (
            SELECT id FROM teams WHERE created_by = auth.uid()
        )
    );

-- Create RLS policies for games
CREATE POLICY "Users can view games with their teams" ON games
    FOR SELECT USING (
        home_team_id IN (SELECT id FROM teams WHERE created_by = auth.uid()) OR
        away_team_id IN (SELECT id FROM teams WHERE created_by = auth.uid()) OR
        created_by = auth.uid()
    );

CREATE POLICY "Users can insert games" ON games
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update games they created" ON games
    FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete games they created" ON games
    FOR DELETE USING (auth.uid() = created_by);

-- Create RLS policies for game_stats
CREATE POLICY "Users can view game stats for their games" ON game_stats
    FOR SELECT USING (
        game_id IN (
            SELECT id FROM games WHERE 
            home_team_id IN (SELECT id FROM teams WHERE created_by = auth.uid()) OR
            away_team_id IN (SELECT id FROM teams WHERE created_by = auth.uid()) OR
            created_by = auth.uid()
        )
    );

CREATE POLICY "Users can insert game stats for their games" ON game_stats
    FOR INSERT WITH CHECK (
        game_id IN (
            SELECT id FROM games WHERE 
            home_team_id IN (SELECT id FROM teams WHERE created_by = auth.uid()) OR
            away_team_id IN (SELECT id FROM teams WHERE created_by = auth.uid()) OR
            created_by = auth.uid()
        )
    );

CREATE POLICY "Users can update game stats for their games" ON game_stats
    FOR UPDATE USING (
        game_id IN (
            SELECT id FROM games WHERE 
            home_team_id IN (SELECT id FROM teams WHERE created_by = auth.uid()) OR
            away_team_id IN (SELECT id FROM teams WHERE created_by = auth.uid()) OR
            created_by = auth.uid()
        )
    );

CREATE POLICY "Users can delete game stats for their games" ON game_stats
    FOR DELETE USING (
        game_id IN (
            SELECT id FROM games WHERE 
            home_team_id IN (SELECT id FROM teams WHERE created_by = auth.uid()) OR
            away_team_id IN (SELECT id FROM teams WHERE created_by = auth.uid()) OR
            created_by = auth.uid()
        )
    );

-- Create indexes for better performance
CREATE INDEX idx_teams_created_by ON teams(created_by);
CREATE INDEX idx_players_team_id ON players(team_id);
CREATE INDEX idx_players_jersey_number ON players(team_id, jersey_number);
CREATE INDEX idx_games_teams ON games(home_team_id, away_team_id);
CREATE INDEX idx_games_date ON games(game_date);
CREATE INDEX idx_games_created_by ON games(created_by);
CREATE INDEX idx_game_stats_game_id ON game_stats(game_id);
CREATE INDEX idx_game_stats_player_id ON game_stats(player_id);
CREATE INDEX idx_game_stats_unique ON game_stats(game_id, player_id);