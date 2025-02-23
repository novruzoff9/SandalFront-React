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
  endpoint: "http://104.248.36.17:5002/api/warehouse",
  renderActions: (item) => (
    <>
      <button
        className="edit"
        title="Düzəliş et"
        onClick={() => editWarehouse(item.id)}
      >
        <FaPen />
      </button>
    </>
  ),
  inputs: [
    { label: "Ad", name: "name", type: "text" },
    { label: "Anbar adı", name: "name", type: "text", required: true },
    { label: "Google Maps Link", name: "googleMapsLocation", type: "text", required: true },
    { label: "Şəhər", name: "city", type: "text", required: true },
    { label: "Region", name: "state", type: "text" },
    { label: "Küçə", name: "street", type: "text", required: true },
    { label: "Zip kod", name: "zipCode", type: "text", required: true }
  ],
};
