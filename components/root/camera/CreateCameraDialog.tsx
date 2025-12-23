"use client";

import { useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { createCamera } from "@/lib/networks/camera";

const CameraSchema = z.object({
  title: z.string().min(1, "Judul kamera wajib diisi"),
  url: z.string().url("URL tidak valid"),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

type CameraFormType = z.infer<typeof CameraSchema>;

export default function CreateCameraDialog() {
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();

  const form = useForm<CameraFormType>({
    resolver: zodResolver(CameraSchema),
    defaultValues: {
      title: "",
      url: "",
      status: "ACTIVE",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: CameraFormType) => {
      createCamera(values);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cameras"] });
      toast.success("Camera berhasil ditambahkan");
      setOpen(false);
      form.reset();
    },
    onError: () => {
      toast.error("Gagal menambahkan camera");
    },
  });

  const onSubmit = async (values: CameraFormType) => {
    await mutateAsync(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="hover:bg-muted border-muted relative flex aspect-video cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-4 border-dashed transition-all">
          <Plus />
          <p>Add More Surveilance</p>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Surveillance</DialogTitle>
          <p className="text-muted-foreground -mt-1 text-sm">
            Register a new CCTV or surveillance camera
          </p>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
          <FieldGroup {...form}>
            <div className="grid gap-4">
              {/* TITLE */}
              <Controller
                name="title"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Camera Title</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        placeholder="Front Gate Camera"
                      />
                    </InputGroup>
                  </Field>
                )}
              />

              {/* URL */}
              <Controller
                name="url"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Stream URL</FieldLabel>
                    <InputGroup>
                      <InputGroupInput {...field} placeholder="http://..." />
                    </InputGroup>
                  </Field>
                )}
              />

              {/* STATUS */}
              <Controller
                name="status"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Status</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </div>

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? <Spinner /> : "Save"}
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
