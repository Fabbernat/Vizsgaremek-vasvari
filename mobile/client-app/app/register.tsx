import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import { supabase } from '../supabase';


export default function Register() {
  // 2. Itt tároljuk el amit a user beír (kezdetben üres)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  // 3. Ez a függvény fut le, ha rányomnak a gombra
  async function handleRegister() {
    // Meghívjuk a Supabase regisztrációt
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      // Ha hiba van, feldobunk egy mobilos ablakot (Alert)
      Alert.alert("Hiba!", error.message);
    } else {
      Alert.alert("Siker!", "Nézd meg az e-mailed a visszaigazoláshoz!");
    }
  }

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <Text>Regisztráció</Text>

      <TextInput
        placeholder="Felhasználónév"
        value={username}
        onChangeText={setUsername}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="E-mail cím"
        value={email}
        onChangeText={setEmail} // Amikor gépel, frissíti az e-mail változót
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Jelszó"
        value={password}
        onChangeText={setPassword} // Frissíti a jelszó változót
        secureTextEntry // Ettől lesznek pöttyök a jelszó helyén
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />

      <TextInput
        placeholder="Jelszó megerősítése"
        value={passwordRepeat}
        onChangeText={setPasswordRepeat} // Frissíti a "jelszó megerősítése" változót
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />

      <Button title="Regisztrálok" onPress={handleRegister} />
    </View>
  );
}