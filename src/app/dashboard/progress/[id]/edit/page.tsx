import React from "react";
import { getContractById } from "../../../../../actions/contract";
import ProgressDetailPage from "../../_components/detail-progress";
import { generateWeeks } from "@/lib/utils";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  
  const contractData = {
    namaPaket: "Pembangunan Jalan Manokwari",
    nilaiKontrak: 100000000,
    tanggalKontrak: "15 Jan 2024",
    masaPelaksanaan: 50,
    volumeKontrak: 10,
    satuanKontrak: "KM",
    endDate: "01 April 2024",
    progress: [
      {
        month: "Januari",
        items: [
          { week: 3, rencana: 10, realisasi: 0, deviasi: -10 },
          { week: 4, rencana: 10, realisasi: 0, deviasi: -10 },
          { week: 5, rencana: 10, realisasi: 0, deviasi: -10 },
        ]
      },
      {
        month: "February",
        items: [
          { week: 3, rencana: 10, realisasi: 0, deviasi: -10 },
          { week: 4, rencana: 10, realisasi: 0, deviasi: -10 },
          { week: 5, rencana: 10, realisasi: 0, deviasi: -10 },
        ]
      },
      {
        month: "March",
        items: [
          { week: 3, rencana: 10, realisasi: 0, deviasi: -10 },
          { week: 4, rencana: 10, realisasi: 0, deviasi: -10 },
          { week: 5, rencana: 10, realisasi: 0, deviasi: -10 },
        ]
      }
    ]
  };

  console.log(generateWeeks(contractData.tanggalKontrak, contractData.masaPelaksanaan))

  console.log(contractData)

  return <ProgressDetailPage contract={contractData} />;
}

export default page;
