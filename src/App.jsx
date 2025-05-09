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
import CreateOrder from "./pages/CreateOrder";
import DeployProducts from "./pages/DeployProducts";
import { companiesConfig } from "./config/companiesConfig";
import OrderDetails from "./pages/OrderDetails";
import ExportPage from "./pages/ExportPage";
import PrepareOrder from "./pages/PrepareOrder";
import OrderList from "./pages/OrderList";
import { CustomerConfig } from "./config/customerConfig";
import ProductDetails from "./pages/ProductDetails";
import EditPage from "./pages/EditPage";
import CustomerDetails from "./pages/CustomerDetails";

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
          path="/companies"
          element={
            <ProtectedRoute
              component={() => <DynamicTable config={companiesConfig} />}
            />
          }
        />
        <Route
          path="/companies/create"
          element={<ProtectedRoute component={() => <CreatePage config={companiesConfig} />} />}
        />
        <Route
          path="/companies/edit/:id"
          element={<ProtectedRoute component={() => <EditPage config={companiesConfig} />} />}
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
          path="/products/edit/:id"
          element={<ProtectedRoute component={() => <EditPage config={productsConfig} />} />}
        />
        <Route
          path="/products/details/:id"
          element={<ProtectedRoute component={() => <ProductDetails />} />}
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
        <Route path="/orders/:status" element={<ProtectedRoute component={() => <OrderList />} />} />

        <Route
          path="/orders/details/:id"
          element={<ProtectedRoute component={() => <OrderDetails />} />}
        />
        <Route
          path="orders/prepare/:id"
          element={<ProtectedRoute component={() => <PrepareOrder />} />}
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
          path="/customers"
          element={
            <ProtectedRoute
              component={() => <DynamicTable config={CustomerConfig} />}
            />
          }
        />
        <Route
          path="/customers/create"
          element={<ProtectedRoute component={() => <CreatePage config={CustomerConfig} />} />}
        />
        <Route
          path="/customers/edit/:id"
          element={<ProtectedRoute component={() => <EditPage config={CustomerConfig} />} />}
        />
        <Route
          path="/customers/details/:id"
          element={<ProtectedRoute component={() => <CustomerDetails />} />}
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
          path="/warehouses/edit/:id"
          element={<ProtectedRoute component={() => <EditPage config={warehousesConfig} />} />}
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
          path="/exports"
          element={<ProtectedRoute component={() => <ExportPage />} />}
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