import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text, Pressable  } from "react-native";
import { supabase } from "../supabase";
import { ToastAndroid } from 'react-native';
import Toast from 'react-native-toast-message';

export default function Register() {
  // 2. Itt tároljuk el amit a user beír (kezdetben üres)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [role, setRole] = useState("customer");

  // 3. Ez a függvény fut le, ha rányomnak a gombra
  async function handleRegister() {
    if (!username || !email || !password || !passwordRepeat) {
      Alert.alert("Hiba!", "Minden mezőt ki kell tölteni!");
      return;
    }

    if (password !== passwordRepeat) {
      Alert.alert("Hiba!", "A jelszavak nem egyeznek!");
      return;
    }

    // Meghívjuk a Supabase regisztrációt
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
          role: role,
        },
      },
    });

    if (error) {
      // Ha hiba van, feldobunk egy mobilos ablakot (Alert)
      Toast.show({
        type: 'error',
        text1: "Hiba",
        text2: error.message,
      })
    } else {
      Toast.show({
        type: 'success',
        text1: 'Siker!',
        text2: 'Nézd meg az e-mailed a visszaigazoláshoz!',
      })
    }
  }

  const isFormValid =
    username.trim() &&
    email.trim() &&
    password &&
    passwordRepeat &&
    password === passwordRepeat;

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <Text>Regisztráció</Text>

      <Pressable
        onPress={() => {
          setUsername("teszt");
          setEmail("teszt@gmail.com");
          setPassword("jelszo12");
          setPasswordRepeat("jelszo12");

          setTimeout(handleRegister, 100); // kis delay kell a state update miatt

          Toast.show({
            type: "info",
            text1: "Teszt adatok betöltve",
          });
        }}
        style={{
          backgroundColor: "#ddd",
          padding: 10,
          marginBottom: 20,
          borderRadius: 8,
        }}
      >
        <Text>Kitöltés teszt adatokkal</Text>
      </Pressable>

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

      <Button
        title="Regisztrálok"
        onPress={handleRegister}
        disabled={!isFormValid}
      />
    </View>
  );
}
