import { fetcher } from "@/utilis/fetcher";
import React, { useState } from "react";
import useSWR from "swr";
  // Exemple de données
const data = [
  { nomCat: "Électronique" },
  { nomCat: "Mode" },
  { nomCat: "Maison et Jardin" },
  { nomCat: "Santé et Beauté" },
  { nomCat: "Sports et Loisirs" },
  { nomCat: "Jouets et Jeux" },
  { nomCat: "Alimentation et Boissons" },
  { nomCat: "Livres et Médias" },
  { nomCat: "Bricolage" },
  // Ajoutez d'autres catégories si nécessaire
];
export default function CategorieCrud() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/api/getCategories",
    fetcher
  );
  console.log(data);

  // États pour gérer la recherche, la pagination et les données filtrées
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  /*
     {
        idCat: 2,
        NomCat: 'eletro-menager',
        created_at: '2024-09-05T16:02:55.000000Z',
        updated_at: '2024-09-05T16:03:53.000000Z'
      }, */
  // Filtrer les données en fonction du terme de recherche
  const filteredData = data?.categories?.filter((row) =>
    row.NomCat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculer l'index des lignes à afficher pour la page courante
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData?.slice(indexOfFirstRow, indexOfLastRow);

  // Changer la page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Gérer la recherche
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // la première page lors d'une nouvelle recherche
  };

  // Gérer l'édition
  const handleEdit = (index) => {
    console.log(`Edit category at index ${index}`);
    // Ajoutez votre logique d'édition ici
  };

  // Gérer la suppression
  const handleDelete = (index) => {
    console.log(`Delete category at index ${index}`);
    // Ajoutez votre logique de suppression ici
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-4">Gestion des Catégories</h2>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded"
      />

      {/* bouton ajouter */}
      <button className="bg-blue-500 text-white px-2 py-1 rounded mb-4">
        Ajouter categorie
      </button>

      {/* Tableau */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">NomCat</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRows?.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.NomCat}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Éditer
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4">
        <ul className="inline-flex items-center -space-x-px">
          {Array.from(
            { length: Math.ceil(filteredData?.length / rowsPerPage) },
            (_, i) => (
              <li
                key={i}
                onClick={() => paginate(i + 1)}
                className={`cursor-pointer px-3 py-1 border ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500"
                }`}
              >
                {i + 1}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
