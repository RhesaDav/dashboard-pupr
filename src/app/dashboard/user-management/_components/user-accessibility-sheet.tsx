import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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
import { Eye, Loader2 } from "lucide-react";
import { Contract, User } from "@prisma/client";
import { getAllContracts } from "@/actions/contract";
import { getUserContractAccess, updateContractAccess } from "@/actions/contract-access";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface UserAccessibilitySheetProps {
  user: User
}

export default function UserAccessibilitySheet({
  user
}: UserAccessibilitySheetProps) {
  const [contractData, setContractData] = useState<Contract[]>([])
  const [selectedContracts, setSelectedContracts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch semua kontrak
        const contractsRes = await getAllContracts();
        setContractData(contractsRes.contracts || []);
        
        // Fetch akses user yang sudah ada
        const accessRes = await getUserContractAccess(user.id);
        setSelectedContracts(accessRes.map(access => access.contractId));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  const handleContractToggle = (contractId: string) => {
    setSelectedContracts(prev => 
      prev.includes(contractId)
        ? prev.filter(id => id !== contractId)
        : [...prev, contractId]
    );
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await updateContractAccess(user.id, selectedContracts);
      // Optional: Show success toast
    } catch (error) {
      console.error("Failed to update access:", error);
      // Optional: Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  const isAdminRole = user.role === "ADMIN" || user.role === "SUPERADMIN"

  return (
    <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" size="icon">
        <Eye className="h-4 w-4" />
      </Button>
    </SheetTrigger>
    <SheetContent className="sm:max-w-xl">
      <SheetHeader className="mb-4">
        <SheetTitle>Pengaturan Hak Akses</SheetTitle>
        <SheetDescription>
          Kelola informasi pengguna dan izin akses kontrak
        </SheetDescription>
      </SheetHeader>
      
      <div className="space-y-6">
        {/* Informasi Pengguna */}
        <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium">Informasi Pengguna</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-muted-foreground">Email</Label>
              <div className="font-medium">{user.email}</div>
            </div>
            
            <div className="space-y-1">
              <Label className="text-muted-foreground">Nama</Label>
              <div className="font-medium">{user.name}</div>
            </div>
            
            <div className="space-y-1">
              <Label className="text-muted-foreground">Role</Label>
              <div className="flex items-center gap-2">
                <span className="font-medium">{user.role}</span>
                {isAdminRole && (
                  <Badge variant="secondary">Full Access</Badge>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Hak Akses Kontrak */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Akses Kontrak</h4>
            {isAdminRole && (
              <div className="text-sm text-muted-foreground">
                Admin memiliki akses ke semua kontrak
              </div>
            )}
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <ScrollArea className="h-64 rounded-md border">
              <div className="p-4 space-y-3">
                {contractData.map((contract) => (
                  <div 
                    key={contract.id} 
                    className={`flex items-center space-x-3 p-2 rounded ${isAdminRole ? 'opacity-50' : 'hover:bg-muted/50'}`}
                  >
                    <Checkbox 
                      id={contract.id}
                      checked={selectedContracts.includes(contract.id)}
                      onCheckedChange={() => handleContractToggle(contract.id)}
                      disabled={isAdminRole}
                    />
                    <Label
                      htmlFor={contract.id}
                      className={`text-sm flex-1 cursor-pointer ${isAdminRole ? 'cursor-default' : ''}`}
                    >
                      <div className="font-medium">{contract.namaPaket}</div>
                      <div className="text-xs text-muted-foreground">
                        {contract.nomorKontrak} • {format(contract.tanggalKontrak, "dd MMM yyyy")}
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
      
      <SheetFooter className="mt-6">
          <SheetClose asChild>
            <Button 
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : "Simpan Perubahan"}
            </Button>
          </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>  );
}