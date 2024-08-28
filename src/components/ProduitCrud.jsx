import React, { useEffect, useState } from 'react'

export default function ProduitCrud() {
  // Exemple de données
const data = [
  {
    libelle: "Produit 1",
    codeProduit: "P001",
    description: "Description du produit 1",
    seuil: 10,
    stock: 5,
  },
  {
    libelle: "Produit 2",
    codeProduit: "P002",
    description: "Description du produit 2",
    seuil: 5,
    stock: 20,
  },
  {
    libelle: "Produit 3",
    codeProduit: "P003",
    description: "Description du produit 3",
    seuil: 8,
    stock: 30,
  },
  {
    libelle: "Produit 4",
    codeProduit: "P004",
    description: "Description du produit 4",
    seuil: 12,
    stock: 4,
  },
  {
    libelle: "Produit 5",
    codeProduit: "P005",
    description: "Description du produit 5",
    seuil: 15,
    stock: 60,
  },

];

  // États pour gérer la recherche, la pagination et les données filtrées
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  // Filtrer les données en fonction du terme de recherche
  const filteredData = data.filter(
    (row) =>
      row.libelle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.codeProduit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.seuil.toString().includes(searchTerm) ||
      row.stock.toString().includes(searchTerm)
  );

  // Calculer l'index des lignes à afficher pour la page courante
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  // Changer la page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Gérer la recherche
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // la première page lors d'une nouvelle recherche
  };
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-4">gestion des produits</h2>

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
        Ajouter produit
      </button>

      {/* Tableau */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Libelle</th>
            <th className="px-4 py-2">CodeProduit</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Seuil</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.libelle}</td>
              <td className="border px-4 py-2">{item.codeProduit}</td>
              <td className="border px-4 py-2">{item.description}</td>
              <td className="border px-4 py-2">{item.seuil}</td>
              <td
                className={`border px-4 py-2 ${
                  item.stock <= item.seuil
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {item.stock}
              </td>
              {/* action */}
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Éditer
                </button>
                <button
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
            { length: Math.ceil(filteredData.length / rowsPerPage) },
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
