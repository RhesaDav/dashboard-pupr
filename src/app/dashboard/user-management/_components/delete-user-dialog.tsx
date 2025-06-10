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
import { Loader, Trash } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteUserDialogProps {
  userId: string;
  userName: string;
  disabled?: boolean;
}

export function DeleteUserDialog({ userId, userName, disabled }: DeleteUserDialogProps) {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteUser(userId);
    setLoading(false);
    queryClient.refetchQueries({
      queryKey: ['users-management']
    })

    if (res.success) {
      toast.success(`User ${userName} berhasil dihapus`);
    } else {
      toast.error(res.error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={disabled} variant="outline">
            <Trash/>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus User?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus user <strong>{userName}</strong>? 
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
