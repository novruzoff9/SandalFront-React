import { CgDetailsLess } from "react-icons/cg";
import { FaInfo, FaPen, FaTrash } from "react-icons/fa";

// companies Tablosu Konfigürasyonu
export const companiesConfig = {
  title: "Şirkətlər",
  columns: [
    { key: "name", label: "Adı" },
    { key: "boss", label: "Rəhbəri" },
    { key: "warehouses", label: "Anbarı" },
    { key: "workers", label: "İşçi" }
  ],
  endpoint: "/company",
  renderActions: (company) => (
    <>
      {/* Detallı gör */}
      <button
        className="primary"
        title="Detallı gör"
        onClick={() => CgDetailsLess(company.id)}
      >
        <FaInfo />
      </button>
      {/* Düzəliş */}
      <button
        className="edit"
        title="Düzəliş"
        onClick={() => Edit(company.id)}
      >
        <FaPen />
      </button>
      {/* Action 3 Açıklaması */}
      <button
        className="delete"
        title="Action 3 Açıklaması"
        onClick={() => action3Function(company.id)}
      >
        <FaTrash />
      </button>
    </>
  ),
};