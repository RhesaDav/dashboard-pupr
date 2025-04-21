"use client"
import { useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function SupervisionStep() {
  const form = useFormContext()

  return (
    <div className="space-y-6">
      {/* PPK & Korwaslap Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">PPK & Korwaslap</h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="ppk"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PPK</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan nama PPK"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nipPPK"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIP PPK</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan NIP PPK"
                    {...field}
                    value={field.value || ""}
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
            name="korwaslap"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Korwaslap</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan nama Korwaslap"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nipKorwaslap"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIP Korwaslap</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan NIP Korwaslap"
                    {...field}
                    value={field.value || ""}
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
            name="pengawasLapangan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pengawas Lapangan</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan nama Pengawas Lapangan"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nipPengawasLapangan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIP Pengawas Lapangan</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan NIP Pengawas Lapangan"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Separator */}
      <Separator className="my-6" />

      {/* Supervisi Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Supervisi</h3>
        
        <FormField
          control={form.control}
          name="konsultanSupervisi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konsultan Supervisi</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Masukkan nama konsultan supervisi" 
                  {...field} 
                  value={field.value || ""} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="nomorKontrakSupervisi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Kontrak Supervisi</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Masukkan nomor kontrak supervisi" 
                    {...field} 
                    value={field.value || ""} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nilaiKontrakSupervisi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nilai Kontrak Supervisi</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Masukkan nilai kontrak supervisi"
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
            name="tanggalKontrakSupervisi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Kontrak Supervisi</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="YYYY-MM-DD" 
                    {...field} 
                    value={field.value || ""} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="masaPelaksanaanSupervisi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Masa Pelaksanaan (hari)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Masukkan masa pelaksanaan"
                    {...field}
                    value={field.value === 0 ? "" : field.value}
                    onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number.parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}