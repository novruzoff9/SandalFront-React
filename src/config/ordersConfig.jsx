import { FaTrash, FaInfo, FaPen } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../services/axiosConfig";
import { FaRepeat } from "react-icons/fa6";

export const ordersConfig = {
  submitted: {
    title: "Təsdiqlənmiş Sifarişlər",
    endpoint: "/order/bystatus/submitted",
    actions: ["edit", "delete", "view", "prepare"],
  },
  prepared: {
    title: "Hazırlanmış Sifarişlər",
    endpoint: "/order/bystatus/prepared",
    actions: ["view"],
  },
  stockconfirmed: {
    title: "Yoxlanılmış Sifarişlər",
    endpoint: "/order/bystatus/stockconfirmed",
    actions: ["view", "prepare"],
  },
  shipped: {
    title: "Göndərilmiş Sifarişlər",
    endpoint: "/order/bystatus/shipped",
    actions: ["view"],
  },
  cancelled: {
    title: "Ləğv Edilmiş Sifarişlər",
    endpoint: "/order/bystatus/cancelled",
    actions: ["view", "retry"],
  },
};

export const getOrderConfig = (status) => ordersConfig[status] || null;

export const getOrderColumns = (role, status) => [
  { key: "warehouse", label: "Depo №", condition: role === "boss" },
  { key: "opened", label: "Açıldığı tarix" },
  { key: "customer", label: "Müştəri" },
  { key: "status", label: "Status" },
  { key: "quantity", label: "Miqdar" },
  { key: "totalPrice", label: "Cəmi" },
  { key: "closed", label: "Bağlandığı tarix", condition: status === "shipped" },
  { key: "note", label: "Qeyd", condition: status === "cancelled" },
].filter((column) => column.condition !== false);

export const OrderActions = ({ order, status }) => {
  const { userRole } = useAuth();

  const editOrder = (id) => {
    // Edit Order Logic
  };

  const deleteOrder = async (id) => {
    const response = await axiosInstance.delete(`/order/${id}`);
    if (response.status === 200) {
      alert("Sifariş uğurla silindi");
      window.location.reload();
    } else {
      alert("Sifariş bağlanmadı");
    }
  };

  const viewDetails = (id) => {
    window.location.href = `/orders/details/${id}`;
  };

  const prepareOrder = (id) => {
    window.location.href = `/orders/prepare/${id}`;
  };

  const retryOrder = async(id) => {
    await axiosInstance.post(`/order/${id}/retry`).then((response) => {
      if (response.status === 200) {
        alert("Sifariş uğurla təkrarlandı");
        window.location.reload();
      } else {
        alert("Sifariş bağlanmadı");
      }
    })
    .catch((error) => {
      console.error("Sifariş bağlanmadı", error);
    });

  }

  if (!ordersConfig[status]) return null; // Yanlış status daxil olarsa

  return (order) => (
    <>
      {ordersConfig[status].actions.includes("edit") && 
      userRole === "boss" && (
        <button className="edit" onClick={() => editOrder(order.id)}>
          <FaPen />
        </button>
      )}
      {ordersConfig[status].actions.includes("delete") &&
        userRole === "boss" && (
          <button className="delete" onClick={() => deleteOrder(order.id)}>
            <FaTrash />
          </button>
        )}
      {ordersConfig[status].actions.includes("view") &&
        userRole === "boss" && (
            <button onClick={() => viewDetails(order.id)}>
              <FaInfo />
            </button>
          )}
      {ordersConfig[status].actions.includes("prepare") &&
        userRole == "warehouseman" && (
          <button onClick={() => prepareOrder(order.id)} className="primaryaction" style={{"width": "100%"}}>
            Sifarişi hazırla
          </button>
        )}
        {ordersConfig[status].actions.includes("retry") &&
        userRole == "boss" && (
          <button onClick={() => retryOrder(order.id)} className="primaryaction">
            <FaRepeat />
          </button>
        )}
    </>
  );
};
