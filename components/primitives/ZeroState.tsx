import { StyleSheet } from 'react-native';
import React from 'react';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { TabBarIcon } from '../navigation/TabBarIcon';

const ZeroState = () => {
  return (
    <ThemedView style={styles.center}>
      <TabBarIcon name="thermometer" style={styles.icon} />
      <ThemedText type="defaultSemiBold">No Todo yet</ThemedText>
      <ThemedText>oops! no todo list yet</ThemedText>
    </ThemedView>
  );
};

export default ZeroState;

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'pink',
    padding: 6,
    borderRadius: 50,
  },
  center: {
    alignItems: 'center',
    gap: 4,
  },
});
