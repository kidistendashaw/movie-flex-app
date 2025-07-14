// src/pages/MovieDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
    window.scrollTo(0, 0); // Scroll to top on load
  }, [id]);

  if (loading) {
    return (
      <div className="text-center text-white text-2xl mt-10">
        Loading details...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center text-white text-2xl mt-10">
        Movie not found.
      </div>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg self-start"
        />
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-400 italic mb-4">{movie.tagline}</p>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 font-bold text-lg mr-2">
              ★ {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-400">({movie.vote_count} votes)</span>
          </div>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-300">{movie.overview}</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p>
            <span className="font-semibold">Release Date:</span>{" "}
            {movie.release_date}
          </p>
          <p>
            <span className="font-semibold">Runtime:</span> {movie.runtime}{" "}
            minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
