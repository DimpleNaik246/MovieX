import React from "react";
import "./Favorite.css";

export function FavoritePage({ favorites }) {
  return (
    <div className="favorite-container">
      <h1>Favorites</h1>
      <div className="favorite-list">
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <div key={favorite.id} className="favorite-card">
              <img
                src={`https://image.tmdb.org/t/p/w500/${favorite.poster_path}`}
                alt={favorite.title}
              />
              <h3>{favorite.title}</h3>
              <p>{favorite.overview}</p>
            </div>
          ))
        ) : (
          <p>No favorites yet.</p>
        )}
      </div>
    </div>
  );
}
