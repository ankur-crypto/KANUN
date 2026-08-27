import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

export interface SearchResult {
  offenceId?: number;
  offenceName?: string;
  offenceCategory?: string;
  offenceDescription?: string;

  sectionId: number;
  sectionNumber: string;
  sectionTitle: string;
  sectionDescription?: string;
  punishment?: string;

  cognizable: boolean;
  bailable: boolean;
  compoundable: boolean;

  classification?: string;
  court?: string;

  actId?: number;
  actCode?: string;
  actName?: string;
}

export type SearchType =
  | "all"
  | "offence"
  | "section"
  | "act";

export const searchKanun = async (
  query: string,
  type: SearchType = "all"
): Promise<SearchResult[]> => {
  const response =
    await axios.get<SearchResult[]>(
      `${API_BASE_URL}/search`,
      {
        params: {
          q: query,
          type,
        },
      }
    );

  return response.data;
};