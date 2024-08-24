import React, { useEffect, useState } from 'react'
import ProduitCrud from './ProduitCrud';
import CategorieCrud from './CategorieCrud';
import CommandeCrud from './CommandeCrud';
import UserCrud from './UserCrud';
import Statistiques from './Statistiques';

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState("Produits");

  useEffect(() => {}, []);

  // Fonction pour rendre le contenu en fonction de l'élément sélectionné
  const renderContent = () => {
    switch (activeItem) {
      case "Produits":
        return <ProduitCrud/>;
      case "Categories":
        return <CategorieCrud/>;
      case "commandes":
        return <CommandeCrud/>;
      case "utilisateurs":
        return <UserCrud/>;
      case "statistiques":
        return <Statistiques />;
      default:
        return <div>Veuillez sélectionner une option dans le menu !</div>;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation supérieure */}
      <nav className="bg-blue-500 p-4 flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-semibold">Admin Dashboard</h1>
        </div>
      </nav>

      {/* Conteneur principal pour l'aside et le main */}
      <div className="flex">
        {/* Navigation latérale */}
        <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
          <nav>
            <ul className="space-y-2">
              {/* Produits */}
              <li className="option-avec-déroulant">
                <div
                  className="flex items-center justify-between p-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => setActiveItem("Produits")}
                >
                  <div className="flex items-center">
                    <i className="fas fa-calendar-alt mr-2"></i>
                    <span>Produits</span>
                  </div>
                </div>
              </li>
              {/* Categories */}
              <li className="option-avec-déroulant">
                <div
                  className="flex items-center justify-between p-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => setActiveItem("Categories")}
                >
                  <div className="flex items-center">
                    <i className="fas fa-money-bill-wave mr-2"></i>
                    <span>Categories</span>
                  </div>
                  <i className="fas fa-chevron-down text-xs"></i>
                </div>
              </li>
              {/* commandes */}
              <li className="option-avec-déroulant">
                <div
                  className="flex items-center justify-between p-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => setActiveItem("commandes")}
                >
                  <div className="flex items-center">
                    <i className="fas fa-chart-bar mr-2"></i>
                    <span>commandes</span>
                  </div>
                </div>
              </li>
              {/* utilisateurs */}
              <li className="option-avec-déroulant">
                <div
                  className="flex items-center justify-between p-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => setActiveItem("utilisateurs")}
                >
                  <div className="flex items-center">
                    <i className="fas fa-file-alt mr-2"></i>
                    <span>utilisateurs</span>
                  </div>
                  <i className="fas fa-chevron-down text-xs"></i>
                </div>
              </li>
              {/* Statistiques */}
              <li className="option-avec-déroulant">
                <div
                  className="flex items-center justify-between p-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => setActiveItem("statistiques")}
                >
                  <div className="flex items-center">
                    <i className="fas fa-file-alt mr-2"></i>
                    <span>Statistiques</span>
                  </div>
                  <i className="fas fa-chevron-down text-xs"></i>
                </div>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Contenu principal */}
        <main className="flex-grow p-4 ">{renderContent()}</main>
      </div>
    </div>
  );
}