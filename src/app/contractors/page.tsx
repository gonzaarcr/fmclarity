"use client";
import Table, { ColumnType } from "../components/table";
import { Contractor } from "../types/contractor";
import styles from "./page.module.css";
import Link from "next/link";

const mock: Contractor[] = [
  {
    email: "a@server.com",
    name: "AAAAA BBBBB",
    services: ["Service A", "Service B"],
    telephone: "+6111111111",
    ubn: "UBN1",
  },
  {
    email: "b@server.com",
    name: "CCCCC BBBBB",
    services: ["Service C", "Service D"],
    telephone: "+5111111111",
    ubn: "UBN2",
  },
];

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
  return (
    <div className={styles.page}>
      <Table
        elements={mock}
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
