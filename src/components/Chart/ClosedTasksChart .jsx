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
  // Prepare data for Bar chart
  const chartData = {
    labels: data?.map((item) => item.groupName), // Labels like "Team A", "Owner1", etc.
    datasets: [
      {
        label: "Closed Tasks Count",
        data: data?.map((item) => item.taskCount), // Task counts
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
        text: chartTitle,
        color: "white",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // Set x-axis ticks text color to white
        },
        border: {
          color: "white", // Set x-axis line color to white
        },
      },
      y: {
        ticks: {
          color: "white", // Set y-axis ticks text color to white
        },

        border: {
          color: "white", // Set y-axis line color to white
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
