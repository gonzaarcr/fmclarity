"use client";

import { useRouter } from "next/navigation";
import { useSettinsStore } from "./store/settings-store";
import { Settings } from "./types/settings";
import ConfigApiForm from "./forms/config-api";

export default function Home() {
  const router = useRouter();

  const { setSettings } = useSettinsStore();

  const onSubmit = async (settings: Settings) => {
    setSettings(settings);
    router.push("/contractors");
  };

  return (
    <div>
      <ConfigApiForm onSubmit={onSubmit} />
    </div>
  );
}
