import { fetcher } from '@/utilis/fetcher';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';

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
export default function ProduitCrud() {
  const {
    data,
    error,
    isLoading,
  } = useSWR("http://localhost:8000/api/getProduits", fetcher);

  console.log(data);

  // États pour gérer la recherche, la pagination et les données filtrées
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  /*
   {
        idProduit: 4,
        LibelleProduit: 'sac a dos',
        CodeProduit: 'PROD2836',
        description: 'Description du produit exemple',
        prixVente: 150,
        image: 'image_url',
        Seuil: 10,
        Stock: 50,
        PrixAchat: 10000,
        idCat: 2,
        created_at: '2024-09-06T10:17:41.000000Z',
        updated_at: '2024-09-06T10:17:41.000000Z'
      } */
  // Filtrer les données en fonction du terme de recherche
  const filteredData = data?.produits?.filter(
    (row) =>
      row.LibelleProduit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.CodeProduit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.Seuil.toString().includes(searchTerm) ||
      row.Stock.toString().includes(searchTerm) ||
      row.prixVente.toString().includes(searchTerm) ||
      row.PrixAchat.toString().includes(searchTerm)
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
    setCurrentPage(1);
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
          {currentRows?.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.LibelleProduit}</td>
              <td className="border px-4 py-2">{item.CodeProduit}</td>
              <td className="border px-4 py-2">{item.description}</td>
              <td className="border px-4 py-2">{item.Seuil}</td>

              <td
                className={`border px-4 py-2 ${
                  item.Stock <= item.Seuil
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {item.Stock}
              </td>
              {/* action */}
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                  Éditer
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">
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
