# 🚀 Royal Delivery - Futár App

## Leírás

A **Royal Delivery Futár App** egy modern, felhasználóbarát mobilalkalmazás futároknak, amely lehetővé teszi az etetek és más termékek kiszállítását a Royal Delivery rendszeren keresztül.

## 🎯 Fő Funkcionalitások

### 1. **Bejelentkezés & Autentifikáció**
- Email és jelszó alapú bejelentkezés
- Biztonságos Supabase integráció
- Automatikus profil betöltés bejelentkezéskor

### 2. **Rendelések Kezelése**

#### Elérhető Rendelések
- Valós idejű rendelések listája
- Rendelés részletei: cím, megrendelő, ételek, ár
- Gyors keresés és szűrés

#### Rendelés Elfogadása
- Egy kattintással elfogadd a rendeléseket
- Rendelés adatai (cím, telefon, ételek)
- Automatikus státusz frissítés

#### Szállítás Követése
- **Státusz Folyamata**: új → készül → átadva futárnak → kézbesítve
- Valós idejű státusz módosítás
- Teljesített rendelések naplózása

### 3. **Profil & Beállítások**

#### Profil Megjelenítés
- Futár profiladatai: felhasználónév, email
- Teljesített szállítások száma
- Értékelés mutatás

#### Beállítások
- **Téma**: Sötét / Világos mód
- **Nyelv**: Magyar / English
- **Online Státusz**: Online/Offline módváltás
- **Kijelentkezés**: Biztonságos kilépés

### 4. **Felhasználói Felület**

#### Design Elvek
- **Sötét téma alapértelmezés**: Könnyebb szem kíméletes
- **Arany akcentok**: Royal branding (`#f0b429`)
- **Responsive layout**: Minden méretű képernyőhöz
- **Intuitív navigáció**: Szekmék és gombok

#### Képernyők
1. **HomeScreen** - Rendelések listája
2. **OrderDetailScreen** - Rendelés részletei & műveletek
3. **ProfileScreen** - Profil információ
4. **SettingsScreen** - Beállítások módosítása
5. **LoginScreen** - Bejelentkezés

## 📱 Technológia Stack

- **Framework**: React Native + Expo
- **Routing**: Expo Router
- **State Management**: Zustand
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: React Native StyleSheet

## 🔄 Státusz Folyamat

```
új (Elérhető)
  ↓
Futár elfogadja
  ↓
készül (Étterem készíti)
  ↓
átadva_futárnak (Futár elvette)
  ↓
kézbesítve (Eljuttatva a megrendelőhöz) ✅
```

## 🗂️ Mappastruktúra

```
courier-app/
├── app/
│   ├── _layout.tsx          # App layout & theme provider
│   ├── index.tsx            # Entry point (redirect)
│   ├── login.tsx            # Bejelentkezés
│   ├── home.tsx             # Rendelések home
│   ├── order-detail.tsx     # Rendelés részletei
│   ├── profile.tsx          # Profil nézet
│   └── settings.tsx         # Beállítások
├── stores/
│   ├── CourierAuthStore.ts  # Auth state management
│   └── OrderStore.ts        # Orders state management
├── models/
│   └── deliveryOrder.ts     # Type definitions
├── components/
│   ├── StatusBadge.tsx      # Status display
│   └── OrderCard.tsx        # Order card component
└── context/
    └── CourierThemeContext.tsx # Theme management
```

## 🔑 Működési Folyamat

### 1. Bejelentkezés
```
1. Futár megnyitja az appot
2. Átirányítás Login képernyőre
3. Email + jelszó megadása
4. Supabase autentifikáció
5. Profil adatok betöltése
6. Átirányítás Home képernyőre
```

### 2. Rendelés Elfogadása
```
1. Futár látja az elérhető rendeléseket a Home képernyőn
2. Rákattint egy rendelésre
3. OrderDetail képernyő megnyílik
4. Megadatok megjelenítése
5. Futár klikkeli az "Elfogadás" gombot
6. Rendelés státusza: új → készül
7. Átkerül a "Szállítás alatt" fülre
```

### 3. Szállítás Nyomonkövetése
```
1. Futár a MyOrders fülön látja az elfogadott rendeléseket
2. Kattintva megnyitja az order detail-t
3. Státusz módosítása:
   - készül → "Átadva futárnak" gomb
   - átadva_futárnak → "Kézbesítve" gomb
4. Teljesített rendelések megmaradnak a naplóban
```

### 4. Beállítások Módosítása
```
1. Futár kattint a Settings ikonra
2. Megváltoztathatja: Téma, Nyelv, Online státusz
3. Módosítások azonnal mentődnek
```

## 🎨 Szín Paletta

### Sötét Téma (Alapértelmezett)
- **Háttér**: `#0f0e0c` (fekete)
- **Surface**: `#1c1a16` (sötétszürke)
- **Card**: `#242018` (sötétbarna)
- **Border**: `#2e2b22` (szürke)
- **Text**: `#f5f0e8` (fehér)
- **Muted**: `#9c9178` (szürke)
- **Gold (accent)**: `#f0b429`
- **Green**: `#22c55e`
- **Blue**: `#3b82f6`
- **Red (danger)**: `#ef4444`

### Világos Téma
- Invertált szineket használ

## 🛠️ Telepítés & Futtatás

```bash
# Dependenciák telepítése
npm install

# App indítása
npm start

# Android emulátor
npm run android

# iOS szimulátor
npm run ios

# Web verzió
npm run web
```

## 📡 Supabase Integráció

### Szükséges Táblák

1. **couriers** tábla
   ```sql
   - id (PK)
   - email
   - username
   - profilePhotoUrl
   - theme ('light'|'dark')
   - language ('hu'|'en')
   - phoneNumber
   - status ('online'|'offline')
   - totalDeliveries
   - rating
   ```

2. **delivery_orders** tábla
   ```sql
   - id (PK)
   - clientName
   - clientPhone
   - deliveryAddress
   - latitude
   - longitude
   - items (JSON)
   - totalPrice
   - status (státusz)
   - acceptedByCourierId (FK)
   - createdAt
   - estimatedDeliveryTime
   - notes
   - restaurantName
   - restaurantAddress
   ```

## 🔐 Biztonsági Funkciók

- Supabase Row Level Security (RLS)
- Biztonságos jelszókezelés
- Token alapú autentifikáció
- Kijelentkezés lehetőség

## 📊 Teljesítmény Metrikák

- **Szállítások száma**: Futár teljesített szállítások
- **Értékelés**: 1-5 csillag rendszer
- **Online/Offline státusz**: Real-time tracking

## 🎓 Demo Belépés (Teszteléshez)

- **Email**: courier@example.com
- **Jelszó**: password123

## 🚀 Jövőbeli Fejlesztések

- [ ] Google Maps integráció
- [ ] Valós idejű tracking GPS-sel
- [ ] Push notifikációk új rendelésekhez
- [ ] Naptár & ütemezés
- [ ] Offline mód
- [ ] Több nyelvű support
- [ ] Biometrikus autentifikáció

## 📝 Megjegyzések

- A felhasználónevet **a cég generálja**, futár nem módosíthatja
- **Profil kép**: Lehet megváltoztatni (jövőbeli release)
- **Státusz követés**: Valós idejű Supabase subscription-el
- **Rendelés visszavonás**: Csak az elfogadott, de még nem szállított rendeléseket lehet visszavonni

## 📧 Támogatás

Ha kérdésed vagy problémád van, kérjük nyiss egy issue-t vagy fordulj az adminisztrátorhoz.

---

**© 2026 Royal Delivery - Futár App** | Made with ❤️
