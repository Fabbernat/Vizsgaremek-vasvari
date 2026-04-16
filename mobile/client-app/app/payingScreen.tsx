import { ScrollView, Text } from "react-native";

export default function PayingScreen() {
    return (
        <ScrollView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Fizetés folyamatban...</Text>
        </ScrollView>
    );
}