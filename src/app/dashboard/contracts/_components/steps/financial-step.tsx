"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default function FinancialStep() {
  const form = useFormContext()

  return (
    <div className="space-y-6">
        <FormField
          control={form.control}
          name="paguAnggaran"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pagu Anggaran</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan pagu anggaran" {...field} value={field.value || ""} />
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
                  onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number.parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sumberDana"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sumber Dana</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan sumber dana" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="financialProgress.totalProgress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Progress (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.00"
                    {...field}
                    value={field.value === 0 ? "" : field.value}
                    onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number.parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="financialProgress.totalPayment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Payment</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.00"
                    {...field}
                    value={field.value === 0 ? "" : field.value}
                    onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number.parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="financialProgress.uangMuka"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Uang Muka</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  {...field}
                  value={field.value === 0 ? "" : field.value}
                  onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number.parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="financialProgress.termin1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Termin 1</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.00"
                    {...field}
                    value={field.value === 0 ? "" : field.value}
                    onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number.parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="financialProgress.termin2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Termin 2</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.00"
                    {...field}
                    value={field.value === 0 ? "" : field.value}
                    onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number.parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="financialProgress.termin3"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Termin 3</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.00"
                    {...field}
                    value={field.value === 0 ? "" : field.value}
                    onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number.parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="financialProgress.termin4"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Termin 4</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.00"
                    {...field}
                    value={field.value === 0 ? "" : field.value}
                    onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number.parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
    </div>
  )
}
