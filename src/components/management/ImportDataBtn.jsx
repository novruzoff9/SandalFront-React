import { FaFileImport } from "react-icons/fa";
import Swal from "sweetalert2";
import axiosInstance from "../../services/axiosConfig";

function ImportDataBtn({ title, endpoint }) {
  const openImportProductsModal = () => async () => {
    const { value: file } = await Swal.fire({
      icon: "question",
      title: `${title} daxil et`,
      input: "file",
      showDenyButton: true,
      denyButtonText: "Ləğv et",
    });
    if (!file) {
      return;
    } else {
      let formData = new FormData();
      formData.append("file", file);
      const response = await axiosInstance.post(`/${endpoint}/import-file`, formData);
      if(response.status === 200){
        Swal.fire({
          icon: "success",
          text: "Uğurla artırıldı",
          timer: 1000,
          timerProgressBar: true
        });
      }
    }
  };
  return (
    <button
      id="ImportProductsBtn"
      className="primaryaction addrow"
      onClick={openImportProductsModal()}
    >
      <FaFileImport />
      <p>{title} import et</p>
    </button>
  );
}

export default ImportDataBtn;
