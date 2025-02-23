import { FaBuilding, FaKey, FaTrash } from "react-icons/fa";

// Çalışanlar Tablosu Konfigürasyonu
export const employeesConfig = {
  title: "İşçi",
  columns: [
    { key: "userName", label: "Ad" },
    { key: "email", label: "Email" },
    { key: "warehouseName", label: "Filial" },
    { key: "roles", label: "Rol" },
  ],
  endpoint: "http://104.248.36.17:5002/api/employee",
  renderActions: (employee) => (
    <>
      {/* Rolları Görüntüleme */}
      <button
        className="primary"
        title="Rolları Görüntüle"
        onClick={() => viewRoles(employee.id)}
      >
        <FaKey />
      </button>
      {/* Filialları Görüntüleme */}
      <button
        className="primary"
        title="Filialları Görüntüle"
        onClick={() => viewWarehouse(employee.id)}
      >
        <FaBuilding />
      </button>
      {/* İşçini Silme */}
      <button
        className="delete"
        title="İşçini Sil"
        onClick={() => deleteEmployee(employee.id)}
      >
        <FaTrash />
      </button>
    </>
  ),
  inputs: [
    { label: "Ad", name: "username", type: "text", },
    { label: "Email", name: "email", type: "email", },
    { label: "Şifrə", name: "password", type: "password",},
    //{ label: "Satış Qiyməti", name: "SellPrice", type: "number", step: "0.01", },
    //{ label: "Miqdar", name: "Count", type: "number",},
  ],
};

