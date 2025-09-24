import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING } from '../../utils/constants';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
}

export default function Card({ children, style, padding = SPACING.md }: CardProps) {
  return (
    <View style={[styles.card, { padding }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: SPACING.md,
  },
});