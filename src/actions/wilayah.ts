'use server';

interface WilayahItem {
  id: string;
  name: string;
}

export async function getKota(): Promise<{ value: string; label: string }[]> {
  try {
    const response = await fetch('https://www.emsifa.com/api-wilayah-indonesia/api/regencies/91.json');
    const kabupaten: WilayahItem[] = await response.json();
    
    return kabupaten.map(k => ({
      value: k.id,
      label: k.name
    }));
  } catch (error) {
    console.error('Error fetching kota data:', error);
    throw new Error('Gagal mengambil data kota');
  }
}

export async function getDistrik(kotaId: string): Promise<{ value: string; label: string }[]> {
  try {
    const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kotaId}.json`);
    const distrik: WilayahItem[] = await response.json();
    
    return distrik.map(d => ({
      value: d.id,
      label: d.name
    }));
  } catch (error) {
    console.error('Error fetching distrik data:', error);
    throw new Error('Gagal mengambil data distrik');
  }
}

export async function getDistrikDetail(kotaId: string): Promise<{id: string; name: string}> {
  console.log(kotaId)
  try {
    const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/district/${kotaId}.json`);
    const distrik: {id: string; name: string} = await response.json();
    
    return distrik
  } catch (error) {
    console.error('Error fetching distrik data:', error);
    throw new Error('Gagal mengambil data distrik');
  }
}