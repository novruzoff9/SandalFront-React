import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Layout from "../../components/layout/Layout";
import axiosInstance from "../../services/axiosConfig";

function PrepareOrder() {
  const { id } = useParams();
  const [orderStatus, setOrderStatus] = useState("");
  const [orderProducts, setOrderProducts] = useState([]);
  const [collectedProducts, setCollectedProducts] = useState({});
  const [productNameMap, setProductNameMap] = useState({});
  const productIdInputRef = useRef(null);

  useEffect(() => {
    checkOrderStatus();
    fetchOrderProducts();
  }, []);

  const checkOrderStatus = async () => {
    const response = await axiosInstance.get(`/order/${id}/status`);
    const status = response.data;
    setOrderStatus(status);

    if (status !== "StockConfirmed") {
      await Swal.fire({
        title: "Xəta!",
        text: "Bu sifariş artıq toplanıb.",
        icon: "error",
        confirmButtonText: "Ok",
        timer: 1500,
        timerProgressBar: true,
      });

      window.location.href = "/orders/stockconfirmed";
    }
  };

  const fetchOrderProducts = async () => {
    const response = await axiosInstance.get(`/order/${id}/products`);
    const products = response.data;
    setOrderProducts(products);

    const nameMap = {};
    products.forEach((p) => {
      nameMap[p.id] = p.name;
    });
    setProductNameMap(nameMap);
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      const productId = productIdInputRef.current.value.trim();
      if (!productId) return;

      const foundProductIndex = orderProducts.findIndex(
        (p) => p.id === productId
      );

      if (foundProductIndex === -1) {
        await Swal.fire({
          title: "Xəta!",
          text: "Bu ID ilə məhsul tapılmadı.",
          icon: "error",
          confirmButtonText: "Ok",
          timer: 1500,
          timerProgressBar: true,
        });
        return;
      }

      const updatedOrderProducts = [...orderProducts];
      const product = updatedOrderProducts[foundProductIndex];

      if (product.quantity <= 0) return;

      // Miqdarı azaldırıq
      product.quantity -= 1;

      if (product.quantity === 0) {
        updatedOrderProducts.splice(foundProductIndex, 1);
      }

      // Toplanan məhsullar siyahısında güncəllə
      setCollectedProducts((prev) => ({
        ...prev,
        [productId]: (prev[productId] || 0) + 1,
      }));

      setOrderProducts(updatedOrderProducts);

      if (updatedOrderProducts.length === 0) {
        await Swal.fire({
          title: "Sifariş tamamlandı!",
          text: "Sifarişdəki bütün məhsullar toplandı.",
          icon: "success",
          confirmButtonText: "Ok",
          timer: 1500,
          timerProgressBar: true,
        });
      }

      productIdInputRef.current.value = "";
    }
  };

  const completeOrder = async () => {
    const products = collectedProducts;

    const response = await axiosInstance.post(`/order/${id}/complete`, {
      products,
    });

    if (response.status === 200) {
      await Swal.fire({
        title: "Sifariş tamamlandı!",
        text: "Sifariş başarılı bir şəkildə tamamlandı.",
        icon: "success",
        confirmButtonText: "Ok",
        timer: 1500,
        timerProgressBar: true,
      });
      window.location.href = "/orders/stockconfirmed";
    }
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-6">
          <h3>Sifariş Məhsulları</h3>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Məhsul</th>
                <th>Miqdar</th>
                <th>Rəf</th>
              </tr>
            </thead>
            <tbody>
              {orderProducts.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.shelfCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h3>Toplanan Məhsullar</h3>
          <video id="video" width="300" height="200"></video>
          <input
            type="text"
            ref={productIdInputRef}
            placeholder="Məhsulun barkodu"
            className="form-control mb-3"
            onKeyDown={handleKeyPress}
          />
          <ul className="list-group">
            {Object.entries(collectedProducts).map(([productId, quantity]) => {
              const name = productNameMap[productId] || "Naməlum məhsul";
              return (
                <li key={productId} className="list-group-item">
                  {name} - {quantity}
                </li>
              );
            })}
          </ul>
          <div className="d-flex gap-3">
            <button
              className="btn btn-success mt-3"
              onClick={completeOrder}
              disabled={orderProducts.length !== 0}
            >
              Toplamanı tamamla
            </button>
            <button className="btn btn-warning mt-3">
              Çatışmayan məhsullar
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PrepareOrder;
