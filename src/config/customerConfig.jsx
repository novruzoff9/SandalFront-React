import { FaInfo, FaPen } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa6";

// Customer Tablosu Konfigürasyonu
export const CustomerConfig = {
  title: "Müştəri",
  columns: [
    { key: "firstName", label: "Adı" },
    { key: "lastName", label: "Soyadı" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Telefon" },
  ],
  endpoint: "http://localhost:5000/customer",
  renderActions: (customer) => customerActions(customer),
  inputs: [
    { label: "Ad", name: "firstName", type: "text", required: true },
    { label: "Soyad", name: "lastName", type: "text", required: true },
    { label: "Email", name: "email", type: "text", required: true },
    { label: "Telefon", name: "phone", type: "text", required: true }
  ],
};

const customerActions = (customer) => {
  const viewDetailss = (id) => {
    window.location.href = `/customers/details/${id}`;
  };
  const showOrders = (id) => {
    window.location.href = `/customers/orders/${id}`;
  };
  const editCustomer = (id) => {
    window.location.href = `/customers/edit/${id}`;
  };

  // const deleteCustomer = (id) => {
  //     Swal.fire({
  //         title: "Silmək istədiyinizə əminsiniz?",
  //         text: "Bu əməliyyatı geri qaytarmaq mümkün olmayacaq!",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonColor: "#3085d6",
  //         cancelButtonColor: "#d33",
  //         confirmButtonText: "Bəli, sil!",
  //         cancelButtonText: "Xeyr, imtina et",
  //     }).then(async (result) => {
  //         if (result.isConfirmed) {
  //             const endpoint = `/customer/${id}`;
  //             await axiosInstance.delete(endpoint).then(async() => {
  //                 await Swal.fire({
  //                     title: "Silmək uğurla başa çatdı!",
  //                     text: "Müştəri silindi",
  //                     icon: "success",
  //                     timer: 1500,
  //                     timerProgressBar: true,
  //                 });
  //                 window.location.reload();
  //             });
  //         }
  //     });
  // };

  return (
    <>
      <button
        className="primaryaction"
        title="Məlumatları göstər"
        onClick={() => viewDetailss(customer.id)}
      >
        <FaInfo />
      </button>
      <button
        className="primaryaction"
        title="Satışları göstər"
        onClick={() => showOrders(customer.id)}
      >
        <FaReceipt />
      </button>
      <button
        className="deleteaction"
        title="Düzəliş et"
        onClick={() => editCustomer(customer.id)}
      >
        <FaPen />
      </button>
    </>
  );
};
