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

const telephoneRegex = /^\+?\d{10}$/;
const emailRegex = /^[a-zA-Z0-9_]*@[a-zA-Z].com$/;

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
      <span className="font-bold py-2 block text-2xl">{title}</span>
      <div className={styles.input_container}>
        <label className="text-sm font-bold py-2 block">Name</label>
        <input
          type="text"
          name="name"
          className="w-full border-[1px] border-gray-200 p-2 rounded-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={contractor?.name}
          onChange={(e) => setContractor({ ...contractor, name: e.target.value })}
        />
        {errors.name && formDirty && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">Invalid or empty name</p>
        )}
      </div>
      <div className={styles.input_container}>
        <label htmlFor="telephone" className="text-sm font-bold py-2 block">
          Telephone
        </label>
        <input
          type="tel"
          name="telephone"
          className="w-full border-[1px] border-gray-200 p-2 rounded-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={contractor?.telephone}
          onChange={(e) => setContractor({ ...contractor, telephone: e.target.value })}
        />
        {errors.telephone && formDirty && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">Invalid or empty telephone</p>
        )}
      </div>
      <div className={styles.input_container}>
        <label htmlFor="email" className="text-sm font-bold py-2 block">
          email
        </label>
        <input
          type="email"
          name="email"
          className="w-full border-[1px] border-gray-200 p-2 rounded-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={contractor?.email}
          onChange={(e) => setContractor({ ...contractor, email: e.target.value })}
        />
        {errors.email && formDirty && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">Invalid or empty email</p>
        )}
      </div>
      <SelectMultiple
        options={servicesList.map((s) => ({ id: s, text: s }))}
        initialValue={[]}
        title="Select the services"
        value={contractor.services.map((s) => ({ id: s, text: s }))}
        onChange={(v) => setContractor({ ...contractor, services: v })}
      />
      <div className="w-full py-2">
        <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">
          {isLoading && <span className={styles.loader} />}
          {!isLoading && <p>Submit</p>}
        </button>
      </div>
    </form>
  );
}
