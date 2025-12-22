import { CreateItemType, ItemType } from "../types/item";
import { axiosInstance } from "./axiosInstance";

export async function getAllItems() {
  const { data } = await axiosInstance.get<ItemType[]>("/items");
  return data;
}

export async function getItemById(id: string) {
  const { data } = await axiosInstance.get<ItemType>("/items/" + id);
  return data;
}

export async function createItem(values: CreateItemType) {
  const { data } = await axiosInstance.post("/items", values);
  return data;
}

export async function updateItem(id: string, values: CreateItemType) {
  const { data } = await axiosInstance.put(`/items/${id}`, values);
  return data;
}

export async function deleteItem(id: string) {
  const { data } = await axiosInstance.delete("/items/" + id);
  return data;
}
