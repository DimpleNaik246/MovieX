import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Popular.css";

export function Popular() {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=062d962e4d43848f59edefe5e7460e58`
      )
      .then((res) => {
        setPopularMovies(
          res.data.results.filter((movie) => movie.vote_average >= 7)
        );
      })
      .catch((error) => console.log(error));
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i} className="star checked">★</span>);
      } else {
        stars.push(<span key={i} className="star">☆</span>);
      }
    }
    return stars;
  };

  return (
    <div className="popular-container">
      {popularMovies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{renderStars(Math.round(movie.vote_average / 2))}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
