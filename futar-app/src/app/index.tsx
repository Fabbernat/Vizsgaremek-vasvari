import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import { CourierOrderCard } from './stores/CourierOrderCard';

export default function HomeScreen() {
  const [activeOrders, setActiveOrders] = useState<CourierOrderCard[]>([]);
  const [isGeneratingOrders, setIsGeneratingOrders] = useState(false);
  const [message, setMessage] = useState('Még nem történt kattintás.');
  const [pressCount, setPressCount] = useState(0);

  function randomFrom<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  function createDemoOrder(id: number): CourierOrderCard {
    const customerNames = [
      'Kiss Péter',
      'Nagy Anna',
      'Tóth Bence',
      'Varga Lilla',
      'Molnár Dávid',
      'Kovács Zsófi',
      'Farkas Márk',
      'Balogh Réka',
    ];

    const addresses = [
      'Szeged, Roosevelt tér 1.',
      'Szeged, Kárász utca 8.',
      'Szeged, Tisza Lajos körút 45.',
      'Szeged, Londoni körút 12.',
      'Szeged, Petőfi Sándor sugárút 33.',
      'Szeged, József Attila sugárút 21.',
      'Szeged, Boldogasszony sugárút 14.',
    ];

    const restaurantIds = [1, 2, 3, 4];
    const userIds = [11, 12, 13, 14, 15, 16];
    const itemCount = Math.floor(Math.random() * 4) + 1;
    const totalPrice = itemCount * (1800 + Math.floor(Math.random() * 2200));

    return {
      id,
      restaurantId: randomFrom(restaurantIds),
      userId: randomFrom(userIds),
      orderedAt: new Date().toISOString(),
      customerName: randomFrom(customerNames),
      customerAddress: randomFrom(addresses),
      itemCount,
      totalPrice,
    };
  }

  async function addTenDemoOrders() {
    setMessage('Kattintás érzékelve.');
    setPressCount((prev) => prev + 1);
    setIsGeneratingOrders(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const newOrders = Array.from({ length: 10 }, (_, index) =>
      createDemoOrder(index + 1)
    );

    setActiveOrders(newOrders);
    setMessage('A képernyő frissült.');
    setIsGeneratingOrders(false);
  }

  function removeOneOrder() {
    setMessage('Eltávolítás megtörtént.');
    setPressCount((prev) => prev + 1);
    setActiveOrders((prev) => prev.slice(0, -1));
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: '#2563eb',
            borderRadius: 24,
            padding: 24,
            marginBottom: 20,
          }}
        >
          <MaterialCommunityIcons
            name="motorbike"
            size={34}
            color="white"
            style={{ marginBottom: 16 }}
          />

          <Text
            style={{
              fontSize: 28,
              fontWeight: '800',
              color: 'white',
              marginBottom: 8,
            }}
          >
            Futár kezdőlap
          </Text>

          <Text
            style={{
              fontSize: 15,
              color: '#dbeafe',
              lineHeight: 22,
              marginBottom: 12,
            }}
          >
            Most csak a kattintás tesztelése a cél.
          </Text>

          <Text
            style={{
              color: 'white',
              fontWeight: '700',
            }}
          >
            Üzenet: {message}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 18,
            padding: 16,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 8 }}>
            Teszt állapotok
          </Text>
          <Text style={{ color: '#334155', marginBottom: 6 }}>
            Kattintások száma: {pressCount}
          </Text>
          <Text style={{ color: '#334155', marginBottom: 6 }}>
            Aktív rendelések: {activeOrders.length}
          </Text>
          <Text style={{ color: '#334155' }}>
            Gomb felirat: {isGeneratingOrders ? 'Generálás...' : '10 demo rendelés hozzáadása'}
          </Text>
        </View>

        <View style={{ gap: 12, marginBottom: 20 }}>
          <Pressable
            disabled={isGeneratingOrders}
            onPress={addTenDemoOrders}
            onPressIn={() => setMessage('Lenyomás érzékelve.')}
            style={({ pressed }) => ({
              backgroundColor: isGeneratingOrders
                ? '#fb923c'
                : pressed
                ? '#ea580c'
                : '#f97316',
              borderRadius: 16,
              paddingVertical: 16,
              paddingHorizontal: 18,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: isGeneratingOrders ? 0.7 : 1,
            })}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="add-circle-outline" size={22} color="white" />
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 16,
                  marginLeft: 12,
                }}
              >
                {isGeneratingOrders ? 'Generálás...' : '10 demo rendelés hozzáadása'}
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={22} color="white" />
          </Pressable>

          <Pressable
            onPress={removeOneOrder}
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#15803d' : '#16a34a',
              borderRadius: 16,
              paddingVertical: 16,
              paddingHorizontal: 18,
              alignItems: 'center',
            })}
          >
            <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>
              Egy rendelés törlése
            </Text>
          </Pressable>
        </View>

        <View style={{ gap: 12 }}>
          {activeOrders.length === 0 ? (
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 18,
                borderWidth: 1,
                borderColor: '#e2e8f0',
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: '700', color: '#0f172a', marginBottom: 6 }}>
                Jelenleg nincs aktív rendelés
              </Text>
              <Text style={{ color: '#64748b', lineHeight: 20 }}>
                Nyomd meg a gombot a teszteléshez.
              </Text>
            </View>
          ) : (
            activeOrders.map((order) => (
              <View
                key={order.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 16,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: '#e2e8f0',
                }}
              >
                <Text style={{ fontWeight: '800', color: '#0f172a' }}>
                  Rendelés #{order.id}
                </Text>
                <Text style={{ color: '#475569', marginTop: 4 }}>
                  {order.customerName}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}