import React from "react";
import { getContractWithProgress } from "@/actions/progress";
import { format } from "date-fns";
import ProgressDetailView from "../../_components/detail-progress";

async function ContractProgressPage({ params }: { params: { id: string } }) {
  const id = params.id;

  // Get contract data
  const contractData = await getContractWithProgress(id);
  
  // Calculate end date (tanggalKontrak + masaPelaksanaan days)
  const startDate = new Date(contractData.contractDetails.tanggalKontrak);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + contractData.contractDetails.masaPelaksanaan);
  
  // Transform the data structure to match what ProgressDetailPage expects
  const contract = {
    id: id,
    namaPaket: contractData.contractDetails.namaPaket,
    nilaiKontrak: contractData.contractDetails.nilaiKontrak,
    tanggalKontrak: format(contractData.contractDetails.tanggalKontrak, "dd-MM-yyyy"),
    masaPelaksanaan: contractData.contractDetails.masaPelaksanaan,
    volumeKontrak: contractData.contractDetails.volumeKontrak,
    satuanKontrak: contractData.contractDetails.satuanKontrak,
    endDate: format(endDate,"dd-MM-yyyy"),
    progress: contractData.progressData
  };

  console.log(contractData)

  return <ProgressDetailView contract={contract} />
}

export default ContractProgressPage;