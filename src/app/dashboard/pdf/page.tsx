"use client";

import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const samplePdfData = {
    tahun: 2024,
    sasaran: "Meningkatkan kualitas Layanan Ruas Jalan Provinsi",
    pekerjaan_deskripsi: "Pembangunan Jalan Bts Kab. Pegaf - Testega - Bts Kab. Sintuni",
    pekerjaan_lingkup: { panjang: 2200, lebar: 6, tebal: 0.25 },
    lokasi: {
        kabupaten: "Kabupaten Pegunungan Arfak",
        distrik: "Distrik Testega",
        kampung: "Kampung Demora - Kampung Bomai",
        koordinatAwal: "1°27'30,99\"S 133°33'17,85\"E",
        koordinatAkhir: "1°21'42,30\"S 133°36'7,13\"E",
    },
    pekerjaan_namaKegiatan: "Pembangunan Jalan Bts Kab. Pegaf - Testega - Bts Kab. Sintuni",
    manfaat: [
        "Penyerapan tenaga kerja saat proses konstruksi",
        "Memperlancar lalu lintas dan mendukung perekonomian"
    ],
    kontrakFisik: {
        nilai: "19.274.177.000,00",
        kontraktor: "PT. TOMBROK JAYA PERMAI",
        nomor: "003.A/KONTR/01.0042-BM/600/2024",
        nomorAddendum1: "003.A/ADD-I/KONTR/01.0042-BM/600/2024",
        nomorAddendum2: "003 A/ADD-II/KONTR/01.0042-BM/600/2024"
    },
    kontrakPengawasan: {
        nilai: "431.808.000,00",
        konsultan: "CV. AMERTA ATMA DESAIN",
        nomor: "003.C/KONTR-PW/01.0042-BM/600/2024",
    },
    pihakTerlibat: {
        direksiPengawas: "I. CHARLTON PARLINDUNGAN, ST, MS",
        koordinatorPengawas: "IDRUS WASARAKA, ST",
        ppk: "T. MUHAMMAD ALIIPA S, ST",
    },
    realisasi: {
        rencanaFisik: "2200 Meter",
        realisasiFisik: "2200 Meter",
        rencanaKeuangan: "19.274.177.000,00",
        realisasiKeuangan: "15.479.421.535,00",
    },
    dataPendukung: {
        laporan: "Ada",
        gambar: "Ada",
        dokumentasi: "Ada",
        backUpQuality: "Ada",
    },
    foto0: 'https://placehold.co/300x200',
    foto50: 'https://placehold.co/300x200',
    foto100: 'https://placehold.co/300x200',
    penandatangan: {
        ppk: { nama: "T. MUHAMMAD ALIIPAS, ST", nip: "19850415 201104 1 001" },
        koordinator: { nama: "IDRUS WASARAKA, ST", nip: "19891024 200904 1 002" },
        pengawasLapangan: { nama: "I. CHARLTON PARLINDUNGAN, ST, MS", nip: "19751102 200701 1 014" },
    },
    indikator: "", 
    pekerjaan: "", 
    lingkupPekerjaan: "",
};

