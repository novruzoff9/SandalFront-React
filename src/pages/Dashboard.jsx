import Layout from "../components/layout/Layout";
import MonthlySalesChart from "../components/dashboard/MonthlySalesChart";
import { useAuth } from "../context/AuthContext";
import WarehouseOccupancy from "../components/dashboard/WarehouseOccupancy";
import SalesInOutComeChart from "../components/dashboard/SalesInOutComeChart";
import Top5Product from "../components/dashboard/Top5Product";

function Dashboard() {
  const { userRole } = useAuth();

  const topProducts = [
  { name: 'Intel Core i7 14', count: 120 },
  { name: 'ASUS monitor 140hz', count: 95 },
  { name: 'Amd Ryzen 5', count: 80 },
  { name: 'HDD 1Tb', count: 72 },
  { name: 'Kingston 32 Gb', count: 60 },
];



  if (userRole === "boss") {
    return (
      <Layout>
        <div className="d-flex">
          <MonthlySalesChart />
          <WarehouseOccupancy />
        </div>
        <div className="d-flex">
          <SalesInOutComeChart />
          <Top5Product data={topProducts}/> 
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
