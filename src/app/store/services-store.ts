"use client";
import { useEffect, useState } from "react";
import { API_URL } from "../types/constrants";

async function getServices() {
  const add = await fetch(`${API_URL}/services`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const content = await add.json();
  try {
    return content.map((c: { service: string; _id: string }) => c.service) as string[];
  } catch (e) {
    return [];
  }
}

export function useServicesStore() {
  const [services, setServices] = useState<string[]>([]);

  useEffect(() => {
    getServices().then((res) => {
      setServices(res);
    });
  }, []);

  return {
    services,
  };
}
