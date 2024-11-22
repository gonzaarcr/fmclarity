"use client";

import { useEffect, useState } from "react";
import { Contractor } from "../types/contractor";
import { API_URL } from "../types/constrants";
import { Keys, useLocalStorage } from "../hooks/use-local-storage";

async function getContractors() {
  const res = await fetch(`${API_URL}/contractors`);
  const json = await res.json();
  return json as Contractor[];
}

async function postContractor(formData: Omit<Contractor, "_id">) {
  const add = await fetch(`${API_URL}/contractors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const content = (await add.json()) as Contractor;
  return content;
}

async function putContractor(contractor: Contractor) {
  const add = await fetch(`${API_URL}/contractors/${contractor._id}`, {
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

  useEffect(() => {
    loadContractors();
  }, []);

  async function loadContractors() {
    setLoading(true);
    getContractors().then((res) => {
      setContractors(res);
      setLoading(false);
    });
  }

  async function createContractor(formData: Omit<Contractor, "_id">) {
    setLoading(true);
    try {
      const newContractor = await postContractor(formData);
      setContractors([...contractors, newContractor]);
      return newContractor;
    } catch (e) {
      setLoading(false);
    }
  }

  async function editContractor(contractor: Contractor) {
    setLoading(true);
    try {
      await putContractor(contractor);
    } catch (e) {
      setLoading(false);
    }
    await loadContractors();
  }

  async function getContractor(id: string) {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/contractors/${id}`);
      setLoading(false);
      if (res.status === 200) {
        const json = await res.json();
        return json as Contractor;
      } else {
        return null;
      }
    } catch (e) {
      setLoading(false);
    }
    return null;
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
