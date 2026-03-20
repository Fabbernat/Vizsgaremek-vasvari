import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Linking, Pressable, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';

export default function ContactsScreen() {
  function openPhone() {
    Linking.openURL('tel:+36301234567');
  }

  function openFacebook() {
    Linking.openURL('https://www.facebook.com/RoyalDelivery');
  }

  function openEmail() {
    Linking.openURL('mailto:info@royaldelivery.com');
  }

  function openInstagram() {
    Linking.openURL('https://www.instagram.com/RoyalDelivery/');
  }

  function openLinkedIn() {
    Linking.openURL('https://www.linkedin.com/RoyalDelivery/');
  }

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
        {/* Back button */}
        <View style={{ marginBottom: 12 }}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => ({
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: pressed ? '#e2e8f0' : '#ffffff',
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: '#e2e8f0',
            })}
          >
            <Ionicons name="arrow-back" size={18} color="#0f172a" />
            <Text
              style={{
                marginLeft: 8,
                color: '#0f172a',
                fontWeight: '600',
              }}
            >
              Vissza
            </Text>
          </Pressable>
        </View>

        {/* Hero */}
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
              width: 68,
              height: 68,
              borderRadius: 34,
              backgroundColor: 'rgba(255,255,255,0.18)',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <Ionicons name="headset-outline" size={34} color="white" />
          </View>

          <Text
            style={{
              fontSize: 28,
              fontWeight: '800',
              color: 'white',
              marginBottom: 8,
            }}
          >
            Kapcsolat / Segítség
          </Text>

          <Text
            style={{
              color: '#dbeafe',
              fontSize: 15,
              lineHeight: 22,
              marginBottom: 14,
            }}
          >
            Itt éred el gyorsan a Royal Delivery csapatát. Válassz csatornát attól függően, hogy hívni, írni vagy követni szeretnéd a céget.
          </Text>

          <View
            style={{
              alignSelf: 'flex-start',
              backgroundColor: 'rgba(255,255,255,0.16)',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 999,
            }}
          >
            <Text style={{ color: 'white', fontSize: 12, fontWeight: '700' }}>
              Gyors elérés minden fontos csatornához
            </Text>
          </View>
        </View>

        {/* Help info box */}
        <View
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 20,
            padding: 18,
            marginBottom: 18,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: 12,
            }}
          >
            Melyiket mikor használd?
          </Text>

          <View style={{ gap: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="call-outline" size={18} color="#16a34a" />
              <Text style={{ marginLeft: 10, color: '#334155' }}>
                Sürgős ügyben: telefon
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="mail-outline" size={18} color="#2563eb" />
              <Text style={{ marginLeft: 10, color: '#334155' }}>
                Hivatalos ügyekre: e-mail
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="chatbubble-ellipses-outline" size={18} color="#7c3aed" />
              <Text style={{ marginLeft: 10, color: '#334155' }}>
                Gyors üzenethez: Facebook
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="people-outline" size={18} color="#f59e0b" />
              <Text style={{ marginLeft: 10, color: '#334155' }}>
                Közösségi jelenlét: Instagram és LinkedIn
              </Text>
            </View>
          </View>
        </View>

        {/* Phone */}
        <Pressable
          onPress={openPhone}
          style={({ pressed }) => ({
            backgroundColor: pressed ? '#dcfce7' : '#ffffff',
            borderRadius: 18,
            padding: 18,
            marginBottom: 14,
            borderWidth: 1,
            borderColor: '#dcfce7',
            shadowColor: '#000',
            shadowOpacity: 0.04,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
            elevation: 1,
          })}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: '#16a34a',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 14,
              }}
            >
              <Ionicons name="call" size={24} color="white" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 17, fontWeight: '800', color: '#0f172a' }}>
                Telefonos segítség
              </Text>
              <Text style={{ color: '#475569', marginTop: 4 }}>
                Munka közben felmerülő gyors kérdésekhez
              </Text>
              <Text style={{ color: '#0f172a', marginTop: 8, fontWeight: '600' }}>
                +36 30 123 4567
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#dcfce7',
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 999,
              }}
            >
              <Text style={{ color: '#166534', fontWeight: '700', fontSize: 12 }}>
                Hívás
              </Text>
            </View>
          </View>
        </Pressable>

        {/* Facebook */}
        <Pressable
          onPress={openFacebook}
          style={({ pressed }) => ({
            backgroundColor: pressed ? '#dbeafe' : '#ffffff',
            borderRadius: 18,
            padding: 18,
            marginBottom: 14,
            borderWidth: 1,
            borderColor: '#dbeafe',
            shadowColor: '#000',
            shadowOpacity: 0.04,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
            elevation: 1,
          })}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: '#1877F2',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 14,
              }}
            >
              <FontAwesome name="facebook" size={24} color="white" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 17, fontWeight: '800', color: '#0f172a' }}>
                Facebook üzenet
              </Text>
              <Text style={{ color: '#475569', marginTop: 4 }}>
                Írj gyors üzenetet közösségi csatornán
              </Text>
              <Text style={{ color: '#0f172a', marginTop: 8, fontWeight: '600' }}>
                Royal Delivery Facebook
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
                Üzenet
              </Text>
            </View>
          </View>
        </Pressable>

        {/* Email */}
        <Pressable
          onPress={openEmail}
          style={({ pressed }) => ({
            backgroundColor: pressed ? '#e0f2fe' : '#ffffff',
            borderRadius: 18,
            padding: 18,
            marginBottom: 14,
            borderWidth: 1,
            borderColor: '#e0f2fe',
            shadowColor: '#000',
            shadowOpacity: 0.04,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
            elevation: 1,
          })}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: '#0ea5e9',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 14,
              }}
            >
              <Ionicons name="mail" size={24} color="white" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 17, fontWeight: '800', color: '#0f172a' }}>
                Hivatalos e-mail
              </Text>
              <Text style={{ color: '#475569', marginTop: 4 }}>
                Szerződéses, hivatalos és adminisztratív ügyekhez
              </Text>
              <Text style={{ color: '#0f172a', marginTop: 8, fontWeight: '600' }}>
                info@royaldelivery.com
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#e0f2fe',
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 999,
              }}
            >
              <Text style={{ color: '#0369a1', fontWeight: '700', fontSize: 12 }}>
                E-mail
              </Text>
            </View>
          </View>
        </Pressable>

        {/* Instagram */}
        <Pressable
          onPress={openInstagram}
          style={({ pressed }) => ({
            backgroundColor: pressed ? '#fce7f3' : '#ffffff',
            borderRadius: 18,
            padding: 18,
            marginBottom: 14,
            borderWidth: 1,
            borderColor: '#fce7f3',
            shadowColor: '#000',
            shadowOpacity: 0.04,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
            elevation: 1,
          })}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: '#E1306C',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 14,
              }}
            >
              <FontAwesome name="instagram" size={24} color="white" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 17, fontWeight: '800', color: '#0f172a' }}>
                Instagram
              </Text>
              <Text style={{ color: '#475569', marginTop: 4 }}>
                Kövess minket friss hírekért és tartalmakért
              </Text>
              <Text style={{ color: '#0f172a', marginTop: 8, fontWeight: '600' }}>
                @RoyalDelivery
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#fce7f3',
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 999,
              }}
            >
              <Text style={{ color: '#be185d', fontWeight: '700', fontSize: 12 }}>
                Követés
              </Text>
            </View>
          </View>
        </Pressable>

        {/* LinkedIn */}
        <Pressable
          onPress={openLinkedIn}
          style={({ pressed }) => ({
            backgroundColor: pressed ? '#e0f2fe' : '#ffffff',
            borderRadius: 18,
            padding: 18,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: '#e0f2fe',
            shadowColor: '#000',
            shadowOpacity: 0.04,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
            elevation: 1,
          })}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: '#0A66C2',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 14,
              }}
            >
              <FontAwesome name="linkedin" size={24} color="white" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 17, fontWeight: '800', color: '#0f172a' }}>
                LinkedIn
              </Text>
              <Text style={{ color: '#475569', marginTop: 4 }}>
                Céges jelenlét, szakmai információk és kapcsolatok
              </Text>
              <Text style={{ color: '#0f172a', marginTop: 8, fontWeight: '600' }}>
                Royal Delivery LinkedIn
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#e0f2fe',
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 999,
              }}
            >
              <Text style={{ color: '#075985', fontWeight: '700', fontSize: 12 }}>
                Megnyitás
              </Text>
            </View>
          </View>
        </Pressable>

        {/* Bottom navigation */}
        <View
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 20,
            padding: 18,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
            elevation: 2,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: 14,
            }}
          >
            További oldalak
          </Text>

          <View style={{ gap: 10 }}>
            <Pressable
              onPress={() => router.push('/')}
              style={({ pressed }) => ({
                backgroundColor: pressed ? '#e2e8f0' : '#f8fafc',
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
                <Ionicons name="home-outline" size={20} color="#0f172a" />
                <Text style={{ marginLeft: 12, color: '#0f172a', fontWeight: '600' }}>
                  Kezdőlap
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </Pressable>

            <Pressable
              onPress={() => router.push('/login')}
              style={({ pressed }) => ({
                backgroundColor: pressed ? '#e2e8f0' : '#f8fafc',
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
                <Ionicons name="log-in-outline" size={20} color="#0f172a" />
                <Text style={{ marginLeft: 12, color: '#0f172a', fontWeight: '600' }}>
                  Bejelentkezés
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </Pressable>

            <Pressable
              onPress={() => router.push('/register')}
              style={({ pressed }) => ({
                backgroundColor: pressed ? '#e2e8f0' : '#f8fafc',
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
                <Ionicons name="person-add-outline" size={20} color="#0f172a" />
                <Text style={{ marginLeft: 12, color: '#0f172a', fontWeight: '600' }}>
                  Regisztráció
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </Pressable>
          </View>
        </View>

        {/* Footer */}
        <View
          style={{
            alignItems: 'center',
            paddingBottom: 12,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: '#94a3b8',
              textAlign: 'center',
            }}
          >
            Royal Delivery Futár • Kapcsolati képernyő
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}