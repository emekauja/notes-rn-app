import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { ThemedText } from '../ThemedText';
import { ITodo } from '@/types/todos';
import { ThemedView } from '../ThemedView';
import moment from 'moment';

interface ITodoCardProps {
  todo: ITodo;
  onCheck?: (value: boolean) => void;
}

export default function TodoCard({ todo, onCheck }: ITodoCardProps) {
  const [isChecked, setChecked] = useState(() => todo.completed ?? false);

  const onChange = (value: boolean) => {
    if (!!onCheck) onCheck;
    setChecked(value);
  };

  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: todo.completed ? '#C8C8FF' : '#FDDC6D' },
      ]}
      key={todo.id}
    >
      <ThemedText type="subtitle">{todo.title}</ThemedText>
      <ThemedText>{todo.description}</ThemedText>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row' }}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? '#4630EB' : undefined}
          />
          <ThemedText>{isChecked ? 'Completed' : 'Not completed'}</ThemedText>
        </View>
        <ThemedText type="small">{moment(todo.date).fromNow()}</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
  },
  checkbox: {
    height: 24,
    width: 24,
    borderRadius: 6,
  },
});
