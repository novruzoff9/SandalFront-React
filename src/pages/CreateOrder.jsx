import { useEffect } from "react";
import Layout from "../components/layout/Layout";
import axiosInstance from "../services/axiosConfig";

function CreateOrder() {
  useEffect(() => {
    loadOrderForm();
  }, []);
  const loadOrderForm = async () => {
    try {
      const warehouses = await axiosInstance.get(
        "/warehouse"
      );

      const warehouseSelect = document.getElementById("WarehouseIdSelect");
      warehouses.data.data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.id;
        option.text = item.name;
        warehouseSelect.appendChild(option);
      });
      additionalProductToOrder();


    } catch (error) {
      console.error("Error loading form data:", error);
    }
  };
  const additionalProductToOrder = async () => {
    try {
      const products = await axiosInstance.get(
        "/product"
      );

      const additionalProductsContainer = document.getElementById(
        "additionalProductsContainer"
      );
      const newProductDiv = document.createElement("div");

      newProductDiv.innerHTML = `
            <label for="ProductIdSelect">Məhsul:</label>
            <select name="ProductId" class="ProductIdSelect"></select>
            <label for="QuantityInput">Miqdar:</label>
            <input type="number" name="Quantity" class="QuantityInput" min="1" value="1">
            <button type="button" class="deleteaction ml-2">Sil</button>
          `;

      const productSelect = newProductDiv.querySelector(".ProductIdSelect");
      products.data.data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.id;
        option.text = item.name;
        productSelect.appendChild(option);
      });

      additionalProductsContainer.appendChild(newProductDiv);
    } catch (error) {
      console.error("Error loading additional products:", error);
    }
  };

  const CompleteOrder = async () => {

    const products = [];
    const productSelects = document.querySelectorAll(".ProductIdSelect");
    const quantityInputs = document.querySelectorAll(".QuantityInput");
    productSelects.forEach((productSelect, index) => {
      const product = {
        ProductId: productSelect.value,
        Quantity: quantityInputs[index].value,
      };
      products.push(product);
    });

    const orderData = {
      WarehouseId: document.getElementById("WarehouseIdSelect").value,
      OrderItems: products,
    }
    const response = await axiosInstance.post("/order", orderData);
    console.log(orderData);
    
    console.log(response);
    
    if (response.status === 200) {
      alert("Sifariş uğurla yaradıldı");
      window.location.href = "/orders/active";
    } else {
      alert("Sifariş yaradılmadı");
    }

  };
  return (
    <Layout>
      <div id="addDataContainer">
        <h2>Sifariş ver</h2>
        <form id="addDataForm">
          <label htmlFor="WarehouseIdSelect">Hansı Anbardan:</label>
          <select name="WarehouseId" id="WarehouseIdSelect"></select>

          <button
            onClick={additionalProductToOrder}
            type="button"
            id="addProductButton"
            className="successaction mb-2"
          >
            Məhsul Artır
          </button>
          <div id="additionalProductsContainer"></div>

          <button
            type="button"
            onClick={CompleteOrder}
            className="primaryaction"
          >
            Sifarişi tamamla
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default CreateOrder;
