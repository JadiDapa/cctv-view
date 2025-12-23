"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteCamera } from "@/lib/networks/camera";

export default function DeleteCameraDialog({ cameraId }: { cameraId: string }) {
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      await deleteCamera(cameraId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cameras"] });
      toast.success("Camera berhasil dihapus");
      setOpen(false);
    },
    onError: () => {
      toast.error("Gagal menghapus camera");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <p className="text-red-600">Delete</p>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete Camera Surveilence</DialogTitle>
        </DialogHeader>

        <p className="text-muted-foreground text-sm">
          Are you sure you want to delete this camera?{" "}
          <span className="font-semibold">This action cannot be undone</span>.
        </p>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={() => mutateAsync()}
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
