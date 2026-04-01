import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import { getMeals, getOrders, markDelivered } from '../services/api';
import { CourierOrderCard } from './stores/HomeScreen';

export default function HomeScreen() {
  const router = useRouter();
  const [, setOrderCount] = useState(0);
  const [, setMealCount] = useState(0);
  const [, setLoading] = useState(true);
  const [activeOrders, setActiveOrders] = useState<CourierOrderCard[]>([]);
  const [isGeneratingOrders, setIsGeneratingOrders] = useState(false);

// Segédfüggvények: random demo rendelés generálása
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
    orderedAt: new Date(Date.now() - Math.floor(Math.random() * 90) * 60000).toISOString(),
    customerName: randomFrom(customerNames),
    customerAddress: randomFrom(addresses),
    itemCount,
    totalPrice,
  };
}

// Függvény 10 demo rendelés hozzáadására
function addTenDemoOrders() {
  setIsGeneratingOrders(true);

  const newOrders = Array.from({ length: 10 }, (_, index) =>
    createDemoOrder(index + 1)
  );

  setActiveOrders(newOrders);
  setIsGeneratingOrders(false);
}

// Függvény a kézbesítéshez
async function markOrderAsDelivered(orderId: number) {
  try {
    await markDelivered(orderId);
    setActiveOrders((prev) => prev.filter((o) => o.id !== orderId));
    Alert.alert('Siker', `A(z) ${orderId}. rendelés kézbesítettnek jelölve.`);
  } catch (error: any) {
    console.error(error);
    Alert.alert(
      'Hiba',
      error?.message || 'Nem sikerült a rendelést kézbesítettnek jelölni.'
    );
  }
}

  useEffect(() => {
    async function loadData() {
      try {
        const orders = await getOrders();
        const meals = await getMeals();

        setOrderCount(Array.isArray(orders) ? orders.length : 0);
        setMealCount(Array.isArray(meals) ? meals.length : 0);

        if (Array.isArray(orders)) {
        const mappedOrders: CourierOrderCard[] = orders.slice(0, 5).map((order: any) => ({
          id: order.id,
          restaurantId: order.restaurant_id,
          userId: order.user_id,
          orderedAt: order.ordered_at,
          customerName: `Vásárló #${order.user_id}`,
          customerAddress: 'Szeged, demo cím',
          itemCount: Math.floor(Math.random() * 3) + 1,
          totalPrice: 2000 + Math.floor(Math.random() * 5000),
        }));

          setActiveOrders(mappedOrders);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

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
        {/* Header / Hero */}
        <View
          style={{
            backgroundColor: '#2563eb',
            borderRadius: 24,
            padding: 24,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOpacity: 0.12,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 5,
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
              marginBottom: 16,
            }}
          >
            Kezeld a rendeléseidet, nézd meg a műszakadataidat, és indítsd el a napot gyorsan.
          </Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.16)',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 999,
              }}
            >
              <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}>
                Online műszak
              </Text>
            </View>

            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.16)',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 999,
              }}
            >
              <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}>
                Aktív rendelések
              </Text>
            </View>

            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.16)',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 999,
              }}
            >
              <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}>
                Gyors indulás
              </Text>
            </View>
          </View>
        </View>

        {/* Quick status cards */}
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 18,
              padding: 16,
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
            }}
          >
            <Ionicons name="cart-outline" size={22} color="#2563eb" />
            <Text
              style={{
                fontSize: 13,
                color: '#64748b',
                marginTop: 10,
              }}
            >
              Aktív rendelések
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '800',
                color: '#0f172a',
                marginTop: 4,
              }}
            >
              {activeOrders.length}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 18,
              padding: 16,
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
            }}
          >
            <Ionicons name="time-outline" size={22} color="#16a34a" />
            <Text
              style={{
                fontSize: 13,
                color: '#64748b',
                marginTop: 10,
              }}
            >
              Mai műszak
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '800',
                color: '#0f172a',
                marginTop: 4,
              }}
            >
              Nincs
            </Text>
          </View>
        </View>

        {/* Main info card */}
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: 8,
            }}
          >
            Üdv a futáralkalmazásban
          </Text>

          <Text
            style={{
              color: '#475569',
              lineHeight: 22,
              marginBottom: 16,
            }}
          >
            Itt jelennek majd meg az aktív rendelések, az elérhető feladatok és a műszakhoz kapcsolódó adatok.
          </Text>

          <View style={{ gap: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="checkmark-circle" size={18} color="#16a34a" />
              <Text style={{ marginLeft: 10, color: '#334155' }}>
                Rendelések gyors áttekintése
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="checkmark-circle" size={18} color="#16a34a" />
              <Text style={{ marginLeft: 10, color: '#334155' }}>
                Feladatok gyors áttekintése
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="checkmark-circle" size={18} color="#16a34a" />
              <Text style={{ marginLeft: 10, color: '#334155' }}>
                Műszak és elérhetőség kezelése
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="checkmark-circle" size={18} color="#16a34a" />
              <Text style={{ marginLeft: 10, color: '#334155' }}>
                Kapcsolat és segítség egy helyen
              </Text>
            </View>
          </View>
        </View>

        {/* Primary actions */}
        <Text
          style={{
            fontSize: 17,
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: 12,
          }}
        >
          Gyors műveletek
        </Text>

        <View style={{ gap: 12, marginBottom: 20 }}>
          <Pressable
            onPress={() => router.push('/login')}
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#1d4ed8' : '#2563eb',
              borderRadius: 16,
              paddingVertical: 16,
              paddingHorizontal: 18,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            })}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="log-in-outline" size={22} color="white" />
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 16,
                  marginLeft: 12,
                }}
              >
                Bejelentkezés
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={22} color="white" />
          </Pressable>

          <Pressable
            onPress={() => router.push('/register')}
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#15803d' : '#16a34a',
              borderRadius: 16,
              paddingVertical: 16,
              paddingHorizontal: 18,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            })}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="person-add-outline" size={22} color="white" />
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 16,
                  marginLeft: 12,
                }}
              >
                Regisztráció
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={22} color="white" />
          </Pressable>

          <Pressable
            onPress={addTenDemoOrders}
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#ea580c' : '#f97316',
              borderRadius: 16,
              paddingVertical: 16,
              paddingHorizontal: 18,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
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
        </View>

        <Text
  style={{
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  }}
>
  Aktív rendelések
