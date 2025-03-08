import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosConfig";
import { Chart } from "chart.js";

function SalesInOutComeChart() {
  const [chartInstance, setChartInstance] = useState(null);
  const [monthlySales, setMonthlySales] = useState([]);

  useEffect(() => {
    getSalesInOutCome();
  }, []);

  const getSalesInOutCome = async () => {
    const response = await axiosInstance.get("/order/monthly-sales-in-out-come");
    setMonthlySales(response.data);
  };

  useEffect(() => {
      if (monthlySales.length > 0) {
        const ctx = document.getElementById("sales-bar-chart").getContext("2d");
  
        if (chartInstance) {
          chartInstance.destroy();
        }
  
        const newChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: monthlySales.map((sale) => `${sale.month}. ay`),
            datasets: [
              {
                label: "Aylıq gəlirlər",
                data: monthlySales.map((sale) => sale.totalIncome),
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
              },
            },
          },
        });
  
        setChartInstance(newChart);
      }
    }, [monthlySales]);
  return (
    <div
      className="sales-bar-chart-container"
      style={{ position: "relative", height: "40vh", width: "40vw" }}
    >
      <canvas id="sales-bar-chart"></canvas>
    </div>
  )
}

export default SalesInOutComeChart;
