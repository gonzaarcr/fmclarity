"use client";

import { FormEvent, useState } from "react";
import { Settings } from "../types/settings";
import styles from "./config-api.module.css";
import { API_URL } from "../types/constrants";

export default function ConfigApiForm({
  onSubmit,
}: {
  onSubmit: (settings: Settings) => Promise<void>;
}) {
  const [url, setUrl] = useState(API_URL);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit({ src: "remote", url });
  };

  const setLocal = async () => {
    await onSubmit({ src: "local" });
  };

  return (
    <form onSubmit={submit} className={styles.form_container}>
      <input
        type="text"
        id="url"
        className={styles.input}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://www.crudcrud.com/api/40ff0fa6100e471fb3ba417b67520513"
      />
      <button type="submit" className={styles.button}>
        Set Api
      </button>
      <br />
      <button onClick={setLocal} type="button" className={styles.button}>
        Use local
      </button>
    </form>
  );
}
