# HoopStats Setup Guide

Follow these steps to get your basketball stats app up and running.

## 1. Supabase Project Setup

### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up/sign in
2. Click "New Project"
3. Choose your organization
4. Enter project name: "hoopstats" (or your preferred name)
5. Enter a strong database password
6. Choose a region close to your users
7. Click "Create new project"

### Configure Database
1. Wait for your project to be ready (usually 1-2 minutes)
2. Go to the SQL Editor in your Supabase dashboard
3. Copy the entire contents of `supabase/schema.sql`
4. Paste it into the SQL Editor and click "Run"
5. This will create all necessary tables and security policies

### Get API Keys
1. Go to Settings > API in your Supabase dashboard
2. Copy your "Project URL" and "anon public" key
3. You'll need these for the next step

## 2. App Configuration

### Update Supabase Configuration
1. Open `src/services/supabase.ts`
2. Replace the placeholder values:
   ```typescript
   const supabaseUrl = 'YOUR_SUPABASE_URL';
   const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
   ```
   With your actual values from Supabase.

### Alternative: Environment Variables (Recommended)
1. Copy `.env.example` to `.env`
2. Update the values in `.env` with your Supabase credentials
3. Update `src/services/supabase.ts` to use environment variables:
   ```typescript
   const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
   const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
   ```

## 3. Install Dependencies

```bash
npm install
```

## 4. Run the App

```bash
# Start the development server
npm start

# Then choose your platform:
# - Press 'i' for iOS simulator
# - Press 'a' for Android emulator
# - Press 'w' for web browser
```

## 5. Test the App

### Create Your First Account
1. Open the app
2. Tap "Don't have an account? Sign Up"
3. Enter your email and password
4. Check your email for verification (if required)
5. Sign in with your credentials

### Create Your First Team
1. After signing in, you'll see the home screen
2. Go to the "Teams" tab
3. Tap the "+" button or "Create Team" button
4. Enter a team name
5. Tap "Create Team"

### Verify Database Connection
1. Check that your team appears in the Teams list
2. Go back to your Supabase dashboard
3. Go to Table Editor > teams
4. You should see your team in the database

## 6. Next Steps

Now that your app is running, you can:

1. **Add Players**: Implement the player creation functionality
2. **Schedule Games**: Build the game scheduling features
3. **Track Stats**: Create the live game tracking interface
4. **View Analytics**: Build statistics dashboards

## Troubleshooting

### Common Issues

**"Invalid API key" or connection errors:**
- Double-check your Supabase URL and API key
- Make sure you're using the "anon public" key, not the service role key
- Verify your project is active in Supabase

**"Permission denied" errors:**
- Check that Row Level Security policies are properly set up
- Verify you're signed in to the app
- Check the Supabase Auth logs for authentication issues

**App won't start:**
- Run `npm install` to ensure all dependencies are installed
- Clear Expo cache: `npx expo start --clear`
- Check for any TypeScript errors in the terminal

**Database errors:**
- Verify the schema was created successfully in Supabase
- Check the Supabase logs for any SQL errors
- Ensure all foreign key relationships are properly set up

### Getting Help

1. Check the Supabase documentation: [docs.supabase.com](https://docs.supabase.com)
2. Review Expo documentation: [docs.expo.dev](https://docs.expo.dev)
3. Check the app logs in your development console
4. Create an issue in the project repository

## Security Notes

- Never commit your `.env` file to version control
- Use environment variables for all sensitive configuration
- The anon key is safe to use in client-side code (it's designed for that)
- Row Level Security policies ensure users can only access their own data
- Always validate user input on both client and server side

## Production Deployment

When you're ready to deploy:

1. Set up proper environment variables for production
2. Configure Supabase for production use
3. Test all authentication flows
4. Verify all RLS policies are working correctly
5. Set up proper error logging and monitoring

Good luck with your basketball stats app! 🏀