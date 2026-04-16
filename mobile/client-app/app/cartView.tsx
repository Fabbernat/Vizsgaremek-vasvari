import { View ,Pressable, Text} from "react-native";
import Orders from "./orders";
import { OrderItem } from "./models/orderItem";
export default function CartView() {
    return (
        <View>
            <Orders />
                <Pressable onPress={() => console.log("Checkout button pressed")}>
                    <View style={{ backgroundColor: "#2563eb", padding: 12, borderRadius: 10, marginTop: 20 }}>
                        <Text style={{ fontSize: 18, color: "white", textAlign: "center" }}>Megrendelés</Text>
                        <Text style={{ fontSize: 10, color: "white", textAlign: "center" }}>Tovább a fizetéshez</Text>
                    </View>
                </Pressable>

        </View>
    );
}