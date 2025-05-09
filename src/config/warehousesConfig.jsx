import { FaPen } from "react-icons/fa";

// Branches Tablosu Konfigürasyonu
export const warehousesConfig = {
  title: "Anbar",
  columns: [
    { key: "name", label: "Adı" },
    { key: "city", label: "Şəhər" },
    { key: "Capacity", label: "Tutumu" },
    { key: "WorkersCount", label: "İşçi" }
  ],
  endpoint: "/warehouse",
  renderActions: (warehouse) => <WarehouseActions warehouse={warehouse} />,
  postEnpoint: "/warehouse",
  inputs: [
    { label: "Ad", name: "name", type: "text", required: true },
    { label: "Google Maps Link", name: "googleMaps", type: "text", required: true },
    { label: "Şəhər", name: "city", type: "text", required: true },
    { label: "Region", name: "state", type: "text" },
    { label: "Küçə", name: "street", type: "text", required: true },
    { label: "Zip kod", name: "zipCode", type: "text", required: true }
  ],
};

const WarehouseActions = ({ warehouse }) => {
  const editWarehouse = (id) => {
    window.location.href = `/warehouses/edit/${id}`;
  };
  return(
    <>
      <button
        className="edit"
        title="Düzəliş et"
        onClick={() => editWarehouse(warehouse.id)}
      >
        <FaPen />
      </button>
    </>
  )
}
