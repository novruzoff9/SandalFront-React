import { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import axiosInstance from "../../services/axiosConfig";

const MonthlySalesChart = () => {
  const [chartInstance, setChartInstance] = useState(null);
  const [monthlySales, setMonthlySales] = useState([]);

  // API'den veriyi çek
  const getMonthlySales = async () => {
    const endpoint = "/order/monthly-sales";

    axiosInstance.get(endpoint).then((response) => {
      setMonthlySales(response.data);
    });
  };

  useEffect(() => {
    getMonthlySales();
  }, []);

  useEffect(() => {
    if (monthlySales.length > 0) {
      const ctx = document.getElementById("myChart").getContext("2d");

      // Eğer eski bir chart varsa, önce onu yok et
      if (chartInstance) {
        chartInstance.destroy();
      }

      const newChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: monthlySales.map((sale) => `${sale.month}. ay`),
          datasets: [
            {
              label: "Aylıq satışlar",
              data: monthlySales.map((sale) => sale.totalSales),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 10,
            },
          },
        },
      });

      setChartInstance(newChart);
    }
  }, [monthlySales]);

  return (
    <div
      className="chart-container"
      style={{ position: "relative", height: "40vh", width: "40vw" }}
    >
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default MonthlySalesChart;
