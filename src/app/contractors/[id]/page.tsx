"use client";
import { useEffect, useState } from "react";
import ContractorForm from "@/app/forms/contractor";
import { useContractorsStore } from "@/app/store/contractors-store";
import { Contractor } from "@/app/types/contractor";
import { useServicesStore } from "@/app/store/services-store";

export default function ContractorDetails({ params: { id } }: { params: { id: string } }) {
  const { contractors, isLoading, getContractor, editContractor } = useContractorsStore();
  const { services } = useServicesStore();
  const [contractor, setContractor] = useState<Contractor>();

  useEffect(() => {
    getContractor(id).then((res) => {
      if (res) {
        setContractor(res);
      }
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!contractors) return <p>No data</p>;

  return (
    <div>
      <ContractorForm
        title="Edit Contractor"
        defaultContractor={contractor}
        onSubmit={(form) => editContractor({ ubn: id, ...form })}
        servicesList={services}
      />
    </div>
  );
}
