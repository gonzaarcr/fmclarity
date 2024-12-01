import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NotificationEvent } from "../types/notification-event";
import { Settings } from "../types/settings";

enum Keys {
  NOTIFICATION_EVENTS = "notification_events",
  SETTINGS = "settings",
}

type HookReturn<T> = [T, Dispatch<SetStateAction<T>>];

function useLocalStorage(k: Keys.SETTINGS, initialValue?: Settings): HookReturn<Settings>;
function useLocalStorage(
  k: Keys.NOTIFICATION_EVENTS,
  initialValue: NotificationEvent[],
): HookReturn<NotificationEvent[]>;
function useLocalStorage(k: string, initialValue?: any): HookReturn<any> {
  const stored = localStorage.getItem(k);
  const storedValue = stored ? JSON.parse(stored) : initialValue;
  const [value, setValue] = useState(storedValue);

  useEffect(() => {
    if (value !== null && value !== undefined) {
      localStorage.setItem(k, JSON.stringify(value));
    }
    if (value === null) {
      localStorage.removeItem(k);
    }
  }, [k, value]);

  return [value, setValue];
}

export { useLocalStorage, Keys };
