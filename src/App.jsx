// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import SearchResults from "./pages/SearchResults";
import CategoryPage from "./pages/CategoryPage"; // Import the new page

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search/:query" element={<SearchResults />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
