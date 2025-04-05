import { FaEdit, FaTrash } from "react-icons/fa";
import axiosInstance from "../services/axiosConfig";
import Swal from "sweetalert2";

// Shelves Tablosu Konfigürasyonu
export const shelvesConfig = {
  title: "Rəflər",
  columns: [
    { key: "code", label: "RəfKodu" },
    { key: "Capacity", label: "Tutumu" },
    { key: "itemsCount", label: "Olan" }
  ],
  endpoint: "/shelf",
  renderActions: (shelf) => <ShelfActions shelf={shelf} />,
  inputs: [
    { label: "Rəf kodu", name: "code", type: "text" }
  ],
};

const ShelfActions = ({ shelf }) => {
  const deleteShelf = async (id) => {
    
    const endpoint = `/shelf/${id}`;
    await axiosInstance.delete(endpoint).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          title: "Silindi",
          text: "Rəf silindi",
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
        });
        window.location.reload();
      } else {
        Swal.fire({
          title: "Xəta",
          text: "Rəf silinmədi",
          icon: "error",
          timer: 1500,
          timerProgressBar: true,
        });
      }
    });
  };

  const editShelf = (id) => {
    // define viewLocations function
  }
  return (
    <>
      <button className="edit" onClick={() => editShelf(shelf.id)}>
        <FaEdit />{" "}
      </button>
      <button className="delete" onClick={() => deleteShelf(shelf.id)}>
        <FaTrash />{" "}
      </button>
    </>
  );
};