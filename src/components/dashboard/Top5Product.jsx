import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosConfig";
import { Chart } from "chart.js";

function Top5Product({ data }) {
  const [chartInstance, setChartInstance] = useState(null);
  //const [monthlySales, setMonthlySales] = useState([]);

  //   useEffect(() => {
  //     getSalesInOutCome();
  //   }, []);

  //   const getSalesInOutCome = async () => {
  //     const response = await axiosInstance.get("/order/monthly-sales-in-out-come");
  //     setMonthlySales(response.data);
  //   };

  useEffect(() => {
    if (data.length > 0) {
      const ctx = document.getElementById("top-5-bar-chart").getContext("2d");

      if (chartInstance) {
        chartInstance.destroy();
      }

      const newChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.map((product) => `${product.name}`),
          datasets: [
            {
              label: "Satış sayı",
              data: data.map((product) => product.count),
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: "y",
          plugins: {
            legend: {
              position: "right",
            },
            title: {
              display: true,
              text: "Ən çox satılan 5 məhsul",
            },
          },
          scales: {
            x: {
              beginAtZero: true,
            },
          },
        },
      });

      setChartInstance(newChart);
    }
  }, [data]);
  return (
    <div
      className="top-5-bar-chart-container"
      style={{ position: "relative", height: "40vh", width: "40vw" }}
    >
      <canvas id="top-5-bar-chart"></canvas>
    </div>
  );
}

export default Top5Product;
