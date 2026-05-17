import { useState } from "react";

const MOCK_ORDERS = [
  {
    id: "RD-1042",
    restaurant: "Arany Sárkány Étterem",
    restaurantAddress: "Szeged, Kossuth Lajos sgt. 12.",
    deliveryAddress: "Szeged, Tisza Lajos krt. 57. 3/4",
    items: ["Gulyásleves", "Rántott csirke filé", "Francia saláta"],
    total: 4850,
    distance: "2.3 km",
    estimatedTime: "18 perc",
    status: "ready",
    urgent: false,
  },
  {
    id: "RD-1043",
    restaurant: "Pizza Palazzo",
    restaurantAddress: "Szeged, Dugonics tér 8.",
    deliveryAddress: "Szeged, Petőfi S. sgt. 32. fszt. 2.",
    items: ["Margherita pizza (nagy)", "Cola 0.5L x2"],
    total: 3200,
    distance: "1.8 km",
    estimatedTime: "12 perc",
    status: "ready",
    urgent: true,
  },
  {
    id: "RD-1044",
    restaurant: "Sushi Garden",
    restaurantAddress: "Szeged, Mars tér 5.",
    deliveryAddress: "Szeged, Maros utca 18. 2/8",
    items: ["Dragon Roll (8 db)", "Miso Leves", "Edamame"],
    total: 6400,
    distance: "3.1 km",
    estimatedTime: "22 perc",
    status: "preparing",
    urgent: false,
  },
  {
    id: "RD-1045",
    restaurant: "Burger Bástya",
    restaurantAddress: "Szeged, Széchenyi tér 2.",
    deliveryAddress: "Szeged, Osztrovszky utca 5. 1/3",
    items: ["BBQ Bacon Burger", "Sült krumpli (nagy)", "Limonádé"],
    total: 2950,
    distance: "1.2 km",
    estimatedTime: "9 perc",
    status: "ready",
    urgent: false,
  },
];

const AVATARS = ["🧑‍💼", "👨‍🦱", "👩‍🦱", "🧔", "👩‍🦰", "👨‍🦳", "👩‍🦳", "👨‍🦰"];

const T = {
  hu: {
    login: "Bejelentkezés", username: "Felhasználónév", password: "Jelszó",
    loginBtn: "Belépés", demoNote: "Demo: futár / 1234",
    orders: "Rendelések", delivery: "Kiszállítás", settings: "Beállítások",
    available: "Elérhető rendelések", accept: "Elfogadás",
    restaurant: "Étterem", deliverTo: "Kiszállítási cím", items: "Tételek",
    total: "Összeg", distance: "Távolság", eta: "Várható idő",
    urgent: "Sürgős", preparing: "Készül", ready: "Felvehető",
    noOrders: "Nincs elérhető rendelés",
    noActive: "Nincs aktív rendelés",
    step0: "Rendelés elfogadva", step1: "Étteremhez megyek", step2: "Kiszállítás folyamatban", step3: "Kézbesítve",
    btnStep0: "Úton az étteremhez →", btnStep1: "Felvettem a csomagot →", btnStep2: "✓ Kézbesítve!",
    success: "Sikeres kiszállítás!", successSub: "jutalék jóváírva",
    profilePic: "Profilkép", theme: "Téma", language: "Nyelv",
    dark: "Sötét", light: "Világos", logout: "Kijelentkezés",
    courierId: "Futár azonosító", region: "Szeged régió",
    todayEarnings: "Mai kereset", deliveries: "kiszállítás",
    hasActive: "Aktív rendelés folyamatban", stillPreparing: "Még készül az étterem",
    loginError: "Hibás adatok! Próbáld: futár / 1234",
  },
  en: {
    login: "Login", username: "Username", password: "Password",
    loginBtn: "Sign In", demoNote: "Demo: futár / 1234",
    orders: "Orders", delivery: "Delivery", settings: "Settings",
    available: "Available Orders", accept: "Accept",
    restaurant: "Restaurant", deliverTo: "Deliver to", items: "Items",
    total: "Total", distance: "Distance", eta: "Est. Time",
    urgent: "Urgent", preparing: "Preparing", ready: "Ready",
    noOrders: "No orders available",
    noActive: "No active delivery",
    step0: "Order accepted", step1: "Heading to restaurant", step2: "Delivering", step3: "Delivered",
    btnStep0: "Heading to restaurant →", btnStep1: "Package picked up →", btnStep2: "✓ Delivered!",
    success: "Delivery complete!", successSub: "commission credited",
    profilePic: "Profile Picture", theme: "Theme", language: "Language",
    dark: "Dark", light: "Light", logout: "Logout",
    courierId: "Courier ID", region: "Szeged region",
    todayEarnings: "Today's earnings", deliveries: "deliveries",
    hasActive: "Active delivery in progress", stillPreparing: "Restaurant still preparing",
    loginError: "Wrong credentials! Try: futár / 1234",
  },
};

