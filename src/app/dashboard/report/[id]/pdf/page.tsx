"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Download,
  Eye,
  FileSpreadsheet,
  Loader2,
} from "lucide-react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Contract {
  namaPaket: string;
  namaPenyedia: string;
  ppk: string;
  korwaslap: string;
  pengawasLapangan: string;
  nilaiKontrak: number;
  nilaiKontrakFisik: number;
  tanggalKontrak: string;
  masaPelaksanaan: number;
  konsultanSupervisi: string;
  nilaiKontrakSupervisi: number;
  volumeKontrak: string;
  satuanKontrak: string;
  hasilProdukAkhir: string;
  koordinatAwal: string;
  koordinatAkhir: string;
  realisasiKeuangan: number;
  akhirKontrakAsli: string;
  akhirKontrakAdd: string;
  permasalahan: string;
  status: string;
  progressPercentage: number;
  progressData: Array<{
    bulan: string;
    minggu: string;
    periode: string;
    rencana: string;
    realisasi: string;
    deviasi: string;
    bermasalah: boolean;
    deskripsiMasalah: string;
    catatan: string;
  }>;
  totalProgress: number;
  keterangan: string;
}

interface PDFExportData {
  title: string;
  contracts: Contract[];
  weekRange: {
    start: string;
    end: string;
  };
  columns: Array<{ id: string; label: string }>;
  defaultVisible: string[];
}

