"use client";
import { useState } from "react";
import ContractorForm from "@/app/forms/contractor";
import { useContractorsStore } from "@/app/store/contractors-store";
import { useServicesStore } from "@/app/store/services-store";
import { Contractor } from "@/app/types/contractor";
import { useRouter } from "next/navigation";

export default function AddContractor() {
  const router = useRouter();
  const { services } = useServicesStore();
  const { createContractor, setNotificationEvents } = useContractorsStore();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData: Omit<Contractor, "_id">) => {
    setIsLoading(true);
    const newContractor = await createContractor(formData);
    setIsLoading(false);
    if (newContractor) {
      setNotificationEvents((p) => [
        ...p,
        { type: "CONTRACTOR_ADDED_SUCCESS", id: newContractor._id, payload: newContractor },
      ]);
      router.replace("/contractors");
    }
  };

  return (
    <div>
      <ContractorForm
        title="Add Contractor"
        onSubmit={onSubmit}
        servicesList={services}
        isLoading={isLoading}
      />
    </div>
  );
}
