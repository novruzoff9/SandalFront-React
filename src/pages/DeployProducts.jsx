import { useEffect } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import Layout from "../components/layout/Layout";
import axiosInstance from "../services/axiosConfig";
import Swal from "sweetalert2";

function DeployProducts() {
  // useEffect(() => {
  //   const codeReader = new BrowserMultiFormatReader();
  //   codeReader.decodeFromVideoDevice(null, "video", (result, err) => {
  //     if (result) {
  //       document.getElementById("shelfCode").value = result.text;
  //       document.getElementById("confirmShelfCode").click();
  //     }
  //     if (err && !(err instanceof NotFoundException)) {
  //       console.error(err);
  //     }
  //   });

  //   return () => {
  //     codeReader.reset();
  //   };
  // }, []);

  async function getShelfProducts() {
    const shelfCode = document.getElementById("shelfCode").value;
    document.getElementById("shelfContent").style.display = "block";
    const response = await axiosInstance.get(`/shelf/${shelfCode}/products`);
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    console.log(response.data);

    response.data.forEach((product) => {
      const listItem = document.createElement("li");
      listItem.className = "list-group-item";
      listItem.innerHTML = `<b>Adı:</b> ${product.product.name}, <b>Say:</b> ${product.quantity}`;
      productList.appendChild(listItem);
    });
  }

  async function addProductInput() {
    const newProductInputs = document.getElementById("newProductInputs");
    const productInput = document.createElement("div");
    productInput.className = "input-group mb-3";
    productInput.innerHTML = `
      <input type="text" class="form-control" placeholder="Məhsul Kodu" />
      <input type="number" class="form-control" placeholder="Say" />
      <button class="btn btn-danger" onclick="this.parentElement.remove()">Sil</button>
    `;
    newProductInputs.appendChild(productInput);
  }

  async function addProducts() {
    const data = {
      shelfCode: document.getElementById("shelfCode").value,
      ProductIds: Object.fromEntries(
        Array.from(
          document.querySelectorAll("#newProductInputs input[type='text']")
        ).map((input) => [
          input.value,
          parseInt(input.nextElementSibling.value, 10) || 0,
        ])
      ),
    };

    const response = await axiosInstance.post("/shelf/products", data);

    if (response.status === 200) {
      const inputContainer = document.getElementById("newProductInputs");
      inputContainer.innerHTML = "";
      Swal.fire({
        title: "Məhsullar əlavə olundu",
        icon: "success",
        confirmButtonText: "OK",
        timer: 1500,
        timerProgressBar: true,
      });
    } else {
      Swal.fire({
        title: "Məhsullar əlavə olunmadı",
        icon: "error",
        confirmButtonText: "OK",
        timer: 1500,
        timerProgressBar: true,
      });
    }
  }

  return (
    <Layout>
      <div className="container mt-5">
        <h2>Rəf Kodunu daxil edin</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            id="shelfCode"
            className="form-control"
            placeholder="Rəf Kodu"
          />
          <button
            className="btn btn-primary"
            id="confirmShelfCode"
            onClick={getShelfProducts}
          >
            Təsdiq
          </button>
        </div>
        <video id="video" width="300" height="200"></video>

        <div id="shelfContent" style={{ display: "none" }}>
          <h3>Rəfdəki məhsullar</h3>
          <ul id="productList" className="list-group mb-3"></ul>
          <h4>Yeni Məhsul Artır</h4>
          <div id="newProductInputs"></div>
          <div className="d-flex gap-3">
            <button
              className="btn btn-success"
              id="addProductInput"
              onClick={addProductInput}
            >
              Yeni Məhsul Artır
            </button>
            <button
              className="btn btn-primary"
              id="confirmProducts"
              onClick={addProducts}
            >
              Tamamla
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DeployProducts;
