import React, { useRef, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const API_KEY = "062d962e4d43848f59edefe5e7460e58";
const URL = "https://api.themoviedb.org/3";

export function HeaderPage({ userEmail, handleFavorites, setIsLogin, isLogin }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimeout = useRef(null);

  const navigateAction = useNavigate();

  //search functionality
  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `${URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  //onchange search
  const handleChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    if (value) {
      handleSearch(value);
    } else {
      setSearchResults([]);
    }
  };

  //dropdown-open
  const handleDropdownOpen = () => {
    clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };


  //dropdown-close
  const handleDropdownClose = () => {
    dropdownTimeout.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 300);
  };

  const closeDropdown = () => {
    clearTimeout(dropdownTimeout.current);
    setDropdownOpen(false);
  };

  
  const handleLoginClick = () => {
    navigate("/");
    closeDropdown();
    setIsLogin(true);
  };

  function handleWatchlist() {
    
    navigate("/watchlist");
  }

  function handleFavorite() {
    // handleFavorite();
    closeDropdown();
    navigate("/favorites");
  }


  function logoutAction(){
    console.log("logged out")
    setIsLogin(false);
    navigateAction('/');
    
}

function handleHome(){
  navigate("/moviefetch")
}

  return (
    <>
      <div className="header">
        <div className="sub-header">
          <div className="search-container">
            <button onClick={handleHome} className="home-btn">Home</button>
            <input 
              type="search"
              placeholder="Search movie..."
              value={searchQuery}
              onChange={handleChange}
            />
            <i className="bx bx-search-alt-2"></i>
          </div>
          <div
            className="dropdown"
            onMouseEnter={handleDropdownOpen}
            onMouseLeave={handleDropdownClose}
          >
            <button className="dropdown-toggle">
              <i className="bx bx-user"></i>
            </button>
            {dropdownOpen && (
              <div
                className="dropdown-menu"
                onMouseEnter={handleDropdownOpen}
                onMouseLeave={handleDropdownClose}
              >
                <button className="dropdown-item" onClick={handleLoginClick}>
                  LogIn
                </button>
                {/* <button className="dropdown-item" onClick={handleFavorite}>
                  Favorites
                </button> */}
                <div className="user-email">{userEmail}</div>
              </div>
            )}
          </div>
          <button className="watchlist" onClick={handleWatchlist}>
            Watchlist
          </button>
          <button className="popular" onClick={() => navigate("/popular")}>
            Popular
          </button>

          
          

          {isLogin && <button onClick={logoutAction} className="logout">LogOut</button>}

          
        </div>
      </div>
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2 style={{color:"white"}}>Search Results</h2>
          <div className="movie-cards">
            {searchResults.map((movie) => (
              <div className="movie-card" key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.release_date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
