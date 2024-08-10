import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps, useMemo, useState } from 'react';
import { ThemedInput } from '@/components/ThemedInput';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { createTodo, editTodo } from '@/redux/slice/todo';
import { RootState } from '@/redux/store';

type IconButtonType = TouchableOpacityProps & {
  name: ComponentProps<typeof Ionicons>['name'];
};

function IconButton({ name, ...props }: IconButtonType) {
  const theme = useColorScheme() ?? 'light';

  return (
    <TouchableOpacity
      style={[styles.iconButton, { borderColor: Colors[theme].text }]}
      {...props}
    >
      <TabBarIcon size={20} name={name} color={Colors[theme].text} />
    </TouchableOpacity>
  );
}

export default function CreateScreen() {
  const param = useLocalSearchParams();
  const theme = useColorScheme() ?? 'light';
  const dispatch = useAppDispatch();
  const { todoList } = useAppSelector((state: RootState) => state);

  const todo = useMemo(
    () => todoList.find((todo) => todo.id === param.id),
    [param]
  );

  const [title, setTitle] = useState(() => (todo?.title as string) ?? '');
  const [description, setDescription] = useState(
    () => (todo?.description as string) ?? ''
  );

  function handleClose() {
    router.navigate('/');
  }

  async function handleTodoCreation() {
    if (title && description) {
      if (!!todo?.id) {
        await dispatch(
          editTodo({
            id: todo.id,
            title,
            description,
            completed: todo.completed,
          })
        );
      } else {
        await dispatch(createTodo({ title, description }));
      }
      handleClose();
    } else {
      Alert.alert('Empty Field', 'must have title & description', [
        {
          text: 'Cancel',
          onPress: handleClose,
          style: 'cancel',
        },
        { text: 'OK', onPress: () => {} },
      ]);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <IconButton name="close" onPress={() => handleClose()} />

        <ThemedText type="title">
          {!todo?.id ? 'Create' : 'Edit'} Todo
        </ThemedText>
        <IconButton name="checkmark" onPress={() => handleTodoCreation()} />
      </ThemedView>

      <ThemedView style={styles.form}>
        <ThemedInput
          label="Title"
          value={title}
          onChangeText={(val) => setTitle(val)}
          placeholder="Do something fun!"
        />
        <ThemedInput
          label="Description"
          placeholder="Details about something fun..."
          style={{ flex: 1, minHeight: 180 }}
          value={description}
          onChangeText={(val) => setDescription(val)}
          multiline={true}
        />
      </ThemedView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  iconButton: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    padding: 8,
    fontSize: 16,
    borderRadius: 200,
  },
  form: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 20,
  },
});
