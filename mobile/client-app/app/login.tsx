import { useState } from "react";
import { Text, TextInput, Button, Alert, View, Pressable } from "react-native";
import { supabase } from "../supabase";
import Toast from "react-native-toast-message";
import { router } from "@/.expo/types/router";
import { setGlobalIsLoggedIn } from "./authStore";

type Props = {
  style?: any;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
};

export default function Login({ isLoggedIn, setIsLoggedIn }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 3. Ez a függvény fut le, ha rányomnak a gombra
  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Hiba!", "Minden mezőt ki kell tölteni!");
      return;
    }

    await supabase.auth.signUp({
      email: "teszt@gmail.com",
      password: "jelszo12",
    });

    // LOGIN (nem signup!)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      const friendlyError =
  error.message.includes("Invalid login credentials")
    ? "Hibás email vagy jelszó"
    : error.message;

      Toast.show({
        type: "error",
        text1: "Hiba",
        text2: friendlyError, // hogyan érjem el, hogy a supabase elfogadja a setEmail("teszt@gmail.com");
        // setPassword("jelszo12"); email és jelszó kombót, akár workaround-del?
      });
    } else {
      // ✅ EZ A LÉNYEG: globális login state frissítés
      setIsLoggedIn(true);
      Toast.show({
        type: "success",
        text1: "Siker!",
        text2: "Sikeres bejelentkezés",
      });
    }
  }

  // de van egy workaround függvény is
  async function loginWithTestUser () {
  if (!email || !password) {
    Alert.alert("Hiba!", "Minden mezőt ki kell tölteni!");
    return;
  }

  // ✅ FAKE LOGIN (Supabase nélkül)
  setIsLoggedIn(true);

  Toast.show({
    type: "success",
    text1: "Siker!",
    text2: "Fake login sikeres",
  });

  // ✅ vissza a főoldalra
  setGlobalIsLoggedIn(true);
  router.replace("/");
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

      <Pressable
  onPress={() => {
    setEmail("teszt@gmail.com");
    setPassword("jelszo12");

    // közvetlen login
    setIsLoggedIn(true);

    Toast.show({
      type: "success",
      text1: "Teszt login",
      text2: "Automatikus belépés",
    });

    setGlobalIsLoggedIn(true);
    router.replace("/");
  }}
  style={{
    backgroundColor: "#ddd",
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  }}
>
  <Text>Egyyszerűsített teszt login</Text>
</Pressable>
    </View>
  );
}
