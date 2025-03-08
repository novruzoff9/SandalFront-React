import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import axiosInstance from "../services/axiosConfig";
import Swal from "sweetalert2";

function PrepareOrder() {
  const { id } = useParams();
  const orderItems = document.getElementById("order-items");
  const collectedItems = document.getElementById("collected-items");
  const productIdInput = document.getElementById("product-id-input");
  const insufficientStockButton = document.getElementById("insufficient-stock");
  const completeOrderButton = document.getElementById("complete-order");

  useEffect(() => {
    getOrderProducs();
  }, []);

  async function getOrderProducs() {
    const orderProductsResponse = await axiosInstance.get(
      `/order/${id}/products`
    );
    const orderProducts = orderProductsResponse.data;
    const orderItems = document.getElementById("order-items");
    orderProducts.forEach((product) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = `${product.name} - ${product.quantity}`;
      li.dataset.productId = product.id;
      li.dataset.productName = product.name;
      li.dataset.quantity = product.quantity;
      orderItems.appendChild(li);
    });
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      const productId = productIdInput.value;
      const orderItem = Array.from(orderItems.children).find(
        (item) => item.dataset.productId === productId
      );

      if (orderItem) {
        const collectedItem = Array.from(collectedItems.children).find(
          (item) => item.dataset.productId === productId
        );

        if (collectedItem) {
          collectedItem.dataset.quantity =
            parseInt(collectedItem.dataset.quantity) + 1;
          collectedItem.textContent = `${collectedItem.dataset.productName} - ${collectedItem.dataset.quantity}`;
        } else {
          const li = document.createElement("li");
          li.className = "list-group-item";
          li.textContent = `${orderItem.dataset.productName} - 1`;
          li.dataset.productId = productId;
          li.dataset.productName = orderItem.dataset.productName;
          li.dataset.quantity = 1;
          collectedItems.appendChild(li);
        }

        orderItem.dataset.quantity = parseInt(orderItem.dataset.quantity) - 1;
        if (orderItem.dataset.quantity == 0) {
          orderItems.removeChild(orderItem);
          if (orderItems.children.length == 0) {
            Swal.fire({
              title: "Sifariş tamamlandı!",
              text: "Sifarişdəki bütün məhsullar toplandı.",
              icon: "success",
              confirmButtonText: "Ok",
              timer: 1500,
              timerProgressBar: true,
            });
            completeOrderButton.disabled = false;
            insufficientStockButton.disabled = true;
          }
        } else {
          orderItem.textContent = `${orderItem.dataset.productName} - ${orderItem.dataset.quantity}`;
        }
      }
      productIdInput.value = "";
    }
  }

  async function completeOrder() {
    const collectedItems = Array.from(
      document.getElementById("collected-items").children
    );
    const collectedItemsData = Object.fromEntries(
      collectedItems.map((item) => [
        item.dataset.productId,
        parseInt(item.dataset.quantity, 10) || 0,
      ])
    );

    const data = {
      products: collectedItemsData,
    };

    console.log(data);
    const response = await axiosInstance.post(`/order/${id}/complete`, data);

    if (response.status === 200) {
      Swal.fire({
        title: "Sifariş tamamlandı!",
        text: "Sifariş başarılı bir şekilde tamamlandı.",
        icon: "success",
        confirmButtonText: "Ok",
        timer: 1500,
        timerProgressBar: true,
      });
      window.location.reload();
    }
  }

  return (
    <Layout>
      <div className="row">
        <div className="col-md-6">
          <h3>Sifariş Məhsulları</h3>
          <ul id="order-items" className="list-group"></ul>
        </div>
        <div className="col-md-6">
          <h3>Toplanan Məhsullar</h3>

          <video id="video" width="300" height="200"></video>
          <input
            type="text"
            id="product-id-input"
            placeholder="Məhsulun barkodu"
            className="form-control mb-3"
            onKeyDown={handleKeyPress}
          />
          <ul id="collected-items" className="list-group"></ul>
          <div className="d-flex gap-3">
            <button
              id="complete-order"
              className="btn btn-success mt-3"
              onClick={completeOrder}
            >
              Toplamanı tamamla
            </button>
            <button id="insufficient-stock" className="btn btn-warning mt-3">
              Çatışmayan məhsullar
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PrepareOrder;
