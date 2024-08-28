import React, { useState } from "react";

export default function CommandeCrud() {
  // Exemple de données
  const data = [
    {
      dateCommande: "2023-01-01",
      montantCommande: 100,
      methodePaiement: "Carte de crédit",
      dateLivraison: "2023-01-05",
      adresse: "123 Rue Exemple, Paris",
      isPaid: true,
      numCommande: "CMD001",
    },
    {
      dateCommande: "2023-01-02",
      montantCommande: 200,
      methodePaiement: "PayPal",
      dateLivraison: "2023-01-06",
      adresse: "456 Rue Exemple, Lyon",
      isPaid: false,
      numCommande: "CMD002",
    },
    // Ajoutez d'autres commandes si nécessaire
  ];

  // États pour gérer la recherche, la pagination et les données filtrées
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  // Filtrer les données en fonction du terme de recherche
  const filteredData = data.filter(
    (row) =>
      row.dateCommande.includes(searchTerm) ||
      row.montantCommande.toString().includes(searchTerm) ||
      row.methodePaiement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.dateLivraison.includes(searchTerm) ||
      row.adresse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.numCommande.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (row.isPaid ? "oui" : "non").includes(searchTerm.toLowerCase())
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

  // Gérer l'édition
  const handleValider = (index,commande) => {
    console.log(`Edit order at index ${index}`);
    // mettre isPaid de commande a true
    commande.isPaid = true;
    // Ajoutez votre logique d'édition ici
  };

  // Gérer la suppression
  const handleInvalider = (index, commande) => {
    console.log(`Delete order at index ${index}`);
    commande.isPaid = false;
    // Ajoutez votre logique de suppression ici
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-4">Gestion des Commandes</h2>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded"
      />

      {/* Tableau */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">DateCommande</th>
            <th className="px-4 py-2">MontantCommande</th>
            <th className="px-4 py-2">MethodePaiement</th>
            <th className="px-4 py-2">DateLivraison</th>
            {/* <th className="px-4 py-2">Adresse</th> */}
            <th className="px-4 py-2">isPaid</th>
            <th className="px-4 py-2">numCommande</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.dateCommande}</td>
              <td className="border px-4 py-2">{item.montantCommande} €</td>
              <td className="border px-4 py-2">{item.methodePaiement}</td>
              <td className="border px-4 py-2">{item.dateLivraison}</td>
              {/* <td className="border px-4 py-2">{item.adresse}</td> */}
              <td
                className={`border px-4 py-2 ${
                  item.isPaid
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {item.isPaid ? "Oui" : "Non"}
              </td>
              <td className="border px-4 py-2">{item.numCommande}</td>
              <td className="border px-4 py-2 flex align-items-center">
                <button
                  onClick={() => handleValider(index,item)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  valider
                </button>
                <button
                  onClick={() => handleInvalider(index,item)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  invalider
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
