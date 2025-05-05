"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function AdditionalDetailsStep() {
  const form = useFormContext()

  return (
    <div className="space-y-6">
        <FormField
          control={form.control}
          name="hasilProdukAkhir"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hasil Produk Akhir</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan hasil produk akhir" {...field} value={field.value || ""} />
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
                <Input placeholder="Masukkan dimensi" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    </div>
  )
}
