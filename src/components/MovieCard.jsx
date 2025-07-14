// src/components/MovieCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  //This component accepts a movie object as a prop (meaning: it receives movie data from its parent).
  const posterUrl = movie.poster_path //It checks if the movie has a poster image (movie.poster_path).
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` //If yes, it builds the full URL to the movie poster image from TMDb.
    : "https://via.placeholder.com/500x750?text=No+Image"; //kelele yetewewal

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-red-500/50 transition-shadow duration-300">
      <Link to={`/movie/${movie.id}`}>
        <img src={posterUrl} alt={movie.title} className="w-full h-auto" />
        <div className="p-4">
          <h3 className="text-lg font-bold text-white">{movie.title}</h3>
          <p className="text-gray-400 text-sm mt-1">
            Release Date: {movie.release_date}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
