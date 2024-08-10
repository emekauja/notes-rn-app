import { StyleSheet, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import SearchBar from '@/components/primitives/SearchInput';
import { router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { RootState } from '@/redux/store';
import TodoCard from '@/components/primitives/TodoCard';
import ZeroState from '@/components/primitives/ZeroState';
import { setTodoCompleted } from '@/redux/slice/todo';
import { useCallback, useMemo, useState } from 'react';
import { debounce } from '@/utils/debounce';

export default function HomeScreen() {
  const todoList = useAppSelector((state: RootState) => state.todoList);
  const dispatch = useAppDispatch();

  const [phrase, setPhrase] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const memoisedTodoList = useMemo(
    () =>
      todoList.filter(
        (todo) =>
          !!todo.title.toLowerCase().startsWith(searchTerm.toLowerCase())
      ),
    [searchTerm, todoList]
  );

  const debounceFn = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 800),
    []
  );

  return (
    <>
      <ParallaxScrollView
        headerElement={
          <ThemedView style={styles.headerContainer}>
            <ThemedText type="title">Todóist</ThemedText>
            <SearchBar
              searchPhrase={phrase}
              updateClicked={() => {
                //do nothing
              }}
              updateSearchPhrase={(phrase) => {
                setPhrase(phrase ?? '');
                debounceFn(phrase);
              }}
            />
          </ThemedView>
        }
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      >
        {memoisedTodoList.length > 0 ? (
          memoisedTodoList.map((todo) => (
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
          <ZeroState text="No Todo yet" detail="oops! no todo list yet" />
        )}
      </ParallaxScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          router.navigate('/create');
        }}
      >
        <TabBarIcon name="add" color="white" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  imageBanner: {
    height: 178,
    width: 290,
    bottom: -50,
    left: 0,
    position: 'absolute',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 120,
    paddingTop: 20,
  },

  searchInput: {
    borderWidth: 2,
    borderColor: 'black',
  },
  floatingButton: {
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    position: 'absolute',
    bottom: 30,
    right: 20,
    height: 52,
    backgroundColor: 'black',
    borderRadius: 100,
  },
});
