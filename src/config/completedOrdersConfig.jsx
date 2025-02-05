import { FaTrash, FaInfo, FaPen } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export const completedOrdersConfig = {
  title: "Sifariş",
  columns: [
    { key: "warehouse", label: "Depo №", condition: (role) => role === "boss" },
    { key: "opened", label: "Açıldığı tarix" },
    { key: "closed", label: "Bağlandığı tarix" },
    { key: "status", label: "Status" },
  ],
  endpoint: "http://localhost:5002/api/order/completed",
  renderActions: (order) => <OrderActions order={order} />,
};

const OrderActions = ({ order }) => {
  const { userRole } = useAuth();

  const viewDetails = (id) => {
    // define viewDetails function
  };

  if (userRole === "boss") {
    return (
      <>
        <button onClick={() => viewDetails(order.id)}>
          <FaInfo />
        </button>
      </>
    );
  } 
  // else if (userRole === "warehouseman") {
  //   return (
      
  //   );
  // }
  return null;
};
