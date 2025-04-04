"use client";

import { useState } from "react";
import { deleteUser } from "@/actions/user";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteContract } from "@/actions/contract";
import { Loader, Trash } from "lucide-react";

interface DeleteContractDialogProps {
  contractId: string;
  contractName: string;
}

export function DeleteContractDialog({ contractId, contractName }: DeleteContractDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteContract(contractId);
    setLoading(false);

    if (res.success) {
      toast.success(`Contract ${contractName} berhasil dihapus`);
    } else {
      toast.error(res.error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
            <Trash/>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Data Kontrak?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus data kontrak <strong>{contractName}</strong>? 
            Tindakan ini tidak dapat dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="flex items-center gap-2">
            {loading && <Loader className="w-4 h-4 animate-spin" />}
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
