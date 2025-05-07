import React from "react";
import { getContractWithProgress } from "@/actions/progress";
import { format } from "date-fns";
import ProgressDetailView from "../../_components/detail-progress";
import Link from "next/link";
import { ChevronLeft, Home, ChevronRight } from "lucide-react";

async function ContractProgressPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  
  const contractData = await getContractWithProgress(id);
  
  const startDate = new Date(
    contractData.contractDetails.tanggalKontrak || new Date()
  );
  const endDate = new Date(startDate);
  endDate.setDate(
    startDate.getDate() + (contractData.contractDetails.masaPelaksanaan || 0)
  );
  
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

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div className="mb-4">
        <Link
          href="/dashboard/physical-progress"
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span>Kembali</span>
        </Link>
      </div>

      {/* Breadcrumb navigation */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/dashboard" className="flex items-center hover:text-blue-600">
          <Home className="h-4 w-4 mr-1" />
          <span>Dashboard</span>
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/dashboard/physical-progress" className="hover:text-blue-600">
          Progress Kontrak
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-900 font-medium">{contract.namaPaket}</span>
      </nav>

      {/* Progress Detail View */}
      <ProgressDetailView contract={contract} />
    </div>
  );
}

export default ContractProgressPage;