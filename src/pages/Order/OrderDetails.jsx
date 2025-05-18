import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    FaBarcode,
  FaBox,
  FaBoxOpen,
  FaCalendarAlt,
  FaCalendarCheck,
  FaDollarSign,
  FaInfoCircle,
  FaShippingFast,
  FaShoppingCart,
  FaSortNumericUp,
  FaStickyNote,
  FaTruck,
  FaUser,
  FaUserShield,
  FaWarehouse,
} from "react-icons/fa";
import Layout from "../../components/layout/Layout";
import axiosInstance from "../../services/axiosConfig";

function OrderDetails() {
  const { id } = useParams();
  const [orderProducts, setOrderProducts] = useState([]);
  const [order, setOrder] = useState({});

  useEffect(() => {
    getOrder();
    getOrderProducts();
  }, []);
  async function getOrderProducts() {
    var products = await axiosInstance.get(`/order/${id}/products`);
    setOrderProducts(products.data);
  }
  async function getOrder() {
    var order = await axiosInstance.get(`/order/${id}`);
    setOrder(order.data);
  }
  return (
    <Layout>
      {/* <h1>Sifariş məlumatları</h1>
      <p>Sifariş kodu: {id}</p>
      <p>Müştəri: {order.customer}</p>
      <p>Sifariş tarixi: {order.opened}</p>
      <p>Sifariş bağlandı: {order.closed}</p>
      <p>Sifariş statusu: {order.status}</p>
      <p>Sifariş açan: {order.openedBy}</p>
      <p>Sifariş bağlayan: {order.closedBy}</p>
      <p>Sifariş depo: {order.warehouse}</p>
      <p>Sifariş məhsulları: {order.quantity}</p>
      <p>Sifariş cəmi: {order.totalPrice} AZN</p>
      <p>Sifariş qeyd: {order.note}</p>
      <h2>Sifariş məhsulları</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Məhsul</th>
            <th>Miqdar</th>
          </tr>
        </thead>
        <tbody>
          {orderProducts.map((product, index) => (
            <tr key={product.id}>
              <td>{++index}</td>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <div className="container mt-5">
        <div className="order-card">
          <h3 className="mb-4">
            <FaShoppingCart/> Sifariş Məlumatları
          </h3>
          <div className="row g-3">
            <div className="col-md-6">
              <strong>
                <FaBarcode/> Sifariş kodu:
              </strong>{" "}
              {id}
            </div>
            <div className="col-md-6">
              <strong>
                <FaUser /> Müştəri:
              </strong>{" "}
              {order.customer}
            </div>
            <div className="col-md-6">
              <strong>
                <FaWarehouse /> Sifariş depo:
              </strong>{" "}
                {order.warehouse}
            </div>
            <div className="col-md-6">
              <strong>
                <FaCalendarAlt /> Sifariş tarixi:
              </strong>{" "}
                {order.opened}
            </div>
            <div className="col-md-6">
              <strong>
                <FaCalendarCheck /> Sifariş bağlandı:
              </strong>{" "}
                {order.closed}
            </div>
            <div className="col-md-6">
              <strong>
                <FaInfoCircle /> Sifariş statusu:
              </strong>{" "}
              <span className={"badge " + order.status}>{order.status}</span>
            </div>
            <div className="col-md-6">
              <strong>
                <FaUserShield /> Sifarişi açan:
              </strong>{" "}
                {order.openedBy}
            </div>
            <div className="col-md-6">
              <strong>
                <FaDollarSign /> Sifariş cəmi:
              </strong>{" "}
              <span className="text-success fw-bold">{order.totalPrice}</span>
            </div>
            <div className="col-md-12">
              <strong>
                <FaStickyNote/> Qeyd:
              </strong>{" "}
                {order.note}
            </div>
          </div>
        </div>
        <div className="order-card">
          <h3 className="mb-4">
            <FaBox /> Sifariş Məhsulları
          </h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>
                  <FaBoxOpen /> Məhsul
                </th>
                <th>
                  <FaTruck /> Qiymət
                </th>
                <th>
                  <FaSortNumericUp /> Miqdar
                </th>
                <th>
                  <FaShippingFast /> Cəmi
                </th>
              </tr>
            </thead>
            <tbody>
              {orderProducts.map((product, index) => (
                <tr key={product.id}>
                  <td>{++index}</td>
                  <td>{product.name}</td>
                  <td>{product.unitPrice} AZN</td>
                  <td>{product.quantity}</td>
                  <td>{product.totalPrice} AZN</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default OrderDetails;
