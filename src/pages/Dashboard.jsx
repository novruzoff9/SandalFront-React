import Layout from "../components/layout/Layout";
import MonthlySalesChart from "../components/dashboard/MonthlySalesChart";
import { useAuth } from "../context/AuthContext";
import WarehouseOccupancy from "../components/dashboard/WarehouseOccupancy";
import SalesInOutComeChart from "../components/dashboard/SalesInOutComeChart";

function Dashboard() {
  const { userRole } = useAuth();

  if (userRole === "boss") {
    return (
      <Layout>
        <div className="d-flex">
          <MonthlySalesChart />
          <WarehouseOccupancy />
        </div>
        <div className="d-flex">
          <SalesInOutComeChart />
        </div>
      </Layout>
    );
  } else if (userRole === "admin") {
    return (
      <Layout>
        <h1>Admin Dashboard</h1>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <h1>Warehouseman Dashboard</h1>
      </Layout>
    );
  }
}

export default Dashboard;
