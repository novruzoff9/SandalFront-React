import Layout from "../components/layout/Layout";
import MonthlySalesChart from "../components/management/MonthlySalesChart";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { userRole } = useAuth();

  if (userRole === "boss") {
    return (
      <Layout>
        <MonthlySalesChart />
      </Layout>
    );
  }
  else if(userRole === "admin"){
    return (
      <Layout>
        <h1>Admin Dashboard</h1>
      </Layout>
    );
  }
  else{
    return (
      <Layout>
        <h1>Warehouseman Dashboard</h1>
      </Layout>
    );
  }
}

export default Dashboard;
