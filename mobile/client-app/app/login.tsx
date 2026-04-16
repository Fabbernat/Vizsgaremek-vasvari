import { useState } from "react";
import { Text, TextInput, Button, Alert, View, Pressable } from "react-native";
import { supabase } from "../supabase";
import Toast from "react-native-toast-message";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 3. Ez a függvény fut le, ha rányomnak a gombra
  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Hiba!", "Minden mezőt ki kell tölteni!");
      return;
    }

    // Meghívjuk a Supabase regisztrációt
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      // Ha hiba van, feldobunk egy mobilos ablakot (Alert)
      Toast.show({
        type: "error",
        text1: "Hiba",
        text2: error.message,
      });
    } else {
      Toast.show({
        type: "success",
        text1: "Siker!",
        text2: "Nézd meg az e-mailed a visszaigazoláshoz!",
      });
    }
  }

  const isFormValid = email.trim() && password;

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <Text>Bejelentkezés</Text>

      <Pressable
        onPress={() => {
          setEmail("teszt@gmail.com");
          setPassword("jelszo12");

          setTimeout(handleLogin, 100); // kis delay kell a state update miatt

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

      <Button
        title="Bejelentkezés"
        onPress={handleLogin}
        disabled={!isFormValid}
      />
    </View>
  );
}
