import { Image, Pressable, View, StyleProp, ViewStyle } from "react-native";
import { router } from "expo-router";

type Props = {
  style?: StyleProp<ViewStyle>;
};

export default function CartIconButton({ style }: Props) {
  return (
    <View style={style}>
      
      <Pressable
       onPress={() => router.push("/cartView")}>
        <Image
          source={require("../assets/mine/icons/shopping-cart.png")}
          style={{ width: 32, height: 32 }}
        />
      </Pressable>

    </View>
  );
}