import React from "react";
import { Bar } from "react-chartjs-2";
import "./Chart.css";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const PendingTaskReport = ({ data }) => {
  // Prepare data for Bar chart
  const chartData = {
    labels: ["Total Pending Work"],
    datasets: [
      {
        label: "Total Pending Days",
        data: [data],
        backgroundColor: "rgba(16, 80, 192, 0.6)",
        borderColor: "rgb(115, 194, 236)",
        borderWidth: 2,
        barThickness: 60,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "black",
        },
      },
      title: {
        display: true,
        color: "black",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "black",
        },
        grid: {
          display: false,
        },
        border: {
          color: "black",
        },
      },
      y: {
        ticks: {
          color: "black",
        },
        grid: {
          display: false,
        },

        border: {
          color: "black",
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PendingTaskReport;
