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
        "http://104.248.36.17:5002/api/warehouse"
      );
      const products = await axiosInstance.get(
        "http://104.248.36.17:5002/api/product"
      );

      console.log(warehouses.data);

      const warehouseSelect = document.getElementById("WarehouseIdSelect");
      warehouses.data.data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.id;
        option.text = item.name;
        warehouseSelect.appendChild(option);
      });

      const productSelect = document.getElementById("ProductIdSelect");
      products.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.id;
        option.text = item.name;
        productSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Error loading form data:", error);
    }
  };
  const additionalProductToOrder = async () => {
    try {
      const products = await axiosInstance.get(
        "http://104.248.36.17:5002/api/product"
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
          `;

      const productSelect = newProductDiv.querySelector(".ProductIdSelect");
      products.forEach((item) => {
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
  return (
    <Layout>
      <div id="addDataContainer">
        <h2>Sifariş ver</h2>
        <form id="addDataForm">
          <label htmlFor="WarehouseIdSelect">Hansı Anbardan:</label>
          <select name="WarehouseId" id="WarehouseIdSelect"></select>

          <input type="text" />
          <button
            onClick={additionalProductToOrder}
            type="button"
            id="addProductButton"
          >
            Məhsul Artır
          </button>
          <div id="additionalProductsContainer"></div>

          <button
            type="submit"
            //onClick="CompleteOrder()"
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
