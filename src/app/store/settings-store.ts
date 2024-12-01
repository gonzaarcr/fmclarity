import { Keys, useLocalStorage } from "../hooks/use-local-storage";

export function useSettinsStore() {
  const [settings, setSettings] = useLocalStorage(Keys.SETTINGS);

  return {
    settings,
    setSettings,
  };
}
