// src/actions/wilayah.ts
import { districts } from "@/lib/district";

interface District {
  kodeKabupaten: string;
  namaKabupaten: string;
  namaDistrik: string;
}

export async function getKota() {
  // Get unique city/district names
  const uniqueKabupaten = [...new Set(districts.map(item => item.namaKabupaten))];
  
  // Format data for the combobox
  return uniqueKabupaten.map(kabupaten => ({
    value: kabupaten,
    label: kabupaten
  })).sort((a, b) => a.label.localeCompare(b.label));
}

export async function getDistrik(selectedKota: string) {
  // Filter districts by the selected city/kabupaten
  const filteredDistricts = districts.filter(
    district => district.namaKabupaten === selectedKota
  );
  
  // Format data for the combobox
  return filteredDistricts.map(district => ({
    value: district.namaDistrik,
    label: district.namaDistrik
  })).sort((a, b) => a.label.localeCompare(b.label));
}