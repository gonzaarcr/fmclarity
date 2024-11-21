"use client";

import { useEffect, useState } from "react";
import { Contractor } from "../types/contractor";
import { API_URL } from "../types/constrants";
import { randomIntFromInterval } from "../libs/utils";

async function getContractors() {
  const res = await fetch(`${API_URL}/contractors`);
  const json = await res.json();
  return json as Contractor[];
}

async function postContractor(formData: Omit<Contractor, "_id">) {
  const id = String(randomIntFromInterval(0, 100)).padStart(3, "0");
  const contractor: Contractor = {
    ...formData,
    _id: id,
  };
  const add = await fetch(`${API_URL}/contractors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contractor),
  });

  const content = (await add.json()) as Contractor;
  return content;
}

async function putContractor(contractor: Contractor) {
  const add = await fetch(`${API_URL}/contractors/${contractor._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contractor),
  });

  const content = await add.json();
}

export function useContractorsStore() {
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    loadContractors();
  }, []);

  async function loadContractors() {
    setLoading(true);
    getContractors().then((res) => {
      setContractors(res);
      setLoading(false);
    });
  }

  async function createContractor(formData: Omit<Contractor, "_id">) {
    setLoading(true);
    try {
      const newContractor = await postContractor(formData);
      setContractors([...contractors, newContractor]);
    } catch (e) {
      setLoading(false);
    }
  }

  async function editContractor(contractor: Contractor) {
    setLoading(true);
    try {
      await putContractor(contractor);
    } catch (e) {
      setLoading(false);
    }
    await loadContractors();
  }

  async function getContractor(id: string) {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/contractors/${id}`);
      const json = await res.json();
      return json as Contractor;
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }

  return {
    contractors,
    createContractor,
    editContractor,
    getContractor,
    isLoading,
  };
}
