import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { ThemedInput } from '@/components/ThemedInput';

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
  const todo = useLocalSearchParams();
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <IconButton name="close" onPress={() => router.navigate('/')} />

        <ThemedText type="subtitle">
          {!todo ? 'Create' : 'Edit'} Todo
        </ThemedText>
        <IconButton name="checkmark" />
      </ThemedView>
      <ThemedView style={styles.form}>
        <ThemedInput label="Title" placeholder="Do something fun!" />
        <ThemedInput
          label="Description"
          placeholder="Details about something fun..."
          style={{ flex: 1, minHeight: 180 }}
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