const DARK = {
  bg: "#0c0c0b", surface: "#141413", card: "#1a1a18", border: "#252522",
  text: "#ede8de", muted: "#6b6860", accent: "#f0a500", accentBg: "#1c1500",
  green: "#22c55e", greenBg: "#0a1f0e", red: "#ef4444", redBg: "#1f0a0a",
  blue: "#60a5fa", blueBg: "#0a111f",
};

const LIGHT = {
  bg: "#f7f5ef", surface: "#ffffff", card: "#ffffff", border: "#e4e0d6",
  text: "#1a1914", muted: "#7a7568", accent: "#c27d00", accentBg: "#fef8e7",
  green: "#16a34a", greenBg: "#f0fdf4", red: "#dc2626", redBg: "#fef2f2",
  blue: "#2563eb", blueBg: "#eff6ff",
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState("orders");
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [activeOrder, setActiveOrder] = useState(null);
  const [deliveryStep, setDeliveryStep] = useState(0);
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("hu");
  const [avatar, setAvatar] = useState("🧑‍💼");
  const [earnings, setEarnings] = useState(3200);
  const [count, setCount] = useState(4);
  const [successAnim, setSuccessAnim] = useState(false);

  const t = T[lang];
  const c = theme === "dark" ? DARK : LIGHT;
  const isDark = theme === "dark";

  const acceptOrder = (order) => {
    setOrders(prev => prev.filter(o => o.id !== order.id));
    setActiveOrder({ ...order });
    setDeliveryStep(0);
    setTab("delivery");
  };

  const nextStep = () => {
    if (deliveryStep >= 2) {
      setDeliveryStep(3);
      setSuccessAnim(true);
      const bonus = Math.round(activeOrder.total * 0.1);
      setTimeout(() => {
        setEarnings(prev => prev + bonus);
        setCount(prev => prev + 1);
        setActiveOrder(null);
        setDeliveryStep(0);
        setSuccessAnim(false);
        setTab("orders");
      }, 2600);
    } else {
      setDeliveryStep(prev => prev + 1);
    }
  };

  if (!loggedIn) {
    return <LoginScreen t={t} c={c} isDark={isDark} onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: c.bg, color: c.text, fontFamily: "'DM Mono', 'Courier New', monospace", display: "flex", flexDirection: "column", maxWidth: 500, margin: "0 auto", position: "relative" }}>
      <Header c={c} avatar={avatar} t={t} count={count} earnings={earnings} />

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 100px" }}>
        {tab === "orders" && <OrdersView t={t} c={c} orders={orders} onAccept={acceptOrder} activeOrder={activeOrder} />}
        {tab === "delivery" && <ActiveDeliveryView t={t} c={c} activeOrder={activeOrder} deliveryStep={deliveryStep} onNext={nextStep} successAnim={successAnim} />}
        {tab === "settings" && <SettingsView t={t} c={c} isDark={isDark} theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} avatar={avatar} setAvatar={setAvatar} onLogout={() => setLoggedIn(false)} />}
      </div>

      <BottomNav tab={tab} setTab={setTab} t={t} c={c} hasActive={!!activeOrder} />
    </div>
  );
}

