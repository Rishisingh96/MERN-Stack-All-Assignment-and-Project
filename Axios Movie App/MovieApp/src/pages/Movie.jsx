// import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../component/Card";
import { getMovie } from "../services/GetService";


import.meta.env.VITE_SOME_KEY
export const Movie = () => {
    const [data, setData] = useState([]);

    // const API =`https://www.omdbapi.com/?s=titanic&apikey=${import.meta.env.VITE_SOME_KEY}&page=1`;


    const getMovieData = async () => {
        try{
            // const res = await axios.get(API); // not need when you call another 
            const res = await getMovie();
            // console.log(res);
            // console.log(res.data);
            console.log(res.data.Search);
            setData(res.data.Search);
        } catch (error) {
            console.error("Error message:", error);
            console.error("Error status:", error.response.status);
            console.error("Error fetching movie data:", error.response.data);
        }
    };

    useEffect(() => {
        getMovieData();
    }, []);

    return (
        <ul>
            {
                data.map((curElement) => {
                    return <Card key = {curElement.imdbID} 
                    movieData = {curElement}
                    />;
                })
            }
        </ul>
    )
};