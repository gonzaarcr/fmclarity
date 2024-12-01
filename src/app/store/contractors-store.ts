"use client";

import { useEffect, useState } from "react";
import { Contractor } from "../types/contractor";
import { Keys, useLocalStorage } from "../hooks/use-local-storage";
import { useSettinsStore } from "./settings-store";
import { fetch_middleware } from "../libs/fetch";
import { Settings } from "../types/settings";

async function getContractor_(settings: Settings, id: string) {
  try {
    const res = await fetch_middleware(settings, `/contractors/${id}`);
    if (res.status === 200) {
      const json = await res.json();
      return json as Contractor;
    } else {
      return null;
    }
  } catch (e) {}
  return null;
}

async function getContractors(settings: Settings) {
  const res = await fetch_middleware(settings, `/contractors`);
  const json = await res.json();
  return json as Contractor[];
}

async function postContractor(settings: Settings, formData: Omit<Contractor, "_id">) {
  const add = await fetch_middleware(settings, `/contractors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const content = (await add.json()) as Contractor;
  return content;
}

async function putContractor(settings: Settings, contractor: Contractor) {
  const add = await fetch_middleware(settings, `/contractors/${contractor._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...contractor, _id: undefined }),
  });

  await add.json();
}

export function useContractorsStore() {
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [isLoading, setLoading] = useState(true);

  const [notificationEvents, setNotificationEvents] = useLocalStorage(Keys.NOTIFICATION_EVENTS, []);
  const settings = useSettinsStore();

  useEffect(() => {
    loadContractors();
  }, []);

  async function loadContractors() {
    setLoading(true);
    getContractors(settings.settings).then((res) => {
      setContractors(res);
      setLoading(false);
    });
  }

  async function createContractor(formData: Omit<Contractor, "_id">) {
    setLoading(true);
    try {
      const newContractor = await postContractor(settings.settings, formData);
      setContractors([...contractors, newContractor]);
      return newContractor;
    } catch (e) {
      setLoading(false);
    }
  }

  async function editContractor(contractor: Contractor) {
    setLoading(true);
    try {
      await putContractor(settings.settings, contractor);
    } catch (e) {
      setLoading(false);
    }
    await loadContractors();
  }

  async function getContractor(id: string) {
    return await getContractor_(settings.settings, id);
  }

  return {
    contractors,
    createContractor,
    editContractor,
    getContractor,
    notificationEvents,
    setNotificationEvents,
    isLoading,
  };
}
