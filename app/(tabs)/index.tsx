import { StyleSheet, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import SearchBar from '@/components/primitives/SearchInput';
import { Link, router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { RootState } from '@/redux/store';
import TodoCard from '@/components/primitives/TodoCard';
import ZeroState from '@/components/primitives/ZeroState';

export default function HomeScreen() {
  const { todoList } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  return (
    <>
      <ParallaxScrollView
        headerElement={
          <ThemedView style={styles.headerContainer}>
            <ThemedText type="title">Todoist</ThemedText>
            <SearchBar
              searchPhrase=""
              updateClicked={(click) => {
                console.log(click);
              }}
              updateSearchPhrase={(phrase) => {}}
            />
          </ThemedView>
        }
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      >
        {todoList.length > 1 ? (
          todoList.map((todo) => <TodoCard todo={todo} key={todo.id} />)
        ) : (
          <ZeroState />
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
