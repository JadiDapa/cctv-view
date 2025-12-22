import { SectionType } from "./section";

export interface CreateItemType {
  name: string;
  description: string;
  sectionId: string;
}

export interface ItemType extends CreateItemType {
  id: string;
  section: SectionType;
  documents: DocumentType[];
  createdAt: Date;
  updatedAt: Date;
}
