# HoopStats v2 - Basketball Statistics App

A React Native Expo app for tracking basketball team and player statistics, built with Supabase backend.

## Features

- **Team Management**: Create and manage basketball teams
- **Player Management**: Add players to teams with positions and details
- **Game Scheduling**: Schedule games between teams
- **Live Game Tracking**: Real-time statistics tracking during games
- **Statistics Analytics**: View player and team performance over time
- **User Authentication**: Secure login with Supabase Auth

## Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Navigation**: React Navigation v7
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form
- **UI**: Custom components with consistent design system

## Setup Instructions

### 1. Prerequisites

- Node.js (v16 or higher)
- Expo CLI (`npm install -g @expo/cli`)
- Supabase account

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to your project's SQL Editor
3. Run the SQL script from `supabase/schema.sql` to create the database structure
4. Go to Settings > API to get your project URL and anon key

### 3. Environment Configuration

1. Open `src/services/supabase.ts`
2. Replace the placeholder values:
   ```typescript
   const supabaseUrl = 'YOUR_SUPABASE_URL';
   const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
   ```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the App

```bash
# Start the development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Generic components (Button, Input, Card)
│   ├── auth/           # Authentication components
│   ├── teams/          # Team-specific components
│   ├── players/        # Player-specific components
│   └── games/          # Game-specific components
├── screens/            # Screen components
│   ├── auth/           # Authentication screens
│   ├── teams/          # Team management screens
│   ├── players/        # Player management screens
│   └── games/          # Game management screens
├── services/           # API and business logic
│   ├── supabase.ts     # Supabase client configuration
│   ├── auth.ts         # Authentication service
│   ├── teams.ts        # Teams service
│   ├── players.ts      # Players service
│   └── games.ts        # Games service
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and constants
└── navigation/         # Navigation configuration
```

## Database Schema

The app uses the following main tables:

- **teams**: Store team information
- **players**: Store player details linked to teams
- **games**: Store game information between teams
- **game_stats**: Store individual player statistics per game

All tables include Row Level Security (RLS) policies to ensure users can only access their own data.

## Key Features Implementation Status

- ✅ Authentication (Sign up, Sign in, Sign out)
- ✅ Team Management (Create, List, View)
- ✅ Navigation Structure
- ✅ Database Schema
- ✅ Basic UI Components
- 🚧 Player Management (In Progress)
- 🚧 Game Management (In Progress)
- 🚧 Live Game Tracking (Planned)
- 🚧 Statistics Dashboard (Planned)

## Development Guidelines

### Adding New Features

1. Create types in `src/types/index.ts`
2. Add service functions in appropriate service file
3. Create reusable components in `src/components/`
4. Build screens in `src/screens/`
5. Update navigation if needed

### Code Style

- Use TypeScript for all files
- Follow React Native best practices
- Use consistent naming conventions
- Add proper error handling
- Include loading states for async operations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please create an issue in the GitHub repository.