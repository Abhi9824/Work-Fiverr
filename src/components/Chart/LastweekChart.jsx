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
  defaults,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const LastweekChart = ({ data }) => {
  // Prepare data for Bar chart
  const chartData = {
    labels: data?.map((item) => item.name),
    datasets: [
      {
        label: "Tasks Completed Days",
        data: data?.map((item) => item.timeToComplete),
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
    <div style={{ width: "100%", height: "500px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default LastweekChart;
