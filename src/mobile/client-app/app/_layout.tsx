import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import Contact from "./contact";

export default function Layout() {
  return (
    <>
        <Stack />
        <Contact />
      <Toast />
    </>
  );
}