import { FaTrash, FaInfo, FaPen } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export const activeOrdersConfig = {
  title: "Sifariş",
  columns: [
    { key: "warehouse", label: "Depo №", condition: (role) => role === "boss" },
    { key: "opened", label: "Açıldığı tarix" },
    { key: "closed", label: "Bağlandığı tarix" },
    { key: "status", label: "Status" },
  ],
  endpoint: "http://localhost:5002/api/order/active",
  renderActions: (order) => <OrderActions order={order} />,  
};

const OrderActions = ({ order }) => {
  const { userRole } = useAuth();

  const editOrder = (id) => {
    // define editOrder function
  };

  const deleteOrder = (id) => {
    // define deleteOrder function
  };

  const viewDetails = (id) => {
    // define viewDetails function
  };

  const prepareOrder = (id) => {
    // define prepareOrder function
  };

  if (userRole === "boss") {
    return (
      <>
        <button className="edit" onClick={() => editOrder(order.id)}>
          <FaPen />
        </button>
        <button className="delete" onClick={() => deleteOrder(order.id)}>
          <FaTrash />
        </button>
        <button onClick={() => viewDetails(order.id)}>
          <FaInfo />
        </button>
      </>
    );
  } else if (userRole === "warehouseman") {
    return (
      <button onClick={() => prepareOrder(order.id)} className="primaryaction">
        Sifarişi hazırla
      </button>
    );
  }
  return null;
};