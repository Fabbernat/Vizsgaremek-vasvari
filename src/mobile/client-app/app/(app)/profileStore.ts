// client-app/app/profileStore.ts
import { useState, useEffect } from "react";

// ── Globális state (modul-szintű, navigáción átél) ────────────────────────────
let globalUsername = "Kiss Anna";
let globalAvatarUri = "";
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

export function setGlobalUsername(name: string) {
  globalUsername = name;
  notify();
}

export function setGlobalAvatarUri(uri: string) {
  globalAvatarUri = uri;
  notify();
}

// ── Hook: bármely komponensből használható ────────────────────────────────────
export function useProfileStore() {
  const [username, setUsername] = useState(globalUsername);
  const [avatarUri, setAvatarUri] = useState(globalAvatarUri);

  useEffect(() => {
    const sync = () => {
      setUsername(globalUsername);
      setAvatarUri(globalAvatarUri);
    };
    listeners.add(sync);
    return () => { listeners.delete(sync); };
  }, []);

  return { username, avatarUri };
}