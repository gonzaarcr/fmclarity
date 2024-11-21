"use client";
import ContractorForm from "@/app/forms/contractor";
import { useContractorsStore } from "@/app/store/contractors-store";
import { useServicesStore } from "@/app/store/services-store";
import { Contractor } from "@/app/types/contractor";
import { useRouter } from "next/navigation";

export default function AddContractor() {
  const router = useRouter();
  const { services } = useServicesStore();
  const { createContractor } = useContractorsStore();

  const onSubmit = async (formData: Omit<Contractor, "_id">) => {
    await createContractor(formData);
    router.back();
  };

  return (
    <div>
      <ContractorForm title="Add Contractor" onSubmit={onSubmit} servicesList={services} />
    </div>
  );
}
