import { router } from 'expo-router';
import { Linking, Pressable, ScrollView, Text, View } from 'react-native';

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
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 24,
        backgroundColor: '#ffffff',
      }}
    >
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Pressable
          onPress={() => router.back()}
          style={{
            alignSelf: 'flex-start',
            backgroundColor: '#e5e7eb',
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <Text style={{ color: '#111827', fontWeight: '600' }}>← Vissza</Text>
        </Pressable>

        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            marginBottom: 12,
            textAlign: 'center',
          }}
        >
          Kapcsolat / Segítség
        </Text>

        <Text
          style={{
            textAlign: 'center',
            color: '#555',
            marginBottom: 28,
          }}
        >
          Ezeket a csatornákat használd a Royal Delivery elérésére.
        </Text>

        <Pressable
          onPress={openPhone}
          style={{
            backgroundColor: '#2563eb',
            padding: 16,
            borderRadius: 12,
            marginBottom: 14,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '700', marginBottom: 4 }}>
            Munka közben kérdés során az alábbi számot hívd:
          </Text>
          <Text style={{ color: 'white' }}>+36 30 123 4567</Text>
        </Pressable>

        <Pressable
          onPress={openFacebook}
          style={{
            backgroundColor: '#1877F2',
            padding: 16,
            borderRadius: 12,
            marginBottom: 14,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '700', marginBottom: 4 }}>
            Vagy írj Facebook üzenetet:
          </Text>
          <Text style={{ color: 'white' }}>Royal Delivery Facebook</Text>
        </Pressable>

        <Pressable
          onPress={openEmail}
          style={{
            backgroundColor: '#16a34a',
            padding: 16,
            borderRadius: 12,
            marginBottom: 14,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '700', marginBottom: 4 }}>
            Hivatalos ügyekre: Email
          </Text>
          <Text style={{ color: 'white' }}>info@royaldelivery.com</Text>
        </Pressable>

        <Pressable
          onPress={openInstagram}
          style={{
            backgroundColor: '#F9A04E',
            padding: 16,
            borderRadius: 12,
            marginBottom: 14,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '700', marginBottom: 4 }}>
            Kövess be Instagramon!
          </Text>
          <Text style={{ color: 'white' }}>@RoyalDelivery</Text>
        </Pressable>

        <Pressable
          onPress={openLinkedIn}
          style={{
            backgroundColor: '#0A66C2',
            padding: 16,
            borderRadius: 12,
            marginBottom: 14,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '700', marginBottom: 4 }}>
            Kövess be LinkedInen!
          </Text>
          <Text style={{ color: 'white' }}>Royal Delivery LinkedIn</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}