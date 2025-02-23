import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import DynamicTable from "./pages/DynamicTable";
import { productsConfig } from "./config/productsConfig";
import { employeesConfig } from "./config/employeesConfig";
import { warehousesConfig } from "./config/warehousesConfig";
import { shelvesConfig } from "./config/shelvesConfig";
import CreatePage from "./pages/CreatePage";
import { activeOrdersConfig } from "./config/activeOrdersConfig";
import { completedOrdersConfig } from "./config/completedOrdersConfig";
import CreateOrder from "./pages/CreateOrder";
import DeployProducts from "./pages/DeployProducts";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute component={Dashboard} />}
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute
              component={() => <DynamicTable config={productsConfig} />}
            />
          }
        />
        <Route
          path="/products/create"
          element={<ProtectedRoute component={() => <CreatePage config={productsConfig} />} />}
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute
              component={() => <DynamicTable config={employeesConfig} />}
            />
          }
        />
        <Route
          path="/employees/create"
          element={<ProtectedRoute component={() => <CreatePage config={employeesConfig} />} />}
        />
        <Route
          path="/orders/active"
          element={
            <ProtectedRoute
              component={() => <DynamicTable config={activeOrdersConfig} />}
            />
          }
        />
        <Route
          path="/orders/completed"
          element={
            <ProtectedRoute
              component={() => <DynamicTable config={completedOrdersConfig} />}
            />
          }
        />
        <Route
          path="/orders/create"
          element={
            <ProtectedRoute
              component={() => <CreateOrder />}
            />
          }
        />
        <Route
          path="/warehouses"
          element={
            <ProtectedRoute
              component={() => <DynamicTable config={warehousesConfig} />}
            />
          }
        />
        <Route
          path="/warehouses/create"
          element={<ProtectedRoute component={() => <CreatePage config={warehousesConfig} />} />}
        />
        <Route
          path="/shelves"
          element={
            <ProtectedRoute
              component={() => <DynamicTable config={shelvesConfig} />}
            />
          }
        />
        <Route
          path="/shelves/create"
          element={<ProtectedRoute component={() => <CreatePage config={shelvesConfig} />} />}
        />
        <Route
          path="/deploy"
          element={<ProtectedRoute component={() => <DeployProducts />} />}
        />
        <Route path="*" element={<ProtectedRoute component={Dashboard} />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;