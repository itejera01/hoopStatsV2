import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, ActivityIndicator } from 'react-native';

import { authService } from '../services/auth';
import { COLORS } from '../utils/constants';

// Import screens
import AuthScreen from '../screens/auth/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import TeamsListScreen from '../screens/teams/TeamsListScreen';
import TeamDetailScreen from '../screens/teams/TeamDetailScreen';
import CreateTeamScreen from '../screens/teams/CreateTeamScreen';
import PlayersListScreen from '../screens/players/PlayersListScreen';
import PlayerDetailScreen from '../screens/players/PlayerDetailScreen';
import CreatePlayerScreen from '../screens/players/CreatePlayerScreen';
import GamesListScreen from '../screens/games/GamesListScreen';
import GameDetailScreen from '../screens/games/GameDetailScreen';
import CreateGameScreen from '../screens/games/CreateGameScreen';
import LiveGameScreen from '../screens/games/LiveGameScreen';

import type { RootStackParamList, MainTabParamList, TeamsStackParamList, PlayersStackParamList, GamesStackParamList } from '../types';

const RootStack = createStackNavigator<RootStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const TeamsStack = createStackNavigator<TeamsStackParamList>();
const PlayersStack = createStackNavigator<PlayersStackParamList>();
const GamesStack = createStackNavigator<GamesStackParamList>();

function TeamsNavigator() {
  return (
    <TeamsStack.Navigator>
      <TeamsStack.Screen 
        name="TeamsList" 
        component={TeamsListScreen} 
        options={{ title: 'Teams' }}
      />
      <TeamsStack.Screen 
        name="TeamDetail" 
        component={TeamDetailScreen} 
        options={{ title: 'Team Details' }}
      />
      <TeamsStack.Screen 
        name="CreateTeam" 
        component={CreateTeamScreen} 
        options={{ title: 'Create Team' }}
      />
    </TeamsStack.Navigator>
  );
}

function PlayersNavigator() {
  return (
    <PlayersStack.Navigator>
      <PlayersStack.Screen 
        name="PlayersList" 
        component={PlayersListScreen} 
        options={{ title: 'Players' }}
      />
      <PlayersStack.Screen 
        name="PlayerDetail" 
        component={PlayerDetailScreen} 
        options={{ title: 'Player Details' }}
      />
      <PlayersStack.Screen 
        name="CreatePlayer" 
        component={CreatePlayerScreen} 
        options={{ title: 'Add Player' }}
      />
    </PlayersStack.Navigator>
  );
}

function GamesNavigator() {
  return (
    <GamesStack.Navigator>
      <GamesStack.Screen 
        name="GamesList" 
        component={GamesListScreen} 
        options={{ title: 'Games' }}
      />
      <GamesStack.Screen 
        name="GameDetail" 
        component={GameDetailScreen} 
        options={{ title: 'Game Details' }}
      />
      <GamesStack.Screen 
        name="CreateGame" 
        component={CreateGameScreen} 
        options={{ title: 'Create Game' }}
      />
      <GamesStack.Screen 
        name="LiveGame" 
        component={LiveGameScreen} 
        options={{ title: 'Live Game' }}
      />
    </GamesStack.Navigator>
  );
}

function MainNavigator() {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Teams') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Players') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Games') {
            iconName = focused ? 'basketball' : 'basketball-outline';
          } else {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        headerShown: false,
      })}
    >
      <MainTab.Screen name="Home" component={HomeScreen} />
      <MainTab.Screen name="Teams" component={TeamsNavigator} />
      <MainTab.Screen name="Players" component={PlayersNavigator} />
      <MainTab.Screen name="Games" component={GamesNavigator} />
    </MainTab.Navigator>
  );
}

export default function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is already signed in
    const checkUser = async () => {
      try {
        const { session } = await authService.getSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error('Error checking user session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <RootStack.Screen name="Main" component={MainNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthScreen} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}