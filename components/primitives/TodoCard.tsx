import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import { ThemedText } from '../ThemedText';
import { ITodo } from '@/types/todos';
import { ThemedView } from '../ThemedView';
import moment from 'moment';
import { TabBarIcon } from '../navigation/TabBarIcon';

interface ITodoCardProps {
  todo: ITodo;
  onCheck?: (value: boolean) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function TodoCard({
  todo,
  onCheck,
  onEdit,
  onDelete,
}: ITodoCardProps) {
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
        <View style={styles.titleContainer}>
          <ThemedText type="subtitle" style={{ flex: 1 }} numberOfLines={2}>
            {todo.title}
          </ThemedText>
          <View>
            <TouchableOpacity
              style={[styles.iconButton]}
              onPress={() => {
                if (!!onDelete) onDelete(todo.id);
              }}
            >
              <TabBarIcon size={20} name="remove" color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <ThemedText numberOfLines={2}>{todo.description}</ThemedText>
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
  iconButton: {
    borderRadius: 1000,
    padding: 4,
    backgroundColor: '#FF165D',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
