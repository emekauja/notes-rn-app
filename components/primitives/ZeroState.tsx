import { StyleSheet } from 'react-native';
import React from 'react';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { TabBarIcon } from '../navigation/TabBarIcon';

interface IZeroState {
  text?: string;
  detail?: string;
}

const ZeroState = ({ text, detail }: IZeroState) => {
  return (
    <ThemedView style={styles.center}>
      <TabBarIcon name="thermometer" style={styles.icon} />
      <ThemedText type="defaultSemiBold">{text}</ThemedText>
      <ThemedText>{detail}</ThemedText>
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