</Text>

<View style={{ gap: 12, marginBottom: 24 }}>
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
        Nyomd meg a „10 demo rendelés hozzáadása” gombot a teszteléshez.
      </Text>
    </View>
  ) : (
    activeOrders.map((order) => (
      <View
        key={order.id}
        style={{
          backgroundColor: 'white',
          borderRadius: 18,
          padding: 16,
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 10,
          }}
        >
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: '800', color: '#0f172a' }}>
              Rendelés #{order.id}
            </Text>
            <Text style={{ color: '#475569', marginTop: 4 }}>
              {order.customerName}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#dbeafe',
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 999,
            }}
          >
            <Text style={{ color: '#1d4ed8', fontWeight: '700', fontSize: 12 }}>
              Aktív
            </Text>
          </View>
        </View>

        <View style={{ gap: 6, marginBottom: 14 }}>
          <Text style={{ color: '#334155' }}>Cím: {order.customerAddress}</Text>
          <Text style={{ color: '#334155' }}>Étterem azonosító: {order.restaurantId}</Text>
          <Text style={{ color: '#334155' }}>Tételek száma: {order.itemCount}</Text>
          <Text style={{ color: '#334155' }}>Összeg: {order.totalPrice} Ft</Text>
          <Text style={{ color: '#64748b' }}>
            Rendelés ideje: {new Date(order.orderedAt).toLocaleString('hu-HU')}
          </Text>
        </View>

        <Pressable
          onPress={() => markOrderAsDelivered(order.id)}
          style={({ pressed }) => ({
            backgroundColor: pressed ? '#15803d' : '#16a34a',
            borderRadius: 14,
            paddingVertical: 14,
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <Text style={{ color: 'white', fontWeight: '800', fontSize: 15 }}>
            Kézbesítve
          </Text>
                </Pressable>
              </View>
            ))
          )}
        </View>

        {/* Secondary actions */}
        <Text
          style={{
            fontSize: 17,
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: 12,
          }}
        >
          További lehetőségek
        </Text>

        <View style={{ gap: 10, marginBottom: 24 }}>
          <Pressable
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#e2e8f0' : '#ffffff',
              borderRadius: 14,
              paddingVertical: 14,
              paddingHorizontal: 16,
              borderWidth: 1,
              borderColor: '#e2e8f0',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            })}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="receipt-outline" size={20} color="#334155" />
              <Text style={{ marginLeft: 12, color: '#0f172a', fontWeight: '600' }}>
                Aktív rendelések
              </Text>
            </View>
            <Text style={{ color: '#94a3b8' }}>Hamarosan</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#e2e8f0' : '#ffffff',
              borderRadius: 14,
              paddingVertical: 14,
              paddingHorizontal: 16,
              borderWidth: 1,
              borderColor: '#e2e8f0',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            })}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="calendar-outline" size={20} color="#334155" />
              <Text style={{ marginLeft: 12, color: '#0f172a', fontWeight: '600' }}>
                Műszakom
              </Text>
            </View>
            <Text style={{ color: '#94a3b8' }}>Hamarosan</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/contacts')}
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#e0f2fe' : '#f8fafc',
              borderRadius: 14,
              paddingVertical: 14,
              paddingHorizontal: 16,
              borderWidth: 1,
              borderColor: '#dbeafe',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            })}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="help-circle-outline" size={20} color="#2563eb" />
              <Text style={{ marginLeft: 12, color: '#2563eb', fontWeight: '700' }}>
                Segítség / Kapcsolat
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#2563eb" />
          </Pressable>
        </View>

        {/* Footer */}
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: '#94a3b8',
              textAlign: 'center',
            }}
          >
            Royal Delivery Futár • Expo Go MVP kezdőképernyő
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}