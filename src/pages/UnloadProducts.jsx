import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import axiosInstance from "../services/axiosConfig";
import Swal from "sweetalert2";

function UnloadProducts() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
    axiosInstance
        .get("/order/bystatus/stockconfirmed")
        .then((res) => {
            setOrders(res.data.data);
        })
        .catch((err) => {
            console.error("Error fetching orders:", err);
            Swal.fire({
                title: "Xəta!",
                text: "Sifarişləri yükləmək mümkün olmadı.",
                icon: "error",
                confirmButtonText: "Ok",
            });
        });
}, []);

  const handleCustomUnload = () => {
    navigate("/unload/custom");
  };

  const handleOrderClick = (orderId) => {
    navigate(`/orders/prepare/${orderId}`);
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Anbardan Məhsul Çıxar</h2>
          <button className="btn btn-primary" onClick={handleCustomUnload}>
            Məhsul çıxar
          </button>
        </div>
        <h4>Toplanmağı gözləyən sifarişlər</h4>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Müştəri</th>
                <th>Tarix</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    Sifariş tapılmadı
                  </td>
                </tr>
              ) : (
                orders.map((order, idx) => (
                  <tr key={order.id}>
                    <td>{idx + 1}</td>
                    <td>{order.customer || "-"}</td>
                    <td>
                      {order.opened
                        ? new Date(order.opened).toLocaleString()
                        : "-"}
                    </td>
                    <td>{order.status}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleOrderClick(order.id)}
                        style={{"width": "100%"}}
                      >
                        Sifarişi hazırla 
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default UnloadProducts;
