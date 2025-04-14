import React from "react";
import { getContractById } from "../../../../../actions/contract";
import ContractForm from "../../_components/new-create-contract-form";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const contract = await getContractById(id)
  return (
    <ContractForm
    id={id}
      initialData={contract.data?.contract}
      type="update"
      progressTotal={contract.data?.progressTotal}
    />
  );
}

export default page;
