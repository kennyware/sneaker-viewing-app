import axios from "axios";

const API_URL = "/api/sneakers/";

export const getSneakers = async (gender) => {
  const { data } = await axios.get(API_URL, {
    params: { gender },
  });

  return data;
};

export const getSneakerById = async (id) => {
  const { data } = await axios.get(API_URL + id);

  return data;
};

export const getBrands = async () => {
  const { data } = await axios.get(`${API_URL}brands`);

  return data;
};
