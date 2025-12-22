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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { CreateItemType } from "@/lib/types/item";
import { createItem } from "@/lib/networks/item";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { getAllSections } from "@/lib/networks/section";

const ItemSchema = z.object({
  name: z.string().min(1, "Nama item wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  sectionId: z.string(),
});

type ItemFormType = z.infer<typeof ItemSchema>;

export default function CreateItemDialog({
  sectionId,
}: {
  sectionId?: string;
}) {
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();

  const form = useForm<ItemFormType>({
    resolver: zodResolver(ItemSchema),
    values: {
      name: "",
      description: "",
      sectionId: sectionId ? sectionId : "",
    },
  });

  const { data: sections } = useQuery({
    queryFn: getAllSections,
    queryKey: ["sections"],
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values: CreateItemType) => createItem(values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["items"] });
      toast.success("Item berhasil dibuat");
      setOpen(false);
      form.reset();
    },
    onError: () => {
      toast.error("Gagal membuat item");
    },
  });

  const onSubmit = async (values: ItemFormType) => {
    await mutateAsync({
      ...values,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full px-4 py-2">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Item
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Item</DialogTitle>
          <p className="text-sm text-muted-foreground -mt-1">
            Create a new item to manage your items
          </p>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
          <FieldGroup {...form}>
            <div className="grid gap-4">
              {/* Nama Item */}
              <Controller
                name="name"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Nama Item</FieldLabel>
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
                        placeholder="Deskripsi singkat item"
                      />
                    </InputGroup>
                  </Field>
                )}
              />
            </div>

            {!sectionId && (
              <Field>
                <FieldLabel>Select Section</FieldLabel>
                <Controller
                  name="sectionId"
                  control={form.control}
                  render={({ field }) => (
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Wilayah" />
                      </SelectTrigger>
                      <SelectContent>
                        {sections?.map((section) => (
                          <SelectItem
                            key={section.id}
                            value={section.id}
                            className="capitalize"
                          >
                            {section.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
            )}

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
