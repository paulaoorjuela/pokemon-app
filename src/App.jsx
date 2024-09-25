import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./pages/PokemonDetail";
import Navbar from "./components/Navbar"; // Import the new Navbar component
import "./styles.css";

// Main App Component
const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app-container">
          <Navbar setSearchResults={setSearchResults} /> {/* Use the Navbar component */}
          <main>
            <Routes>
              <Route
                path="/"
                element={<PokemonList searchResults={searchResults} />}
              />
              <Route path="/pokemon/:id" element={<PokemonDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
