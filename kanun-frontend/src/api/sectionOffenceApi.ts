import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

export const getOffencesBySection = async (
  sectionId: number
) => {
  const response = await axios.get(
    `${API_BASE_URL}/section-offences/section/${sectionId}`
  );

  return response.data;
};