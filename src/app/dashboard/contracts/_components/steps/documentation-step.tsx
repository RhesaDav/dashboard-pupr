"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";

import { useForm, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";

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

  // For demonstration purposes, we're using base64 strings
  // In a real application, you would upload these to a server
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (field === "dokumentasiAwal") {
          setDokumentasiAwalPreview(base64String);
          form.setValue("dokumentasiAwal", base64String);
        } else if (field === "dokumentasiTengah") {
          setDokumentasiTengahPreview(base64String);
          form.setValue("dokumentasiTengah", base64String);
        } else if (field === "dokumentasiAkhir") {
          setDokumentasiAkhirPreview(base64String);
          form.setValue("dokumentasiAkhir", base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (field: string) => {
    if (field === "dokumentasiAwal") {
      setDokumentasiAwalPreview(null);
      form.setValue("dokumentasiAwal", "");
    } else if (field === "dokumentasiTengah") {
      setDokumentasiTengahPreview(null);
      form.setValue("dokumentasiTengah", "");
    } else if (field === "dokumentasiAkhir") {
      setDokumentasiAkhirPreview(null);
      form.setValue("dokumentasiAkhir", "");
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="dokumentasiAwal"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dokumentasi Awal</FormLabel>
            <FormControl>
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  {dokumentasiAwalPreview ? (
                    <div className="relative mx-auto w-full h-48">
                      <Image
                        src={dokumentasiAwalPreview || "/placeholder.svg"}
                        alt="Dokumentasi awal preview"
                        fill
                        className="object-contain"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 rounded-full"
                        onClick={() => removeImage("dokumentasiAwal")}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-4">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="mb-1 text-sm font-medium">
                        Upload dokumentasi awal
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        PNG, JPG or JPEG
                      </p>
                      <label
                        htmlFor="dokumentasi-awal"
                        className="cursor-pointer"
                      >
                        <div className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
                          Pilih Gambar
                        </div>
                        <input
                          id="dokumentasi-awal"
                          type="file"
                          className="sr-only"
                          accept="image/png,image/jpeg,image/jpg"
                          onChange={(e) =>
                            handleFileChange(e, "dokumentasiAwal")
                          }
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="dokumentasiTengah"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dokumentasi Tengah</FormLabel>
            <FormControl>
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  {dokumentasiTengahPreview ? (
                    <div className="relative mx-auto w-full h-48">
                      <Image
                        src={dokumentasiTengahPreview || "/placeholder.svg"}
                        alt="Dokumentasi tengah preview"
                        fill
                        className="object-contain"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 rounded-full"
                        onClick={() => removeImage("dokumentasiTengah")}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-4">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="mb-1 text-sm font-medium">
                        Upload dokumentasi tengah
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        PNG, JPG or JPEG
                      </p>
                      <label
                        htmlFor="dokumentasi-tengah"
                        className="cursor-pointer"
                      >
                        <div className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
                          Pilih Gambar
                        </div>
                        <input
                          id="dokumentasi-tengah"
                          type="file"
                          className="sr-only"
                          accept="image/png,image/jpeg,image/jpg"
                          onChange={(e) =>
                            handleFileChange(e, "dokumentasiTengah")
                          }
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="dokumentasiAkhir"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dokumentasi Akhir</FormLabel>
            <FormControl>
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  {dokumentasiAkhirPreview ? (
                    <div className="relative mx-auto w-full h-48">
                      <Image
                        src={dokumentasiAkhirPreview || "/placeholder.svg"}
                        alt="Dokumentasi akhir preview"
                        fill
                        className="object-contain"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 rounded-full"
                        onClick={() => removeImage("dokumentasiAkhir")}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-4">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="mb-1 text-sm font-medium">
                        Upload dokumentasi akhir
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        PNG, JPG or JPEG
                      </p>
                      <label
                        htmlFor="dokumentasi-akhir"
                        className="cursor-pointer"
                      >
                        <div className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
                          Pilih Gambar
                        </div>
                        <input
                          id="dokumentasi-akhir"
                          type="file"
                          className="sr-only"
                          accept="image/png,image/jpeg,image/jpg"
                          onChange={(e) =>
                            handleFileChange(e, "dokumentasiAkhir")
                          }
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
