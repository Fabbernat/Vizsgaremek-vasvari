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
import { loginUser } from '../services/api';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  async function handleLogin() {
    try {
      setLoading(true);
      setError('');

      const result = await loginUser(email, password);
      console.log(result);

      router.replace('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

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
        {/* Top back button */}
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
            <MaterialCommunityIcons name="truck-delivery-outline" size={34} color="white" />
          </View>

          <Text
            style={{
              fontSize: 28,
              fontWeight: '800',
              color: 'white',
              marginBottom: 8,
            }}
          >
            {loading ? 'Bejelentkezés...' : 'Belépés'}
            {error ? (
              <Text style={{ color: '#dc2626', marginBottom: 12, fontWeight: '600' }}>
                {error}
              </Text>
            ) : null}
          </Text>

          <Text
            style={{
              color: '#dbeafe',
              fontSize: 15,
              lineHeight: 22,
              marginBottom: 14,
            }}
          >
            Lépj be a Royal Delivery futár alkalmazásba, és kezeld egyszerűen a rendeléseidet és a műszakodat.
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
              Demo futár belépés elérhető
            </Text>
          </View>
        </View>

        {/* Login card */}
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
            Üdv újra!
          </Text>

          <Text
            style={{
              color: '#64748b',
              marginBottom: 20,
              lineHeight: 21,
            }}
          >
            Add meg a belépési adataidat a folytatáshoz.
          </Text>

          {/* Email label */}
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

          {/* Password label */}
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

          <Pressable
            style={{
              alignSelf: 'flex-end',
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: '#2563eb',
                fontWeight: '600',
              }}
            >
              Elfelejtett jelszó?
            </Text>
          </Pressable>

          {/* Main login button */}
          <Pressable
            onPress={handleLogin}
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#1d4ed8' : '#2563eb',
              paddingVertical: 16,
              borderRadius: 14,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginBottom: 12,
            })}
          >
            <Ionicons name="log-in-outline" size={20} color="white" />
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                fontSize: 16,
                marginLeft: 10,
              }}
            >
              Belépés
            </Text>
          </Pressable>

          {/* Secondary button */}
          <Pressable
            onPress={() => router.push('/register')}
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
            <Ionicons name="person-add-outline" size={20} color="#0f172a" />
            <Text
              style={{
                color: '#0f172a',
                fontWeight: '700',
                fontSize: 15,
                marginLeft: 10,
              }}
            >
              Új fiók létrehozása
            </Text>
          </Pressable>
        </View>

        {/* Info / feature card */}
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
            Belépés után elérhető
          </Text>

          <View style={{ gap: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="checkmark-circle" size={18} color="#16a34a" />
              <Text style={{ marginLeft: 10, color: '#334155' }}>
                Aktív rendelések megtekintése
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="checkmark-circle" size={18} color="#16a34a" />
              <Text style={{ marginLeft: 10, color: '#334155' }}>
                Műszakadatok kezelése
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="checkmark-circle" size={18} color="#16a34a" />
              <Text style={{ marginLeft: 10, color: '#334155' }}>
                Kapcsolat és támogatás
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
            Royal Delivery Futár • Bejelentkezési képernyő
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}