
import { router } from "expo-router";
import { Text, TextInput, Pressable, ScrollView } from "react-native";

export default function Checkout() {
    return (
        <ScrollView>
            <Text style={{ fontSize: 32, fontWeight: "bold", marginBottom: 20 }}>Számlázási adatok</Text>
            
            {/* Personal info */}
            <Text
            style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}
            >Személyes adatok</Text>
            <TextInput placeholder="Név" style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }} />
            <TextInput placeholder="E-mail" style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }} />
            <TextInput placeholder="Telefonszám" style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }} />
            
            {/* Address info */}
            <Text
            style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, marginTop: 20 }}
            >Cím</Text>
            <TextInput placeholder="Irányítószám" style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }} />
            <TextInput placeholder="Település" style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }} />
            <TextInput placeholder="Közterület neve" style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }} />
            <TextInput placeholder="Közterület jellege" style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }} />
            <TextInput placeholder="Házszám" style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }} />
            <TextInput placeholder="Emelet, lakás, ajtó, stb." style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }} />

            {/* Billing info */}
            <Text>Bankkártya adatok</Text>
            <TextInput placeholder="Kártyaszám" style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }} />
            <TextInput placeholder="Lejárati dátum (hó/év)" style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }} />
            <TextInput placeholder="CVV/CVC" style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }} />

            <Pressable
             onPress={() => router.push("/payingScreen")}
            >
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "blue" }}>Fizetés</Text>
            </Pressable>
        </ScrollView>
    );
}