import { useState } from "react";

let globalIsLoggedIn = false;
let listeners: ((v: boolean) => void)[] = [];

export function setGlobalIsLoggedIn(value: boolean) {
  globalIsLoggedIn = value;
  listeners.forEach((l) => l(value));
}

export function useGlobalAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(globalIsLoggedIn);

  const set = (v: boolean) => {
    setGlobalIsLoggedIn(v);
  };

  if (!listeners.includes(setIsLoggedIn)) {
    listeners.push(setIsLoggedIn);
  }

  return { isLoggedIn, setIsLoggedIn: set };
}