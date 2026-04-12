import { useState } from "react";
import {Text, TextInput, Button, View } from "react-native";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <Text>Bejelentkezés</Text>

      <TextInput
        placeholder="Felhasznélónév"
        value={username}
        onChangeText={setUsername}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Jelszó"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />

      <Button title="Bejelentkezés" onPress={() => {}} />
    </View>
  );
}