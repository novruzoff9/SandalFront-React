import { FaFileImport } from "react-icons/fa";

function ImportDataBtn({ title }) {
  return (
    <button
      id="ImportProductsBtn"
      className="primaryaction addrow"
      //onClick={openImportProductsModal()}
    >
      <FaFileImport />
      <p>{title} import et</p>
    </button>
  );
}

export default ImportDataBtn;
