import { CreateSectionType, SectionType } from "../types/section";
import { axiosInstance } from "./axiosInstance";

export async function getAllSections() {
  const { data } = await axiosInstance.get<SectionType[]>("/sections");
  return data;
}

export async function getSectionById(id: string) {
  const { data } = await axiosInstance.get<SectionType>("/sections/" + id);
  return data;
}

export async function createSection(values: CreateSectionType) {
  const { data } = await axiosInstance.post("/sections", values);
  return data;
}

export async function updateSection(id: string, values: CreateSectionType) {
  const { data } = await axiosInstance.put(`/sections/${id}`, values);
  return data;
}

export async function deleteSection(id: string) {
  const { data } = await axiosInstance.delete("/sections/" + id);
  return data;
}
