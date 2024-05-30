import React, { useState } from "react";
import './Watchlist.css';
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";


export function Watchlist({watchlist, setWatchlist}){
    // console.log("ffd")
    const handleDelete = (id) => {
        const updatedWatchlist = watchlist.filter(movie => movie.id !== id);
        setWatchlist(updatedWatchlist);
    };

    

    

    

    return(
        <>
        <div className="watchlist">
            <h2>Watchlist</h2>
            <div className="watchlist-container">
                {watchlist.map(movie=>(
                    <div key={movie.id} className="watchlist-movie">
                        
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} /><br></br>
                        
                        <span>{movie.title}</span><button onClick={() => handleDelete(movie.id)} className="delete">Delete</button>
                    </div>
                ))}
            </div>
        </div>
        

        <ToastContainer/>
        
        </>
        
    );
}
