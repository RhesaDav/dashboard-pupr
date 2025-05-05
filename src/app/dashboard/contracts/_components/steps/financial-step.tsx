"use client";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { formatRupiah } from "@/lib/utils";

interface TerminPercentages {
  uangMuka: number;
  termin1: number;
  termin2: number;
  termin3: number;
  termin4: number;
}

interface TerminItem {
  key: keyof TerminPercentages;
  label: string;
}

export default function FinancialStep() {
  const form = useFormContext();
  const nilaiKontrak: number = form.watch("nilaiKontrak") || 0;
  
  // Ambil nilai persentase dari form
  const initialFinancialProgress = form.watch("financialProgress") || {
    uangMuka: 0,
    termin1: 0,
    termin2: 0,
    termin3: 0,
    termin4: 0,
    totalProgress: 0,
    totalPayment: 0
  };

  const [percentages, setPercentages] = useState<TerminPercentages>({
    uangMuka: initialFinancialProgress.uangMuka || 0,
    termin1: initialFinancialProgress.termin1 || 0,
    termin2: initialFinancialProgress.termin2 || 0,
    termin3: initialFinancialProgress.termin3 || 0,
    termin4: initialFinancialProgress.termin4 || 0,
  });

  // Hitung nominal berdasarkan persentase
  const calculateNominal = (percentage: number): number => {
    return (percentage / 100) * nilaiKontrak;
  };

  // Hitung total persentase dan payment
  const totalPercentage: number = Object.values(percentages).reduce(
    (sum, value) => sum + value,
    0
  );

  const totalPayment: number = Object.values(percentages).reduce(
    (sum, value) => sum + calculateNominal(value),
    0
  );

  // Update form values when percentages change
  useEffect(() => {
    form.setValue("financialProgress", {
      ...percentages,
      totalProgress: totalPercentage,
      totalPayment: totalPayment
    });
  }, [percentages, nilaiKontrak]);

  const handlePercentageChange = (
    key: keyof TerminPercentages,
    value: string
  ): void => {
    const numValue = value === "" ? 0 : Number.parseFloat(value);
    setPercentages((prev) => ({ ...prev, [key]: numValue }));
  };

  const terminItems: TerminItem[] = [
    { key: "uangMuka", label: "Uang Muka" },
    { key: "termin1", label: "Termin 1" },
    { key: "termin2", label: "Termin 2" },
    { key: "termin3", label: "Termin 3" },
    { key: "termin4", label: "Termin 4" },
  ];

  return (
    <div className="space-y-6">
      {/* Informasi Dasar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Informasi Dasar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="paguAnggaran"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pagu Anggaran</FormLabel>
                  <FormControl>
                    <Input
                    type="number"
                    placeholder="Masukkan pagu anggaran"
                    {...field}
                    value={field.value === 0 ? "" : field.value}
                    onChange={(e) => {
                      const value =
                        e.target.value === ""
                          ? 0
                          : Number.parseFloat(e.target.value);
                      field.onChange(value);
                    }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nilaiKontrak"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nilai Kontrak</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Masukkan nilai kontrak"
                      {...field}
                      value={field.value === 0 ? "" : field.value}
                      onChange={(e) => {
                        const value =
                          e.target.value === ""
                            ? 0
                            : Number.parseFloat(e.target.value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="sumberDana"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sumber Dana</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan sumber dana"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Termins */}
      <Card className="bg-gray-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Ringkasan Finansial</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium">Total Persentase</p>
            <p className="text-xl font-bold">{totalPercentage}%</p>
          </div>
          <div>
            <p className="text-sm font-medium">Total Pembayaran</p>
            <p className="text-xl font-bold">{formatRupiah(totalPayment)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Termins */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Detail Pembayaran</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Total Progress dan Payment - tetap sama */}

          {/* Table-like layout for termins */}
          <div className="rounded-md border">
            <div className="grid grid-cols-12 border-b bg-gray-50 text-sm font-medium">
              <div className="col-span-4 p-3">Termin</div>
              <div className="col-span-4 p-3">Persentase (%)</div>
              <div className="col-span-4 p-3">Nominal</div>
            </div>

            {terminItems.map(({ key, label }) => (
              <div key={key} className="grid grid-cols-12 border-b last:border-0">
                <div className="col-span-4 flex items-center p-3 font-medium">
                  {label}
                </div>
                <div className="col-span-4 p-2">
                  <FormField
                    control={form.control}
                    name={`financialProgress.${key}`}
                    render={({ field }) => (
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="h-9"
                        {...field}
                        value={field.value === 0 ? "" : field.value}
                        onChange={(e) => {
                          const value = e.target.value === "" ? 0 : Number.parseFloat(e.target.value);
                          field.onChange(value);
                          handlePercentageChange(key, e.target.value);
                        }}
                      />
                    )}
                  />
                </div>
                <div className="col-span-4 p-2">
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="h-9 bg-gray-50"
                    value={calculateNominal(percentages[key]) || ""}
                    disabled
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
