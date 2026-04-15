import { Image, Pressable, View } from "react-native";
import CartView from "./cartView";
import { router } from "expo-router";

export default function CartIconButton() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
      <Pressable onPress={() => router.push("/cartView")}>
        <Image
          source={require("../assets/mine/images/shopping-cart.png")}
          style={{ width: 32, height: 32 }}
        />
      </Pressable>

    </View>
  );
}