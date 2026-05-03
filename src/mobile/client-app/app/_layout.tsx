// client-app\app\_layout.tsx
import Toast from "react-native-toast-message";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Slot />
      <Toast />
    </>
  );
}