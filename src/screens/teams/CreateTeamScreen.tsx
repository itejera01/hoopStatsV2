import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm, Controller } from 'react-hook-form';

import { teamsService } from '../../services/teams';
import { authService } from '../../services/auth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { COLORS, SPACING, FONT_SIZES } from '../../utils/constants';
import { TeamsStackParamList } from '../../types';

type CreateTeamScreenNavigationProp = StackNavigationProp<TeamsStackParamList, 'CreateTeam'>;

interface Props {
  navigation: CreateTeamScreenNavigationProp;
}

interface FormData {
  name: string;
  logoUrl?: string;
}

export default function CreateTeamScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { user } = await authService.getCurrentUser();
      if (!user) {
        Alert.alert('Error', 'You must be logged in to create a team');
        return;
      }

      const { data: team, error } = await teamsService.createTeam({
        name: data.name,
        logo_url: data.logoUrl || null,
        created_by: user.id,
      });

      if (error) {
        Alert.alert('Error', 'Failed to create team');
        return;
      }

      Alert.alert('Success', 'Team created successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create team');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Create New Team</Text>
          <Text style={styles.subtitle}>
            Add a new basketball team to start tracking statistics
          </Text>

          <View style={styles.form}>
            <Controller
              control={control}
              name="name"
              rules={{
                required: 'Team name is required',
                minLength: {
                  value: 2,
                  message: 'Team name must be at least 2 characters',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Team Name"
                  placeholder="Enter team name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.name?.message}
                  required
                />
              )}
            />

            <Controller
              control={control}
              name="logoUrl"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Logo URL (Optional)"
                  placeholder="Enter logo URL"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.logoUrl?.message}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              )}
            />

            <Button
              title="Create Team"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              style={styles.submitButton}
            />

            <Button
              title="Cancel"
              onPress={() => navigation.goBack()}
              variant="outline"
              disabled={loading}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
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
    marginBottom: SPACING.xl,
    lineHeight: 22,
  },
  form: {
    marginTop: SPACING.lg,
  },
  submitButton: {
    marginBottom: SPACING.md,
  },
});