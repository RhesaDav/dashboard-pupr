"use server"
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { ContractSchema } from '@/schemas/contractSchemas';

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