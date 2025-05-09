import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axiosInstance from "../services/axiosConfig";

function CreateOrder() {
  const [warehouses, setWarehouses] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [address, setAddress] = useState({
    city: "",
    district: "",
    street: "",
    zipCode: "",
  });
  const [orderItems, setOrderItems] = useState([
    { productId: "", quantity: 1 }
  ]);

  useEffect(() => {
    loadFormData();
  }, []);

  useEffect(() => {
    const selectedCustomer = customers.find(c => c.id === selectedCustomerId);
    if (selectedCustomer && selectedCustomer.address) {
      setAddress({
        city: selectedCustomer.address.city,
        district: selectedCustomer.address.district,
        street: selectedCustomer.address.street,
        zipCode: selectedCustomer.address.zipCode,
      });
    }
  }, [selectedCustomerId]);

  const loadFormData = async () => {
    try {
      const [warehouseRes, customerRes, productRes] = await Promise.all([
        axiosInstance.get("/warehouse"),
        axiosInstance.get("/customer"),
        axiosInstance.get("/product"),
      ]);

      setWarehouses(warehouseRes.data.data);
      setCustomers(customerRes.data.data);
      setProducts(productRes.data.data);
    } catch (err) {
      console.error("Data load error:", err);
    }
  };

  const handleAddProduct = () => {
    setOrderItems([...orderItems, { productId: "", quantity: 1 }]);
  };

  const handleRemoveProduct = (index) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const handleProductChange = (index, field, value) => {
    const updated = [...orderItems];
    updated[index][field] = value;
    setOrderItems(updated);
  };

  const handleCompleteOrder = async () => {
    const selectedWarehouse = warehouses.find(w => w.id === document.getElementById("WarehouseIdSelect").value);
    const finalItems = orderItems.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        ProductId: item.productId,
        Quantity: item.quantity,
        ProductName: product?.name,
        UnitPrice: product?.sellPrice,
        ImageUrl: product?.imageUrl,
      };
    });

    const orderData = {
      WarehouseId: selectedWarehouse?.id,
      WarehouseName: selectedWarehouse?.name,
      CustomerId: selectedCustomerId,
      Address: {
        City: address.city,
        District: address.district,
        Street: address.street,
        ZipCode: address.zipCode,
      },
      OrderItems: finalItems,
    };

    try {
      const res = await axiosInstance.post("/order", orderData);
      if (res.status === 200) {
        alert("Sifariş uğurla yaradıldı");
        window.location.href = "/orders/active";
      } else {
        alert("Sifariş yaradılmadı");
      }
    } catch (err) {
      console.error("Order creation failed:", err);
    }
  };

  return (
    <Layout>
      <div id="addDataContainer">
        <h2>Sifariş ver</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="WarehouseIdSelect">Hansı Anbardan:</label>
          <select id="WarehouseIdSelect">
            <option value="" disabled>--Seçin--</option>
            {warehouses.map((w) => (
              <option key={w.id} value={w.id}>{w.name}</option>
            ))}
          </select>

          <label htmlFor="CustomerIdSelect">Hansı Müştəriyə:</label>
          <select
            id="CustomerIdSelect"
            value={selectedCustomerId}
            onChange={(e) => setSelectedCustomerId(e.target.value)}
          >
            <option value="" disabled>--Seçin--</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>{c.fullName}</option>
            ))}
          </select>

          <div className="d-flex gap-2 align-items-center flex-wrap">
            <label>Şəhər:</label>
            <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />

            <label>Rayon:</label>
            <input type="text" value={address.district} onChange={(e) => setAddress({ ...address, district: e.target.value })} />

            <label>Küçə:</label>
            <input type="text" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />

            <label>Poçt Kodu:</label>
            <input type="text" value={address.zipCode} onChange={(e) => setAddress({ ...address, zipCode: e.target.value })} />
          </div>

          <button type="button" className="successaction mb-2" onClick={handleAddProduct}>
            Məhsul Artır
          </button>

          <div>
            {orderItems.map((item, index) => (
              <div key={index} className="mb-3 gap-2 d-flex align-items-center flex-wrap">
                <label>Məhsul:</label>
                <select
                  className="ProductIdSelect"
                  value={item.productId}
                  onChange={(e) => handleProductChange(index, "productId", e.target.value)}
                >
                  <option value="" disabled>--Seçin--</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <label>Miqdar:</label>
                <input
                  type="number"
                  min="1"
                  className="QuantityInput"
                  value={item.quantity}
                  onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                />
                <button type="button" onClick={() => handleRemoveProduct(index)} className="deleteaction ml-2">
                  Sil
                </button>
              </div>
            ))}
          </div>

          <button type="button" onClick={handleCompleteOrder} className="primaryaction">
            Sifarişi tamamla
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default CreateOrder;
