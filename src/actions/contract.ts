"use server"
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { ContractSchema } from '@/schemas/contractSchemas';

// const ContractSchema = z.object({
//   namaPaket: z.string().min(1, { message: "Nama Paket harus diisi" }),
//   kabupatenKota: z.string().min(1, { message: "Kabupaten/Kota harus diisi" }),
//   distrik: z.string().min(1, { message: "Distrik harus diisi" }),
//   kampung: z.string().min(1, { message: "Kampung harus diisi" }),
//   titikKoordinat: z.string().optional(),

//   pejabatPembuatKomitmen: z.string().min(1, { message: "Pejabat Pembuat Komitmen harus diisi" }),
//   nipPejabatPembuatKomitmen: z.string().min(1, { message: "NIP Pejabat Pembuat Komitmen harus diisi" }),

//   nomorKontrak: z.string().min(1, { message: "Nomor Kontrak harus diisi" }),
//   namaPenyedia: z.string().min(1, { message: "Nama Penyedia harus diisi" }),

//   nilaiKontrak: z
//     .number({ invalid_type_error: "Nilai Kontrak harus berupa angka" })
//     .min(0, { message: "Nilai Kontrak harus bernilai positif" }),

//   nilaiAnggaran: z
//     .number({ invalid_type_error: "Nilai Anggaran harus berupa angka" })
//     .min(0, { message: "Nilai Anggaran harus bernilai positif" }),

//   sumberDana: z.string().min(1, { message: "Sumber Dana harus diisi" }),

//   tanggalKontrak: z
//     .date({ invalid_type_error: "Tanggal Kontrak tidak valid, format harus berupa tanggal" }),

//   volumeKontrak: z
//     .number({ invalid_type_error: "Volume Kontrak harus berupa angka" })
//     .min(0, { message: "Volume Kontrak harus bernilai positif" }),

//   satuanKontrak: z.string().min(1, { message: "Satuan Kontrak harus diisi" }),

//   korwaslap: z.string().min(1, { message: "Korwaslap harus diisi" }),
//   nipKorwaslap: z.string().min(1, { message: "NIP Korwaslap harus diisi" }),

//   pengawasLapangan: z.string().min(1, { message: "Pengawas Lapangan harus diisi" }),
//   nipPengawasLapangan: z.string().min(1, { message: "NIP Pengawas Lapangan harus diisi" }),

//   hasilProdukAkhir: z.string().optional(),

//   progresFisik: z
//     .number({ invalid_type_error: "Progres Fisik harus berupa angka" })
//     .min(0, { message: "Progres Fisik minimal 0%" })
//     .max(100, { message: "Progres Fisik tidak boleh lebih dari 100%" })
//     .optional(),

//   progresKeuangan: z
//     .number({ invalid_type_error: "Progres Keuangan harus berupa angka" })
//     .min(0, { message: "Progres Keuangan minimal 0%" })
//     .max(100, { message: "Progres Keuangan tidak boleh lebih dari 100%" })
//     .optional(),

//   keuanganTerbayar: z
//     .number({ invalid_type_error: "Keuangan Terbayar harus berupa angka" })
//     .min(0, { message: "Keuangan Terbayar harus bernilai positif" })
//     .optional(),

//   volumeCapaian: z
//     .number({ invalid_type_error: "Volume Capaian harus berupa angka" })
//     .min(0, { message: "Volume Capaian harus bernilai positif" })
//     .optional(),

//   satuanCapaian: z.string().optional(),
// });

export type ContractInput = z.input<typeof ContractSchema>;

