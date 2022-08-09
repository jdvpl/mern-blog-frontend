import axios from "axios";

const clientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_URL_API}`,
});
export default clientAxios;
