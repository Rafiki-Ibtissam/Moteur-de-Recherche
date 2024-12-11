import React, { useState } from 'react';
import axios from 'axios';

const Indexer = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file || !title) {
            setResponseMessage('Fichier ou titre manquant.');
            return;
        }

        // Créer un FormData pour envoyer le fichier et le titre
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);

        try {
            // Envoyer la requête POST à l'API Spring Boot
            const response = await axios.post('http://localhost:8025/api/pdf/index', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResponseMessage(response.data.message || 'PDF indexé avec succès!');
        } catch (error) {
            setResponseMessage("Erreur lors de l'indexation du PDF : " + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Ajouter un Ressource Universitaire
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Titre du PDF :
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="  block text-sm font-medium text-gray-700">
                            Choisir un fichier PDF :
                        </label>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            required
                            className=" mt-1 block w-full text-sm  file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                    </div>
                    <button
                        type="submit"
                        className="primary-btn flex justify-center items-center   w-full  py-2 px-4 rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Ajouter
                    </button>
                </form>
                {responseMessage && (
                    <p
                        className={`mt-4 text-center font-medium ${
                            responseMessage.includes('Erreur') ? 'text-red-600' : 'text-green-600'
                        }`}
                    >
                        {responseMessage}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Indexer;
