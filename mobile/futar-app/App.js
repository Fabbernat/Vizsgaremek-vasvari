import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Royal Delivery futárszolgálat</Text>
      <Button style={{ fontSize: 28, fontWeight: 'bold' }} title="Adatok megjelenítése a backendből" />
      <StatusBar style="auto" />
      <View style={{ fontSize: 28, fontWeight: 'bold' }}>Ez egy view</View>
      <Text style={{ fontSize: 28, fontWeight: 'bold' }}>
        Hello UWU World
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
