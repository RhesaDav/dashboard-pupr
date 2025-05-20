"use client";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";
import { districts } from "@/lib/district";

export default function LocationStep() {
  const form = useFormContext();

  const [filteredDistricts, setFilteredDistricts] = useState(districts);
  const selectedKota = form.watch("location.kota");

  useEffect(() => {
    setFilteredDistricts(
      selectedKota
        ? districts.filter((d) => d.namaKabupaten === selectedKota)
        : districts
    );
  }, [selectedKota]);

  const uniqueKabupaten = [...new Set(districts.map((d) => d.namaKabupaten))];

  const isValidCoordinate = (coordinates: string) => {
    if (!coordinates) return false;
    const coordsPattern = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/;
    return coordsPattern.test(coordinates);
  };

  const openLocationInMap = (coordinates: string) => {
    // if (!coordinates || !isValidCoordinate(coordinates)) {
    //   alert(
    //     "Format koordinat tidak valid. Gunakan format: latitude,longitude (contoh: -6.123,106.456)"
    //   );
    //   return null;
    // }

    const [lat, lng] = coordinates.split(",").map((coord) => coord.trim());

    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  };

  const handleMapButtonClick = () => {
    const startCoords = form.watch("location.koordinatAwal");
    const endCoords = form.watch("location.koordinatAkhir");

    let urlToOpen = null;

    if (startCoords) {
      urlToOpen = openLocationInMap(startCoords);
    } else if (endCoords) {
      urlToOpen = openLocationInMap(endCoords);
    } else {
      alert("Mohon masukkan minimal satu koordinat (awal atau akhir)");
      return;
    }

    if (urlToOpen) {
      window.open(urlToOpen, "_blank");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lokasi Proyek</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="location.kota"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kota/Kabupaten</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Pilih Kota/Kabupaten" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {uniqueKabupaten.map((kabupaten, index) => (
                        <SelectItem
                          key={index}
                          value={kabupaten}
                          className="hover:bg-gray-100"
                        >
                          {kabupaten}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location.distrik"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kecamatan/Distrik</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    disabled={!selectedKota}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue
                          placeholder={
                            selectedKota
                              ? "Pilih Distrik"
                              : "Pilih Kota terlebih dahulu"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredDistricts.map((district, index) => (
                        <SelectItem
                          key={index}
                          value={district.namaDistrik}
                          className="hover:bg-gray-100"
                        >
                          {district.namaDistrik}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location.kampung"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Desa/Kampung</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan nama desa/kelurahan"
                    {...field}
                    value={field.value || ""}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="location.koordinatAwal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Koordinat Awal</FormLabel>
                  <div className="flex space-x-2">
                    <FormControl>
                      <Input
                        placeholder="Contoh: -6.123,106.456"
                        {...field}
                        value={field.value || ""}
                        className="h-12"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 px-3"
                      onClick={() => {
                        const url = openLocationInMap(field.value);
                        if (url) window.open(url, "_blank");
                      }}
                      disabled={!field.value}
                      title="Buka di Peta"
                    >
                      <Map className="h-5 w-5" />
                    </Button>
                  </div>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location.koordinatAkhir"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Koordinat Akhir</FormLabel>
                  <div className="flex space-x-2">
                    <FormControl>
                      <Input
                        placeholder="Contoh: -6.123,106.456"
                        {...field}
                        value={field.value || ""}
                        className="h-12"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 px-3"
                      onClick={() => {
                        const url = openLocationInMap(field.value);
                        if (url) window.open(url, "_blank");
                      }}
                      disabled={!field.value}
                      title="Buka di Peta"
                    >
                      <Map className="h-5 w-5" />
                    </Button>
                  </div>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
