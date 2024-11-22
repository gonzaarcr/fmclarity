import { Dispatch, useEffect, useState } from "react";
import { NotificationEvent } from "../types/notification-event";

enum Keys {
  NOTIFICATION_EVENTS = "notification_events",
}

type HookReturn<T> = [T, Dispatch<(v: T) => void>];

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
