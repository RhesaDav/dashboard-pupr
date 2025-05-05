import React from "react";
import { getContractById } from "../../../../../actions/contract";
import ContractForm from "../../_components/new-create-contract-form";
import { format } from "date-fns";
import MultiStepForm from "../../_components/multi-step-form";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  return (
    <MultiStepForm id={id}/>
  );
}

export default page;
