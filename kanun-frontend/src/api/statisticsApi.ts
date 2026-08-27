import axiosInstance from "./axiosInstance";

export interface Statistics {
  acts: number;
  sections: number;
  offences: number;
}

export const getStatistics =
  async (): Promise<Statistics> => {
    const response =
      await axiosInstance.get<Statistics>(
        "/statistics"
      );

    return response.data;
  };