function Header({ c, avatar, t, count, earnings }) {
  return (
    <div style={{ background: c.surface, borderBottom: `1px solid ${c.border}`, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ fontSize: 32, lineHeight: 1 }}>{avatar}</div>
        <div>
          <div style={{ fontSize: 11, color: c.muted, letterSpacing: 0.5 }}>futár_001</div>
          <div style={{ fontSize: 12, color: c.accent, fontWeight: 700 }}>
            ★ {count} {t.deliveries} &nbsp;·&nbsp; {earnings.toLocaleString()} Ft
          </div>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 18, fontWeight: 900, color: c.accent, letterSpacing: 3 }}>ROYAL</div>
        <div style={{ fontSize: 9, color: c.muted, letterSpacing: 2 }}>DELIVERY</div>
      </div>
    </div>
  );
}

function BottomNav({ tab, setTab, t, c, hasActive }) {
  const items = [
    { key: "orders", icon: "📦", label: t.orders },
    { key: "delivery", icon: "🚴", label: t.delivery },
    { key: "settings", icon: "⚙️", label: t.settings },
  ];
  return (
    <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 500, background: c.surface, borderTop: `1px solid ${c.border}`, display: "flex", zIndex: 20 }}>
      {items.map(item => (
        <button key={item.key} onClick={() => setTab(item.key)} style={{
          flex: 1, padding: "10px 0 12px", background: "none", border: "none", cursor: "pointer",
          borderTop: tab === item.key ? `2px solid ${c.accent}` : "2px solid transparent",
          color: tab === item.key ? c.accent : c.muted,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
        }}>
          <div style={{ position: "relative" }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            {item.key === "delivery" && hasActive && (
              <span style={{ position: "absolute", top: -2, right: -4, width: 8, height: 8, borderRadius: "50%", background: c.green, border: `2px solid ${c.surface}` }} />
            )}
          </div>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1 }}>{item.label.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}

function LoginScreen({ t, c, isDark, onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);

  const handleLogin = () => {
    if (user === "futár" && pass === "1234") {
      onLogin();
    } else {
      setError(t.loginError);
      setShaking(true);
      setTimeout(() => { setError(""); setShaking(false); }, 2500);
    }
  };

  const inputStyle = {
    width: "100%", background: c.card, border: `1px solid ${c.border}`, borderRadius: 8,
    padding: "11px 14px", color: c.text, fontSize: 14, fontFamily: "inherit",
    boxSizing: "border-box", outline: "none",
  };
  const labelStyle = { fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: c.muted, display: "block", marginBottom: 6 };

  return (
    <div style={{ minHeight: "100vh", background: c.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'DM Mono', 'Courier New', monospace" }}>
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 8 }}>👑</div>
        <div style={{ fontSize: 30, fontWeight: 900, color: c.accent, letterSpacing: 5 }}>ROYAL</div>
        <div style={{ fontSize: 11, color: c.muted, letterSpacing: 3, marginTop: 2 }}>DELIVERY — FUTÁR PORTÁL</div>
      </div>

      <div style={{
        width: "100%", maxWidth: 360, background: c.surface, borderRadius: 16,
        border: `1px solid ${c.border}`, padding: 28,
        transform: shaking ? "translateX(6px)" : "none",
        transition: shaking ? "transform 0.1s" : "transform 0.2s",
      }}>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>{t.username.toUpperCase()}</label>
          <input value={user} onChange={e => setUser(e.target.value)} style={inputStyle} autoComplete="off" />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>{t.password.toUpperCase()}</label>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} style={inputStyle} />
        </div>

        {error && (
          <div style={{ background: c.redBg, border: `1px solid ${c.red}`, borderRadius: 8, padding: "9px 12px", fontSize: 12, color: c.red, marginBottom: 16 }}>
            {error}
          </div>
        )}

        <button onClick={handleLogin} style={{ width: "100%", background: c.accent, border: "none", borderRadius: 8, padding: "13px", color: "#0a0a09", fontSize: 13, fontWeight: 900, letterSpacing: 2, cursor: "pointer", fontFamily: "inherit" }}>
          {t.loginBtn.toUpperCase()} →
        </button>
        <div style={{ marginTop: 14, fontSize: 11, color: c.muted, textAlign: "center" }}>{t.demoNote}</div>
      </div>
    </div>
  );
}

function OrdersView({ t, c, orders, onAccept, activeOrder }) {
  return (
    <div>
      <SectionLabel label={`${t.available} (${orders.length})`} c={c} />

      {activeOrder && (
        <div style={{ background: c.greenBg, border: `1px solid ${c.green}`, borderRadius: 10, padding: "12px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>🚴</span>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: c.green }}>AKTÍV KISZÁLLÍTÁS</div>
            <div style={{ fontSize: 12, color: c.text }}>{activeOrder.id} — {activeOrder.restaurant}</div>
          </div>
        </div>
      )}

      {orders.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: c.muted }}>
          <div style={{ fontSize: 44, marginBottom: 14 }}>📭</div>
          <div style={{ fontSize: 13 }}>{t.noOrders}</div>
        </div>
      )}

      {orders.map(order => (
        <OrderCard key={order.id} order={order} t={t} c={c} onAccept={onAccept} hasActive={!!activeOrder} />
      ))}
    </div>
  );
}

