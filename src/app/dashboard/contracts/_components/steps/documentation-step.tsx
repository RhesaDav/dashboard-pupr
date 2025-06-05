"use client";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState, useEffect } from "react";
import { Upload, X, Loader2, FileText, Download, Eye } from "lucide-react";
import Image from "next/image";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { toast } from "sonner";

interface DocumentationStepProps {
  onUploadStatusChange?: (isUploading: boolean) => void;
}

export default function DocumentationStep({
  onUploadStatusChange,
}: DocumentationStepProps) {
  const form = useFormContext();

  // Image fields
  const s3DokumentasiAwal = form.watch("dokumentasiAwal") as string | null;
  const s3DokumentasiTengah = form.watch("dokumentasiTengah") as string | null;
  const s3DokumentasiAkhir = form.watch("dokumentasiAkhir") as string | null;

  // PDF fields
  const s3DokumenPendukung = form.watch("dokumenPendukung") as string | null;

  const [localAwalPreview, setLocalAwalPreview] = useState<string | null>(null);
  const [localTengahPreview, setLocalTengahPreview] = useState<string | null>(
    null
  );
  const [localAkhirPreview, setLocalAkhirPreview] = useState<string | null>(
    null
  );

  // PDF file names for display
  const [pdfFileNames, setPdfFileNames] = useState({
    dokumenPendukung: "",
  });

  const [isUploading, setIsUploading] = useState({
    dokumentasiAwal: false,
    dokumentasiTengah: false,
    dokumentasiAkhir: false,
    dokumenPendukung: false,
  });

  useEffect(() => {
    const anyFileUploading = Object.values(isUploading).some(
      (status) => status === true
    );
    if (onUploadStatusChange) {
      onUploadStatusChange(anyFileUploading);
    }
  }, [isUploading, onUploadStatusChange]);

  const displayAwalPreview = localAwalPreview || s3DokumentasiAwal;
  const displayTengahPreview = localTengahPreview || s3DokumentasiTengah;
  const displayAkhirPreview = localAkhirPreview || s3DokumentasiAkhir;

  const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1",
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
    },
    requestChecksumCalculation: "WHEN_REQUIRED",
  });

  useEffect(() => {
    const prevLocalAwal = localAwalPreview;
    const prevLocalTengah = localTengahPreview;
    const prevLocalAkhir = localAkhirPreview;

    return () => {
      if (prevLocalAwal) URL.revokeObjectURL(prevLocalAwal);
      if (prevLocalTengah) URL.revokeObjectURL(prevLocalTengah);
      if (prevLocalAkhir) URL.revokeObjectURL(prevLocalAkhir);
    };
  }, [localAwalPreview, localTengahPreview, localAkhirPreview]);

  const uploadToS3 = async (
    file: File,
    fieldName: keyof typeof isUploading
  ): Promise<string> => {
    try {
      const fileKey = `${Date.now()}-${fieldName}-${file.name.replace(/\s+/g, "-")}`;
      const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
        Key: fileKey,
        Body: file,
        ContentType: file.type,
      };
      if (!params.Bucket) {
        throw new Error(
          "Variabel lingkungan AWS_S3_BUCKET_NAME tidak terkonfigurasi."
        );
      }
      await s3Client.send(new PutObjectCommand(params));
      return `https://${params.Bucket}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileKey}`;
    } catch (error: any) {
      let errorMessage = "Gagal mengunggah ke S3";
      if (error.name === "CredentialsProviderError")
        errorMessage = "Kredensial AWS tidak valid atau hilang.";
      else if (error.name === "NoSuchBucket")
        errorMessage = "Bucket S3 tidak ditemukan.";
      else if (error.name === "AccessDenied")
        errorMessage = "Akses ditolak ke bucket S3.";
      else if (error.$metadata?.httpStatusCode === 403)
        errorMessage =
          "Tidak memiliki izin untuk mengunggah ke S3 (403 Forbidden).";
      else if (
        error.message &&
        typeof error.message === "string" &&
        !error.message.includes("Failed to fetch")
      )
        errorMessage = `Error S3: ${error.message}`;
      console.error("Error uploading to S3:", error);
      throw new Error(errorMessage);
    }
  };

  const formatFieldName = (fieldName: string) => {
    return fieldName
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const extractFileName = (url: string) => {
    try {
      const urlParts = url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      // Remove timestamp prefix if exists
      const cleanFileName = fileName.replace(/^\d+-[^-]+-/, '');
      return decodeURIComponent(cleanFileName);
    } catch {
      return 'dokumen.pdf';
    }
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof isUploading
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_FILE_SIZE = field.includes('dokumentasi') ? 5 * 1024 * 1024 : 10 * 1024 * 1024; // 5MB for images, 10MB for PDFs
    if (file.size > MAX_FILE_SIZE) {
      const maxSizeMB = field.includes('dokumentasi') ? 5 : 10;
      toast.error(
        `File terlalu besar. Maksimum ${maxSizeMB}MB. Ukuran file Anda: ${(file.size / (1024 * 1024)).toFixed(2)}MB`
      );
      if (e.target) e.target.value = "";
      return;
    }

    // Handle image preview cleanup
    if (field === "dokumentasiAwal" && localAwalPreview)
      URL.revokeObjectURL(localAwalPreview);
    if (field === "dokumentasiTengah" && localTengahPreview)
      URL.revokeObjectURL(localTengahPreview);
    if (field === "dokumentasiAkhir" && localAkhirPreview)
      URL.revokeObjectURL(localAkhirPreview);

    // Handle image preview creation
    if (field.includes('dokumentasi')) {
      const newLocalBlobUrl = URL.createObjectURL(file);
      if (field === "dokumentasiAwal") setLocalAwalPreview(newLocalBlobUrl);
      else if (field === "dokumentasiTengah") setLocalTengahPreview(newLocalBlobUrl);
      else if (field === "dokumentasiAkhir") setLocalAkhirPreview(newLocalBlobUrl);
    }

    // Handle PDF file name storage
    if (field.includes('dokumen') || field.includes('laporan')) {
      setPdfFileNames(prev => ({
        ...prev,
        [field]: file.name
      }));
    }

    setIsUploading((prev) => ({ ...prev, [field]: true }));

    try {
      const uploadedFileUrl = await uploadToS3(file, field);
      form.setValue(field, uploadedFileUrl);
      toast.success(`${formatFieldName(field)} berhasil diunggah.`);
      
      // Clear local previews for images after successful upload
      if (field === "dokumentasiAwal") setLocalAwalPreview(null);
      else if (field === "dokumentasiTengah") setLocalTengahPreview(null);
      else if (field === "dokumentasiAkhir") setLocalAkhirPreview(null);
    } catch (uploadError: any) {
      toast.error(
        uploadError.message || `Gagal mengunggah ${formatFieldName(field)}.`
      );
      form.setValue(field, "");
      
      // Clear previews and file names on error
      if (field === "dokumentasiAwal") setLocalAwalPreview(null);
      else if (field === "dokumentasiTengah") setLocalTengahPreview(null);
      else if (field === "dokumentasiAkhir") setLocalAkhirPreview(null);
      
      if (field.includes('dokumen') || field.includes('laporan')) {
        setPdfFileNames(prev => ({
          ...prev,
          [field]: ""
        }));
      }
    } finally {
      setIsUploading((prev) => ({ ...prev, [field]: false }));
      if (e.target) e.target.value = "";
    }
  };

  const removeImage = (field: keyof typeof isUploading) => {
    if (field === "dokumentasiAwal") setLocalAwalPreview(null);
    else if (field === "dokumentasiTengah") setLocalTengahPreview(null);
    else if (field === "dokumentasiAkhir") setLocalAkhirPreview(null);
    
    if (field.includes('dokumen') || field.includes('laporan')) {
      setPdfFileNames(prev => ({
        ...prev,
        [field]: ""
      }));
    }
    
    form.setValue(field, "");
    toast.info(`${formatFieldName(field)} dihapus.`);
  };

  const openPdfViewer = (url: string) => {
    window.open(url, '_blank');
  };

  const downloadFile = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const ImageUploadComponent = ({
    field,
    preview,
    label,
  }: {
    field: keyof typeof isUploading;
    preview: string | null;
    label: string;
  }) => (
    <FormField
      control={form.control}
      name={field}
      render={() => (
        <FormItem className="flex-1">
          <FormLabel className="text-sm font-medium">{label}</FormLabel>
          <FormControl>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-2 text-center h-60 relative flex items-center justify-center transition-all duration-200 ease-in-out hover:border-primary dark:hover:border-primary">
              {!preview && !isUploading[field] && (
                <label className="flex flex-col items-center justify-center h-full w-full cursor-pointer p-4">
                  <Upload className="h-10 w-10 text-gray-400 dark:text-gray-500 mb-3" />
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    PNG, JPG (Maks. 5MB)
                  </p>
                  <div className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors">
                    Pilih File
                  </div>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={(e) => handleFileChange(e, field)}
                  />
                </label>
              )}

              {preview && (
                <div className="relative w-full h-full">
                  <Image
                    src={preview}
                    alt={`${label} pratinjau`}
                    fill
                    className={`object-contain rounded transition-opacity duration-300 ${
                      isUploading[field] ? "opacity-20" : "opacity-100"
                    }`}
                  />
                  {!isUploading[field] && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-7 w-7 rounded-full z-20 shadow-md hover:scale-110 transition-transform"
                      onClick={() => removeImage(field)}
                      aria-label={`Hapus ${label}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}

              {isUploading[field] && (
                <div className="absolute inset-0 bg-white/80 dark:bg-black/80 flex flex-col items-center justify-center z-10 rounded-lg p-4">
                  <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                  <p className="text-base font-semibold text-gray-700 dark:text-gray-300">
                    Mengunggah {label.toLowerCase()}...
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Mohon tunggu sebentar.
                  </p>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );

  const PdfUploadComponent = ({
    field,
    label,
    description,
  }: {
    field: keyof typeof isUploading;
    label: string;
    description: string;
  }) => {
    const s3Url = form.watch(field) as string | null;
    const hasFile = s3Url || pdfFileNames[field as keyof typeof pdfFileNames];
    const fileName = pdfFileNames[field as keyof typeof pdfFileNames] || (s3Url ? extractFileName(s3Url) : '');

    return (
      <FormField
        control={form.control}
        name={field}
        render={() => (
          <FormItem className="flex-1">
            <FormLabel className="text-sm font-medium">{label}</FormLabel>
            <FormControl>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center h-40 relative flex items-center justify-center transition-all duration-200 ease-in-out hover:border-primary dark:hover:border-primary">
                {!hasFile && !isUploading[field] && (
                  <label className="flex flex-col items-center justify-center h-full w-full cursor-pointer p-4">
                    <FileText className="h-10 w-10 text-gray-400 dark:text-gray-500 mb-3" />
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      {label}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      {description}
                    </p>
                    <div className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors">
                      Pilih File PDF
                    </div>
                    <input
                      type="file"
                      className="sr-only"
                      accept="application/pdf"
                      onChange={(e) => handleFileChange(e, field)}
                    />
                  </label>
                )}

                {hasFile && !isUploading[field] && (
                  <div className="flex flex-col items-center justify-center h-full w-full p-4">
                    <FileText className="h-12 w-12 text-primary mb-3" />
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 text-center break-all">
                      {fileName}
                    </p>
                    <div className="flex gap-2 mb-2">
                      {s3Url && (
                        <>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => openPdfViewer(s3Url)}
                            className="flex items-center gap-1"
                          >
                            <Eye className="h-3 w-3" />
                            Lihat
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => downloadFile(s3Url, fileName)}
                            className="flex items-center gap-1"
                          >
                            <Download className="h-3 w-3" />
                            Unduh
                          </Button>
                        </>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeImage(field)}
                      className="flex items-center gap-1"
                    >
                      <X className="h-3 w-3" />
                      Hapus
                    </Button>
                  </div>
                )}

                {isUploading[field] && (
                  <div className="absolute inset-0 bg-white/80 dark:bg-black/80 flex flex-col items-center justify-center z-10 rounded-lg p-4">
                    <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                    <p className="text-base font-semibold text-gray-700 dark:text-gray-300">
                      Mengunggah {label.toLowerCase()}...
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Mohon tunggu sebentar.
                    </p>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    );
  };

  return (
    <div className="space-y-8">
      {/* Image Documentation Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Dokumentasi Visual
          </h3>
          <p className="text-sm text-muted-foreground">
            Unggah dokumentasi proyek dalam format gambar (PNG/JPG, maks. 5MB per file).
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ImageUploadComponent
            field="dokumentasiAwal"
            preview={displayAwalPreview}
            label="Dokumentasi Awal (0%)"
          />
          <ImageUploadComponent
            field="dokumentasiTengah"
            preview={displayTengahPreview}
            label="Dokumentasi Tengah (50%)"
          />
          <ImageUploadComponent
            field="dokumentasiAkhir"
            preview={displayAkhirPreview}
            label="Dokumentasi Akhir (100%)"
          />
        </div>
      </div>

      {/* PDF Documentation Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Dokumen Pendukung
          </h3>
          <p className="text-sm text-muted-foreground">
            Unggah dokumen dalam format PDF (maks. 10MB per file).
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PdfUploadComponent
            field="dokumenPendukung"
            label="Dokumen Pendukung"
            description="PDF (Maks. 10MB)"
          />
        </div>
      </div>
    </div>
  );
}