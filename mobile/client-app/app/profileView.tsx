import { View, Pressable, Text, ScrollView, TextInput } from "react-native";
import Orders from "./orders";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { useState } from "react";

export default function ProfileView() {
    const [currentUsername, setCurrentUsername] = useState("Kiss Anna");
    const [newUsername, setNewUsername] = useState("");

    async function modifyUsername() {
        if (!newUsername.trim()) {
            Toast.show({
                type: "error",
                text1: "Hiba",
                text2: "Adj meg egy felhasználónevet",
            });
            return;
        }

        try {
            console.log("modifyUsername called with:", newUsername);

            const response = await fetch("http://10.0.2.2:54321/api/user/modify-username", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    newUsername: newUsername,
                }),
            });

            const data = await response.text();
            console.log("RESPONSE:", data);

            if (!response.ok) {
                throw new Error("Request failed");
            }

            Toast.show({
                type: "success",
                text1: "Siker!",
                text2: "Felhasználónév módosítva",
            });

            setCurrentUsername(newUsername);
            setNewUsername("");

        } catch (error) {
            console.error("Failed to update username:", error); // Log for debugging
            Toast.show({
                type: "error",
                text1: "Hiba történt",
                text2: "Nem sikerült módosítani",
            });
        }
    }

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <View>
                <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
                    Felhasználóneved: {currentUsername}
                </Text>

                <TextInput
                    placeholder="Új felhasználónév"
                    value={newUsername}
                    onChangeText={setNewUsername}
                    style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 20 }}
                />

                <Pressable onPress={modifyUsername} style={{ backgroundColor: "#2563eb", padding: 12, borderRadius: 10 }}>
                        <Text style={{ fontSize: 18, color: "white", textAlign: "center" }}>
                            Módosítás
                        </Text>
                </Pressable>
            </View>

            <View style={{ padding: 20 }}>
                <Text>Kiszálítás alatt lévő megrendelések:</Text>
                <Text>Befejezetlen megrendelések:</Text>
                <Orders />
                <Text>Korábbi megrendelések:</Text>
            </View>

            <Pressable
                onPress={() => {
                    router.push("/checkout");
                }}
             style={{ backgroundColor: "#2563eb", padding: 12, borderRadius: 10, marginTop: 20 }}>
                    <Text style={{ fontSize: 18, color: "white", textAlign: "center" }}>
                        Megrendelés
                    </Text>
                    <Text style={{ fontSize: 10, color: "white", textAlign: "center" }}>
                        Tovább a fizetéshez
                    </Text>
            </Pressable>
        </ScrollView>
    );
}