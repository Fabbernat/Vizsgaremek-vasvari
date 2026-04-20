import { router } from "expo-router";
import { ScrollView, Text } from "react-native";
import { useEffect } from "react";

export default function PayingScreen() {

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push("/");
        }, 5000); // 5 seconds

        return () => clearTimeout(timeout); // cleanup
    }, []);

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                Fizetés folyamatban...
            </Text>
        </ScrollView>
    );
}