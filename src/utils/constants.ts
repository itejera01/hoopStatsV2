export const POSITIONS = [
  { label: 'Point Guard', value: 'PG' },
  { label: 'Shooting Guard', value: 'SG' },
  { label: 'Small Forward', value: 'SF' },
  { label: 'Power Forward', value: 'PF' },
  { label: 'Center', value: 'C' },
] as const;

export const GAME_STATUS = [
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
] as const;

export const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  text: '#000000',
  textSecondary: '#8E8E93',
  border: '#C6C6C8',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const STAT_CATEGORIES = [
  { key: 'points', label: 'Points', abbreviation: 'PTS' },
  { key: 'rebounds', label: 'Rebounds', abbreviation: 'REB' },
  { key: 'assists', label: 'Assists', abbreviation: 'AST' },
  { key: 'steals', label: 'Steals', abbreviation: 'STL' },
  { key: 'blocks', label: 'Blocks', abbreviation: 'BLK' },
  { key: 'fouls', label: 'Fouls', abbreviation: 'PF' },
  { key: 'field_goals_made', label: 'Field Goals Made', abbreviation: 'FGM' },
  { key: 'field_goals_attempted', label: 'Field Goals Attempted', abbreviation: 'FGA' },
  { key: 'three_pointers_made', label: '3-Pointers Made', abbreviation: '3PM' },
  { key: 'three_pointers_attempted', label: '3-Pointers Attempted', abbreviation: '3PA' },
  { key: 'free_throws_made', label: 'Free Throws Made', abbreviation: 'FTM' },
  { key: 'free_throws_attempted', label: 'Free Throws Attempted', abbreviation: 'FTA' },
] as const;