export async function getContracts(params?: {
  page?: number;
  pageSize?: number;
  search?: string;
}) {
  try {
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const search = params?.search || '';

    const where = search ? {
      OR: [
        { namaPaket: { contains: search } },
        { nomorKontrak: { contains: search } },
        { namaPenyedia: { contains: search } }
      ]
    } : {};

    const [total, contracts] = await Promise.all([
      prisma.contract.count({ where }),
      prisma.contract.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { tanggalKontrak: 'desc' }
      })
    ]);

    return {
      success: true,
      data: contracts,
      total,
      page,
      pageSize
    };

  } catch (error) {
    console.error('Error fetching contracts:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch contracts' 
    };
  }
}

export async function createContract(rawData: ContractInput) {
  try {
    const validatedData = ContractSchema.parse(rawData);

    const newContract = await prisma.contract.create({
      data: {
        namaPaket: validatedData.namaPaket,
        kabupatenKota: validatedData.kabupatenKota,
        distrik: validatedData.distrik,
        kampung: validatedData.kampung,
        titikKoordinat: validatedData.titikKoordinat,
        
        pejabatPembuatKomitmen: validatedData.pejabatPembuatKomitmen,
        nipPejabatPembuatKomitmen: validatedData.nipPejabatPembuatKomitmen,
        
        nomorKontrak: validatedData.nomorKontrak,
        namaPenyedia: validatedData.namaPenyedia,
        
        nilaiKontrak: validatedData.nilaiKontrak,
        nilaiAnggaran: validatedData.nilaiAnggaran,
        sumberDana: validatedData.sumberDana,
        
        tanggalKontrak: validatedData.tanggalKontrak,
        
        volumeKontrak: validatedData.volumeKontrak,
        satuanKontrak: validatedData.satuanKontrak,
        
        korwaslap: validatedData.korwaslap,
        nipKorwaslap: validatedData.nipKorwaslap,
        
        pengawasLapangan: validatedData.pengawasLapangan,
        nipPengawasLapangan: validatedData.nipPengawasLapangan,
        
        hasilProdukAkhir: validatedData.hasilProdukAkhir,
        progresFisik: validatedData.progresFisik,
        progresKeuangan: validatedData.progresKeuangan,
        
        keuanganTerbayar: validatedData.keuanganTerbayar,
        volumeCapaian: validatedData.volumeCapaian,
        satuanCapaian: validatedData.satuanCapaian,
      }
    });
    revalidatePath("/dashboard/contracts", "page")

    return { 
      success: true, 
      data: newContract,
      message: 'Kontrak berhasil dibuat' 
    };
  } catch (error) {
    console.error('Error creating contract:', error);
    
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: 'Validasi data gagal',
        details: error.errors
      };
    }

    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Gagal membuat kontrak' 
    };
  }
}

export async function editContract(id: string, rawData: Partial<ContractInput>) {
  try {
    const validatedData = ContractSchema.partial().parse(rawData);

    const updatedContract = await prisma.contract.update({
      where: { id },
      data: validatedData
    });
    revalidatePath("/dashboard/contracts", "page")

    return { 
      success: true, 
      data: updatedContract,
      message: 'Kontrak berhasil diperbarui' 
    };
  } catch (error) {
    console.error('Error updating contract:', error);
    
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: 'Validasi data gagal',
        details: error.errors 
      };
    }

    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Gagal memperbarui kontrak' 
    };
  }
}

export async function deleteContract(id: string) {
  try {
    const deletedContract = await prisma.contract.delete({
      where: { id }
    });

    revalidatePath("/dashboard/contracts", "page")

    return { 
      success: true, 
      data: deletedContract,
      message: 'Kontrak berhasil dihapus' 
    };
  } catch (error) {
    console.error('Error deleting contract:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Gagal menghapus kontrak' 
    };
  }
}

export async function getContractById(id: string) {
  try {
    const contract = await prisma.contract.findUnique({
      where: { id }
    });

    if (!contract) {
      return { 
        success: false, 
        error: 'Kontrak tidak ditemukan' 
      };
    }

    return { 
      success: true, 
      data: contract 
    };
  } catch (error) {
    console.error('Error fetching contract:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Gagal mengambil kontrak' 
    };
  }
}