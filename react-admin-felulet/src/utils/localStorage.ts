export function loadFromLocalStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);

    if (!stored) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }

    return JSON.parse(stored) as T;
  } catch (error) {
    console.error(`Hiba a localStorage olvasásakor (${key}):`, error);
    return fallback;
  }
}

export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Hiba a localStorage írásakor (${key}):`, error);
  }
}