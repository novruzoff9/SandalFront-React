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
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Description:</strong> {product.description}
            </p>
            <p>
              <strong>Price:</strong> ${product.sellPrice.toFixed(2)}
            </p>
            <p>
              <strong>Stock:</strong> {product.quantity} ədəd mövcuddur
            </p>

            <div className="d-flex gap-2 mt-3">
              <button className="btn btn-primary">Add to Cart</button>
              <button className="btn btn-secondary" onClick={BackProducts}>
                Back to Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetails;
