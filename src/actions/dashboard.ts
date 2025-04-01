"use server"

import { prisma } from "@/lib/prisma"
import { ZodError } from "zod";

export async function getDashboardReport() {
    try {
        const jumlahPaket = await prisma.contract.count()
        const result = {
            jumlahPaket,
            nilaiKontrak: 100000,
            nilaiAnggaran: 1000000,
            progressFisik: 35,
            progressKeuangan: 40
        }
        return { success: true, report: result };
    } catch (error) {
        if (error instanceof ZodError) {
              console.log(error.errors);
              return {
                success: false,
                error: error.errors.map((err) => err.message).join(", "),
              };
            }
            if (error instanceof Error) {
              console.log(error);
              return { success: false, error: error.message };
            }
        
            return { success: false, error: "Something wrong" };
    }
}