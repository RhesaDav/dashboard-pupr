"use client";

import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
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

type PdfOrientation = "portrait" | "p" | "landscape" | "l";
type PageFormat = "a4" | "a3" | "a5" | "letter" | "legal"

const HtmlToPdfPage: React.FC = () => {
  const [data] = useState<typeof samplePdfData>(samplePdfData);
  const reportRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  // --- State untuk Pengaturan PDF ---
  const [pageSize, setPageSize] = useState<PageFormat>('a4'); // default a4
  const [orientation, setOrientation] = useState<PdfOrientation>('landscape'); // default landscape
  const [scale, setScale] = useState<number>(2); // default scale untuk html2canvas
  const [marginTop, setMarginTop] = useState<number>(20); // default margin top (pt)
  const [marginRight, setMarginRight] = useState<number>(30); // default margin right (pt)
  const [marginBottom, setMarginBottom] = useState<number>(20); // default margin bottom (pt)
  const [marginLeft, setMarginLeft] = useState<number>(30); // default margin left (pt)
  // --- Akhir State Pengaturan PDF ---


  const generatePdf = async () => {
    const input = reportRef.current;
    if (!input) {
      console.error("Elemen report tidak ditemukan!");
      return;
    }

    setLoading(true);
    console.log("Memulai generate PDF...");
    console.log("Pengaturan:", { pageSize, orientation, scale, marginTop, marginRight, marginBottom, marginLeft });

    try {
      const canvasOptions = {
        scale: scale, // Gunakan state scale
        useCORS: true,
        logging: true,
         // Penting: atur width/height berdasarkan elemen saat ini,
         // tapi html2canvas mungkin lebih baik jika tidak diatur (biarkan otomatis)
         // width: input.scrollWidth,
         // height: input.scrollHeight,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.scrollWidth, // Coba scrollWidth
        windowHeight: document.documentElement.scrollHeight // Coba scrollHeight
      };
      console.log("Opsi Canvas:", canvasOptions);

      const canvas = await html2canvas(input, canvasOptions);
      console.log("Canvas dibuat");
      const imgData = canvas.toDataURL('image/png');
      console.log("Data URL gambar didapatkan");

      // --- Gunakan state pengaturan untuk jsPDF ---
      const pdf = new jsPDF(orientation, 'pt', pageSize);
      console.log("jsPDF instance dibuat");

      // Dapatkan dimensi halaman PDF berdasarkan pengaturan
      const pdfInternal = pdf.internal.pageSize;
      const pdfWidth = pdfInternal.getWidth();
      const pdfHeight = pdfInternal.getHeight();

      // Hitung area yang tersedia setelah dikurangi margin
      const availableWidth = pdfWidth - marginLeft - marginRight;
      const availableHeight = pdfHeight - marginTop - marginBottom;

      // Hitung rasio aspek gambar dari canvas
      const imgRatio = canvas.height / canvas.width;

      // Hitung dimensi akhir gambar agar pas di area tersedia
      let finalImgWidth = availableWidth;
      let finalImgHeight = availableWidth * imgRatio;

      // Jika tinggi gambar melebihi area tersedia, skalakan berdasarkan tinggi
      if (finalImgHeight > availableHeight) {
        finalImgHeight = availableHeight;
        finalImgWidth = availableHeight / imgRatio;
      }

      // Hitung posisi X dan Y berdasarkan margin
      const xPos = marginLeft;
       // Pusatkan vertikal jika ada sisa ruang (opsional)
      const yPos = marginTop + ((availableHeight - finalImgHeight) / 2);

      // Tambahkan gambar ke PDF
      pdf.addImage(imgData, 'PNG', xPos, yPos > marginTop ? yPos : marginTop, finalImgWidth, finalImgHeight);
      console.log("Gambar ditambahkan ke PDF");

      // Simpan PDF
      pdf.save(`laporan_${data.tahun}_${data.lokasi.distrik}.pdf`);
      console.log("PDF disimpan");

    } catch (error) {
      console.error("Error saat membuat PDF:", error);
      // Tampilkan pesan error ke pengguna jika perlu
      alert(`Gagal membuat PDF: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  // Style menggunakan Tailwind CSS (Pastikan Tailwind sudah terkonfigurasi)
  return (
    <div className="p-4 md:p-6 lg:p-8"> {/* Padding responsif */}

      {/* --- Area Pengaturan PDF --- */}
      <div className="mb-6 p-4 border rounded-lg bg-card text-card-foreground shadow">
          <h2 className="text-lg font-semibold mb-4">Pengaturan PDF</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Ukuran Kertas */}
              <div className="space-y-1.5">
                  <Label htmlFor="pageSize">Ukuran Kertas</Label>
                  <Select value={pageSize} onValueChange={(v) => setPageSize(v as PageFormat)}>
                      <SelectTrigger id="pageSize">
                          <SelectValue placeholder="Pilih ukuran..." />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="a3">A3</SelectItem>
                          <SelectItem value="a4">A4</SelectItem>
                          <SelectItem value="a5">A5</SelectItem>
                          <SelectItem value="letter">Letter</SelectItem>
                          <SelectItem value="legal">Legal</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
              {/* Orientasi */}
              <div className="space-y-1.5">
                  <Label htmlFor="orientation">Orientasi</Label>
                  <Select value={orientation} onValueChange={(v) => setOrientation(v as PdfOrientation)}>
                      <SelectTrigger id="orientation">
                          <SelectValue placeholder="Pilih orientasi..." />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="portrait">Portrait</SelectItem>
                          <SelectItem value="landscape">Landscape</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
              {/* Skala Render */}
              <div className="space-y-1.5">
                  <Label htmlFor="scale">Skala Render</Label>
                  <Input
                      id="scale"
                      type="number"
                      value={scale}
                      onChange={(e) => setScale(Number(e.target.value) || 1)} // Min 1
                      min="1"
                      max="5" // Batasi max scale
                      step="0.1"
                  />
                   <p className="text-xs text-muted-foreground">Skala untuk html2canvas (resolusi). Default: 2</p>
              </div>
              {/* Margin (contoh margin atas & kiri) */}
               <div className="space-y-1.5">
                  <Label htmlFor="marginTop">Margin Atas (pt)</Label>
                  <Input
                      id="marginTop"
                      type="number"
                      value={marginTop}
                      onChange={(e) => setMarginTop(Number(e.target.value) || 0)}
                      min="0"
                  />
              </div>
               <div className="space-y-1.5">
                  <Label htmlFor="marginLeft">Margin Kiri (pt)</Label>
                  <Input
                      id="marginLeft"
                      type="number"
                      value={marginLeft}
                      onChange={(e) => setMarginLeft(Number(e.target.value) || 0)}
                      min="0"
                  />
              </div>
               <div className="space-y-1.5">
                  <Label htmlFor="marginRight">Margin Kanan (pt)</Label>
                  <Input
                      id="marginRight"
                      type="number"
                      value={marginRight}
                      onChange={(e) => setMarginRight(Number(e.target.value) || 0)}
                      min="0"
                  />
              </div>
               <div className="space-y-1.5">
                  <Label htmlFor="marginBottom">Margin Bawah (pt)</Label>
                  <Input
                      id="marginBottom"
                      type="number"
                      value={marginBottom}
                      onChange={(e) => setMarginBottom(Number(e.target.value) || 0)}
                      min="0"
                  />
              </div>
          </div>
      </div>

      {/* Tombol Unduh */}
      <div className="mb-4">
        <Button
            onClick={generatePdf}
            disabled={loading}
            className="w-full sm:w-auto" // Responsif
        >
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Membuat PDF...
                </>
            ) : 'Unduh Laporan sebagai PDF'}
        </Button>
      </div>


      {/* --- Kontainer HTML yang Akan Dicetak --- */}
      {/* Hapus style width/height tetap, gunakan max-width & mx-auto */}
      {/* Kelas responsif ditambahkan di dalam */}
      <div
        ref={reportRef}
        id="report-content" // Beri ID jika perlu referensi CSS
        className="report-container bg-white p-4 border border-gray-400 shadow-lg mx-auto max-w-7xl print:shadow-none print:border-none print:p-0" // Max width, hilangkan style saat print
        // style={{ boxSizing: 'content-box' }} // content-box mungkin lebih baik untuk html2canvas
      >
        {/* Header */}
        <div className="text-center text-xs sm:text-sm font-bold mb-2 p-1 border border-black">
          HASIL PELAKSANAAN KEGIATAN TAHUN {data.tahun}
        </div>

        {/* Top Section - Flexbox, responsif */}
        <div className="flex flex-col md:flex-row text-[8pt] sm:text-[9pt] mb-1 pb-1 border-b border-gray-300">
          {/* Left */}
          <div className="w-full md:w-1/4 pr-0 md:pr-2 mb-2 md:mb-0">
            <div className="font-bold mb-1">Sasaran</div>
            <div className="text-xs sm:text-sm">{data.sasaran}</div> {/* Ukuran font responsif */}
          </div>
          {/* Right */}
          <div className="w-full md:w-3/4 md:pl-2 md:border-l border-gray-300">
            {/* Key-Value pairs */}
            <div className="flex mb-0.5">
              <div className="w-1/3 md:w-1/4 font-bold">Deskripsi</div>
              <div className="w-[5%] text-center flex-shrink-0">:</div>
              <div className="w-auto flex-1">{data.pekerjaan_deskripsi}</div> {/* flex-1 */}
            </div>
            <div className="font-bold mt-1 text-xs sm:text-[9pt]">Lingkup Pekerjaan</div>
            <div className="flex ml-2 text-xs sm:text-[9pt]">
              <div className="w-1/4 md:w-[18%] ">Panjang</div>
              <div className="w-[5%] text-center flex-shrink-0">:</div>
              <div className="w-[15%] text-right pr-1">{data.pekerjaan_lingkup?.panjang}</div>
              <div className="w-auto">Meter</div>
            </div>
            <div className="flex ml-2 text-xs sm:text-[9pt]">
              <div className="w-1/4 md:w-[18%] ">Lebar</div>
              <div className="w-[5%] text-center flex-shrink-0">:</div>
              <div className="w-[15%] text-right pr-1">{data.pekerjaan_lingkup?.lebar}</div>
              <div className="w-auto">Meter</div>
            </div>
            <div className="flex ml-2 text-xs sm:text-[9pt]">
              <div className="w-1/4 md:w-[18%] ">Tebal</div>
              <div className="w-[5%] text-center flex-shrink-0">:</div>
              <div className="w-[15%] text-right pr-1">{data.pekerjaan_lingkup?.tebal}</div>
              <div className="w-auto">Meter</div>
            </div>
             {/* Lokasi dst. */}
             <div className="flex mt-1">
                <div className="w-1/3 md:w-1/4 font-bold">Lokasi</div>
                <div className="w-[5%] text-center flex-shrink-0">:</div>
                <div className="w-auto flex-1">{data.lokasi.kabupaten}</div>
            </div>
             <div className="flex">
                <div className="w-1/3 md:w-1/4 font-bold">Distrik</div>
                <div className="w-[5%] text-center flex-shrink-0">:</div>
                <div className="w-auto flex-1">{data.lokasi.distrik}{data.lokasi.kampung ? `, ${data.lokasi.kampung}` : ''}</div>
            </div>
             <div className="flex">
                <div className="w-1/3 md:w-1/4 font-bold">Koordinat Awal</div>
                <div className="w-[5%] text-center flex-shrink-0">:</div>
                <div className="w-auto flex-1 break-all">{data.lokasi.koordinatAwal}</div> {/* break-all */}
            </div>
             <div className="flex">
                <div className="w-1/3 md:w-1/4 font-bold">Koordinat Akhir</div>
                <div className="w-[5%] text-center flex-shrink-0">:</div>
                <div className="w-auto flex-1 break-all">{data.lokasi.koordinatAkhir}</div> {/* break-all */}
            </div>
          </div>
        </div>

        {/* Middle Section - Responsif: tumpuk di mobile, 3 kolom di md+ */}
        <div className="flex flex-col md:flex-row text-[8pt] sm:text-[9pt] mb-1 pt-1">
          {/* Col 1: Pekerjaan & Manfaat */}
          <div className="w-full md:w-[28%] mb-2 md:mb-0 md:pr-2 md:border-r border-gray-300">
             {/* ... (Konten Pekerjaan & Manfaat) ... */}
             <div className="font-bold mb-1">Pekerjaan</div>
             <div>{data.pekerjaan_namaKegiatan}</div>
             <div className="font-bold mt-2 mb-1">Manfaat</div>
             <div className="pl-2 text-xs sm:text-[9pt]">
                 {data.manfaat.map((item, index) => (
                     <div key={index} className="flex">
                         <div className="w-4 text-right pr-1">{index + 1}.</div>
                         <div>{item}</div>
                     </div>
                 ))}
             </div>
          </div>
          {/* Col 2: Data Pekerjaan */}
          <div className="w-full md:w-[42%] mb-2 md:mb-0 md:px-2 md:border-r border-gray-300">
             {/* ... (Konten Data Pekerjaan - mirip sebelumnya, cek width label/value) ... */}
             <div className="font-bold mb-1">Data Pekerjaan</div>
             {/* Contoh baris */}
             <div className="flex text-xs sm:text-[9pt]">
                 <div className="w-[45%] sm:w-[40%] flex-shrink-0">Nilai Kontrak Fisik</div>
                 <div className="w-auto px-1 flex-shrink-0">:</div>
                 <div className="w-auto pr-1 flex-shrink-0">Rp</div>
                 <div className="w-auto flex-1 text-right">{data.kontrakFisik.nilai}</div>
             </div>
             {/* ... baris data pekerjaan lainnya ... */}
             <div className="flex text-xs sm:text-[9pt]">
                <div className="w-[45%] sm:w-[40%] flex-shrink-0">Kepala Bidang / PPK</div>
                <div className="w-auto px-1 flex-shrink-0">:</div>
                <div className="w-auto flex-1 ">{data.pihakTerlibat.ppk}</div>
             </div>
          </div>
          {/* Col 3: Realisasi & Data Pendukung */}
          <div className="w-full md:w-[30%] md:pl-2">
             {/* ... (Konten Realisasi & Data Pendukung - mirip sebelumnya, cek width label/value) ... */}
             <div className="font-bold mb-1">Realisasi</div>
              {/* Contoh baris */}
              <div className="flex text-xs sm:text-[9pt]">
                 <div className="w-[55%] sm:w-[50%] flex-shrink-0">Rencana Target Fisik</div>
                 <div className="w-auto px-1 flex-shrink-0">:</div>
                 <div className="w-auto flex-1 ">{data.realisasi.rencanaFisik}</div>
             </div>
             {/* ... baris realisasi lainnya ... */}
             <div className="font-bold mt-2 mb-1">Data Pendukung</div>
             {/* ... baris data pendukung ... */}
             <div className="flex text-xs sm:text-[9pt]">
                 <div className="w-[55%] sm:w-[50%] flex-shrink-0">Back Up Quality</div>
                 <div className="w-auto px-1 flex-shrink-0">:</div>
                 <div className="w-auto flex-1 ">{data.dataPendukung.backUpQuality}</div>
             </div>
          </div>
        </div>

        {/* Image Section - Responsif */}
        <div className="flex flex-col sm:flex-row justify-around items-start mt-2 border border-gray-500 p-1">
          <div className="w-full sm:w-1/3 text-center px-1 mb-2 sm:mb-0">
            <div className="text-[7pt] sm:text-[8pt] font-bold italic mb-1">FOTO 0%</div>
            {/* Ganti src dengan data asli */}
            <img src={data.foto0 || ''} alt="Foto 0%" className="w-full h-20 sm:h-24 object-cover border border-gray-400 bg-gray-200" />
          </div>
          <div className="w-full sm:w-1/3 text-center px-1 mb-2 sm:mb-0">
            <div className="text-[7pt] sm:text-[8pt] font-bold italic mb-1">FOTO 50%</div>
            <img src={data.foto50 || ''} alt="Foto 50%" className="w-full h-20 sm:h-24 object-cover border border-gray-400 bg-gray-200" />
          </div>
          <div className="w-full sm:w-1/3 text-center px-1">
            <div className="text-[7pt] sm:text-[8pt] font-bold italic mb-1">FOTO 100%</div>
            <img src={data.foto100 || ''} alt="Foto 100%" className="w-full h-20 sm:h-24 object-cover border border-gray-400 bg-gray-200" />
          </div>
        </div>

        {/* Footer Signature Section - Responsif */}
        {/* Margin atas lebih besar agar tidak terlalu mepet */}
        <div className="mt-6 print:mt-4">
          <div className="flex flex-col sm:flex-row justify-between items-start text-[7pt] sm:text-[8pt] pt-2 border-t border-black">
            <div className="w-full sm:w-1/3 text-center px-1 mb-4 sm:mb-0">
              <div className="font-bold mb-8 sm:mb-10">KEPALA BIDANG / PPK</div> {/* Ruang TTD */}
              <div className="font-bold underline">{data.penandatangan.ppk.nama}</div>
              <div>NIP. {data.penandatangan.ppk.nip}</div>
            </div>
            <div className="w-full sm:w-1/3 text-center px-1 mb-4 sm:mb-0">
              <div className="font-bold mb-8 sm:mb-10">KOORDINATOR PENGAWAS LAPANGAN</div>
              <div className="font-bold underline">{data.penandatangan.koordinator.nama}</div>
              <div>NIP. {data.penandatangan.koordinator.nip}</div>
            </div>
            <div className="w-full sm:w-1/3 text-center px-1">
              <div className="font-bold mb-8 sm:mb-10">DIREKSI ( PENGAWAS LAPANGAN )</div>
              <div className="font-bold underline">{data.penandatangan.pengawasLapangan.nama}</div>
              <div>NIP. {data.penandatangan.pengawasLapangan.nip}</div>
            </div>
          </div>
        </div>

      </div> {/* End of report-container */}
    </div>
  );

};

export default HtmlToPdfPage;