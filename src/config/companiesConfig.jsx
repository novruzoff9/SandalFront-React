import { CgDetailsLess } from "react-icons/cg";
import { FaInfo, FaPen, FaTrash } from "react-icons/fa";

// companies Tablosu Konfigürasyonu
export const companiesConfig = {
  title: "Şirkət",
  columns: [
    { key: "name", label: "Adı" },
    { key: "boss", label: "Rəhbəri" },
    { key: "warehouses", label: "Anbarı" },
    { key: "workers", label: "İşçi" }
  ],
  endpoint: "/company",
  postEnpoint: "/company", // Əlavə etmisənsə
  renderActions: (company) => <CompanyActions company={company} />,
  inputs: [
    { label: "Ad", name: "name", type: "text" },
    { label: "Haqqında", name: "description", type: "text" },
    { label: "Logo Url", name: "logoUrl", type: "text" },
  ],
};


const CompanyActions = ({ company }) => {
  const Edit = (id) => {
    window.location.href = `/companies/edit/${id}`;
  }
  console.log(company);
  
  return(
    <>
      <button
        className="primary"
        title="Detallı gör"
        onClick={() => CgDetailsLess(company.id)}
      >
        <FaInfo />
      </button>
      <button
        className="edit"
        title="Düzəliş"
        onClick={() => Edit(company.id)}
      >
        <FaPen />
      </button>
      <button
        className="delete"
        title="Action 3 Açıklaması"
        onClick={() => action3Function(company.id)}
      >
        <FaTrash />
      </button>
    </>
  )
}