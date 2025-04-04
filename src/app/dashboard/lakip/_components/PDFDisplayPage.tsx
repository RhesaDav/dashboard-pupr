"use client";

import React, { useState, useEffect } from 'react';
import { PDFViewer, PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import MyPdfDocument, { PdfData } from './PDFDocument'; // Sesuaikan path import

const dummyData: PdfData = {
  tahun: 2024,
  sasaran: "Meningkatkan kualitas Layanan Ruas Jalan Provinsi",
  indikator: "Persentase kualitas jalan yang baik",
  pekerjaan: "Pembangunan Jalan Rte Kab. Pegaf - Testega - Bts Kab. Bintuni",
  deskripsi: "Pembangunan Jalan Rte Kab. Pegaf - Testega - Bts Kab. Bintuni",
  lingkupPekerjaan: "Urpil",
  panjang: "2200",
  lebar: "6",
  tebal: "0,25",
  lokasi: {
    kabupaten: "Kabupaten Pegunungan Arfak",
    distrik: "Kampung Demora - Kampung Bomoi, Distrik Testega",
    koordinatAwal: "1°27'30,99\"S 133°35'17,85\"E",
    koordinatAkhir: "1°21'42,30\"S 133°36'7,13\"E"
  },
  kontrakFisik: {
    nilai: "19.274.177.000,00",
    kontraktor: "PT. TOMBOROK JAYA PERMAI",
    nomor: "003.A/KONTR/01.0042-BM/600/2024",
    nomorAddendum1: "003.A/ADD-I/KONTR/01.0042-BM/600/2024",
    nomorAddendum2: "003.A/ADD-II/KONTR/01.0042-BM/600/2024"
  },
  kontrakPengawasan: {
    nilai: "431.808.000,00",
    konsultan: "CV. AMERTA ATMA PERKASA",
    nomor: "003.C/KONTR-PW/01.0042-BM/600/2024"
  },
  pihakTerlibat: {
    direksi: "Ir. CHARLTON PARLINDUNGAN, ST, M.Si",
    koordinatorPengawas: "IDRUS WASARAKA, ST",
    ppk: "T. MUHAMMAD ALLIPA, S.ST"
  },
  realisasi: {
    rencanaFisik: "2200",
    realisasiFisik: "2200",
    rencanaKeuangan: "19.274.177.000,00",
    realisasiKeuangan: "16.479.421.335,00"
  },
  dataPendukung: {
    laporan: "Ada",
    gambar: "Ada",
    dokumentasi: "Ada",
    backUpQuality: "Ada"
  },
  manfaat: [
    "Penyerapan tenaga kerja saat proses konstruksi",
    "Mempercepat ibu kota dan mendukung perekonomian"
  ],
  foto0: "https://dummyimage.com/600x400/000/fff",
  foto50: "https://dummyimage.com/600x400/000/fff",
  foto100: "https://dummyimage.com/600x400/000/fff",
  penandatangan: {
    ppk: {
      nama: "T. MUHAMMAD ALLIPA, S.ST",
      nip: "19830415 201104 1 001"
    },
    koordinator: {
      nama: "IDRUS WASARAKA, ST",
      nip: "19691024 200904 1 002"
    },
    pengawasLapangan: {
      nama: "Ir. CHARLTON PARLINDUNGAN, ST, M.Si",
      nip: "19751102 200701 1 014"
    }
  }
};



const PdfDisplayPage: React.FC = () => {
  const [pdfData, setPdfData] = useState<PdfData>(dummyData);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const pdfDocumentInstance = <MyPdfDocument data={pdfData} />;

  return (
    <div style={{ padding: '10px' }}>

      {isClient ? ( 
        <PDFViewer width="100%" height="800px" style={{ border: '1px solid #ccc' }}>
          {pdfDocumentInstance}
        </PDFViewer>
      ) : (
        <div style={{ width: '100%', height: '800px', border: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
            Memuat PDF Viewer...
        </div>
      )}
    </div>
  );
};

export default PdfDisplayPage;