import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12 }}>
        Futár kezdőlap
      </Text>
      <Text>Itt lesznek az aktív rendelések és a műszakadatok.</Text>
    </View>
  );
}