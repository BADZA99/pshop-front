import React, { useEffect, useState } from 'react'

export default function ProduitCrud() {
  // Exemple de données
  const data = [
    {
      name: "Tiger Nixon",
      position: "System Architect",
      office: "Edinburgh",
      age: 61,
      startDate: "2011/04/25",
      salary: "$320,800",
    },
    {
      name: "Garrett Winters",
      position: "Accountant",
      office: "Tokyo",
      age: 63,
      startDate: "2011/07/25",
      salary: "$170,750",
    },
    {
      name: "Ashton Cox",
      position: "Junior Technical Author",
      office: "San Francisco",
      age: 66,
      startDate: "2009/01/12",
      salary: "$86,000",
    },
    {
      name: "Cedric Kelly",
      position: "Senior Javascript Developer",
      office: "Edinburgh",
      age: 22,
      startDate: "2012/03/29",
      salary: "$433,060",
    },
    {
      name: "Airi Satou",
      position: "Accountant",
      office: "Tokyo",
      age: 33,
      startDate: "2008/11/28",
      salary: "$162,700",
    },
    {
      name: "Brielle Williamson",
      position: "Integration Specialist",
      office: "New York",
      age: 61,
      startDate: "2012/12/02",
      salary: "$372,000",
    },
    {
      name: "Herrod Chandler",
      position: "Sales Assistant",
      office: "San Francisco",
      age: 59,
      startDate: "2012/08/06",
      salary: "$137,500",
    },
    {
      name: "Rhona Davidson",
      position: "Integration Specialist",
      office: "Tokyo",
      age: 55,
      startDate: "2010/10/14",
      salary: "$327,900",
    },
    {
      name: "Colleen Hurst",
      position: "Javascript Developer",
      office: "San Francisco",
      age: 39,
      startDate: "2009/09/15",
      salary: "$205,500",
    },
    {
      name: "Sonya Frost",
      position: "Software Engineer",
      office: "Edinburgh",
      age: 23,
      startDate: "2008/12/13",
      salary: "$103,600",
    },
    // Ajoutez d'autres données si nécessaire
  ];

  // États pour gérer la recherche, la pagination et les données filtrées
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  // Filtrer les données en fonction du terme de recherche
  const filteredData = data.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.office.toLowerCase().includes(searchTerm.toLowerCase())
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
      <h2 className="text-2xl font-bold mb-4">
        Exemple de Datatable avec Recherche et Pagination
      </h2>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded"
      />

      {/* Tableau */}
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Poste</th>
            <th className="px-4 py-2">Bureau</th>
            <th className="px-4 py-2">Âge</th>
            <th className="px-4 py-2">Date embauche</th>
            <th className="px-4 py-2">Salaire</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{row.name}</td>
              <td className="border px-4 py-2">{row.position}</td>
              <td className="border px-4 py-2">{row.office}</td>
              <td className="border px-4 py-2">{row.age}</td>
              <td className="border px-4 py-2">{row.startDate}</td>
              <td className="border px-4 py-2">{row.salary}</td>
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
