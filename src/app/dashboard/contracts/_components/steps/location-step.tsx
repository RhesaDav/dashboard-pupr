"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default function LocationStep() {
  const form = useFormContext()

  return (
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="location.kota"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kota</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama kota" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location.distrik"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Distrik</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama distrik" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location.kampung"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kampung</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama kampung" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="location.koordinatAwal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Koordinat Awal</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: -6.123,106.456" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location.koordinatAkhir"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Koordinat Akhir</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: -6.123,106.456" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
  )
}
