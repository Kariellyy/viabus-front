"use client";

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController,
  PieController,
  DoughnutController,
} from "chart.js";
import React, { useEffect } from "react";
import CardInfo from "../components/admin/cardInfo";
import { FaHome, FaRoute, FaUserPlus } from "react-icons/fa";

// Registrar os componentes do Chart.js necessários
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController,
  PieController,
  DoughnutController
);

const DashboardPage: React.FC = () => {
  useEffect(() => {
    let passengerChartInstance: Chart | null = null;
    let tripChartInstance: Chart | null = null;
    let revenueChartInstance: Chart | null = null;
    let satisfactionChartInstance: Chart | null = null;
    let newUsersChartInstance: Chart | null = null; // Novo gráfico

    // Função para destruir gráficos existentes antes de recriar
    const destroyChart = (chartInstance: Chart | null) => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };

    // Gráfico de Passageiros por Rota
    const ctx1 = document.getElementById("passengerChart") as HTMLCanvasElement;
    destroyChart(passengerChartInstance);
    passengerChartInstance = new Chart(ctx1, {
      type: "bar",
      data: {
        labels: ["Rota 1", "Rota 2", "Rota 3", "Rota 4"],
        datasets: [
          {
            label: "Passageiros",
            data: [120, 90, 150, 80],
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Gráfico de Viagens por Mês
    const ctx2 = document.getElementById("tripChart") as HTMLCanvasElement;
    destroyChart(tripChartInstance);
    tripChartInstance = new Chart(ctx2, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Viagens",
            data: [10, 15, 12, 20, 25, 18, 22, 30, 28, 35, 32, 40],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Gráfico de Receita por Rota
    const ctx3 = document.getElementById("revenueChart") as HTMLCanvasElement;
    destroyChart(revenueChartInstance);
    // @ts-ignore
    revenueChartInstance = new Chart(ctx3, {
      type: "pie",
      data: {
        labels: ["Rota 1", "Rota 2", "Rota 3", "Rota 4"],
        datasets: [
          {
            label: "Receita",
            data: [5000, 7000, 4000, 6000],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    // Gráfico de Satisfação dos Passageiros
    const ctx4 = document.getElementById(
      "satisfactionChart"
    ) as HTMLCanvasElement;
    destroyChart(satisfactionChartInstance);
    // @ts-ignore
    satisfactionChartInstance = new Chart(ctx4, {
      type: "doughnut",
      data: {
        labels: [
          "Muito Satisfeito",
          "Satisfeito",
          "Neutro",
          "Insatisfeito",
          "Muito Insatisfeito",
        ],
        datasets: [
          {
            label: "Satisfação",
            data: [60, 25, 10, 3, 2],
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(153, 102, 255, 0.6)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    // Novo Gráfico: Gráfico de Linhas para Novos Usuários por Mês
    const ctx5 = document.getElementById("newUsersChart") as HTMLCanvasElement;
    destroyChart(newUsersChartInstance);
    newUsersChartInstance = new Chart(ctx5, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Novos Usuários",
            data: [20, 30, 50, 40, 60, 70, 80, 90, 100, 110, 120, 130],
            backgroundColor: "rgba(153, 102, 255, 0.6)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Limpar instâncias de gráficos ao desmontar o componente
    return () => {
      destroyChart(passengerChartInstance);
      destroyChart(tripChartInstance);
      destroyChart(revenueChartInstance);
      destroyChart(satisfactionChartInstance);
      destroyChart(newUsersChartInstance);
    };
  }, []);

  return (
    <div className="d-flex flex-column">
      <section className="d-flex mb-4 gap-4">
        <CardInfo
          icon={FaHome}
          title="Receita"
          value="R$ 100,00"
          color="#7BB8FC"
        />
        <CardInfo icon={FaRoute} title="Ticket" value="200" color="#247BA0" />
        <CardInfo
          icon={FaUserPlus}
          title="Veículos em uso"
          value="15"
          color="#295878"
        />
      </section>
      <section id="charts" className="rounded-top-5">
        <h2>Gráficos Operacionais</h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card p-3 rounded-3">
              <h3>Passageiros por Rota</h3>
              <canvas id="passengerChart"></canvas>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card p-3 rounded-3">
              <h3>Viagens por Mês</h3>
              <canvas id="tripChart"></canvas>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 rounded-3">
              <h3>Receita por Rota</h3>
              <canvas id="revenueChart"></canvas>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 rounded-3">
              <h3>Satisfação dos Passageiros</h3>
              <canvas id="satisfactionChart"></canvas>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 rounded-3">
              <h3>Novos Usuários por Mês</h3> {/* Novo gráfico */}
              <canvas id="newUsersChart"></canvas> {/* Novo ID do canvas */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