const HtmlToPdfPage: React.FC = () => {
  const [data] = useState<typeof samplePdfData>(samplePdfData);
  const reportRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const generatePdf = async () => {
    const input = reportRef.current;
    if (!input) {
      console.error("Elemen report tidak ditemukan!");
      return;
    }

    setLoading(true);
    console.log("Memulai generate PDF...");

    try {
      const canvasOptions = {
        scale: 2,
        useCORS: true,
        logging: true,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight
      };
      console.log("Opsi Canvas:", canvasOptions);

      const canvas = await html2canvas(input, canvasOptions);
      console.log("Canvas dibuat");
      const imgData = canvas.toDataURL('image/png');
      console.log("Data URL gambar didapatkan");

      // Gunakan pengaturan default yang sudah dioptimalkan
      const pdf = new jsPDF('landscape', 'pt', 'a4');
      console.log("jsPDF instance dibuat");

      // Dapatkan dimensi halaman PDF
      const pdfInternal = pdf.internal.pageSize;
      const pdfWidth = pdfInternal.getWidth();
      const pdfHeight = pdfInternal.getHeight();

      // Hitung area yang tersedia dengan margin
      const marginLeft = 30;
      const marginRight = 30;
      const marginTop = 20;
      const marginBottom = 20;
      const availableWidth = pdfWidth - marginLeft - marginRight;
      const availableHeight = pdfHeight - marginTop - marginBottom;

      // Hitung rasio aspek gambar dari canvas
      const imgRatio = canvas.height / canvas.width;

      // Hitung dimensi akhir gambar
      let finalImgWidth = availableWidth;
      let finalImgHeight = availableWidth * imgRatio;

      // Jika tinggi gambar melebihi area tersedia, skalakan berdasarkan tinggi
      if (finalImgHeight > availableHeight) {
        finalImgHeight = availableHeight;
        finalImgWidth = availableHeight / imgRatio;
      }

      // Hitung posisi X dan Y
      const xPos = marginLeft;
      const yPos = marginTop + ((availableHeight - finalImgHeight) / 2);

      // Tambahkan gambar ke PDF
      pdf.addImage(imgData, 'PNG', xPos, yPos > marginTop ? yPos : marginTop, finalImgWidth, finalImgHeight);
      console.log("Gambar ditambahkan ke PDF");

      // Simpan PDF
      pdf.save(`laporan_${data.tahun}_${data.lokasi.distrik}.pdf`);
      console.log("PDF disimpan");

    } catch (error) {
      console.error("Error saat membuat PDF:", error);
      alert(`Gagal membuat PDF: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Tombol Unduh */}
      <div className="mb-4">
        <Button
            onClick={generatePdf}
            disabled={loading}
            className="w-full sm:w-auto"
        >
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Membuat PDF...
                </>
            ) : 'Unduh Laporan sebagai PDF'}
        </Button>
      </div>

      {/* Kontainer HTML yang Akan Dicetak - Layout yang Diluruskan */}
      <div
        ref={reportRef}
        id="report-content"
        className="report-container bg-white p-4 border border-gray-400 shadow-lg mx-auto max-w-7xl print:shadow-none print:border-none print:p-0"
      >
        {/* Header - Konsisten dan lurus */}
        <div className="text-center text-xs sm:text-sm font-bold mb-4 p-2 border border-black">
          HASIL PELAKSANAAN KEGIATAN TAHUN {data.tahun}
        </div>

        {/* Top Section - Dengan grid untuk konsistensi */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs mb-4 pb-4 border-b border-gray-300">
          {/* Left - Sasaran */}
          <div className="md:col-span-1">
            <div className="font-bold mb-2">Sasaran</div>
            <div>{data.sasaran}</div>
          </div>
          
          {/* Right - Detail Informasi */}
          <div className="md:col-span-3 md:pl-4 md:border-l border-gray-300">
            {/* Deskripsi */}
            <div className="grid grid-cols-12 mb-1">
              <div className="col-span-3 font-bold">Deskripsi</div>
              <div className="col-span-1 text-center">:</div>
              <div className="col-span-8">{data.pekerjaan_deskripsi}</div>
            </div>
            
            {/* Lingkup Pekerjaan - Tabel Konsisten */}
            <div className="font-bold mt-2 mb-1">Lingkup Pekerjaan</div>
            <div className="grid grid-cols-12 ml-4">
              <div className="col-span-3">Panjang</div>
              <div className="col-span-1 text-center">:</div>
              <div className="col-span-2 text-right pr-1">{data.pekerjaan_lingkup?.panjang}</div>
              <div className="col-span-6">Meter</div>
            </div>
            <div className="grid grid-cols-12 ml-4">
              <div className="col-span-3">Lebar</div>
              <div className="col-span-1 text-center">:</div>
              <div className="col-span-2 text-right pr-1">{data.pekerjaan_lingkup?.lebar}</div>
              <div className="col-span-6">Meter</div>
            </div>
            <div className="grid grid-cols-12 ml-4">
              <div className="col-span-3">Tebal</div>
              <div className="col-span-1 text-center">:</div>
              <div className="col-span-2 text-right pr-1">{data.pekerjaan_lingkup?.tebal}</div>
              <div className="col-span-6">Meter</div>
            </div>
            
            {/* Lokasi Info - Tabel Konsisten */}
            <div className="grid grid-cols-12 mt-2">
              <div className="col-span-3 font-bold">Lokasi</div>
              <div className="col-span-1 text-center">:</div>
              <div className="col-span-8">{data.lokasi.kabupaten}</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-3 font-bold">Distrik</div>
              <div className="col-span-1 text-center">:</div>
              <div className="col-span-8">{data.lokasi.distrik}{data.lokasi.kampung ? `, ${data.lokasi.kampung}` : ''}</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-3 font-bold">Koordinat Awal</div>
              <div className="col-span-1 text-center">:</div>
              <div className="col-span-8 break-all">{data.lokasi.koordinatAwal}</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-3 font-bold">Koordinat Akhir</div>
              <div className="col-span-1 text-center">:</div>
              <div className="col-span-8 break-all">{data.lokasi.koordinatAkhir}</div>
            </div>
          </div>
        </div>

        {/* Middle Section - Grid Konsisten 3 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 text-xs mb-4">
          {/* Col 1: Pekerjaan & Manfaat */}
          <div className="md:col-span-2 md:border-r border-gray-300 pr-4">
            <div className="font-bold mb-2">Pekerjaan</div>
            <div className="mb-3">{data.pekerjaan_namaKegiatan}</div>
            
            <div className="font-bold mb-2">Manfaat</div>
            <div className="pl-4">
              {data.manfaat.map((item, index) => (
                <div key={index} className="grid grid-cols-12 mb-1">
                  <div className="col-span-1 text-right pr-1">{index + 1}.</div>
                  <div className="col-span-11">{item}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Col 2: Data Pekerjaan */}
          <div className="md:col-span-3 md:border-r border-gray-300 md:px-4">
            <div className="font-bold mb-2">Data Pekerjaan</div>
            
            <div className="grid grid-cols-12 mb-1">
              <div className="col-span-5">Nilai Kontrak Fisik</div>
              <div className="col-span-1 text-center">:</div>
              <div className="col-span-1">Rp</div>
              <div className="col-span-5 text-right">{data.kontrakFisik.nilai}</div>
            </div>
            
            <div className="grid grid-cols-12 mb-1">
              <div className="col-span-5">Kontraktor</div>
              <div className="col-span-1 text-center">:</div>
              <div className="col-span-6">{data.kontrakFisik.kontraktor}</div>
            </div>
            
            <div className="grid grid-cols-12 mb-1">
              <div className="col-span-5">No. Kontrak</div>
              <div className="col-span-1 text-center">:</div>
              <div className="col-span-6">{data.kontrakFisik.nomor}</div>
            </div>
            
            <div className="grid grid-cols-12 mb-1">
              <div className="col-span-5">Kepala Bidang / PPK</div>
              <div className="col-span-1 text-center">:</div>
              <div className="col-span-6">{data.pihakTerlibat.ppk}</div>
            </div>
            
            <div className="grid grid-cols-12 mb-1">
              <div className="col-span-5">Direksi Pengawas</div>
              <div className="col-span-1 text-center">:</div>
              <div className="col-span-6">{data.pihakTerlibat.direksiPengawas}</div>
            </div>
            
            <div className="grid grid-cols-12 mb-1">
              <div className="col-span-5">Koordinator Pengawas</div>
              <div className="col-span-1 text-center">:</div>
              <div className="col-span-6">{data.pihakTerlibat.koordinatorPengawas}</div>
            </div>
          </div>
          
          {/* Col 3: Realisasi & Data Pendukung */}
          <div className="md:col-span-2 md:pl-4">
            <div className="font-bold mb-2">Realisasi</div>
            
            <div className="grid grid-cols-12 mb-1">
              <div className="col-span-6">Rencana Target Fisik</div>
              <div className="col-span-1 text-center">:</div>
              <div className="col-span-5">{data.realisasi.rencanaFisik}</div>
            </div>
            
            <div className="grid grid-cols-12 mb-1">
              <div className="col-span-6">Realisasi Fisik</div>
              <div className="col-span-1 text-center">:</div>
              <div className="col-span-5">{data.realisasi.realisasiFisik}</div>
            </div>
            
            <div className="grid grid-cols-12 mb-1">
              <div className="col-span-6">Rencana Keuangan</div>
              <div className="col-span-1 text-center">:</div>
              <div className="col-span-5">{data.realisasi.rencanaKeuangan}</div>
            </div>
            
            <div className="grid grid-cols-12 mb-1">
              <div className="col-span-6">Realisasi Keuangan</div>
              <div className="col-span-1 text-center">:</div>
              <div className="col-span-5">{data.realisasi.realisasiKeuangan}</div>
            </div>
            
            <div className="font-bold mt-3 mb-2">Data Pendukung</div>
            
            <div className="grid grid-cols-12 mb-1">
              <div className="col-span-6">Laporan</div>
              <div className="col-span-1 text-center">:</div>
              <div className="col-span-5">{data.dataPendukung.laporan}</div>
            </div>
            
            <div className="grid grid-cols-12 mb-1">
              <div className="col-span-6">Gambar</div>
              <div className="col-span-1 text-center">:</div>
              <div className="col-span-5">{data.dataPendukung.gambar}</div>
            </div>
            
            <div className="grid grid-cols-12 mb-1">
              <div className="col-span-6">Dokumentasi</div>
              <div className="col-span-1 text-center">:</div>
              <div className="col-span-5">{data.dataPendukung.dokumentasi}</div>
            </div>
            
            <div className="grid grid-cols-12 mb-1">
              <div className="col-span-6">Back Up Quality</div>
              <div className="col-span-1 text-center">:</div>
              <div className="col-span-5">{data.dataPendukung.backUpQuality}</div>
            </div>
          </div>
        </div>

        {/* Image Section - Grid Konsisten */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-gray-500 p-4 mb-4">
          <div className="text-center">
            <div className="text-xs font-bold italic mb-2">FOTO 0%</div>
            <img src={data.foto0 || ''} alt="Foto 0%" className="w-full h-24 object-cover border border-gray-400 bg-gray-200" />
          </div>
          
          <div className="text-center">
            <div className="text-xs font-bold italic mb-2">FOTO 50%</div>
            <img src={data.foto50 || ''} alt="Foto 50%" className="w-full h-24 object-cover border border-gray-400 bg-gray-200" />
          </div>
          
          <div className="text-center">
            <div className="text-xs font-bold italic mb-2">FOTO 100%</div>
            <img src={data.foto100 || ''} alt="Foto 100%" className="w-full h-24 object-cover border border-gray-400 bg-gray-200" />
          </div>
        </div>

        {/* Footer Signature Section - Grid Konsisten */}
        <div className="mt-8 border-t border-black pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="text-center">
              <div className="font-bold mb-12">KEPALA BIDANG / PPK</div>
              <div className="font-bold underline">{data.penandatangan.ppk.nama}</div>
              <div>NIP. {data.penandatangan.ppk.nip}</div>
            </div>
            
            <div className="text-center">
              <div className="font-bold mb-12">KOORDINATOR PENGAWAS LAPANGAN</div>
              <div className="font-bold underline">{data.penandatangan.koordinator.nama}</div>
              <div>NIP. {data.penandatangan.koordinator.nip}</div>
            </div>
            
            <div className="text-center">
              <div className="font-bold mb-12">DIREKSI ( PENGAWAS LAPANGAN )</div>
              <div className="font-bold underline">{data.penandatangan.pengawasLapangan.nama}</div>
              <div>NIP. {data.penandatangan.pengawasLapangan.nip}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HtmlToPdfPage;