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

      const customers = await axiosInstance.get(
        "/customer"
      );

      const warehouseSelect = document.getElementById("WarehouseIdSelect");
      warehouses.data.data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.id;
        option.text = item.name;
        warehouseSelect.appendChild(option);
      });

      const customersSelect = document.getElementById("CustomerIdSelect");
      customers.data.data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.id;
        option.text = item.fullName;
        customersSelect.appendChild(option);
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
        option.setAttribute("data-price", item.sellPrice);
        option.setAttribute("data-imageUrl", item.imageUrl);
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
        ProductName: productSelect.options[productSelect.selectedIndex].text,
        UnitPrice: productSelect.options[productSelect.selectedIndex].getAttribute("data-price"),
        ImageUrl: productSelect.options[productSelect.selectedIndex].getAttribute("data-imageUrl")
      };
      products.push(product);
    });

    const warehouseId = document.getElementById("WarehouseIdSelect").value;
    const warehouseName = document.getElementById("WarehouseIdSelect").options[document.getElementById("WarehouseIdSelect").selectedIndex].text;
    const customerId = document.getElementById("CustomerIdSelect").value;
    const city = document.getElementById("CityInput").value;
    const district = document.getElementById("DistrictInput").value;
    const street = document.getElementById("StreetInput").value;
    const zipCode = document.getElementById("ZipCodeInput").value;
    const address = {
      City: city,
      District: district,
      Street: street,
      ZipCode: zipCode,
    };

    const orderData = {
      WarehouseId: warehouseId,
      WarehouseName: warehouseName,
      OrderItems: products,
      CustomerId: customerId,
      Address: address,
    }


    const response = await axiosInstance.post("/order", orderData);
    
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

          <label htmlFor="CustomerIdSelect">Hansı Müştəriyə:</label>
          <select name="CustomerId" id="CustomerIdSelect"></select>

          <div className="d-flex gap-2 align-items-center flex-wrap"> 
            <label htmlFor="CityInput" className="mb-3">Şəhər:</label>
            <input type="text" id="CityInput" name="City" placeholder="Şəhər adı" />

            <label htmlFor="DistrictInput" className="mb-3">Rayon:</label>
            <input type="text" id="DistrictInput" name="District" placeholder="Rayon adı" />

            <label htmlFor="StreetInput" className="mb-3">Küçə:</label>
            <input type="text" id="StreetInput" name="Street" placeholder="Küçə adı" />

            <label htmlFor="ZipCodeInput" className="mb-3">Poçt Kodu:</label>
            <input type="text" id="ZipCodeInput" name="ZipCode" placeholder="AZxxxx" />
          </div>
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
