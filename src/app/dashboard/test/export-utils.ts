import { utils, writeFile } from 'xlsx';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
import { formatRupiah } from '@/lib/utils';

interface PDFExportOptions {
  title: string;
  contractData?: {
    namaPaket: string;
    nilaiKontrak: number;
    tanggalKontrak: string;
    masaPelaksanaan: number;
    volumeKontrak: number | string;
    satuanKontrak: string;
    endDate: string;
  };
  headers: string[];
  data: any[][];
  fileName: string;
}

export const exportToExcel = (data: any[], fileName: string) => {
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  writeFile(workbook, `${fileName}.xlsx`);
};

export const exportToPDF = (options: PDFExportOptions) => {
  const { title, contractData, headers, data, fileName } = options;
  
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });
  
  // Add title
  doc.setFontSize(16);
  doc.text(title, 14, 15);
  
  let startY = 20;
  
  // Add contract information if available
  if (contractData) {
    doc.setFontSize(10);
    doc.text("Detail Kontrak:", 14, startY);
    startY += 5;
    
    doc.setFontSize(9);
    doc.text(`Nama Paket: ${contractData.namaPaket}`, 14, startY);
    startY += 5;
    
    doc.text(`Nilai Kontrak: ${formatRupiah(contractData.nilaiKontrak)}`, 14, startY);
    startY += 5;
    
    doc.text(`Tanggal Kontrak: ${contractData.tanggalKontrak}`, 14, startY);
    startY += 5;
    
    doc.text(`Masa Pelaksanaan: ${contractData.masaPelaksanaan} Hari`, 14, startY);
    startY += 5;
    
    doc.text(`Volume: ${contractData.volumeKontrak} ${contractData.satuanKontrak}`, 14, startY);
    startY += 5;
    
    doc.text(`Target Selesai: ${contractData.endDate}`, 14, startY);
    startY += 10;
  }
  
  // Add progress table
  autoTable(doc, {
    head: [headers],
    body: data,
    startY: startY,
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: 'bold'
    },
  });
  
  // Add a summary of progress
  const totalRows = data.length;
  if (totalRows > 0) {
    // Calculate total planned and realized progress
    const lastEntry = data[totalRows - 1];
    const finalProgress = lastEntry[3]; // Assuming index 3 is the 'Realisasi' column
    
    // Add this after the table
    const tableEnd = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.text(`Total Progress Keseluruhan: ${finalProgress}%`, 14, tableEnd);
  }
  
  doc.save(fileName);
};
