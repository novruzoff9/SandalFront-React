import { useState } from "react";
import Layout from "../components/layout/Layout";
import axiosInstance from "../services/axiosConfig";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function CustomUnload() {
  const [shelfCode, setShelfCode] = useState("");
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleShelfConfirm = async () => {
    try {
      const res = await axiosInstance.get(`/shelf/${shelfCode}/products`);
      setProducts(res.data);
      setStep(2);
      // Reset quantities
      setQuantities({});
    } catch (err) {
      Swal.fire({
        title: "Xəta!",
        text: "Rəf tapılmadı və ya məhsul yoxdur.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleQuantityChange = (productId, value, max) => {
    let val = Math.max(0, Math.min(Number(value), max));
    setQuantities({ ...quantities, [productId]: val });
  };

  const handleUnload = async (e) => {
    e.preventDefault();
    const unloadProducts = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([productId, qty]) => ({
        productId,
        quantity: qty,
      }));

    if (unloadProducts.length === 0) {
      Swal.fire({
        title: "Diqqət!",
        text: "Heç bir məhsul seçilməyib.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
        const body = {
        shelfCode,
        products: unloadProducts,
      };
      await axiosInstance.post("/shelf/products/remove", body);
      
      Swal.fire({
        title: "Uğurlu!",
        text: "Məhsullar anbardan çıxarıldı.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => navigate("/unload"));
    } catch (err) {
      Swal.fire({
        title: "Xəta!",
        text: "Məhsulları çıxarmaq mümkün olmadı.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h2>Rəfdən məhsul çıxar</h2>
        {step === 1 && (
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Rəf Kodu"
              value={shelfCode}
              onChange={e => setShelfCode(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleShelfConfirm}>
              Təsdiq
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleUnload}>
            <h4>Rəfdəki məhsullar</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Məhsul</th>
                  <th>Mövcud Say</th>
                  <th>Çıxarılacaq Say</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center">
                      Məhsul tapılmadı
                    </td>
                  </tr>
                ) : (
                  products.map((product, idx) => (
                    <tr key={product.product.id}>
                      <td>{idx + 1}</td>
                      <td>{product.product.name}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          min={0}
                          max={product.quantity}
                          value={quantities[product.product.id] || ""}
                          onChange={e =>
                            handleQuantityChange(
                              product.product.id,
                              e.target.value,
                              product.quantity
                            )
                          }
                          placeholder="0"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <button type="submit" className="btn btn-primary">
              Anbardan çıxar
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
}

export default CustomUnload;