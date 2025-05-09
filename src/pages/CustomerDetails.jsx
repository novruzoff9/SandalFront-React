import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import axiosInstance from "../services/axiosConfig";

function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axiosInstance.get(`/customer/${id}`).then((res) => {
      setCustomer(res.data.data);
    });

    axiosInstance.get(`/order/ByCustomer/${id}`).then((res) => {
      setOrders(res.data.data);
      console.log(res.data.data);
      
    });
  }, [id]);

  if (!customer) return <p>Yüklənir...</p>;

  return (
    <Layout>
      <div className="customer-details-container">
        <div className="customer-info">
          <div className="customer-card">
            <h2>Müştəri Məlumatları</h2>
            <div className="info-group">
              <label>Ad:</label>
              <p>{customer.firstName}</p>
            </div>
            <div className="info-group">
              <label>Soyad:</label>
              <p>{customer.lastName}</p>
            </div>
            <div className="info-group">
              <label>Email:</label>
              <p>{customer.email}</p>
            </div>
            <div className="info-group">
              <label>Telefon:</label>
              <p>{customer.phone}</p>
            </div>
          </div>

          <div className="address-section customer-card">
            <h3>Ünvan</h3>
            <div className="info-group">
              <label>Şəhər:</label>
              <p>{customer.address.city}</p>
            </div>
            <div className="info-group">
              <label>Rayon:</label>
              <p>{customer.address.district}</p>
            </div>
            <div className="info-group">
              <label>Küçə:</label>
              <p>{customer.address.street}</p>
            </div>
            <div className="info-group">
              <label>Poçt Kodu:</label>
              <p>{customer.address.zipCode}</p>
            </div>
          </div>
        </div>

        <div className="order-list">
          <h2>Sifarişlər</h2>
          {orders.length === 0 ? (
            <p>Bu müştəriyə aid sifariş yoxdur.</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="order-card">
                <h3>Sifariş #{order.id}</h3>
                <div className="order-card">
                  <div className="info">
                    <label>Tarix:</label>
                    <p>{new Date(order.opened).toLocaleDateString()}</p>
                  </div>
                  <div className="info">
                    <label>Toplam Məbləğ:</label>
                    <p>{order.totalPrice} AZN</p>
                  </div>
                  <div className="info">
                    <label>Status:</label>
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="product-list">
                  <h4>Məhsullar</h4>
                  {/* <ul>
                    {order.products.map((product) => (
                      <li key={product.id}>
                        {product.name} — {product.quantity} əd. —{" "}
                        {product.price} AZN
                      </li>
                    ))}
                  </ul> */}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}

export default CustomerDetails;
