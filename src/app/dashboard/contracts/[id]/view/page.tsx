import React from "react";
import { getContractById } from "../../../../../actions/contract";
import ContractForm from "../../_components/new-create-contract-form";
import { format } from "date-fns";
import ContractDetailsPage from "../../_components/detail-progress";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const contract = await getContractById(id);
  const newContractData = {
      ...contract.data?.contract,
      tanggalKontrak: contract.data?.contract.tanggalKontrak ? format(contract.data?.contract.tanggalKontrak, "dd-MM-yyyy") : null,
      tanggalKontrakSupervisi: contract.data?.contract.tanggalKontrakSupervisi ? format(contract.data?.contract.tanggalKontrakSupervisi, "dd-MM-yyyy") : null,
    }
  // return <ContractForm id={id} initialData={newContractData} type="detail" />;
  return <ContractDetailsPage />
}

export default page;
