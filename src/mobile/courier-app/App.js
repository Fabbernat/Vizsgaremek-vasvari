import { router } from "expo-router";
import {
  ScrollView} from "react-native";
import { Button } from "react-native";


export default function App() {

  

  

  return (
    <ScrollView>
      <Button title="Bejelentkezés"/>
      <Button title="Regisztráció"/>
      <Button title="Kapcsolat"
        onPress={() => router.push("/contacts")}
        />
      </ScrollView>

  );
}
