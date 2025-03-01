import { FaTrash } from "react-icons/fa";
import axiosInstance from "../services/axiosConfig";

export const productsConfig = {
  title: "Məhsul",
  columns: [
    { key: "name", label: "Ad" },
    { key: "category", label: "Kateqoriya" },
    { key: "purchasePrice", label: "Alış Qiyməti" },
    { key: "sellPrice", label: "Satış Qiyməti" },
    { key: "quantity", label: "Say" },
  ],
  endpoint: "/product",
  postEnpoint: "/product",
  renderActions: (product) => <ProductActions product={product} />,
  inputs: [
    { label: "Ad", name: "name", type: "text" },
    { label: "Haqqında", name: "description", type: "text" },
    {
      label: "Alış Qiyməti",
      name: "PurchasePrice",
      type: "number",
      step: "0.01",
    },
    { label: "Satış Qiyməti", name: "SellPrice", type: "number", step: "0.01" },
    { label: "Miqdar", name: "Count", type: "number" },
    { label: "Şəkil url", name: "ImageUrl", type: "text" }
  ],
};

const ProductActions = ({ product }) => {
  const deleteProduct = async (id) => {
    
    const endpoint = `/product/${id}`;
    await axiosInstance.delete(endpoint).then(() => {
      window.location.reload();
    });
  };

  const viewLocations = (id) => {
    // define viewLocations function
  }
  return (
    <>
      <button className="primary" onClick={() => viewLocations(product.id)}>
        yy
      </button>
      <button className="delete" onClick={() => deleteProduct(product.id)}>
        <FaTrash />{" "}
      </button>
    </>
  );
};
