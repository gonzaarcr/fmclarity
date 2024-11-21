"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ContractorForm from "@/app/forms/contractor";
import { useContractorsStore } from "@/app/store/contractors-store";
import { Contractor } from "@/app/types/contractor";
import { useServicesStore } from "@/app/store/services-store";

export default function ContractorDetails({ params }: { params: Promise<{ id: string }> }) {
  const { isLoading, getContractor, editContractor } = useContractorsStore();
  const { services } = useServicesStore();
  const router = useRouter();
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

  const onSubmit = async (formData: Omit<Contractor, "_id">) => {
    await editContractor({ _id: contractor!!._id, ...formData });
    router.replace(`/contractors/${contractor!!._id}`);
  };

  if (isLoadingContractor) return <p>Loading...</p>;
  if (!contractor) return <p>No data</p>;

  return (
    <div>
      <ContractorForm
        title="Edit Contractor"
        defaultContractor={contractor}
        onSubmit={onSubmit}
        servicesList={services}
        isLoading={isLoading}
      />
    </div>
  );
}
