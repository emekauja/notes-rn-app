import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { ThemedText } from '../ThemedText';
import { ITodo } from '@/types/todos';
import { ThemedView } from '../ThemedView';
import moment from 'moment';

interface ITodoCardProps {
  todo: ITodo;
  onCheck?: (value: boolean) => void;
  onEdit?: (id: string) => void;
}

export default function TodoCard({ todo, onCheck, onEdit }: ITodoCardProps) {
  return (
    <TouchableOpacity
      onLongPress={() => {
        if (!!onEdit) onEdit(todo.id);
      }}
    >
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
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={todo.completed}
              onValueChange={onCheck}
              color={todo.completed ? '#4630EB' : undefined}
            />
            <ThemedText>
              {todo.completed ? 'Completed' : 'Not completed'}
            </ThemedText>
          </View>
          <ThemedText type="small">{moment(todo.date).fromNow()}</ThemedText>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
  },
  checkboxContainer: { flexDirection: 'row', gap: 4 },
  checkbox: {
    height: 24,
    width: 24,
    borderRadius: 6,
  },
});
