import axiosInstance from "./axiosInstance";

export interface Act {
  id: number;
  actCode: string;
  actName: string;
  shortName?: string;
  description?: string;
  category?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Section {
  id: number;

  actId?: number;
  actCode?: string;
  actName?: string;

  sectionNumber: string;
  sectionTitle: string;

  description?: string;
  punishment?: string;
  classification?: string;

  cognizable: boolean;
  bailable: boolean;
  compoundable: boolean;

  court?: string;
  status?: string;
  sourceReference?: string;
}

export interface ActDetails extends Act {
  sections: Section[];
}

export const getActs = async (): Promise<Act[]> => {
  const response =
    await axiosInstance.get<Act[]>("/acts");

  return response.data;
};

export const getActById = async (
  id: number
): Promise<ActDetails> => {
  const response =
    await axiosInstance.get<ActDetails>(
      `/acts/${id}`
    );

  return response.data;
};