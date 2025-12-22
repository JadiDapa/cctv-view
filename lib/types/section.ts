import { ItemType } from "./item";

export interface CreateSectionType {
  name: string;
  description: string;
}

export interface SectionType extends CreateSectionType {
  id: string;
  items: ItemType[];
  createdAt: Date;
  updatedAt: Date;
}
