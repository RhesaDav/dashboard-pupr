import React from "react";
import { getContractById } from "../../../../../actions/contract";
import ContractForm from "../../_components/new-create-contract-form";
import { format } from "date-fns";
import ContractDetailsPage from "../../_components/detail-contract";

async function page({ params }: { params: Promise<{ id: string }> }) {
  return <ContractDetailsPage />
}

export default page;
