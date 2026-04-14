import { useState } from "react";
import {Text, TextInput, Button, Alert, View } from "react-native";
import { supabase } from "../supabase";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 3. Ez a függvény fut le, ha rányomnak a gombra
  async function handleLogin() {
    // Meghívjuk a Supabase bejelentkezést
     Alert.alert("Hiba!");
    
  }

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <Text>Bejelentkezés</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
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

      <Button title="Bejelentkezés" onPress={handleLogin} />
    </View>
  );
}