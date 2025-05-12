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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BasicInfoStep() {
  const form = useFormContext();

  const KEGIATAN_LIST = [
    "Pengawasan Penyelenggaraan Jalan Kewenangan Provinsi",
    "Pemantauan dan Evaluasi Penyelenggaraan Jalan/Jembatan",
    "Rehabilitasi Jalan",
    "Rekonstruksi Jalan",
    "Pembangunan Jembatan",
    "Pemeliharaan Berkala Jalan",
    "Penyusunan Rencana, Kebijakan, Strategi dan Teknis Pengembangan Jaringan Jalan serta Perencanaan Teknis Penyelenggaraan Jalan dan Jembatan",
    "Pembangunan Jalan",
    "Survey Kondisi Jalan/Jembatan",
  ] as const;

  return (
    <div className="space-y-6">
      {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6"> */}
      <FormField
        control={form.control}
        name="namaPaket"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nama Paket</FormLabel>
            <FormControl>
              <Input placeholder="Masukkan nama paket" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="namaPenyedia"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nama Penyedia</FormLabel>
            <FormControl>
              <Input
                placeholder="Masukkan nama penyedia"
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
        name="nomorKontrak"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nomor Kontrak</FormLabel>
            <FormControl>
              <Input
                placeholder="Masukkan nomor kontrak"
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
          name="tanggalKontrak"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Tanggal Kontrak</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "dd MMM yyyy")
                      ) : (
                        <span>Pilih tanggal</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date)}
                    initialFocus
                    defaultMonth={field.value ? new Date(field.value) : undefined}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="masaPelaksanaan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Masa Pelaksanaan (hari)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Masukkan masa pelaksanaan"
                  {...field}
                  value={field.value === 0 ? "" : field.value}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ""
                        ? 0
                        : Number.parseInt(e.target.value)
                    )
                  }
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
          name="subKegiatan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub Kegiatan</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={"Pilih subkegiatan"} />
                  </SelectTrigger>
                  <SelectContent>
                    {KEGIATAN_LIST.map((kegiatan) => (
                      <SelectItem key={kegiatan} value={kegiatan}>
                        {kegiatan}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-4 grid-cols-2">
          <FormField
            control={form.control}
            name="volumeKontrak"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Volume Kontrak</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Volume"
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
            name="satuanKontrak"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Satuan</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Satuan"
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
    </div>
  );
}
