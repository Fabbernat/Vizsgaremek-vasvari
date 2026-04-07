import { Stack } from 'expo-router';
import { StripeProvider } from '@stripe/stripe-react-native';
import { CartProvider } from './cart-context';

export default function RootLayout() {
  return (
    <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''}>
      <CartProvider>
        <Stack screenOptions={{ headerShown: true }} />
      </CartProvider>
    </StripeProvider>
  );
}   