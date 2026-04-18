import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { supabase } from "@/supabase";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

type Props = {
  style?: any;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
};

export default function AdminToggleButton({ style, isLoggedIn, setIsLoggedIn }: Props) {

  const handlePress = async () => {
    if (isLoggedIn) {
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      Toast.show({
        type: "success",
        text1: "Siker",
        text2: "Sikeresen kijelentkeztél az admin módból!",
      });
      router.replace("/");
    } else {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
        router.replace("/");
      } else {
        Toast.show({
          type: "success",
          text1: "Siker",
          text2: "Sikeresen átváltottál admin módba!",
        });
      }
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.button,
        isLoggedIn ? styles.active : styles.inactive,
        style
      ]}
    >
      <View style={styles.content}>
        <Ionicons
          name={isLoggedIn ? "shield-checkmark" : "shield-outline"}
          size={20}
          color="white"
        />

        <Text style={styles.text}>
          {isLoggedIn ? "Kijelentkezás admin módból" : "Admin mód"}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
  },
  active: {
    backgroundColor: "#2ecc71",
  },
  inactive: {
    backgroundColor: "#e74c3c",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});