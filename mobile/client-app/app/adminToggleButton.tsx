import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { supabase } from "@/supabase";

const styles = StyleSheet.create({
    button: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontWeight: "bold",
    },
});

type Props = {
  style?: StyleProp<ViewStyle>;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
};

export default function AdminToggleButton({ style, isLoggedIn, setIsLoggedIn }: Props) {


    return (
        <Pressable
            onPress={() => 
            {
                if (isLoggedIn) {
                    // Kijelentkezés logika
                    setIsLoggedIn(false);
                    supabase.auth.signOut().then(() => {
                        console.log("Kijelentkezve");
                    });
                    router.push("/login");
                } else {
                    // Bejelentkezés logika
                    setIsLoggedIn(true);
                    supabase.auth.getSession().then(({ data: { session } }) => {
                        if (session) {
                            const user = session.user;
                            console.log(user);
                        }
                    });
                    router.push("/");
                }
            }

            }
            style={styles.button}
        >
            <Text style={styles.text}>Admin</Text>
        </Pressable>
    );
}