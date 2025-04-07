"use client";

import { useEffect, useState, ReactNode } from "react"; // Import ReactNode
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
// Hapus Input jika tidak digunakan di file ini
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area"; // Tetap gunakan untuk list jika perlu
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Eye, Loader2 } from "lucide-react";
import { Contract, User } from "@prisma/client"; // Asumsi path @prisma/client benar
import { getAllContracts } from "@/actions/contract"; // Sesuaikan path
import {
  getUserContractAccess,
  updateContractAccess,
} from "@/actions/contract-access"; // Sesuaikan path
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge"; // Sesuaikan path
import { toast } from "sonner"; // Impor toast jika ingin digunakan
import { cn } from "@/lib/utils"; // Impor cn jika belum ada

interface UserAccessibilitySheetProps {
  user: User;
}

export default function UserAccessibilitySheet({
  user,
}: UserAccessibilitySheetProps) {
  const [contractData, setContractData] = useState<Contract[]>([]);
  const [selectedContracts, setSelectedContracts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false); // State terpisah untuk saving

  // Gunakan flag untuk mencegah fetch ganda di StrictMode (development)
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    // Hanya fetch jika user ada dan belum fetch sebelumnya
    if (user?.id && !hasFetched) {
      const fetchData = async () => {
        setIsLoading(true);
        setHasFetched(true); // Tandai sudah fetch
        try {
          // Fetch semua kontrak
          const contractsRes = await getAllContracts();
          // Sortir kontrak berdasarkan nama paket atau tanggal (opsional)
          const sortedContracts = (contractsRes.contracts || []).sort((a, b) =>
            (a.namaPaket || "").localeCompare(b.namaPaket || "")
          );
          setContractData(sortedContracts);

          // Fetch akses user yang sudah ada
          const accessRes = await getUserContractAccess(user.id);
          setSelectedContracts(accessRes.map((access) => access.contractId));
        } catch (error) {
          console.error("Failed to fetch data:", error);
          toast.error("Gagal memuat data hak akses."); // Tampilkan error toast
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
    // Reset fetch flag jika user berubah (misal sheet dibuka untuk user berbeda)
  }, [user, hasFetched]); // Tambahkan hasFetched ke dependency array

  const handleContractToggle = (contractId: string) => {
    setSelectedContracts((prev) =>
      prev.includes(contractId)
        ? prev.filter((id) => id !== contractId)
        : [...prev, contractId]
    );
  };

  const handleSave = async () => {
    setIsSaving(true); // Mulai loading simpan
    try {
      await updateContractAccess(user.id, selectedContracts);
      toast.success("Hak akses berhasil diperbarui."); // Tampilkan success toast
      // Biasanya sheet ditutup otomatis oleh SheetClose,
      // tapi Anda bisa tambahkan logika penutupan manual jika perlu
    } catch (error) {
      console.error("Failed to update access:", error);
      toast.error("Gagal menyimpan perubahan hak akses."); // Tampilkan error toast
    } finally {
      setIsSaving(false); // Selesai loading simpan
    }
  };

  const isAdminRole = user.role === "ADMIN" || user.role === "SUPERADMIN";

  // Hitung jumlah kontrak terpilih (selain oleh admin)
  const selectedCount = isAdminRole
    ? contractData.length // Admin dianggap memilih semua
    : selectedContracts.length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          title={`Lihat Akses ${user.name}`}
        >
          <Eye className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col">
        <SheetHeader className="mb-4 flex-shrink-0">
          <SheetTitle>Pengaturan Hak Akses Pengguna</SheetTitle>
          <SheetDescription>
            Kelola informasi pengguna dan izin akses kontrak spesifik.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-grow pr-6 -mr-6">
          <div className="space-y-5 pr-1">
            {/* --- Informasi Pengguna --- */}
            <div className="space-y-3 p-4 border rounded-lg bg-card">
              <h4 className="font-semibold text-base">Informasi Pengguna</h4>
              <Separator />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <div className="space-y-0.5">
                  <Label className="text-xs text-muted-foreground">Email</Label>
                  <div className="font-medium break-words">{user.email}</div>
                </div>
                <div className="space-y-0.5">
                  <Label className="text-xs text-muted-foreground">Nama</Label>
                  <div className="font-medium break-words">{user.name}</div>
                </div>
                <div className="space-y-0.5 col-span-1 sm:col-span-2">
                  <Label className="text-xs text-muted-foreground">Role</Label>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{user.role}</span>
                    {isAdminRole && (
                      <Badge variant="secondary">Full Access</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                <h4 className="font-semibold text-base">
                  Akses Kontrak ({selectedCount}/{contractData.length})
                </h4>
                {isAdminRole && (
                  <div className="text-xs sm:text-sm text-muted-foreground italic">
                    Admin/Superadmin memiliki akses ke semua kontrak.
                  </div>
                )}
              </div>
              <Separator />

              {isLoading ? (
                <div className="flex justify-center items-center py-10 h-48">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="border rounded-md max-h-[45vh] overflow-y-auto">
                  {contractData.length > 0 ? (
                    <div className="divide-y divide-border">
                      {contractData.map((contract) => (
                        <div
                          key={contract.id}
                          className={cn(
                            "flex items-start space-x-3 p-3 transition-colors",
                            isAdminRole
                              ? "opacity-60 cursor-not-allowed"
                              : "hover:bg-muted/50"
                          )}
                        >
                          <Checkbox
                            id={`contract-${contract.id}`}
                            checked={
                              isAdminRole ||
                              selectedContracts.includes(contract.id)
                            }
                            onCheckedChange={() =>
                              !isAdminRole && handleContractToggle(contract.id)
                            }
                            disabled={isAdminRole}
                            className="mt-1"
                          />
                          <Label
                            htmlFor={`contract-${contract.id}`}
                            className={cn(
                              "text-sm flex-1",
                              isAdminRole
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            )}
                          >
                            <div className="font-medium leading-snug mb-0.5">
                              {contract.namaPaket || "-"}
                            </div>
                            <div className="text-xs text-muted-foreground leading-tight">
                              {contract.nomorKontrak || "No ID"} •{" "}
                              {contract.tanggalKontrak
                                ? format(
                                    new Date(contract.tanggalKontrak),
                                    "dd MMM yyyy"
                                  )
                                : "-"}
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-muted-foreground">
                      Tidak ada data kontrak ditemukan.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="mt-auto pt-4 border-t flex-shrink-0">
          <Button
            onClick={handleSave}
            disabled={isLoading || isSaving || isAdminRole}
            type="button"
            className="w-full sm:w-auto"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              "Simpan Perubahan"
            )}
          </Button>
          <SheetClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Batal
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
