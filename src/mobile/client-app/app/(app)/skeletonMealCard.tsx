// components/skeletonMealCard.tsx
//
// Drop-in skeleton for MealCard while meals are loading.
// Mirrors the exact dimensions of the real card so the layout
// doesn't jump when content arrives.
//
// Usage in mealsScreen.tsx:
//   import SkeletonMealCard from "@/components/skeletonMealCard";
//   ...
//   {loading && (
//     <FlatList
//       data={Array(6).fill(null)}
//       keyExtractor={(_, i) => `skeleton-${i}`}
//       numColumns={2}
//       columnWrapperStyle={{ gap: 16 }}
//       contentContainerStyle={{ paddingBottom: 80 }}
//       renderItem={({ index }) => <SkeletonMealCard index={index} />}
//       scrollEnabled={false}
//     />
//   )}

import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const COLORS = {
  bg: "#0f0e0c",
  surface: "#1c1a16",
  card: "#242018",
  border: "#2e2b22",
  shimmerBase: "#2a2620",
  shimmerHighlight: "#3a352c",
};

type Props = {
  index?: number; // stagger delay per card
};

export default function SkeletonMealCard({ index = 0 }: Props) {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Small stagger so cards don't all pulse in sync
    const delay = index * 80;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 900,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [index, shimmer]);

  // Interpolate opacity between base and highlight
  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  // Reusable shimmer block
  function Block({
    width,
    height,
    style,
  }: {
    width?: number | string;
    height: number;
    style?: object;
  }) {
    return (
      <Animated.View
        style={[
          {
            width: width ?? "100%",
            height,
            backgroundColor: COLORS.shimmerBase,
            borderRadius: 6,
            opacity,
          },
          style,
        ]}
      />
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        {/* Image placeholder */}
        <View style={styles.imageBox}>
          {/* Emoji icon placeholder */}
          <Block width={36} height={36} style={{ borderRadius: 18 }} />
          {/* Price badge placeholder */}
          <Animated.View
            style={[styles.priceBadge, { backgroundColor: COLORS.shimmerBase, opacity }]}
          />
        </View>

        {/* Text body */}
        <View style={styles.body}>
          {/* Meal name — wide */}
          <Block height={13} width="85%" />
          {/* Description — narrow */}
          <Block height={11} width="65%" style={{ marginTop: 6 }} />
        </View>

        {/* Quantity row */}
        <View style={styles.quantityRow}>
          <Animated.View style={[styles.qtyBtn, { backgroundColor: COLORS.shimmerBase, opacity }]} />
          <Block width={42} height={13} style={{ borderRadius: 4 }} />
          <Animated.View style={[styles.qtyBtn, { backgroundColor: COLORS.shimmerBase, opacity }]} />
        </View>

        {/* Add to cart button */}
        <Animated.View style={[styles.cartBtn, { opacity }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  imageBox: {
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    position: "relative",
  },
  priceBadge: {
    position: "absolute",
    bottom: 6,
    right: 6,
    width: 52,
    height: 20,
    borderRadius: 6,
  },
  body: {
    padding: 10,
    gap: 0,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginHorizontal: 10,
    marginTop: 6,
  },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  cartBtn: {
    margin: 10,
    height: 38,
    borderRadius: 10,
    backgroundColor: COLORS.shimmerHighlight,
  },
});