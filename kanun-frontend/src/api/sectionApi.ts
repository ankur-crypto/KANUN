import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

export interface SectionDetails {
  id: number;
  sectionNumber: string;
  sectionTitle: string;
  description?: string;
  punishment?: string;

  cognizable: boolean;
  bailable: boolean;
  compoundable: boolean;

  classification?: string;
  court?: string;

  actId?: number;
  actCode?: string;
  actName?: string;

  offences: SectionOffence[];
}

export interface SectionOffence {
  id: number;
  offenceName: string;
  category?: string;
  description?: string;
}

export const getSectionById = async (
  id: number
): Promise<SectionDetails> => {
  const response =
    await axios.get<SectionDetails>(
      `${API_BASE_URL}/sections/${id}`
    );

  return response.data;
};