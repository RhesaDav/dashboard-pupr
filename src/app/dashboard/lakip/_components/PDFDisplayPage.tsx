"use client";

import React, { useState, useEffect } from "react";
import { PDFViewer, PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import MyPdfDocument, { PdfData } from "./PDFDocument"; // Sesuaikan path import
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getContractById } from "@/actions/contract";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader } from "lucide-react";

const PdfDisplayPage = () => {
  const [pdfData, setPdfData] = useState<PdfData | null>(null);
  const [isClient, setIsClient] = useState(false);
  const params = useParams();
  const contractId = params.id as string;

  const {
    data: apiData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["detail-contract", contractId],
    queryFn: () => getContractById(contractId),
    retry: false,
  });

  useEffect(() => {
    setIsClient(true);

    if (apiData?.data) {
      const formattedData = transformToPdfData(apiData.data);
      setPdfData(formattedData);
    }
  }, [apiData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[800px]">
        <Card className="w-full h-full p-6">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-[700px] w-full" />
          </div>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-[800px]">
        <Card className="w-full max-w-2xl p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Gagal memuat data kontrak: {error.message}
            </AlertDescription>
          </Alert>
        </Card>
      </div>
    );
  }

  if (!pdfData) {
    return (
      <div className="flex items-center justify-center h-[800px]">
        <Card className="w-full p-6">
          <div className="text-center text-muted-foreground">
            Data kontrak tidak ditemukan
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Card className="overflow-hidden">
        {isClient ? (
          <PDFViewer width="100%" height="800px" className="border-0">
            <MyPdfDocument data={pdfData} />
          </PDFViewer>
        ) : (
          <div className="flex items-center justify-center h-[800px]">
            <div className="flex flex-col items-center gap-4">
              <Loader className="h-8 w-8 animate-spin" />
              <p className="text-muted-foreground">Menyiapkan PDF Viewer...</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

const transformToPdfData = (data: any): PdfData => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return {
    lebar: "-",
    panjang: "-",
    tebal: "-",
    tahun: new Date(data.tanggalKontrak).getFullYear() || 2025,
    sasaran: data.namaPaket || "-",
    indikator: data.namaPaket || "-",
    pekerjaan: data.namaPaket || "-",
    deskripsi: data.deskripsi || "-",
    lingkupPekerjaan: data.hasilProdukAkhir || "-",
    lokasi: {
      kabupaten: data.location?.kota || "-",
      distrik: data.location?.distrik || "-",
      koordinatAwal: data.location?.koordinatAwal || "-",
      koordinatAkhir: data.location?.koordinatAkhir || "-",
    },
    kontrakFisik: {
      nilai: data.nilaiKontrak ? formatCurrency(data.nilaiKontrak) : "-",
      kontraktor: data.namaPenyedia || "-",
      nomor: data.nomorKontrak || "-",
      nomorAddendum1: data.addendum?.[0]?.name || "-",
      nomorAddendum2: data.addendum?.[1]?.name || "-",
    },
    kontrakPengawasan: {
      nilai: data.nilaiKontrakSupervisi
        ? formatCurrency(data.nilaiKontrakSupervisi)
        : "-",
      konsultan: data.konsultanSupervisi || "-",
      nomor: data.nomorKontrakSupervisi || "-",
    },
    pihakTerlibat: {
      direksi: data.pengawasLapangan || "-",
      koordinatorPengawas: data.korwaslap || "-",
      ppk: data.ppk || "-",
    },
    realisasi: {
      rencanaFisik: data.financialProgress?.totalProgress
        ? `${data.financialProgress.totalProgress}%`
        : "-",
      realisasiFisik: data.financialProgress?.totalProgress
        ? `${data.financialProgress.totalProgress}%`
        : "-",
      rencanaKeuangan: data.nilaiKontrak
        ? formatCurrency(data.nilaiKontrak)
        : "-",
      realisasiKeuangan: data.financialProgress?.totalPayment
        ? formatCurrency(data.financialProgress.totalPayment)
        : "-",
    },
    dataPendukung: {
      laporan: "-",
      gambar: "-",
      dokumentasi: data.dokumentasiAkhir || "-",
      backUpQuality: "-",
    },
    manfaat: [],
    foto0: data.dokumentasiAwal || "-",
    foto50: data.dokumentasiTengah || "-",
    foto100: data.dokumentasiAkhir || "-",
    penandatangan: {
      ppk: {
        nama: data.ppk || "-",
        nip: data.nipPPK || "-",
      },
      koordinator: {
        nama: data.korwaslap || "-",
        nip: data.nipKorwaslap || "-",
      },
      pengawasLapangan: {
        nama: data.pengawasLapangan || "-",
        nip: data.nipPengawasLapangan || "-",
      },
    },
  };
};

export default PdfDisplayPage;
