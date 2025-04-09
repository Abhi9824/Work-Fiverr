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

const ClosedTasksChart = ({ data, chartTitle }) => {
  const chartData = {
    labels: data?.map((item) => item.groupName),
    datasets: [
      {
        label: "Closed Tasks Count",
        data: data?.map((item) => item.taskCount),
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
        text: chartTitle,
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
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ClosedTasksChart;
