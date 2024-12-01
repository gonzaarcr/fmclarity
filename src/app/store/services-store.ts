"use client";
import { useEffect, useState } from "react";
import { useSettinsStore } from "./settings-store";
import { Settings } from "../types/settings";
import { fetch_middleware } from "../libs/fetch";

async function getServices(settings: Settings) {
  const add = await fetch_middleware(settings, `/services`, {
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
  const settings = useSettinsStore();

  useEffect(() => {
    getServices(settings.settings).then((res) => {
      setServices(["Default service", ...res]);
    });
  }, []);

  return {
    services,
  };
}
