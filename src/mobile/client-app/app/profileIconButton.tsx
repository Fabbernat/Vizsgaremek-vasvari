import { Image, Pressable, View, StyleProp, ViewStyle } from "react-native";
import { router } from "expo-router";

type Props = {
  style?: StyleProp<ViewStyle>;
};

export default function ProfileIconButton({ style }: Props) {
  return (
      <View style={style}>
        
        <Pressable
         onPress={() => router.push("/profileScreen")}>
          <Image
            source={require("../assets/mine/images/profile-icon.png")}
            style={{ width: 32, height: 32 }}
          />
        </Pressable>
  
      </View>
    );
}