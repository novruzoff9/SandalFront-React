import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axiosInstance from "../services/axiosConfig";

function ProductDetails() {
  const productId = window.location.pathname.split("/").pop();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axiosInstance.get(`/product/${productId}`);
        setProduct(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const BackProducts = () => {
    window.location.href = "/products";
  };
  const EditForm = () => {
    window.location.href = `/products/edit/${productId}`;
  }

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="img-fluid"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <h2>{product.name}</h2>
            <p>
              <strong>Kateqoriya:</strong> {product.category}
            </p>
            <p>
              <strong>Haqqında:</strong> {product.description}
            </p>
            <p>
              <strong>Alış qiyməti:</strong> ₼{product.purchasePrice.toFixed(2)}
            </p>
            <p>
              <strong>Satış qiyməti:</strong> ₼{product.sellPrice.toFixed(2)}
            </p>
            <p>
              <strong>Stok:</strong> {product.quantity} ədəd mövcuddur
            </p>

            <div className="d-flex gap-2 mt-3">
              <button className="btn btn-primary" onClick={EditForm}>Düzəliş et</button>
              <button className="btn btn-secondary" onClick={BackProducts}>
                Məhsullara qayıt
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetails;