function OrderCard({ order, t, c, onAccept, hasActive }) {
  const [expanded, setExpanded] = useState(false);

  const canAccept = !hasActive && order.status === "ready";
  const btnLabel = hasActive ? t.hasActive : order.status === "preparing" ? t.stillPreparing : `✓ ${t.accept}`;
  const btnBg = canAccept ? c.accent : c.border;
  const btnColor = canAccept ? "#0a0a09" : c.muted;

  return (
    <div style={{ background: c.card, border: `1px solid ${order.urgent ? c.red : c.border}`, borderRadius: 12, marginBottom: 12, overflow: "hidden", transition: "border-color 0.2s" }}>
      <div onClick={() => setExpanded(!expanded)} style={{ padding: "14px 16px", cursor: "pointer", userSelect: "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 900, color: c.accent, letterSpacing: 1 }}>#{order.id}</span>
              {order.urgent && <Badge label={t.urgent} bg={c.red} color="#fff" />}
              <Badge
                label={order.status === "ready" ? t.ready : t.preparing}
                bg={order.status === "ready" ? c.green : c.accentBg}
                color={order.status === "ready" ? "#fff" : c.accent}
                border={order.status !== "ready" ? c.accent : undefined}
              />
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.text }}>{order.restaurant}</div>
            <div style={{ fontSize: 11, color: c.muted, marginTop: 2 }}>{order.restaurantAddress}</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 900, color: c.text }}>{order.total.toLocaleString()} Ft</div>
            <div style={{ fontSize: 11, color: c.muted }}>{order.distance}</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", marginTop: 10, paddingTop: 10, borderTop: `1px dashed ${c.border}`, gap: 4 }}>
          <span style={{ fontSize: 12, color: c.muted, flex: 1 }}>📍 {order.deliveryAddress.length > 32 ? order.deliveryAddress.slice(0, 32) + "…" : order.deliveryAddress}</span>
          <span style={{ fontSize: 11, color: c.accent, fontWeight: 700, flexShrink: 0 }}>⏱ {order.estimatedTime}</span>
          <span style={{ fontSize: 12, color: c.muted, marginLeft: 6 }}>{expanded ? "▲" : "▼"}</span>
        </div>
      </div>

      {expanded && (
        <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${c.border}` }}>
          <div style={{ paddingTop: 12, marginBottom: 14 }}>
            <SectionLabel label={t.items} c={c} small />
            {order.items.map((item, i) => (
              <div key={i} style={{ fontSize: 12, color: c.text, padding: "4px 0", borderBottom: `1px dashed ${c.border}` }}>▪ {item}</div>
            ))}
          </div>

          <div style={{ background: c.bg, borderRadius: 8, padding: "10px 12px", marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: c.muted, marginBottom: 4 }}>{t.deliverTo.toUpperCase()}</div>
            <div style={{ fontSize: 13, color: c.text }}>📍 {order.deliveryAddress}</div>
          </div>

          <button
            onClick={() => canAccept && onAccept(order)}
            disabled={!canAccept}
            style={{ width: "100%", padding: "12px", borderRadius: 8, border: "none", cursor: canAccept ? "pointer" : "not-allowed", background: btnBg, color: btnColor, fontWeight: 900, fontSize: 12, letterSpacing: 1.5, fontFamily: "inherit", transition: "all 0.15s" }}
          >
            {btnLabel.toUpperCase()}
          </button>
        </div>
      )}
    </div>
  );
}

function ActiveDeliveryView({ t, c, activeOrder, deliveryStep, onNext, successAnim }) {
  if (successAnim) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, textAlign: "center", padding: 32 }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>🏁</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: c.green, letterSpacing: 2 }}>{t.success.toUpperCase()}</div>
        <div style={{ fontSize: 13, color: c.muted, marginTop: 8 }}>+{Math.round((activeOrder?.total || 0) * 0.1)} Ft {t.successSub}</div>
      </div>
    );
  }

  if (!activeOrder) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, color: c.muted }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>🚴</div>
        <div style={{ fontSize: 13 }}>{t.noActive}</div>
      </div>
    );
  }

  const steps = [
    { label: t.step0, done: true },
    { label: t.step1, done: deliveryStep >= 1 },
    { label: t.step2, done: deliveryStep >= 2 },
    { label: t.step3, done: deliveryStep >= 3 },
  ];

  const stepBtns = [t.btnStep0, t.btnStep1, t.btnStep2];
  const btnColors = [c.blue, c.accent, c.green];

  return (
    <div>
      <SectionLabel label="AKTÍV KISZÁLLÍTÁS" c={c} />

      {/* Order header */}
      <div style={{ background: c.accentBg, border: `1px solid ${c.accent}`, borderRadius: 12, padding: "14px 16px", marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 900, color: c.accent, letterSpacing: 1, marginBottom: 4 }}>#{activeOrder.id}</div>
        <div style={{ fontSize: 18, fontWeight: 900, color: c.text }}>{activeOrder.restaurant}</div>
        <div style={{ fontSize: 12, color: c.muted, marginTop: 2 }}>📍 {activeOrder.restaurantAddress}</div>
      </div>

      {/* Progress steps */}
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: "4px 16px", marginBottom: 14 }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < steps.length - 1 ? `1px dashed ${c.border}` : "none" }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: step.done ? c.accent : c.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: step.done ? "#0a0a09" : c.muted, flexShrink: 0, transition: "background 0.3s" }}>
              {step.done ? "✓" : i + 1}
            </div>
            <span style={{ fontSize: 13, color: step.done ? c.text : c.muted, fontWeight: step.done ? 700 : 400, transition: "color 0.3s" }}>{step.label}</span>
            {step.done && i === deliveryStep && i < 3 && (
              <span style={{ fontSize: 9, background: c.accent, color: "#0a0a09", padding: "2px 6px", borderRadius: 4, fontWeight: 900, marginLeft: "auto", letterSpacing: 1 }}>MOST</span>
            )}
          </div>
        ))}
      </div>

      {/* Delivery details */}
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: 16, marginBottom: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <SectionLabel label={t.deliverTo} c={c} small />
          <div style={{ fontSize: 14, color: c.text, fontWeight: 700 }}>📍 {activeOrder.deliveryAddress}</div>
          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            <div style={{ fontSize: 11, color: c.muted }}>⏱ {activeOrder.estimatedTime}</div>
            <div style={{ fontSize: 11, color: c.muted }}>📏 {activeOrder.distance}</div>
          </div>
        </div>

        <div style={{ borderTop: `1px dashed ${c.border}`, paddingTop: 12 }}>
          <SectionLabel label={t.items} c={c} small />
          {activeOrder.items.map((item, i) => (
            <div key={i} style={{ fontSize: 12, color: c.text, padding: "3px 0" }}>▪ {item}</div>
          ))}
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px dashed ${c.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, color: c.muted }}>{t.total}</span>
            <span style={{ fontSize: 16, fontWeight: 900, color: c.accent }}>{activeOrder.total.toLocaleString()} Ft</span>
          </div>
        </div>
      </div>

      {/* Action button */}
      {deliveryStep < 3 && (
        <button onClick={onNext} style={{ width: "100%", padding: "16px", borderRadius: 12, border: "none", background: btnColors[deliveryStep], color: "#fff", fontWeight: 900, fontSize: 14, letterSpacing: 1.5, cursor: "pointer", fontFamily: "inherit" }}>
          {stepBtns[deliveryStep].toUpperCase()}
        </button>
      )}
    </div>
  );
}

function SettingsView({ t, c, isDark, theme, setTheme, lang, setLang, avatar, setAvatar, onLogout }) {
  return (
    <div>
      <SectionLabel label={t.settings} c={c} />

      {/* Profile picture */}
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
        <SectionLabel label={t.profilePic} c={c} small />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
          {AVATARS.map(a => (
            <button key={a} onClick={() => setAvatar(a)} style={{ fontSize: 26, width: 50, height: 50, background: a === avatar ? c.accentBg : c.bg, border: a === avatar ? `2px solid ${c.accent}` : `1px solid ${c.border}`, borderRadius: 12, cursor: "pointer", transition: "all 0.15s" }}>
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Theme */}
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: 16, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: c.muted, marginBottom: 2 }}>{t.theme.toUpperCase()}</div>
          <div style={{ fontSize: 13, color: c.text }}>{isDark ? t.dark : t.light}</div>
        </div>
        <button onClick={() => setTheme(isDark ? "light" : "dark")} style={{ background: c.accent, border: "none", borderRadius: 8, padding: "8px 14px", color: "#0a0a09", fontWeight: 900, fontSize: 11, letterSpacing: 1, cursor: "pointer", fontFamily: "inherit" }}>
          {isDark ? `☀ ${t.light}` : `◗ ${t.dark}`}
        </button>
      </div>

      {/* Language */}
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: 16, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: c.muted, marginBottom: 2 }}>{t.language.toUpperCase()}</div>
          <div style={{ fontSize: 13, color: c.text }}>{lang === "hu" ? "Magyar 🇭🇺" : "English 🇬🇧"}</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["hu", "en"].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{ background: lang === l ? c.accent : c.bg, border: `1px solid ${lang === l ? c.accent : c.border}`, borderRadius: 6, padding: "7px 14px", color: lang === l ? "#0a0a09" : c.text, fontWeight: 700, fontSize: 11, letterSpacing: 1, cursor: "pointer", fontFamily: "inherit" }}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Courier card */}
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: c.muted, marginBottom: 8 }}>{t.courierId.toUpperCase()}</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: c.accent, letterSpacing: 3, fontFamily: "monospace" }}>futár_001</div>
        <div style={{ fontSize: 11, color: c.muted, marginTop: 4 }}>Royal Delivery Kft. — {t.region}</div>
      </div>

      {/* Logout */}
      <button onClick={onLogout} style={{ width: "100%", padding: "14px", borderRadius: 12, border: `1px solid ${c.red}`, background: "transparent", color: c.red, fontWeight: 900, fontSize: 12, letterSpacing: 2, cursor: "pointer", fontFamily: "inherit" }}>
        {t.logout.toUpperCase()} →
      </button>
    </div>
  );
}

function SectionLabel({ label, c, small }) {
  return (
    <div style={{ fontSize: small ? 10 : 11, fontWeight: 700, letterSpacing: 1.5, color: c.muted, marginBottom: small ? 8 : 14, textTransform: "uppercase" }}>
      {label}
    </div>
  );
}

function Badge({ label, bg, color, border }) {
  return (
    <span style={{ fontSize: 9, background: bg, color, padding: "2px 7px", borderRadius: 4, fontWeight: 700, letterSpacing: 0.5, border: border ? `1px solid ${border}` : "none" }}>
      {label.toUpperCase()}
    </span>
  );
}