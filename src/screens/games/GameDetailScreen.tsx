import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { COLORS, SPACING, FONT_SIZES } from '../../utils/constants';
import { GamesStackParamList } from '../../types';

type GameDetailScreenRouteProp = RouteProp<GamesStackParamList, 'GameDetail'>;

interface Props {
  route: GameDetailScreenRouteProp;
}

export default function GameDetailScreen({ route }: Props) {
  const { gameId } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Game Detail</Text>
        <Text style={styles.subtitle}>Game ID: {gameId}</Text>
        <Text style={styles.placeholder}>
          This screen will show game details, box score, and player statistics for the game.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  placeholder: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});