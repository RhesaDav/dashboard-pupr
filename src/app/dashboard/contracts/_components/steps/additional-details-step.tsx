"use client";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdditionalDetailsStep() {
  const form = useFormContext();
  const PRODUK_AKHIR_LIST = [
    "HRS WC",
    "HRS BASE",
    "Lapen",
    "Rigid",
    "Urpil",
    "AC WC",
    "Talud",
    "Bronjong",
  ] as const;

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="hasilProdukAkhir"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Hasil Produk Akhir</FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={"Pilih hasil produk akhir"} />
                </SelectTrigger>
                <SelectContent>
                  {PRODUK_AKHIR_LIST.map((produk) => (
                    <SelectItem key={produk} value={produk}>
                      {produk}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="dimensi"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dimensi</FormLabel>
            <FormControl>
              <Input
                placeholder="Masukkan dimensi"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
