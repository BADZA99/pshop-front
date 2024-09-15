import React, { useEffect, useLayoutEffect, useState } from 'react'
import ProduitCrud from './ProduitCrud';
import CategorieCrud from './CategorieCrud';
import CommandeCrud from './CommandeCrud';
import UserCrud from './UserCrud';
import Statistiques from './Statistiques';
import { useUserStore } from '@/store/userStore';
import NavItems from './NavItems';

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState("Produits");
     const { setUser, user } = useUserStore();

console.log(user);

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

const fetchConnectedUser = async () => {
    try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/user", {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      Authorization: `Bearer ${token}`,
      },
    });
      console.log(response.data);
      setUser(response.data);
      
    } catch (error) {
      console.error(error);
    }
  };
  console.log(user);
  // useLayoutEffect(() => {
  //   fetchConnectedUser();
  // }, []);
  

  return (
    <>
      <NavItems />
      <div className="bg-gray-100 min-h-screen">
        {/* Navigation supérieure */}
        <nav className="bg-blue-500 p-4 flex items-center justify-between">
          <div>
            <h1 className="text-white text-xl font-semibold">{user?.nom}</h1>
          </div>
        </nav>

        {/* Conteneur principal pour  et le main */}
        <div className="flex">
          {/* Navigation latérale */}
          <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
            <nav>
              <ul className="space-y-2">
                {/* Produits */}
                <li className="option-avec-déroulant">
                  <div
                    className={`flex items-center justify-between p-2 hover:bg-gray-700 cursor-pointer ${
                      activeItem === "Produits" ? "bg-gray-700 text-white" : ""
                    }`}
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
                    className={`flex items-center justify-between p-2 hover:bg-gray-700 cursor-pointer ${
                      activeItem === "Categories"
                        ? "bg-gray-700 text-white"
                        : ""
                    }`}
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
                    className={`flex items-center justify-between p-2 hover:bg-gray-700 cursor-pointer ${
                      activeItem === "commandes" ? "bg-gray-700 text-white" : ""
                    }`}
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
                    className={`flex items-center justify-between p-2 hover:bg-gray-700 cursor-pointer ${
                      activeItem === "utilisateurs"
                        ? "bg-gray-700 text-white"
                        : ""
                    }`}
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
                    className={`flex items-center justify-between p-2 hover:bg-gray-700 cursor-pointer ${
                      activeItem === "statistiques"
                        ? "bg-gray-700 text-white"
                        : ""
                    }`}
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
    </>
  );
}