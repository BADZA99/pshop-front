import { useUserStore } from "@/store/userStore";
import NavItems from "./NavItems";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function UserCommandes() {
      const { user } = useUserStore();
      const [Usercommandes, setUserCommandes] = useState([]);

  // Récupérer les commandes existantes du localStorage
  const existingCommandes =
    JSON.parse(localStorage.getItem("commandes")) || {};
    console.log(localStorage.getItem("commandes"));
    console.log(existingCommandes);

      const getUserCommandes = (idClient) => {
        const allCommandes =
          JSON.parse(localStorage.getItem("commandes")) || {};
        return allCommandes[idClient] || [];
      };

     useEffect(() => {
       // Récupérer les commandes du localStorage
       const existingCommandes =
         JSON.parse(localStorage.getItem("commandes")) || {};
       setUserCommandes(existingCommandes[user?.id] || []);
     }, [user?.id]);

     const deleteCommande = (commandeId) => {
       const allCommandes = JSON.parse(localStorage.getItem("commandes")) || {};
       allCommandes[user?.id] = allCommandes[user?.id].filter(
         (c) => c.commandeId !== commandeId
       );
       localStorage.setItem("commandes", JSON.stringify(allCommandes));
       setUserCommandes(allCommandes[user?.id]);
         toast.success("Commande supprimée avec succès !");
     };
      

  return (
    <>
      <NavItems />
      <div>
        <div className=" -mx-4 flex flex-wrap p-8">
          {Usercommandes?.map((commande, index) => (
            <div key={index} className="w-full px-4 md:w-1/2 lg:w-1/3 mt-5">
              <div className="mb-9 rounded-xl py-8 px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9">
                <div className="mx-auto mb-7 inline-block">
                  <svg
                    width="53"
                    height="61"
                    viewBox="0 0 53 61"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="20.8433"
                      y="19.3018"
                      width="10.1675"
                      height="12.201"
                      fill="#ABA8F7"
                    ></rect>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.1119 5.91343C40.9499 4.62242 39.4875 3.95192 38.2383 4.04801C36.1465 4.20891 33.9414 5.92602 31.8695 8.63549C30.0459 11.0202 28.5417 13.8917 27.5307 16.2458C33.6951 16.5488 37.7115 15.7786 40.1926 14.5916C42.7088 13.3878 43.5948 11.7969 43.7449 10.3715C43.9049 8.85254 43.2637 7.19309 42.1119 5.91343ZM8.75274 16.6855C6.24093 15.1295 4.93328 12.9984 4.69026 10.691C4.42078 8.13252 5.49249 5.64717 7.08955 3.87282C8.6764 2.10982 10.9989 0.817106 13.4643 1.00675C16.9349 1.27372 19.8489 3.94064 22.0221 6.78264C23.4868 8.69803 24.7428 10.8606 25.7343 12.8643C26.7259 10.8606 27.9818 8.69803 29.4465 6.78264C31.6197 3.94064 34.5337 1.27372 38.0043 1.00675C40.4697 0.817106 42.7922 2.10982 44.3791 3.87282C45.9761 5.64717 47.0478 8.13252 46.7784 10.691C46.5353 12.9984 45.2277 15.1295 42.7159 16.6855H49.8822C51.286 16.6855 52.4241 17.8236 52.4241 19.2274V31.1348C52.4241 32.5386 51.286 33.6766 49.8822 33.6766H49.3122V58.6608C49.3122 59.9464 48.1845 60.9886 46.7933 60.9886H31.5363L31.5191 60.9887L31.502 60.9886H20.3521L20.3349 60.9887L20.3178 60.9886H5.0608C3.66963 60.9886 2.54187 59.9464 2.54187 58.6608L2.54187 33.6766C1.13804 33.6766 0 32.5386 0 31.1348V19.2274C0 17.8236 1.13803 16.6855 2.54187 16.6855H8.75274ZM33.0443 58.1952H46.2895V33.6766H33.0443V58.1952ZM33.0443 30.6264H49.3738V19.7358H33.0443V30.6264ZM29.994 19.7358V30.6264H21.8601V19.7358H29.994ZM29.994 33.6766V58.1952H21.8601V33.6766H29.994ZM18.8098 58.1952V33.6766H5.56459V58.1952H18.8098ZM18.8098 30.6264V19.7358H3.05024V30.6264H18.8098ZM13.2303 4.04801C11.9811 3.95192 10.5187 4.62242 9.35668 5.91343C8.20488 7.19309 7.56373 8.85254 7.72372 10.3715C7.87385 11.7969 8.7598 13.3878 11.276 14.5916C13.7571 15.7786 17.7735 16.5488 23.9379 16.2458C22.9269 13.8917 21.4227 11.0202 19.5991 8.63549C17.5272 5.92602 15.3221 4.20891 13.2303 4.04801Z"
                      fill="#6A64F1"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">
                    {commande.deliverTo}
                  </h3>
                  <p className="text-base font-medium text-body-color">
                    {commande.Adresse}
                  </p>
                  <p className="text-base font-medium text-body-color">
                    {commande.dateCommande}
                  </p>
                  <p className="text-base font-medium text-body-color">
                    {commande.montantCommande} €
                  </p>
                  <p className="text-base font-medium text-body-color">
                    details
                    {commande.cartItems?.map((item) => (
                      <li key={item.id}>
                        <p>Nom: {item.name}</p>
                        <p>Prix: {item.price} €</p>
                        <p>Couleur: {item.color}</p>
                        <p>Quantité: {item.quantity}</p>
                      </li>
                    ))}{" "}
                  </p>
                </div>
                {/* ajoute un bouton annuler */}
                <button
                  onClick={() => deleteCommande(commande.commandeId)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                >
                  Annuler
                </button>
              </div>
            </div>
          ))}
          {/* si vide pas de commandes */}
          {Usercommandes.length === 0 && (
            <div className=" text-center w-full px-4 md:w-1/2 lg:w-1/3 mt-5">
              <div className="mb-9 rounded-xl py-8 px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9">
                <h3 className="text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">
                  Vous avez pas encore de commandes
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
