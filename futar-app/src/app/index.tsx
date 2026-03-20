import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
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
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: 'rgba(255,255,255,0.18)',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <MaterialCommunityIcons name="motorbike" size={34} color="white" />
          </View>

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
              0
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
    </SafeAreaView>
  );
}