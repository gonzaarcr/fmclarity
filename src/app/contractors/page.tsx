"use client";
import Table, { ColumnType } from "../components/table";
import { Contractor } from "../types/contractor";
import styles from "./page.module.css";
import Link from "next/link";
import { useContractorsStore } from "../store/contractors-store";

const columns: ColumnType<Contractor>[] = [
  {
    field: "_id",
    valueGetter: (c: Contractor) => c["_id"],
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
        getKey={(c: Contractor) => c._id}
        columns={columns}
        action={(e) => (
          <Link href={`/contractors/${e._id}`} className={styles.edit_text}>
            Edit
          </Link>
        )}
      />
    </div>
  );
}
