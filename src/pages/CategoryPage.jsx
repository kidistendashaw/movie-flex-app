import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const API_KEY = import.meta.env.VITE_API_KEY;

const categoryTitles = {
  top_rated: "Top Rated Movies",
  upcoming: "Upcoming Movies",
  popular: "Popular Movies",
  now_playing: "Now Playing",
};

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Reset page when category changes
  useEffect(() => {
    setPage(1);
  }, [categoryName]);

  // Fetch movies
  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${categoryName}?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        setMovies(response.data.results);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error(`Failed to fetch ${categoryName} movies:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByCategory();
  }, [categoryName, page]);

  if (loading) {
    return (
      <div className="text-center text-white text-2xl mt-10">
        Loading movies...
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          {categoryTitles[categoryName] || "Movies"}
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>

      {/* Pagination Buttons */}
      {page > 1 && (
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          className="fixed top-1/2 left-4 transform -translate-y-1/2 bg-red-600/70 hover:bg-red-600 text-white font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center z-40 transition-colors"
        >
          ←
        </button>
      )}

      {movies.length > 0 && (
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="fixed top-1/2 right-4 transform -translate-y-1/2 bg-red-600/70 hover:bg-red-600 text-white font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center z-40 transition-colors"
        >
          →
        </button>
      )}
    </>
  );
};

export default CategoryPage;
