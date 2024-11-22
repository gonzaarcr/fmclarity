"use client";
import { useEffect, useState } from "react";
import Table, { ColumnType } from "../components/table";
import { Contractor } from "../types/contractor";
import styles from "./page.module.css";
import Link from "next/link";
import { useContractorsStore } from "../store/contractors-store";
import ToastNotification from "../components/toast-notification";
import { NotificationEvent } from "../types/notification-event";

const columns: ColumnType<Contractor>[] = [
  {
    field: "id",
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
  const { contractors, isLoading, notificationEvents, setNotificationEvents } =
    useContractorsStore();
  const [notifications, setNotifications] = useState<NotificationEvent[]>([]);

  useEffect(() => {
    const contractorAddedNot = notificationEvents.filter(
      (n) => n.type === "CONTRACTOR_ADDED_SUCCESS",
    );
    if (contractorAddedNot.length === 0) {
      return;
    }
    setNotifications(contractorAddedNot);
    setNotificationEvents((p) => [...p.filter((n) => n.type !== "CONTRACTOR_ADDED_SUCCESS")]);
  }, [notificationEvents]);

  if (isLoading) return <p>Loading...</p>;
  if (!contractors) return <p>No data</p>;

  const closeNotification = (id: string) => {
    setNotifications((p) => p.filter((n) => n.id !== id));
  };

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
      <div className={styles.notification_container}>
        {notifications.map((n) => (
          <ToastNotification
            key={n.id}
            text={"Contractor added successfully"}
            onClose={() => closeNotification(n.id)}
          />
        ))}
      </div>
    </div>
  );
}
