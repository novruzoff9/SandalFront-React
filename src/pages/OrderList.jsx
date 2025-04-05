import { useParams, Navigate } from "react-router-dom";
import {
  getOrderColumns,
  getOrderConfig,
  OrderActions,
} from "../config/ordersConfig";
import DynamicTable from "./DynamicTable";
import { useAuth } from "../context/AuthContext";

const OrderList = () => {
  const { userRole } = useAuth();
  const { status } = useParams();
  const config = getOrderConfig(status);
  const columns = getOrderColumns(userRole, status);
  
  const actions = OrderActions({ order: {}, status });

  if (!config) {
    return <Navigate to="/404" replace />;
  }

  config.renderActions = actions;
  config.columns = columns;
  

  return <DynamicTable config={config} />;
};

export default OrderList;
