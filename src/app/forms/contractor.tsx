"use client";
import { FormEvent, useState } from "react";
import SelectMultiple from "../components/select-multiple";
import { Contractor } from "../types/contractor";

const emptyContractor: Contractor = {
  name: "",
  telephone: "",
  email: "",
  services: [],
  _id: "",
};

export default function ContractorForm({
  title,
  defaultContractor,
  onSubmit,
  servicesList,
}: {
  title: string;
  defaultContractor?: Contractor;
  onSubmit: (fields: Omit<Contractor, "_id">) => Promise<void>;
  servicesList: string[];
}) {
  const [contractor, setContractor] = useState(defaultContractor ?? emptyContractor);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(contractor);
  };

  return (
    <form className="w-full" onSubmit={submit}>
      <span className="font-bold py-2 block text-2xl">{title}</span>
      <div className="w-full py-2">
        <label className="text-sm font-bold py-2 block">Name</label>
        <input
          type="text"
          name="name"
          className="w-full border-[1px] border-gray-200 p-2 rounded-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={contractor?.name}
          onChange={(e) => setContractor({ ...contractor, name: e.target.value })}
        />
      </div>
      <div className="w-full py-2">
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
      </div>
      <div className="w-full py-2">
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
      </div>
      <SelectMultiple
        options={servicesList.map((s) => ({ id: s, text: s }))}
        initialValue={[]}
        value={contractor.services.map((s) => ({ id: s, text: s }))}
        onChange={(v) => setContractor({ ...contractor, services: v })}
      />
      <div className="w-full py-2">
        <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">
          Submit
        </button>
      </div>
    </form>
  );
}
