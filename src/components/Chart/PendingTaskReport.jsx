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
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 50,
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
          color: "white",
        },
      },
      title: {
        display: true,
        color: "white",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        border: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },

        border: {
          color: "white",
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
