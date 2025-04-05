import { FaInfo, FaPlus, FaTrash } from "react-icons/fa";
import axiosInstance from "../services/axiosConfig";
import Swal from "sweetalert2";

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
    { label: "Şəkil url", name: "ImageUrl", type: "text" },
  ],
};

const ProductActions = ({ product }) => {
  const deleteProduct = (id) => {
    Swal.fire({
      title: "Silmək istədiyinizə əminsiniz?",
      text: "Bu əməliyyatı geri qaytarmaq mümkün olmayacaq!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Bəli, sil!",
      cancelButtonText: "Xeyr, imtina et",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const endpoint = `/product/${id}`;
        await axiosInstance.delete(endpoint).then(async () => {
          await Swal.fire({
            title: "Silmək uğurla başa çatdı!",
            text: "Məhsul silindi",
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
          });

          window.location.reload();
        });
      }
    });
  };

  const IncreaseProduct = (id) => {
    Swal.fire({
      title: "Məhsulun miqdarını artırın",
      input: "number",
      inputAttributes: {
        min: 1,
        max: 1000,
        step: 1,
      },
      showCancelButton: true,
      confirmButtonText: "Artır",
      cancelButtonText: "İmtina et",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const endpoint = `/product/${id}/increase`;
        await axiosInstance
          .post(endpoint, result.value, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(async () => {
            await Swal.fire({
              title: "Miqdar artırıldı!",
              text: `Məhsulun miqdarı ${result.value} ədəd artırıldı`,
              icon: "success",
              timer: 1500,
              timerProgressBar: true,
            });
          });

        window.location.reload();
      }
    });
  };

  const viewDetails = (id) => {
    window.location.href = `/products/details/${id}`;
  };
  return (
    <>
      <button className="primary" onClick={() => viewDetails(product.id)}>
        <FaInfo />
      </button>
      <button className="primary" onClick={() => IncreaseProduct(product.id)}>
        <FaPlus />{" "}
      </button>
      <button className="delete" onClick={() => deleteProduct(product.id)}>
        <FaTrash />{" "}
      </button>
    </>
  );
};
