import { FaPlus } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import ImportDataBtn from "./ImportDataBtn";

function InsertDataBtn({ newDataName }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const currentPath = location.pathname;
    if (currentPath.startsWith("/orders")) {
      navigate("/orders/create");
    } else {
      navigate(`${currentPath}/create`);
    }
  };

  return (
    <div className="d-flex justify-content-between">
      <ImportDataBtn title={newDataName}/>
      <button id="adddata" className="addrow" onClick={handleClick}>
        <FaPlus />
        <p>
          Yeni <span id="newDataName">{newDataName}</span>
        </p>
      </button>
    </div>
  );
}

export default InsertDataBtn;
