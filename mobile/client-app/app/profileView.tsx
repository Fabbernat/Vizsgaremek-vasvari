import { View ,Pressable, Text, ScrollView, TextInput} from "react-native";
import Orders from "./orders";
import { OrderItem } from "./models/orderItem";
import { router } from "expo-router";
import { Toast } from "react-native-toast-message/lib/src/Toast";
export default function CartView() {

    const currentUsername = "Kiss Anna"; // Ez helyettesíthető egy API hívással, ami lekéri a jelenlegi felhasználó nevét

    async function modifyUsername() {
        const (response, error) = await fetch("http://localhost:8080/api/user/modify-username", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newUsername: "newUsername",
            }),
        });
        if (error) {
            Toast.show({
                type: "error",
                text1: "Hiba történt a felhasználónév módosítása során",
            });
        }
    }

    return (
        <ScrollView>
            <View>
                <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
                    Felhasználóneved: {currentUsername}
                </Text>
                <TextInput
                    placeholder="Új felhasználónév"
                    style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 20 }}
                />
                <Pressable
                    onPress={() => {
                        modifyUsername(); 
                    }}
                >
                    <View style={{ backgroundColor: "#2563eb", padding: 12, borderRadius: 10 }}>
                        <Text style={{ fontSize: 18, color: "white", textAlign: "center" }}>
                            Módosítás
                        </Text>
                    </View>
                </Pressable>
            </View>

<View style={{ padding: 20 }}>
            <Text>Kiszálítás alatt lévő megrendelések:</Text>

            <Text>Befejezetlen megrendelések:</Text>
            <Orders />

            <Text>Korábbi megrendelések:</Text>
</View>
                <Pressable onPress={() => {
                    console.log("Checkout button pressed")
                    router.push("/checkout")
                    }}>
                    <View style={{ backgroundColor: "#2563eb", padding: 12, borderRadius: 10, marginTop: 20 }}>
                        <Text style={{ fontSize: 18, color: "white", textAlign: "center" }}>Megrendelés</Text>
                        <Text style={{ fontSize: 10, color: "white", textAlign: "center" }}>Tovább a fizetéshez</Text>
                    </View>
                </Pressable>

        </ScrollView>
    );
}