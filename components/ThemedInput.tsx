import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';

export type IThemedInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  label?: string;
};

export const ThemedInput = ({
  lightColor,
  darkColor,
  style,
  label,
  ...props
}: IThemedInputProps) => {
  const placeholderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'placeholder'
  );
  const inputColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'input'
  );

  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'text'
  );

  return (
    <ThemedView>
      <ThemedText type="defaultSemiBold">{label}</ThemedText>
      <TextInput
        style={[
          {
            minHeight: 40,
            color: textColor,
            backgroundColor: inputColor,
            borderRadius: 6,
            padding: 4,
          },
          style,
        ]}
        placeholderTextColor={placeholderColor}
        {...props}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({});
