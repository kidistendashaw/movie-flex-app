// src/pages/SearchResults.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const API_KEY = import.meta.env.VITE_API_KEY;

const SearchResults = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Reset page to 1 when the query changes
  useEffect(() => {
    setPage(1);
  }, [query]);

  // Fetch movies when query or page changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=${page}`
        );
        setResults(response.data.results);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, page]);

  if (loading) {
    return (
      <div className="text-center text-white text-2xl mt-10">Searching...</div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-white mb-8">
          Search Results for "{query}"
        </h1>

        {results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-white text-xl">No movies found.</p>
        )}
      </div>

      {/* Floating Pagination Buttons */}
      {page > 1 && (
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          className="fixed top-1/2 left-4 transform -translate-y-1/2 bg-red-600/70 hover:bg-red-600 text-white font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center z-40 transition-colors"
        >
          ←
        </button>
      )}

      {results.length > 0 && (
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="fixed top-1/2 right-4 transform -translate-y-1/2 bg-red-600/70 hover:bg-red-600 text-white font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center z-40 transition-colors"
        >
          →
        </button>
      )}
    </>
  );
};

export default SearchResults;
