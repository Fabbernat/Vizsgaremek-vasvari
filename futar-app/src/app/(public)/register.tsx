import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          justifyContent: 'center',
        }}
        keyboardShouldPersistTaps="handled"
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
            backgroundColor: '#16a34a',
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
            <MaterialCommunityIcons name="account-plus-outline" size={34} color="white" />
          </View>

          <Text
            style={{
              fontSize: 28,
              fontWeight: '800',
              color: 'white',
              marginBottom: 8,
            }}
          >
            Regisztráció
          </Text>

          <Text
            style={{
              color: '#dcfce7',
              fontSize: 15,
              lineHeight: 22,
              marginBottom: 14,
            }}
          >
            Hozz létre egy futár fiókot demó célra, és próbáld ki a Royal Delivery alkalmazás fő funkcióit.
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
              Gyors demó regisztráció
            </Text>
          </View>
        </View>

        {/* Register card */}
        <View
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 22,
            padding: 20,
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
            elevation: 2,
            marginBottom: 18,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: 6,
            }}
          >
            Új futár fiók
          </Text>

          <Text
            style={{
              color: '#64748b',
              marginBottom: 20,
              lineHeight: 21,
            }}
          >
            Töltsd ki az alábbi adatokat a demo fiók létrehozásához.
          </Text>

          {/* Full name */}
          <Text
            style={{
              marginBottom: 8,
              fontWeight: '700',
              color: '#0f172a',
            }}
          >
            Teljes név
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#d1d5db',
              borderRadius: 14,
              backgroundColor: '#f8fafc',
              paddingHorizontal: 14,
              marginBottom: 16,
            }}
          >
            <Ionicons name="person-outline" size={20} color="#64748b" />
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Teljes név"
              placeholderTextColor="#94a3b8"
              style={{
                flex: 1,
                paddingVertical: 14,
                paddingLeft: 10,
                color: '#0f172a',
              }}
            />
          </View>

          {/* Email */}
          <Text
            style={{
              marginBottom: 8,
              fontWeight: '700',
              color: '#0f172a',
            }}
          >
            E-mail cím
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#d1d5db',
              borderRadius: 14,
              backgroundColor: '#f8fafc',
              paddingHorizontal: 14,
              marginBottom: 16,
            }}
          >
            <Ionicons name="mail-outline" size={20} color="#64748b" />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="pelda@email.com"
              placeholderTextColor="#94a3b8"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={{
                flex: 1,
                paddingVertical: 14,
                paddingLeft: 10,
                color: '#0f172a',
              }}
            />
          </View>

          {/* Phone */}
          <Text
            style={{
              marginBottom: 8,
              fontWeight: '700',
              color: '#0f172a',
            }}
          >
            Telefonszám
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#d1d5db',
              borderRadius: 14,
              backgroundColor: '#f8fafc',
              paddingHorizontal: 14,
              marginBottom: 16,
            }}
          >
            <Ionicons name="call-outline" size={20} color="#64748b" />
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="+36301234567"
              placeholderTextColor="#94a3b8"
              keyboardType="phone-pad"
              style={{
                flex: 1,
                paddingVertical: 14,
                paddingLeft: 10,
                color: '#0f172a',
              }}
            />
          </View>

          {/* Password */}
          <Text
            style={{
              marginBottom: 8,
              fontWeight: '700',
              color: '#0f172a',
            }}
          >
            Jelszó
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#d1d5db',
              borderRadius: 14,
              backgroundColor: '#f8fafc',
              paddingHorizontal: 14,
              marginBottom: 10,
            }}
          >
            <Ionicons name="lock-closed-outline" size={20} color="#64748b" />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Jelszó"
              placeholderTextColor="#94a3b8"
              secureTextEntry={!showPassword}
              style={{
                flex: 1,
                paddingVertical: 14,
                paddingLeft: 10,
                color: '#0f172a',
              }}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#64748b"
              />
            </Pressable>
          </View>

          <Text
            style={{
              color: '#64748b',
              fontSize: 12,
              marginBottom: 20,
            }}
          >
            Tipp: demóhoz bármilyen egyszerű jelszó megfelel.
          </Text>

          {/* Main CTA */}
          <Pressable
            onPress={() => router.replace('/')}
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#15803d' : '#16a34a',
              paddingVertical: 16,
              borderRadius: 14,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginBottom: 12,
            })}
          >
            <Ionicons name="person-add-outline" size={20} color="white" />
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                fontSize: 16,
                marginLeft: 10,
              }}
            >
              Demo regisztráció
            </Text>
          </Pressable>

          {/* Secondary CTA */}
          <Pressable
            onPress={() => router.push('/login')}
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#e2e8f0' : '#f8fafc',
              paddingVertical: 15,
              borderRadius: 14,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#e2e8f0',
            })}
          >
            <Ionicons name="log-in-outline" size={20} color="#0f172a" />
            <Text
              style={{
                color: '#0f172a',
                fontWeight: '700',
                fontSize: 15,
                marginLeft: 10,
              }}
            >
              Van már fiókod? Bejelentkezés
            </Text>
          </Pressable>
        </View>

        {/* Info card */}
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
            marginBottom: 18,
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
            Fiók létrehozása után
          </Text>

          <View style={{ gap: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="checkmark-circle" size={18} color="#16a34a" />
              <Text style={{ marginLeft: 10, color: '#334155' }}>
                Beléphetsz a futár felületre
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="checkmark-circle" size={18} color="#16a34a" />
              <Text style={{ marginLeft: 10, color: '#334155' }}>
                Kezelheted a műszakadataidat
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="checkmark-circle" size={18} color="#16a34a" />
              <Text style={{ marginLeft: 10, color: '#334155' }}>
                Megtekintheted az aktív rendeléseket
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom links */}
        <View
          style={{
            alignItems: 'center',
            gap: 14,
            paddingBottom: 10,
          }}
        >
          <Pressable onPress={() => router.push('/contacts')}>
            <Text
              style={{
                color: '#2563eb',
                fontWeight: '600',
              }}
            >
              Segítség / Kapcsolat
            </Text>
          </Pressable>

          <Pressable onPress={() => router.push('/')}>
            <Text
              style={{
                color: '#64748b',
                fontWeight: '500',
              }}
            >
              Vissza a kezdőlapra
            </Text>
          </Pressable>

          <Text
            style={{
              fontSize: 12,
              color: '#94a3b8',
              textAlign: 'center',
            }}
          >
            Royal Delivery Futár • Regisztrációs képernyő
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}