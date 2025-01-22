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
          color: "white", // Set the legend text color to white
        },
      },
      title: {
        display: true,
        // text: report, // Display the chart title dynamically
        color: "white", // Set the title text color to white
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
    // <div style={{ width: "100%", height: "500px" }}>
    <div className="chart-container">
      <div className="chart-wrapper">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PendingTaskReport;
