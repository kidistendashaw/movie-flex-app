import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

//"I am building the Header.
//I need a variable (query) to remember what the user types.
//And I need a function (navigate) to jump to the search page when the user clicks Search."

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // reads the search box value, send our search what we typed,clear the box after search

  const handleSearch = (e) => {
    //This means the function receives an event e (usually from clicking a button or submitting a form).
    e.preventDefault(); // Stop form from refreshing the page
    if (query.trim()) {
      navigate(`/search/${query}`); // Go to the search page
      setQuery(""); // Clear the input box
    }
  };

  const activeLinkStyle = {
    color: "#DC2626",
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-8 mb-4 sm:mb-0">
          <Link
            to="/"
            className="text-2xl font-bold text-red-600 tracking-wider"
          >
            MOVIEFLIX
          </Link>
          <nav className="flex space-x-6 text-lg">
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              className="hover:text-red-600 transition-colors"
            >
              Popular
            </NavLink>
            <NavLink
              to="/category/top_rated"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              className="hover:text-red-600 transition-colors"
            >
              Top Rated
            </NavLink>
            <NavLink
              to="/category/upcoming"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              className="hover:text-red-600 transition-colors"
            >
              Upcoming
            </NavLink>
          </nav>
        </div>
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
            className="px-4 py-2 rounded-l-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button
            type="submit"
            className="bg-red-600 px-4 py-2 rounded-r-md hover:bg-red-700 transition duration-300"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
