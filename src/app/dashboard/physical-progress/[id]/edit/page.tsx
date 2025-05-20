import React from "react";
import { getContractWithProgress } from "@/actions/progress";
import { format } from "date-fns";
import EditProgressPage from "../../_components/edit-progress";

async function ContractProgressPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const contractData = await getContractWithProgress(id);
  
  const startDate = new Date(contractData.contractDetails.tanggalKontrak || new Date);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + (contractData.contractDetails.masaPelaksanaan || 0));
  
  const contract = {
    id: id,
    namaPaket: contractData.contractDetails.namaPaket || "",
    nilaiKontrak: contractData.contractDetails.nilaiKontrak || 0,
    tanggalKontrak: format(contractData.contractDetails.tanggalKontrak || new Date(), "dd-MM-yyyy"),
    masaPelaksanaan: contractData.contractDetails.masaPelaksanaan || 0,
    totalAddendumWaktu: contractData.contractDetails.totalAddendumWaktu || 0,
    volumeKontrak: contractData.contractDetails.volumeKontrak || "",
    satuanKontrak: contractData.contractDetails.satuanKontrak || "",
    startDate: format(startDate, "dd-MM-yyyy"),
    endDate: format(endDate, "dd-MM-yyyy"),
    progress: contractData.progressData.map((month) => ({
      month: month.month,
      items: month.items.map((item) => ({
        ...item,
        startDate: item.startDate ?? undefined,
        endDate: item.endDate ?? undefined,
      })),
    })),
  };

  return <EditProgressPage contract={contract} />;
}

export default ContractProgressPage;