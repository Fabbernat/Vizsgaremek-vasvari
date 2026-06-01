// client-app\app\_layout.tsx
import Toast from 'react-native-toast-message';
import { router, Slot } from 'expo-router';
import { Animated, View } from 'react-native';
import { HomeScreenStyles } from './(app)/HomeScreen';
import React, { useEffect, useRef } from 'react';
import SettingsIconButton from './(app)/SettingsIconButton';
import ProfileIconButton from './(app)/ProfileIconButton';
import RestaurantsButton from './(app)/RestaurantsButton';
import Cart from './(app)/CartIconButton';
import HomeIconButton from './(app)/HomeIconButton';
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
    const headerAnim = useRef(new Animated.Value(0)).current;
    const logoAnim = useRef(new Animated.Value(-20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(headerAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(logoAnim, {
                toValue: 0,
                tension: 60,
                friction: 8,
                useNativeDriver: true,
            }),
        ]).start();
    }, [headerAnim, logoAnim]);

    return (
  <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <Animated.View style={{ opacity: headerAnim, transform: [{ translateY: logoAnim }] }}>
                <View style={HomeScreenStyles.topActions}>
                    <View style={HomeScreenStyles.topBar}>
                        <HomeIconButton style={HomeScreenStyles.iconBtn} />
                        <RestaurantsButton style={HomeScreenStyles.iconBtn} />
                        <Cart style={HomeScreenStyles.iconBtn} />
                        <ProfileIconButton style={HomeScreenStyles.iconBtn} />
                        <SettingsIconButton style={HomeScreenStyles.iconBtn} />
                    </View>
                </View>
            </Animated.View>
            <Slot />
            <Toast />
        </SafeAreaView>
    );
}
