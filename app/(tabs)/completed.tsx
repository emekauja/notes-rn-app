import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import TodoCard from '@/components/primitives/TodoCard';
import { setTodoCompleted } from '@/redux/slice/todo';
import { router } from 'expo-router';
import ZeroState from '@/components/primitives/ZeroState';
import { getCompletedTodos } from '@/redux/selectors';

export default function TabTwoScreen() {
  const completedTodos = useAppSelector(getCompletedTodos);
  const dispatch = useAppDispatch();

  return (
    <ParallaxScrollView
      headerElement={
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Completed</ThemedText>
        </ThemedView>
      }
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
    >
      <ThemedText>
        This includes only todos' marked as completed code to help you get
        started.
      </ThemedText>
      {completedTodos.length > 0 ? (
        completedTodos.map((todo) => (
          <TodoCard
            todo={todo}
            key={todo.id}
            onCheck={(value) =>
              dispatch(setTodoCompleted({ id: todo.id, completed: value }))
            }
            onEdit={(id) =>
              router.navigate({
                pathname: '/create',
                params: { id },
              })
            }
          />
        ))
      ) : (
        <ZeroState
          text="No Completed Todo yet"
          detail="oops! no completed todo list yet"
        />
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 40,
    paddingLeft: 32,
  },
});
