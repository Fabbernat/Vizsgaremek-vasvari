import { useState, useEffect } from "react";

let globalIsLoggedIn = false;
let listeners: ((v: boolean) => void)[] = [];

export function setGlobalIsLoggedIn(value: boolean) {
  globalIsLoggedIn = value;
  listeners.forEach((l) => l(value));
}

export function useGlobalAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(globalIsLoggedIn);

  useEffect(() => {
    listeners.push(setIsLoggedIn);

    return () => {
      listeners = listeners.filter((l) => l !== setIsLoggedIn);
    };
  }, []);

  return { isLoggedIn, setIsLoggedIn: setGlobalIsLoggedIn };
}

let globalUsername = "Kiss Anna";

export function getGlobalUsername(): string {
  return globalUsername;
}

export function setGlobalUsername(name: string) {
  globalUsername = name;
}
