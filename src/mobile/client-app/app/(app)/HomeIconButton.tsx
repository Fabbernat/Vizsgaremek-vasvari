// client-app/app/(app)/HomeIconButton.tsx
import { router } from 'expo-router';
import { Pressable, Text, StyleProp, ViewStyle } from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export default function HomeIconButton({ style }: Props) {
  return (
    <Pressable onPress={() => router.push('/')} style={style}>
      <Text style={{ fontSize: 22 }}>🏠</Text>
    </Pressable>
  );
}