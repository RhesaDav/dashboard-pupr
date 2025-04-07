import React from "react";
import { getContractWithProgress } from "@/actions/progress";
import { format } from "date-fns";
import ProgressDetailView from "../../_components/detail-progress";

async function ContractProgressPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  // Get contract data
  const contractData = await getContractWithProgress(id);

  // Calculate end date (tanggalKontrak + masaPelaksanaan days)
  const startDate = new Date(
    contractData.contractDetails.tanggalKontrak || new Date()
  );
  const endDate = new Date(startDate);
  endDate.setDate(
    startDate.getDate() + (contractData.contractDetails.masaPelaksanaan || 0)
  );

  // Transform the data structure to match what ProgressDetailPage expects
  const contract = {
    id: id,
    namaPaket: contractData.contractDetails.namaPaket || "",
    nilaiKontrak: contractData.contractDetails.nilaiKontrak || 0,
    tanggalKontrak: format(
      contractData.contractDetails.tanggalKontrak || new Date(),
      "dd-MM-yyyy"
    ),
    masaPelaksanaan: contractData.contractDetails.masaPelaksanaan || 0,
    volumeKontrak: contractData.contractDetails.volumeKontrak || "",
    satuanKontrak: contractData.contractDetails.satuanKontrak || "",
    endDate: format(endDate, "dd-MM-yyyy"),
    progress: contractData.progressData,
  };

  return <ProgressDetailView contract={contract} />;
}

export default ContractProgressPage;
