import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importer les modules nécessaires
import PdfSearchPage from "./components/Hero/PdfSearchPage";
import Indexer from "./components/Hero/indexer";


const App = () => {
  return (
    <Router>
      <main className="overflow-x-hidden bg-white text-dark">
        <Routes>
          {/* Route vers la page de recherche */}
          <Route path="/" element={<PdfSearchPage />} />
          {/* Route vers la page d'indexation */}
          <Route path="/indexer" element={<Indexer />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
