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
import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { toast } from "sonner";

export default function DocumentationStep() {
  const form = useFormContext();

  const [dokumentasiAwalPreview, setDokumentasiAwalPreview] = useState<
    string | null
  >(form.watch("dokumentasiAwal") || null);
  const [dokumentasiTengahPreview, setDokumentasiTengahPreview] = useState<
    string | null
  >(form.watch("dokumentasiTengah") || null);
  const [dokumentasiAkhirPreview, setDokumentasiAkhirPreview] = useState<
    string | null
  >(form.watch("dokumentasiAkhir") || null);

  const [isUploading, setIsUploading] = useState({
    dokumentasiAwal: false,
    dokumentasiTengah: false,
    dokumentasiAkhir: false,
  });

  const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1",
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
    },
    requestChecksumCalculation: "WHEN_REQUIRED",
  });

  const uploadToS3 = async (file: File) => {
    try {
      const fileKey = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

      const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
        Key: fileKey,
        Body: file,
        ContentType: file.type,
      };

      if (!params.Bucket) {
        throw new Error("AWS_S3_BUCKET_NAME tidak terkonfigurasi");
      }

      await s3Client.send(new PutObjectCommand(params));

      return `https://${params.Bucket}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileKey}`;
    } catch (error: any) {
      let errorMessage = "Gagal mengunggah ke S3";

      if (error.name === "CredentialsProviderError") {
        errorMessage = "Kredensial AWS tidak valid atau hilang";
      } else if (error.name === "NoSuchBucket") {
        errorMessage = "Bucket S3 tidak ditemukan";
      } else if (error.name === "AccessDenied") {
        errorMessage = "Akses ditolak ke bucket S3";
      } else if (error.$metadata?.httpStatusCode === 403) {
        errorMessage =
          "Tidak memiliki izin untuk mengunggah ke S3 (403 Forbidden)";
      } else if (error.message) {
        errorMessage = `Error S3: ${error.message}`;
      }

      console.error("Error uploading to S3:", {
        message: errorMessage,
        originalError: error,
        config: {
          region: process.env.NEXT_PUBLIC_AWS_REGION || "unset",
          bucketName: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME || "unset",
          hasAccessKey: !!process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
          hasSecretKey: !!process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
        },
      });

      throw { message: errorMessage, originalError: error };
    }
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      toast.error(
        `File terlalu besar. Maksimum ukuran adalah 5MB. File Anda: ${(file.size / (1024 * 1024)).toFixed(2)}MB`
      );
      e.target.value = "";
      return;
    }

    try {
      setIsUploading((prev) => ({ ...prev, [field]: true }));

      const previewUrl = URL.createObjectURL(file);
      if (field === "dokumentasiAwal") {
        setDokumentasiAwalPreview(previewUrl);
      } else if (field === "dokumentasiTengah") {
        setDokumentasiTengahPreview(previewUrl);
      } else if (field === "dokumentasiAkhir") {
        setDokumentasiAkhirPreview(previewUrl);
      }

      const fileUrl = await uploadToS3(file);
      console.log(fileUrl);
      form.setValue(field, fileUrl);
    } catch (error: any) {
      const errorMessage =
        error.message || "Gagal mengunggah gambar. Silakan coba lagi.";

      if (field === "dokumentasiAwal") {
        setDokumentasiAwalPreview(null);
      } else if (field === "dokumentasiTengah") {
        setDokumentasiTengahPreview(null);
      } else if (field === "dokumentasiAkhir") {
        setDokumentasiAkhirPreview(null);
      }
      
      toast.error(`Upload gagal: ${errorMessage}`);

      console.error("Upload failed details:", error);
    } finally {
      setIsUploading((prev) => ({ ...prev, [field]: false }));
      e.target.value = ""; // Reset input
    }
  };

  const removeImage = (field: string) => {
    const previewFields = {
      dokumentasiAwal: setDokumentasiAwalPreview,
      dokumentasiTengah: setDokumentasiTengahPreview,
      dokumentasiAkhir: setDokumentasiAkhirPreview,
    };

    previewFields[field as keyof typeof previewFields](null);
    form.setValue(field, "");
  };
  console.log(dokumentasiAwalPreview);

  const UploadComponent = ({
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
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="border-2 border-dashed rounded-lg p-2 text-center h-60 relative">
              {preview ? (
                <div className="relative w-full h-full">
                  <Image
                    src={preview}
                    alt={`${label} preview`}
                    fill
                    className="object-contain"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6 rounded-full"
                    onClick={() => removeImage(field)}
                    disabled={isUploading[field]}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-full cursor-pointer">
                  {isUploading[field] ? (
                    <>
                      <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
                      <p className="text-sm">Mengunggah...</p>
                    </>
                  ) : (
                    <>
                      <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                      <p className="text-xs font-medium mb-1">{label}</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        PNG, JPG (max 5MB)
                      </p>
                      <div className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90">
                        Pilih File
                      </div>
                      <input
                        type="file"
                        className="sr-only"
                        accept="image/png,image/jpeg,image/jpg"
                        onChange={(e) => handleFileChange(e, field)}
                        disabled={isUploading[field]}
                      />
                    </>
                  )}
                </label>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <UploadComponent
        field="dokumentasiAwal"
        preview={dokumentasiAwalPreview}
        label="Dokumentasi Awal"
      />

      <UploadComponent
        field="dokumentasiTengah"
        preview={dokumentasiTengahPreview}
        label="Dokumentasi Tengah"
      />

      <UploadComponent
        field="dokumentasiAkhir"
        preview={dokumentasiAkhirPreview}
        label="Dokumentasi Akhir"
      />
    </div>
  );
}
