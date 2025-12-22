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
import { PlusCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

import { CreateSectionType } from "@/lib/types/section";
import { createSection } from "@/lib/networks/section";

const SectionSchema = z.object({
  name: z.string().min(1, "Nama section wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
});

type SectionFormType = z.infer<typeof SectionSchema>;

export default function CreateSectionDialog() {
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();

  const form = useForm<SectionFormType>({
    resolver: zodResolver(SectionSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values: CreateSectionType) => createSection(values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sections"] });
      toast.success("Section berhasil dibuat");
      setOpen(false);
      form.reset();
    },
    onError: () => {
      toast.error("Gagal membuat section");
    },
  });

  const onSubmit = async (values: SectionFormType) => {
    await mutateAsync(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full px-4 py-2">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Section
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Section</DialogTitle>
          <p className="text-sm text-muted-foreground -mt-1">
            Create a new section to manage your items
          </p>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
          <FieldGroup {...form}>
            <div className="grid gap-4">
              {/* Nama Section */}
              <Controller
                name="name"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Nama Section</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        placeholder="Contoh: IT Area"
                      />
                    </InputGroup>
                  </Field>
                )}
              />

              {/* Deskripsi */}
              <Controller
                name="description"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Deskripsi</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        placeholder="Deskripsi singkat section"
                      />
                    </InputGroup>
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
                Batal
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? <Spinner /> : "Submit"}
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
