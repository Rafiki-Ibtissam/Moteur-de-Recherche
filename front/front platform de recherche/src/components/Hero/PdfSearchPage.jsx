import React, { useState } from "react";
import axios from "axios"
import { IoIosArrowRoundForward } from "react-icons/io";
import logo1 from  '../../assets/logo11.png';
import { animate, motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import HeroPng from "../../assets/hero-img1.png";

const PdfSearchPage = () => {
  const [keyword, setKeyword] = useState(""); 
  const [results, setResults] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!keyword) {
      setError("Veuillez entrer un mot-clé ou une phrase.");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await axios.get(
        `http://localhost:8025/api/pdf/search?keyword=${keyword}`
      );
      setResults(response.data);
    } catch (err) {
      setError("Aucun document trouvé ou une erreur s'est produite.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header with Logo */}
      <header className="py-4 px-6 flex justify-between items-center">
        <img src={logo1} alt="Logo" className="w-32 h-auto" />
        <button
          onClick={() => navigate("/indexer")} 
          className="primary-btn flex justify-center items-center px-4"
        >
         Ajouter un Cour
           </button>
      </header>

      

      {/* Main Content */}
      <main className="flex-grow container mx-auto flex flex-col md:flex-row items-start justify-between px-4 py-2">
      {/* Search Section */}
        <div className="w-1/2 space-y-6">
        <h1 className="text-4xl font-extrabold text-center md:text-left">
  Recherche Rapide et Précise de  {" "}
  <span className="text-secondary font-extrabold">Ressources</span> Universitaires
</h1>

          <form onSubmit={handleSearch} className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Enter keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="p-2 border border-gray-400 rounded flex-grow"
            />
            <button
              type="submit"
              disabled={loading}
              className="primary-btn flex justify-center items-center px-4"
            >
              {loading ? "Recherche..." : "Recherche"}
              <IoIosArrowRoundForward className="text-xl group-hover:translate-x-2 group-hover:-rotate-45 duration-300" />
            </button>
          </form>
          {error && <p className="text-red-500">{error}</p>}
          {results.length > 0 && (
            <ul className="space-y-4">
              {results.map((pdf, index) => (
                <li key={index} className="border p-4 rounded bg-white shadow">
                  <h3 className="font-bold">{pdf.title}</h3>
                 {/*  <p className="text-gray-700">{pdf.content.substring(0, 100)}...</p>*/}
                  <a href={pdf.path} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    Ouvrire PDF
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-0 md:mt-0">
  <img
    src={HeroPng}
    alt="Placeholder"
    
    style={{ width: '600px', height: '500px' }}
  className="rounded-lg shadow-lg"
  />
</div>
      </main>
    </div>
  );
};

export default PdfSearchPage;
