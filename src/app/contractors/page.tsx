"use client";
import { useEffect, useState } from "react";
import Table, { ColumnType } from "../components/table";
import { API_URL } from "../types/constrants";
import { Contractor } from "../types/contractor";
import styles from "./page.module.css";
import Link from "next/link";
import { useContractorsStore } from "../store/contractors-store";

const columns: ColumnType<Contractor>[] = [
  {
    field: "ubn",
    valueGetter: (c: Contractor) => c["ubn"],
  },
  {
    field: "name",
    valueGetter: (c: Contractor) => c["name"],
  },
  {
    field: "email",
    valueGetter: (c: Contractor) => c["email"],
  },
  {
    field: "telephone",
    valueGetter: (c: Contractor) => c["telephone"],
  },
  {
    field: "services",
    valueGetter: (c: Contractor) => c.services.join(", "),
  },
];

export default function Contractors() {
  const { contractors, isLoading } = useContractorsStore();

  if (isLoading) return <p>Loading...</p>;
  if (!contractors) return <p>No data</p>;

  return (
    <div className={styles.page}>
      <div className={styles.add_button_container}>
        <Link className={styles.add_button} href={"/contractors/add"}>
          Add
        </Link>
      </div>
      <Table
        elements={contractors}
        getKey={(c: Contractor) => c.ubn}
        columns={columns}
        action={(e) => (
          <Link href={`/contractors/${e.ubn}`} className={styles.edit_text}>
            Edit
          </Link>
        )}
      />
    </div>
  );
}
