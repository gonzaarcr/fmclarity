"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useContractorsStore } from "@/app/store/contractors-store";
import { Contractor } from "@/app/types/contractor";
import Link from "next/link";

export default function ContractorDetails({ params }: { params: Promise<{ id: string }> }) {
  const { getContractor } = useContractorsStore();
  const pathname = usePathname();
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
      <span className="font-bold py-2 block text-2xl">Contractor details</span>
      <div className="w-full py-2">
        <p className="text-sm font-bold py-2 block">Name</p>
        <p className="w-full p-2 dark:text-whit ">{contractor.name}</p>
      </div>
      <div className="w-full py-2">
        <p className="text-sm font-bold py-2 block">Telephone</p>
        <p className="w-full p-2 dark:text-whit ">{contractor.telephone}</p>
      </div>
      <div className="w-full py-2">
        <p className="text-sm font-bold py-2 block">email</p>
        <p className="w-full p-2 dark:text-whit ">{contractor.email}</p>
      </div>
      <div className="w-full py-2">
        <p className="text-sm font-bold py-2 block">Services</p>
        <p className="w-full p-2 dark:text-whit ">{contractor.services.join(", ")}</p>
      </div>
      <div className="w-full py-2">
        <Link
          href={`${pathname}/edit`}
          className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}
