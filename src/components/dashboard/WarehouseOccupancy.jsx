import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosConfig";
import { Chart } from "chart.js";

function WarehouseOccupancy() {
  const [chartInstance, setChartInstance] = useState(null);
  const [occupancy, setOccupancy] = useState([]);
  useEffect(() => {
    getOccupancy();
  }, []);
  async function getOccupancy() {
    var occupancy = await axiosInstance.get(`/warehouse/occupancy-rate`);
    setOccupancy(occupancy.data);
  }

  useEffect(() => {
    const ctx = document.getElementById("myOccupancyChart");
    if (chartInstance) {
      chartInstance.destroy();
    }
    const newChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Doluluq", "Boşluq"],
        datasets: [
          {
            label: "Faizi: ",
            data: [occupancy * 100, 100 - occupancy * 100],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: "bottom",
          },
        },
      },
    });
    setChartInstance(newChart);
  }, [occupancy]);
  return (
    <div
      className="chart-container"
      style={{ position: "relative", height: "40vh", width: "40vw" }}
    >
      <canvas id="myOccupancyChart"></canvas>
    </div>
  );
}

export default WarehouseOccupancy;
