"use client";
import { FormEvent, useState } from "react";
import SelectMultiple from "../components/select-multiple";
import { Contractor } from "../types/contractor";
import styles from "./contractor.module.css";

const emptyContractor = {
  name: "",
  telephone: "",
  email: "",
  services: [],
};

const telephoneRegex = /^\+?\d{9,11}$/;
const emailRegex = /^[a-zA-Z0-9_]+@[a-zA-Z]+.com$/;

export default function ContractorForm({
  title,
  defaultContractor,
  onSubmit,
  servicesList,
  isLoading,
}: {
  title: string;
  defaultContractor?: Contractor;
  onSubmit: (fields: Omit<Contractor, "_id">) => Promise<void>;
  servicesList: string[];
  isLoading: boolean;
}) {
  const [contractor, setContractor] = useState<Omit<Contractor, "_id">>(
    defaultContractor ?? emptyContractor,
  );

  const [formDirty, setFormDirty] = useState(false);

  const errors = {
    name: contractor.name.length <= 0,
    telephone: !telephoneRegex.test(contractor.telephone),
    email: !emailRegex.test(contractor.email),
    services: contractor.services.length <= 0,
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).some((v) => v)) {
      setFormDirty(true);
    } else {
      await onSubmit(contractor);
    }
  };

  return (
    <form onSubmit={submit}>
      <span className={styles.title}>{title}</span>
      <div className={styles.input_container}>
        <label className={styles.label}>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className={styles.input_text}
          value={contractor?.name}
          onChange={(e) => setContractor({ ...contractor, name: e.target.value })}
        />
        {errors.name && formDirty && <p className={styles.error_text}>Invalid or empty name</p>}
      </div>
      <div className={styles.input_container}>
        <label htmlFor="telephone" className={styles.label}>
          Telephone
        </label>
        <input
          type="tel"
          name="telephone"
          placeholder="+6155555555"
          className={styles.input_text}
          value={contractor?.telephone}
          onChange={(e) => setContractor({ ...contractor, telephone: e.target.value })}
        />
        {errors.telephone && formDirty && (
          <p className={styles.error_text}>Invalid or empty telephone</p>
        )}
      </div>
      <div className={styles.input_container}>
        <label htmlFor="email" className={styles.label}>
          e-mail
        </label>
        <input
          name="email"
          placeholder="name@domain.com"
          className={styles.input_text}
          value={contractor?.email}
          onChange={(e) => setContractor({ ...contractor, email: e.target.value })}
        />
        {errors.email && formDirty && <p className={styles.error_text}>Invalid or empty email</p>}
      </div>
      <SelectMultiple
        options={servicesList.map((s) => ({ id: s, text: s }))}
        initialValue={[]}
        title="Select the services"
        value={contractor.services.map((s) => ({ id: s, text: s }))}
        onChange={(v) => setContractor({ ...contractor, services: v })}
      />
      {errors.services && formDirty && (
        <p className={styles.error_text}>Select at least 1 service</p>
      )}
      <button className={styles.submit_button}>
        {isLoading && <span className={styles.loader} />}
        {!isLoading && <p>Submit</p>}
      </button>
    </form>
  );
}
