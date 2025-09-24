import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';

import { teamsService } from '../../services/teams';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { COLORS, SPACING, FONT_SIZES } from '../../utils/constants';
import { Team, TeamsStackParamList } from '../../types';

type TeamsListScreenNavigationProp = StackNavigationProp<TeamsStackParamList, 'TeamsList'>;

interface Props {
  navigation: TeamsListScreenNavigationProp;
}

export default function TeamsListScreen({ navigation }: Props) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      loadTeams();
    }, [])
  );

  const loadTeams = async () => {
    try {
      const { data, error } = await teamsService.getTeams();
      if (error) {
        Alert.alert('Error', 'Failed to load teams');
        return;
      }
      setTeams(data || []);
    } catch (error) {
      Alert.alert('Error', 'Failed to load teams');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadTeams();
  };

  const handleTeamPress = (teamId: string) => {
    navigation.navigate('TeamDetail', { teamId });
  };

  const handleCreateTeam = () => {
    navigation.navigate('CreateTeam');
  };

  const renderTeamItem = ({ item }: { item: Team }) => (
    <TouchableOpacity onPress={() => handleTeamPress(item.id)}>
      <Card style={styles.teamCard}>
        <View style={styles.teamHeader}>
          <View style={styles.teamIcon}>
            <Ionicons name="people" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.teamInfo}>
            <Text style={styles.teamName}>{item.name}</Text>
            <Text style={styles.teamDate}>
              Created {new Date(item.created_at).toLocaleDateString()}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
        </View>
      </Card>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="people-outline" size={64} color={COLORS.textSecondary} />
      <Text style={styles.emptyTitle}>No Teams Yet</Text>
      <Text style={styles.emptySubtitle}>
        Create your first team to start tracking basketball statistics
      </Text>
      <Button
        title="Create Team"
        onPress={handleCreateTeam}
        style={styles.createButton}
      />
    </View>
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleCreateTeam}
          style={styles.headerButton}
        >
          <Ionicons name="add" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading teams...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={teams}
        renderItem={renderTeamItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
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
  listContainer: {
    padding: SPACING.md,
    flexGrow: 1,
  },
  teamCard: {
    marginBottom: SPACING.sm,
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  teamDate: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: 22,
  },
  createButton: {
    paddingHorizontal: SPACING.xl,
  },
  headerButton: {
    marginRight: SPACING.md,
    padding: SPACING.xs,
  },
});