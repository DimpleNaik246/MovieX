import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link, useNavigate } from "react-router-dom";
import "./MovieFetch.css";
import { FavoritePage } from "./Favorite/Favourite";


const API_KEY = "062d962e4d43848f59edefe5e7460e58";
const URL = "https://api.themoviedb.org/3";
const DB_URL = "http://localhost:5000"; 

export function MovieFetch({ watchlist, setWatchlist, userId }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${URL}/discover/movie?api_key=${API_KEY}`
        );
        //console.log(response.data.results);
        setMovies(response.data.results);
        setMovies(response.data.results.map(movie=>({...movie, rating:0})));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const addToWatchlist = async (movie) => {
    try {
      
      setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
      
      await axios.patch(`${DB_URL}/users/${userId}`, {
        watchlist: [...watchlist, movie]
      });
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };
  

  const addToFavorites = (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };

  // const favoriteNavigate = () => {
  //   navigator("/favorite");
  // };

  //rating
  function handleRating(movieId, rating){
      const movieIndex = movies.findIndex((movie)=>movie.id == movieId);
      const updatedMovies =[...movies];
      updatedMovies[movieIndex].rating = rating;
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === movieId ? { ...movie, rating: rating } : movie
        )
      );
  }

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <div className="favorites-button-container">
            {/* <button onClick={favoriteNavigate} className="favorites-button">
              Favorites
            </button> */}
          </div>

          
          <Carousel autoPlay infiniteLoop showThumbs={false}>
            {movies.slice(0, 10).map((movie) => (
              <div key={movie.id} className="carousel-slide">
                <div className="movie-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie && movie.backdrop_path}`}
                    alt={movie.title}
                  />
                  <p className="legend">{movie.title}</p>
                </div>
              </div>
            ))}
          </Carousel>

          <div className="movie-container">
            {movies.slice(10).map((movie) => (
              <div key={movie.id} className="movie-card">
                <div className="movie-card-inner">
                  <div className="movie-card-front">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                    />
                    {/* <p className="movie-title">{movie.title}</p> */}
                  </div>
                  
                  <div className="movie-card-back">
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <div className="rating">
                      {[1, 2, 3, 4, 5].map((index)=>(
                        <span key={index} className={`rating-star ${movie.rating && index<=movie.rating ? "checked": ""}`}
                        onClick={()=>handleRating(movie.id, index)}>
                          ★
                        </span>
                      ))}
                    

                  </div>
                    <button
                      onClick={() => addToWatchlist(movie)}
                      className="addToWatchlist"
                    >
                      Add to Watchlist
                    </button>
                    <i
                      className="bx bxs-heart"
                      onClick={() => addToFavorites(movie)}
                    ></i>
                  </div>
                </div>
              </div>
             
            ))}
             
          </div><br></br>
          {/* <FavoritePage favorites={favorites} /> */}

          
          <div className="navigateToSub" >
              <Link to="/subscription" underline="none" className="link-sub">
                <span>Take Subscription</span>
              </Link> 
              <p> to get access to unlimited movies!</p>
          </div>
              
        </>
      )}
    </>
  );
}
