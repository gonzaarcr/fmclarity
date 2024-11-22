"use client";
import { useEffect, useState } from "react";
import { useContractorsStore } from "@/app/store/contractors-store";
import { Contractor } from "@/app/types/contractor";
import Link from "next/link";
import styles from "./page.module.css";

export default function ContractorSummary({ params }: { params: Promise<{ id: string }> }) {
  const { getContractor } = useContractorsStore();
  const [contractor, setContractor] = useState<Contractor>();
  const [isLoadingContractor, setIsLoadingContractor] = useState(true);

  useEffect(() => {
    params.then(({ id }) => {
      getContractor(id).then((res) => {
        setIsLoadingContractor(false);
        if (res) {
          setContractor(res);
        }
      });
    });
  }, []);

  if (isLoadingContractor) return <p>Loading...</p>;
  if (!contractor) return <p>No data</p>;

  return (
    <div>
      <span className={styles.title}>Contractor summary</span>
      <div className={styles.field_container}>
        <p className={styles.label}>Name</p>
        <p className={styles.text}>{contractor.name}</p>
      </div>
      <div className={styles.field_container}>
        <p className={styles.label}>Services</p>
        <p className={styles.text}>{contractor.services.join(", ")}</p>
      </div>
      <div className={styles.field_container}>
        <Link href={`/contractors/${contractor._id}`} className={styles.submit_button}>
          View all details
        </Link>
      </div>
    </div>
  );
}
