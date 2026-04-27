import axios from "axios";
import.meta.env.VITE_SOME_KEY
const api = axios.create({
   baseURL: "https://www.omdbapi.com/", // ✅ sahi
});
export const getMovie = () =>{
    return api.get(`?s=titanic&apikey=${import.meta.env.VITE_SOME_KEY}&page=1`);
};

