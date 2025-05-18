import { FaBuilding, FaKey, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import axiosInstance from "../services/axiosConfig";

// Çalışanlar Tablosu Konfigürasyonu
export const employeesConfig = {
  title: "İşçi",
  columns: [
    { key: "firstName", label: "Ad" },
    { key: "email", label: "Email" },
    { key: "warehouseName", label: "Filial" },
    { key: "roles", label: "Rol" },
  ],
  endpoint: "/employee",
  renderActions: (employee) => <EmployeeActions employee={employee} />,
  inputs: [
    { label: "Ad", name: "firstName", type: "text" },
    { label: "Soyad", name: "lastName", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Telefon", name: "phoneNumber", type: "text" },
    { label: "Şifrə", name: "password", type: "password" },
    { label: "Filial", name: "warehouseId", type: "select", endpoint: "/warehouse" },
    //{ label: "Rol", name: "roleId", type: "select", endpoint: "/roles" },
    //{ label: "Satış Qiyməti", name: "SellPrice", type: "number", step: "0.01", },
    //{ label: "Miqdar", name: "Count", type: "number",},
  ],
};

const EmployeeActions = ({ employee }) => {
  // Rolları Görüntüleme
  const changeRole = async (id) => {
    let response = await axiosInstance.get("roles");
    let roles = response.data;
    
    const inputOptions = roles.reduce((options, role) => {
      options[role.id] = role.roleName;
      
      return options;
    }, {});

    const { value: role } = await Swal.fire({
      title: "Rolu dəyiş",
      input: "select",
      inputOptions: inputOptions,
      showCancelButton: true,
      inputPlaceholder: "Rol seçin",
      confirmButtonText: "Təsdiq",
      cancelButtonText: "İmtina",
    });
    if (!role) {
      return;
    }
    const body = {
      userId: id,
      roleId: role,
    }
    let request = await axiosInstance.post(`/Employee/assignrole`, body);
    if (request.status === 200) {
      Swal.fire("Uğurlu", "Rol uğurla əlavə olundu", "success");
    } else {
      Swal.fire("Xəta", "Rol əlavə olunarkən xəta baş verdi", "error");
    }
  };

  const changeWarehouse = async(id) => {
    let response = await axiosInstance.get("/warehouse");
    let warehouses = response.data.data;

    const inputOptions = warehouses.reduce((options, warehouse) => {
      options[warehouse.id] = warehouse.name;
      return options;
    }, {});

    const { value: warehouse } = await Swal.fire({
      title: "Filialı dəyiş",
      input: "select",
      inputOptions: inputOptions,
      showCancelButton: true,
      inputPlaceholder: "Filialı seçin",
      confirmButtonText: "Təsdiq",
      cancelButtonText: "İmtina",
    });
    if (!warehouse) {
      return;
    }
    const body = {
      userId: id,
      warehouseId: warehouse,
    }
    let request = await axiosInstance.post(`/employee/update-branch`, body);
    console.log(request);
    
    if (request.status === 200) {
      Swal.fire("Uğurlu", "Filial uğurla dəyişdirildi", "success");
    } else {
      Swal.fire("Xəta", "Filial dəyişdirilərkən xəta baş verdi", "error");
    }
  };

  // İşçini Silme
  const deleteEmployee = async (id) => {
    // define deleteEmployee function
  };
  return (
    <>
      {/* Rolları Görüntüleme */}
      <button
        className="primary"
        title="Rolu dəyiş"
        onClick={() => changeRole(employee.id)}
      >
        <FaKey />
      </button>
      {/* Filialları Görüntüleme */}
      <button
        className="primary"
        title="Filialı dəyiş"
        onClick={() => changeWarehouse(employee.id)}
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
  );
};
