"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Eye, Loader2, Search, Shield } from "lucide-react";
import { Contract, User } from "@prisma/client";
import { getAllContracts } from "@/actions/contract";
import {
  getUserContractAccess,
  updateContractAccess,
} from "@/actions/contract-access";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface UserAccessibilitySheetProps {
  user: User;
}

export default function UserAccessibilitySheet({
  user,
}: UserAccessibilitySheetProps) {
  const [contractData, setContractData] = useState<Contract[]>([]);
  const [selectedContracts, setSelectedContracts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (user?.id && isOpen && !hasFetched) {
      const fetchData = async () => {
        setIsLoading(true);
        setHasFetched(true);
        try {
          const contractsRes = await getAllContracts();

          const sortedContracts = (contractsRes.data || []).sort((a, b) =>
            (a.namaPaket || "").localeCompare(b.namaPaket || "")
          );
          setContractData(sortedContracts);

          const accessRes = await getUserContractAccess(user.id);
          setSelectedContracts(accessRes.map((access) => access.contractId));
        } catch (error) {
          console.error("Failed to fetch data:", error);
          toast.error("Gagal memuat data hak akses.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [user, isOpen, hasFetched]);

  const handleContractToggle = (contractId: string) => {
    setSelectedContracts((prev) =>
      prev.includes(contractId)
        ? prev.filter((id) => id !== contractId)
        : [...prev, contractId]
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateContractAccess(user.id, selectedContracts);
      toast.success("Hak akses berhasil diperbarui.");
    } catch (error) {
      console.error("Failed to update access:", error);
      toast.error("Gagal menyimpan perubahan hak akses.");
    } finally {
      setIsSaving(false);
    }
  };

  const isAdminRole = user.role === "SUPERADMIN";

  const filteredContracts = contractData.filter((contract) => 
    (contract.namaPaket || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (contract.nomorKontrak || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCount = isAdminRole
    ? contractData.length
    : selectedContracts.length;

  return (
    <Sheet modal={true} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          title={`Lihat Akses ${user.name}`}
        >
          <Shield className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full h-full sm:h-auto sm:max-w-md md:max-w-lg lg:max-w-xl flex flex-col overflow-hidden p-0" side="right">
        <SheetHeader className="px-4 sm:px-6 pt-6 pb-2 flex-shrink-0">
          <SheetTitle className="text-xl">Pengaturan Hak Akses</SheetTitle>
          <SheetDescription>
            Kelola informasi pengguna dan izin akses kontrak spesifik.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-grow overflow-hidden flex flex-col px-4 sm:px-6">
          {/* --- Informasi Pengguna --- */}
          <div className="space-y-3 p-4 border rounded-lg bg-card mt-2 mb-4">
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

          <div className="space-y-3 flex-grow flex flex-col min-h-0">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-base">
                  Akses Kontrak 
                </h4>
                <Badge variant="outline" className="ml-1">
                  {selectedCount}/{contractData.length}
                </Badge>
              </div>
              {isAdminRole && (
                <div className="text-xs sm:text-sm text-muted-foreground italic">
                  Admin/Superadmin memiliki akses ke semua kontrak.
                </div>
              )}
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari kontrak..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={isLoading || isAdminRole}
              />
            </div>

            <Separator />

            <div className="flex-grow overflow-hidden">
              {isLoading ? (
                <div className="flex justify-center items-center h-full py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <ScrollArea className="h-[calc(100vh-16rem)] sm:h-[calc(100%-1rem)] pr-4 -mr-4">
                  {filteredContracts.length > 0 ? (
                    <div className="border rounded-md divide-y divide-border">
                      {filteredContracts.map((contract) => (
                        <div
                          key={contract.id}
                          className={cn(
                            "flex items-start p-3 transition-colors",
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
                            className="mt-1 mr-3 flex-shrink-0"
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
                            <div className="font-medium leading-snug mb-0.5 break-words">
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
                    <div className="p-6 text-center text-muted-foreground border rounded-md">
                      {searchQuery
                        ? "Tidak ada kontrak yang sesuai dengan pencarian."
                        : "Tidak ada data kontrak ditemukan."}
                    </div>
                  )}
                </ScrollArea>
              )}
            </div>
          </div>
        </div>

        <SheetFooter className="px-4 sm:px-6 py-4 border-t flex-shrink-0">
          <div className="flex flex-col-reverse sm:flex-row w-full gap-2 sm:justify-end">
            <SheetClose asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                Batal
              </Button>
            </SheetClose>
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
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}