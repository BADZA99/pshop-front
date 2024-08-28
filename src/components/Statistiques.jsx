import React from 'react'
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);


export default function Statistiques() {
  // Exemple de données pour les diagrammes
  const produits = [
    { nom: 'Produit A', quantite: 30 },
    { nom: 'Produit B', quantite: 20 },
    { nom: 'Produit C', quantite: 50 },
    { nom: 'Produit D', quantite: 10 },
  ];

  const stock = [
    { nom: 'Produit A', quantite: 100 },
    { nom: 'Produit B', quantite: 150 },
    { nom: 'Produit C', quantite: 200 },
    { nom: 'Produit D', quantite: 50 },
  ];

  const ventes = [
    { nom: 'Produit A', quantite: 70 },
    { nom: 'Produit B', quantite: 50 },
    { nom: 'Produit C', quantite: 150 },
    { nom: 'Produit D', quantite: 30 },
  ];

  const produitsLesPlusVendus = [
    { nom: 'Produit A', quantite: 300 },
    { nom: 'Produit B', quantite: 250 },
    { nom: 'Produit C', quantite: 400 },
    { nom: 'Produit D', quantite: 100 },
  ];

  // Préparer les données pour chaque graphique
  const dataProduits = {
    labels: produits.map(produit => produit.nom),
    datasets: [
      {
        label: 'Quantité de Produits',
        data: produits.map(produit => produit.quantite),
        backgroundColor: [
          'rgb(233, 15, 62)',
          'rgb(26, 156, 173)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  const dataStock = {
    labels: stock.map(item => item.nom),
    datasets: [
      {
        label: 'Stock de Produits',
        data: stock.map(item => item.quantite),
        backgroundColor: [
          'rgb(233, 15, 62)',
          'rgb(26, 156, 173)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  const dataVentes = {
    labels: ventes.map(item => item.nom),
    datasets: [
      {
        label: 'Ventes de Produits',
        data: ventes.map(item => item.quantite),
        backgroundColor: [
          'rgb(233, 15, 62)',
          'rgb(26, 156, 173)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  const dataProduitsLesPlusVendus = {
    labels: produitsLesPlusVendus.map(item => item.nom),
    datasets: [
      {
        label: 'Produits les Plus Vendus',
        data: produitsLesPlusVendus.map(item => item.quantite),
        backgroundColor: [
          'rgb(233, 15, 62)',
          'rgb(26, 156, 173)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  // Options pour les graphiques
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-4">Statistiques des Produits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="chart-container"
          style={{ width: "400px", height: "400px", margin: "0 auto" }}
        >
          <h3 className="text-xl font-semibold mb-2">Produits</h3>
          <Doughnut data={dataProduits} options={options} />
        </div>
        <div
          className=""
          // style={{ width: "400px", height: "400px", margin: "0 auto" }}
        >
          <h3 className="text-xl font-semibold mb-2">Stock</h3>
          <Line data={dataStock} options={options} />
        </div>
        <div className="w-full">
          <h3 className="text-xl font-semibold mb-2">Ventes</h3>
          <Bar data={dataVentes} options={options} />
        </div>
        <div className="w-full">
          <h3 className="text-xl font-semibold mb-2">
            Produits les Plus Vendus
          </h3>
          <Pie data={dataProduitsLesPlusVendus} options={options} />
        </div>
      </div>
    </div>
  );
}

