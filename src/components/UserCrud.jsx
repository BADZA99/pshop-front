import { fetcher } from "@/utilis/fetcher";
import React, { useState } from "react";
import useSWR from "swr";
 // Exemple de données
  const data = [
    {
      nom: "John Doe",
      email: "john.doe@example.com",
      statut: "Actif",
      role: "Admin",
    },
    {
      nom: "Jane Smith",
      email: "jane.smith@example.com",
      statut: "Inactif",
      role: "Utilisateur",
    },
    {
      nom: "Alice Johnson",
      email: "alice.johnson@example.com",
      statut: "Actif",
      role: "Modérateur",
    },
    {
      nom: "Bob Brown",
      email: "bob.brown@example.com",
      statut: "Actif",
      role: "Utilisateur",
    },
    {
      nom: "Charlie Davis",
      email: "charlie.davis@example.com",
      statut: "Inactif",
      role: "Admin",
    },
    // Ajoutez d'autres utilisateurs si nécessaire
  ];
export default function UserCrud() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/api/getUsers",
    fetcher
  );
  console.log(data);

  // États pour gérer la recherche, la pagination et les données filtrées
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  /*
    {
        id: 1,
        nom: 'John Doe',
        email: 'john.doe@example.com',
        email_verified_at: null,
        statut: 'active',
        role_id: 2,
        created_at: '2024-09-05T12:26:26.000000Z',
        updated_at: '2024-09-05T12:26:26.000000Z'
      }, */
  // Filtrer les données en fonction du terme de recherche
  const filteredData = data?.users?.filter(
    (row) =>
      row.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.statut.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.telephone.toString().includes(searchTerm)
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

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-4">gestion des utilisateurs</h2>

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
        Ajouter utilisateur
      </button>

      {/* Tableau */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Statut</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Telephone</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRows?.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.nom}</td>
              <td className="border px-4 py-2">{item.email}</td>
              <td className="border px-4 py-2">{item.statut}</td>
              <td className="border px-4 py-2">{item.role_id ===2 ? 'client' 
              
             
            : 'admin'}</td>
              <td className="border px-4 py-2">{item.telephone}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                  Editer
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
