import axios from "axios";

const TMDB_KEY = process.env.NEXT_PUBLIC_TMDB_TOKEN;

const axiosEndpoint = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${TMDB_KEY}`,
  },
});

export default axiosEndpoint;
