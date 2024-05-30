// import React, { useEffect } from "react";
// import axios from "axios";

// export function Example(){
//     const getMovie =()=>{
//         axios.get('https://api.themoviedb.org/3/discover/movie?api_key=062d962e4d43848f59edefe5e7460e58')
//         .then((res)=>{
//             console.log(res.data)
//         }
//         )
//         .catch(err=>console.log('error fetching data: ', err))
//     }

//     useEffect(()=>{
//         getMovie()
//     }, [])
//     return(
//         <>
        
//         </>
//     )
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import './MovieFetch.css'

const API_KEY= '062d962e4d43848f59edefe5e7460e58';
const URL = 'https://api.themoviedb.org/3/discover/movie';

export function Example(){
    const[movies, setMovies] = useState([]);
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=062d962e4d43848f59edefe5e7460e58`);
                console.log(response)
                setMovies(response.data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    return(
        <>
        {loading ? (
            <p>Loading...</p>
        ) : error ? (
            <p>Error: {error.message}</p>
        ) : (
            <div className="movie-container">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                    </div>
                ))}
            </div>
        )}
        </>
    )
}