export default function PDFExportPage() {
  const router = useRouter();
  const [exportData, setExportData] = useState<PDFExportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1200);

  const contentRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const data = sessionStorage.getItem("pdfExportData");
    if (!data) {
      router.push("/report");
      return;
    }

    try {
      const parsedData = JSON.parse(data) as PDFExportData;
      setExportData(parsedData);
      setVisibleColumns(parsedData.defaultVisible);
    } catch (error) {
      console.error("Error parsing export data:", error);
      router.push("/report");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const generatePDF = async (forPreview = false) => {
    if (!contentRef.current) return;

    setIsGenerating(true);

    try {
      const originalStyles = {
        width: contentRef.current.style.width,
        minWidth: contentRef.current.style.minWidth,
        overflowX: contentRef.current.style.overflowX,
      };

      contentRef.current.style.width = "1100px";
      contentRef.current.style.minWidth = "1100px";
      contentRef.current.style.overflowX = "visible";

      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        width: 2000,
        height: contentRef.current.offsetHeight,
      });

      contentRef.current.style.width = originalStyles.width;
      contentRef.current.style.minWidth = originalStyles.minWidth;
      contentRef.current.style.overflowX = originalStyles.overflowX;

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 297;
      const pageHeight = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      if (forPreview) {
        const pdfBlob = pdf.output("blob");
        const url = URL.createObjectURL(pdfBlob);
        setPreviewUrl(url);
      } else {
        pdf.save(`${exportData?.title || "report"}.pdf`);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateExcel = async () => {
    if (!exportData) return;

    setIsExportingExcel(true);

    try {
      const wsData = [
        visibleColumns.map((colId) => {
          const column = exportData.columns.find((c) => c.id === colId);
          return column ? column.label : colId;
        }),
      ];

      exportData.contracts.forEach((contract) => {
        contract.progressData.forEach((progress, progressIdx) => {
          const row = visibleColumns.map((colId) => {
            if (
              colId in contract &&
              typeof contract[colId as keyof Contract] !== "object"
            ) {
              return progressIdx === 0
                ? colId.includes("nilai")
                  ? formatCurrency(contract[colId as keyof Contract] as number)
                  : String(contract[colId as keyof Contract])
                : "";
            }

            const value = progress[colId as keyof typeof progress];
            return value !== undefined && value !== null ? String(value) : "";
          });
          wsData.push(row);
        });
      });

      const overallProgress =
        exportData.contracts.length > 0
          ? exportData.contracts.reduce(
              (sum, contract) => sum + contract.totalProgress,
              0
            ) / exportData.contracts.length
          : 0;

      const totalRow = visibleColumns.map((colId, index) => {
        if (index === visibleColumns.length - 1) {
          return `${overallProgress.toFixed(1)}%`;
        } else if (index === visibleColumns.length - 2) {
          return "Total Progress Keseluruhan:";
        } else {
          return "";
        }
      });
      wsData.push(totalRow);

      const ws = XLSX.utils.aoa_to_sheet(wsData);

      const range = XLSX.utils.decode_range(ws["!ref"] || "A1");
      for (let row = 0; row <= range.e.r; row++) {
        for (let col = 0; col <= range.e.c; col++) {
          const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
          if (!ws[cellRef]) continue;

          if (!ws[cellRef].s) ws[cellRef].s = {};

          if (row === 0) {
            ws[cellRef].s = {
              fill: { fgColor: { rgb: "4F81BD" } },
              font: { color: { rgb: "FFFFFF" }, bold: true },
              alignment: { horizontal: "center" },
              border: {
                top: { style: "thin" },
                bottom: { style: "thin" },
                left: { style: "thin" },
                right: { style: "thin" },
              },
            };
          } else if (row === range.e.r) {
            ws[cellRef].s = {
              fill: { fgColor: { rgb: "D8E4BC" } },
              font: { bold: true },
              border: {
                top: { style: "thin" },
                bottom: { style: "thin" },
                left: { style: "thin" },
                right: { style: "thin" },
              },
            };
          } else {
            ws[cellRef].s = {
              border: {
                top: { style: "thin" },
                bottom: { style: "thin" },
                left: { style: "thin" },
                right: { style: "thin" },
              },
            };
            if (row % 2 === 0) {
              ws[cellRef].s.fill = { fgColor: { rgb: "E9EDF4" } };
            }
          }
        }
      }

      ws["!cols"] = visibleColumns.map(() => ({ wch: 20 }));

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Report");
      XLSX.writeFile(wb, `${exportData.title || "report"}.xlsx`);
    } catch (error) {
      console.error("Error generating Excel:", error);
    } finally {
      setIsExportingExcel(false);
    }
  };

  const handleGeneratePreview = async () => {
    await generatePDF(true);
  };

  const handleDownloadPDF = async () => {
    await generatePDF(false);
  };

  const handleExportExcel = async () => {
    await generateExcel();
  };

  const handleBack = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    router.back();
  };

  const toggleColumn = (columnId: string) => {
    setVisibleColumns((prev) =>
      prev.includes(columnId)
        ? prev.filter((id) => id !== columnId)
        : [...prev, columnId]
    );

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Memuat data...</span>
      </div>
    );
  }

  if (!exportData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Tidak ada data untuk ditampilkan</p>
      </div>
    );
  }

  const overallProgress =
    exportData.contracts.length > 0
      ? exportData.contracts.reduce(
          (sum, contract) => sum + contract.totalProgress,
          0
        ) / exportData.contracts.length
      : 0;

  const isSmallScreen = viewportWidth < 1024;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-6 print:hidden gap-4">
        <Button variant="outline" onClick={handleBack} className="mb-4 sm:mb-0">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>

        <div className="flex flex-wrap gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="sm:ml-auto">
                Kolom <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {exportData.columns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={visibleColumns.includes(column.id)}
                  onCheckedChange={() => toggleColumn(column.id)}
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button onClick={handleGeneratePreview} disabled={isGenerating}>
            <Eye className="mr-2 h-4 w-4" />
            Preview PDF
          </Button>

          <Button onClick={handleDownloadPDF} disabled={isGenerating}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>

          <Button
            onClick={handleExportExcel}
            disabled={isExportingExcel}
            variant="outline"
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
        </div>
      </div>

      <div
        className={`flex flex-col ${isSmallScreen ? "" : "lg:flex-row"} gap-6`}
      >
        <div className={`${isSmallScreen ? "w-full" : "lg:w-1/2"}`}>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <div
                ref={contentRef}
                className="p-6 print:p-0 print:shadow-none"
                style={{
                  width: "100%",
                  minWidth: isSmallScreen ? "800px" : "100%",
                }}
              >
                <h1 className="text-2xl font-bold mb-2">{exportData.title}</h1>
                <p className="text-sm text-gray-600 mb-4">
                  Periode:{" "}
                  {format(new Date(exportData.weekRange.start), "dd/MM/yyyy")} -{" "}
                  {format(new Date(exportData.weekRange.end), "dd/MM/yyyy")}
                </p>

                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      {visibleColumns.map((colId) => {
                        const column = exportData.columns.find(
                          (c) => c.id === colId
                        );
                        if (!column) return null;
                        return (
                          <th
                            key={colId}
                            className="px-4 py-2 text-left text-sm font-medium border border-gray-200"
                          >
                            {column.label}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {exportData.contracts.flatMap((contract, contractIdx) =>
                      contract.progressData.map((progress, progressIdx) => (
                        <tr
                          key={`${contractIdx}-${progressIdx}`}
                          className={
                            progressIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          {visibleColumns.map((colId) => {
                            if (
                              colId in contract &&
                              typeof contract[colId as keyof Contract] !==
                                "object"
                            ) {
                              const value = contract[colId as keyof Contract];
                              return (
                                <td
                                  key={colId}
                                  className="px-4 py-2 text-sm border border-gray-200 whitespace-nowrap"
                                >
                                  {progressIdx === 0
                                    ? colId.includes("nilai")
                                      ? formatCurrency(value as number)
                                      : String(value)
                                    : ""}
                                </td>
                              );
                            }

                            const progressValue =
                              progress[colId as keyof typeof progress];
                            return (
                              <td
                                key={colId}
                                className="px-4 py-2 text-sm border border-gray-200 whitespace-nowrap"
                              >
                                {progressValue !== undefined &&
                                progressValue !== null
                                  ? String(progressValue)
                                  : ""}
                              </td>
                            );
                          })}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className={`${isSmallScreen ? "w-full" : "lg:w-1/2"}`}>
          <div className="bg-gray-100 rounded-lg p-4 h-full">
            <h2 className="text-lg font-semibold mb-2">Preview PDF</h2>
            <div ref={previewRef} className="bg-white rounded h-96">
              {isGenerating ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  <p>Generating preview...</p>
                </div>
              ) : previewUrl ? (
                <iframe
                  src={previewUrl}
                  className="w-full h-full"
                  style={{ border: "none" }}
                  title="PDF Preview"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">
                    Click &quot;Preview PDF&quot; to generate a preview
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
