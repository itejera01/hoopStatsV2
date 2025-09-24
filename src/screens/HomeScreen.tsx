import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { authService } from '../services/auth';
import { teamsService } from '../services/teams';
import { gamesService } from '../services/games';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { COLORS, SPACING, FONT_SIZES } from '../utils/constants';
import { Team, Game } from '../types';

export default function HomeScreen() {
  const [user, setUser] = useState<any>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [recentGames, setRecentGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Get current user
      const { user: currentUser } = await authService.getCurrentUser();
      setUser(currentUser);

      // Load teams
      const { data: teamsData } = await teamsService.getTeams();
      if (teamsData) {
        setTeams(teamsData.slice(0, 3)); // Show only first 3 teams
      }

      // Load recent games
      const { data: gamesData } = await gamesService.getGames();
      if (gamesData) {
        setRecentGames(gamesData.slice(0, 5)); // Show only first 5 games
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            const { error } = await authService.signOut();
            if (error) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getGameStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return COLORS.success;
      case 'in_progress':
        return COLORS.warning;
      case 'cancelled':
        return COLORS.error;
      default:
        return COLORS.textSecondary;
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
          <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
            <Ionicons name="log-out-outline" size={24} color={COLORS.error} />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <Card style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Quick Stats</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{teams.length}</Text>
              <Text style={styles.statLabel}>Teams</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{recentGames.length}</Text>
              <Text style={styles.statLabel}>Games</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {recentGames.filter(game => game.status === 'completed').length}
              </Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
          </View>
        </Card>

        {/* Recent Teams */}
        <Card>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Teams</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {teams.length > 0 ? (
            teams.map((team) => (
              <View key={team.id} style={styles.teamItem}>
                <View style={styles.teamInfo}>
                  <View style={styles.teamIcon}>
                    <Ionicons name="people" size={20} color={COLORS.primary} />
                  </View>
                  <Text style={styles.teamName}>{team.name}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No teams yet</Text>
              <Button
                title="Create Your First Team"
                onPress={() => {}}
                size="small"
                style={styles.createButton}
              />
            </View>
          )}
        </Card>

        {/* Recent Games */}
        <Card>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Games</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {recentGames.length > 0 ? (
            recentGames.map((game) => (
              <View key={game.id} style={styles.gameItem}>
                <View style={styles.gameInfo}>
                  <Text style={styles.gameTeams}>
                    {game.home_team?.name} vs {game.away_team?.name}
                  </Text>
                  <Text style={styles.gameDate}>{formatDate(game.game_date)}</Text>
                </View>
                <View style={styles.gameStatus}>
                  <Text style={[styles.statusText, { color: getGameStatusColor(game.status) }]}>
                    {game.status.replace('_', ' ').toUpperCase()}
                  </Text>
                  {game.status === 'completed' && game.final_score_home !== null && (
                    <Text style={styles.gameScore}>
                      {game.final_score_home} - {game.final_score_away}
                    </Text>
                  )}
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No games yet</Text>
              <Button
                title="Schedule a Game"
                onPress={() => {}}
                size="small"
                style={styles.createButton}
              />
            </View>
          )}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    padding: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  greeting: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  userEmail: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  signOutButton: {
    padding: SPACING.sm,
  },
  statsCard: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  seeAllText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  teamItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  teamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  teamName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
  },
  gameItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  gameInfo: {
    flex: 1,
  },
  gameTeams: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
  },
  gameDate: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  gameStatus: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  gameScore: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SPACING.xs,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  createButton: {
    paddingHorizontal: SPACING.lg,
  },
});