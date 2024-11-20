"use client";
import ContractorForm from "@/app/forms/contractor";

export default function ContractorDetails({ params: { id } }: { params: { id: string } }) {
  return (
    <div>
      <ContractorForm />
    </div>
  );
}
