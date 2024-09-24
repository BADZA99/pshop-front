import { fetcher } from '@/utilis/fetcher';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

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
     const [photoProduit, setphotoProduit] = useState(null);
        const [selectedImage, setSelectedImage] = useState(null);
  const {
    data,
    error,
    isLoading,
  } = useSWR("http://localhost:8000/api/getProduits", fetcher);
  console.log(data);
  const {
    data : categories,
    error2,
    isLoading2,
  } = useSWR("http://localhost:8000/api/getCategories", fetcher);
  console.log(categories);



    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm();
    const {
      register: registerAddProduit,
      handleSubmit: handleSubmitAddProduit,
      formState: { errors: formStateAddProduit },
      reset: resetAddProduit,
    } = useForm();

      const handleImageChange = (event) => {
        const file = event.target.files[0];
        setphotoProduit(event.target.files[0]);
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setSelectedImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

    const updateProduit = async (data) => {
      console.log("Submitted data", data);
      console.log("phgoto", photoProduit);
      try {
        const response = await axios.put(`/updateProduit/${data.id}`, {
          description: data.description,
          Seuil: data.seuil,
          Stock: data.stock,
          PrixAchat: data.prixAchat,
          prixVente: data.prixVente,
          LibelleProduit: data.LibelleProduit,
          idCat: data.categorie,
          image: photoProduit,
        });
        if (response.status === 200) {
          console.log(response);
          toast.success(`${response.data.message}`);
          // reset();
        }
      } catch (error) {
        console.error(error);
        toast.error(`${error.response.data.message}`);
      }
    };

    // fonction qui va setvalue les infos du produits courant
    const setProduit = (produit) => {
    //  Rreset les champs
    reset({
      id: produit.idProduit,
      description: produit.description,
      seuil: produit.Seuil,
      stock: produit.Stock,
      prixAchat: produit.PrixAchat,
      prixVente: produit.PrixVente,
      // LibelleProduit
      LibelleProduit: produit.LibelleProduit,
      // categorie
      categorie: produit.idCat,
    });

    };

    const createProduit = async (data) => {
      console.log("Submitted data", data);
      try {
        const response = await axios.post("/addProduit", {
          description: data.description,
          Seuil: data.Seuil,
          Stock: data.Stock,
          PrixAchat: data.PrixAchat,
          prixVente: data.prixVente,
          LibelleProduit: data.LibelleProduit,
          idCat: data.categorie,
          image: photoProduit,
        });
        if (response.status === 201) {
          console.log(response);
          toast.success(`${response.data.message}`);
          resetAddProduit();
        }
      } catch (error) {
        console.error(error);
        toast.error(`${error.response.data.message}`);
      }
    };

    // delete
    const deleteProduit = async (id) => {
      try {
        const response = await axios.delete(`/deleteProduit/${id}`);
        if (response.status === 200) {
          console.log(response);
          toast.success(`${response.data.message}`);
        }
      } catch (error) {
        console.error(error);
        toast.error(`${error.response.data.message}`);
      }
    };

  


  // États pour gérer la recherche, la pagination et les données filtrées
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

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
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-blue-500 text-white px-2 py-1 rounded mb-4">
            Ajouter produit
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ajouter Produit</DialogTitle>
            <DialogDescription>
              Remplissez les informations du produit ici. Cliquez sur
              enregistrer lorsque vous avez terminé.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitAddProduit(createProduit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="LibelleProduit" className="text-right">
                  Libellé Produit
                </Label>
                <Input
                  id="LibelleProduit"
                  {...registerAddProduit("LibelleProduit", { required: true })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  {...registerAddProduit("description", { required: true })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="prixVente" className="text-right">
                  Prix de vente
                </Label>
                <Input
                  id="prixVente"
                  type="number"
                  step="0.01"
                  {...registerAddProduit("prixVente", { required: true })}
                  className="col-span-3"
                />
              </div>
              {/* input pour choisir l'image */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <Input
                  id="image"
                  type="file"
                  onChange={handleImageChange}
                  // register
                  // {...register("image")}
                  className="col-span-3"
                />
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="image produit"
                    className="w-20 h-20"
                  />
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Seuil" className="text-right">
                  Seuil
                </Label>
                <Input
                  id="Seuil"
                  type="number"
                  {...registerAddProduit("Seuil", { required: true })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="PrixAchat" className="text-right">
                  Prix dachat
                </Label>
                <Input
                  id="PrixAchat"
                  type="number"
                  step="0.01"
                  {...registerAddProduit("PrixAchat", { required: true })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Stock" className="text-right">
                  Stock
                </Label>
                <Input
                  id="Stock"
                  type="number"
                  {...registerAddProduit("Stock", { required: true })}
                  className="col-span-3"
                />
              </div>
              {/* select pour les categorie */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="categorie" className="text-right">
                  Categorie
                </Label>
                <select
                  id="categorie"
                  // register
                  {...registerAddProduit("categorie", { required: true })}
                  className="col-span-3"
                >
                  {categories?.categories?.map((categorie, index) => (
                    <option key={index} value={categorie.idCat}>
                      {categorie.NomCat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Enregistrer</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Tableau */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">image</th>
            <th className="px-4 py-2">Libelle</th>
            <th className="px-4 py-2">CodeProduit</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Seuil</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">dateExp</th>
            <th className="px-4 py-2">Expire</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRows?.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">
                <img
                  src={`http://localhost:8000/photos_produits/${item.image}`}
                  alt="produit"
                  className="w-20 h-20"
                />
              </td>
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
              <td className="border px-4 py-2">{item.dateExp}</td>
              <td
                className={`border px-4 py-2 ${
                  item.dateExp === null
                    ? ""
                    : new Date(item.dateExp) < new Date()
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {item.dateExp === null
                  ? ""
                  : new Date(item.dateExp) < new Date()
                  ? "Oui"
                  : "Non"}{" "}
              </td>

              {/* action modifier */}
              <td className="border px-4 py-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setProduit(item)}>
                      Modifier Produit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Modifier Produit</DialogTitle>
                      <DialogDescription>
                        Faites des modifications au produit ici. Cliquez sur
                        enregistrer lorsque vous avez terminé.
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(updateProduit)}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Input
                            id="id"
                            defaultValue={item.idProduit}
                            className="col-span-3"
                            // hidden
                            type="hidden"
                            // register
                            {...register("id", { required: true })}
                          />
                        </div>
                        {/* description */}
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">
                            Description
                          </Label>
                          <Input
                            id="description"
                            // item
                            defaultValue={item.description}
                            className="col-span-3"
                            // register
                            {...register("description", { required: true })}
                          />
                        </div>
                        {/* libelle */}
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">
                            libelle
                          </Label>
                          <Input
                            id="description"
                            // item
                            defaultValue={item.LibelleProduit}
                            className="col-span-3"
                            // register
                            {...register("LibelleProduit", { required: true })}
                          />
                        </div>
                        {/* select pour les categorie */}
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="categorie" className="text-right">
                            Categorie
                          </Label>
                          <select
                            id="categorie"
                            // register
                            {...register("categorie", { required: true })}
                            className="col-span-3"
                          >
                            {categories?.categories?.map((categorie, index) => (
                              <option key={index} value={categorie.idCat}>
                                {categorie.NomCat}
                              </option>
                            ))}
                          </select>
                        </div>
                        {/* input pour choisir l'image */}
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="image" className="text-right">
                            Image
                          </Label>
                          <Input
                            id="image"
                            type="file"
                            onChange={handleImageChange}
                            // register
                            // {...register("image")}
                            className="col-span-3"
                          />
                          {selectedImage && (
                            <img
                              src={selectedImage}
                              alt="image produit"
                              className="w-20 h-20"
                            />
                          )}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="seuil" className="text-right">
                            Seuil
                          </Label>
                          <Input
                            id="seuil"
                            type="number"
                            // item
                            defaultValue={item.Seuil}
                            className="col-span-3"
                            // register
                            {...register("seuil", { required: true })}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="stock" className="text-right">
                            Stock
                          </Label>
                          <Input
                            id="stock"
                            type="number"
                            // item
                            defaultValue={item.Stock}
                            className="col-span-3"
                            // register
                            {...register("stock", { required: true })}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="prixAchat" className="text-right">
                            Prix achat
                          </Label>
                          <Input
                            id="prixAchat"
                            type="number"
                            // item
                            defaultValue={item.PrixAchat}
                            className="col-span-3"
                            // register
                            {...register("prixAchat", { required: true })}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="prixVente" className="text-right">
                            Prix de vente
                          </Label>
                          <Input
                            id="prixVente"
                            type="number"
                            // item
                            defaultValue={item.prixVente}
                            className="col-span-3"
                            // register
                            {...register("prixVente", { required: true })}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Enregistrer</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteProduit(item.idProduit)}
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
