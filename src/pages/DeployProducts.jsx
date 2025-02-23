import { useEffect } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import Layout from "../components/layout/Layout";
import axiosInstance from "../services/axiosConfig";

function DeployProducts() {
  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReader.decodeFromVideoDevice(null, "video", (result, err) => {
      if (result) {
        console.log(result.text); // Barkod məzmunu
        document.getElementById("shelfCode").value = result.text;
        document.getElementById("confirmShelfCode").click();
      }
      if (err && !(err instanceof NotFoundException)) {
        console.error(err); // Digər səhvlər
      }
    });

    return () => {
      codeReader.reset();
    };
  }, []);

  async function getShelfProducts() {
    const shelfCode = document.getElementById("shelfCode").value;
    document.getElementById("shelfContent").style.display = "block";
    const response = await axiosInstance.get(
      `http://104.248.36.17:5002/api/shelf/${shelfCode}/products`
    );
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    console.log(response.data);

    response.data.forEach((product) => {
      const listItem = document.createElement("li");
      listItem.className = "list-group-item";
      listItem.innerHTML = `<b>Kod:</b> ${product.product.name}, <b>Say:</b> ${product.quantity}`;
      productList.appendChild(listItem);
    });
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
          <button className="btn btn-success" id="addProductInput">
            Yeni Məhsul Artır
          </button>
          <button className="btn btn-primary" id="confirmProducts">
            Tamamla
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default DeployProducts;
