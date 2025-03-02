import { useEffect } from "react";
import axiosInstance from "../../services/axiosConfig";
import Swal from "sweetalert2";


function CreateForm({ config }) {
  
  const InsertData = () => async () => {
    const form = document.getElementById("addDataForm");
    const formData = new FormData(form);

    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    console.log(data);
    

    
    const response = await axiosInstance.post(config.endpoint, data);
    
    if (response.status === 200) {
      await Swal.fire({
        title: "Əməliyyat uğurla yerinə yetirildi",
        text: "Məlumat əlavə olundu",
        icon: "success",
        timer: 1000,
        timerProgressBar: true,
      });
      const currentUrl = window.location.href;
      window.location.href = `/${currentUrl.split("/")[3]}`;

    } else {
      alert("Bir hata oluştu");
    }
  };
  return (
    <div id="addDataContainer">
      <h1>{config.title} Yarat</h1>
      <form id="addDataForm">
        {config.inputs.map((input) => (
          <div key={input.name} className="inputGroup">
            <label htmlFor={input.name + "inpt"}>{input.label}:</label>
            <input
              id={input.name + "inpt"}
              type={input.type}
              name={input.name}
              step={input.step}
            />
          </div>
        ))}
        <button type="button" onClick={InsertData()}>Əlavə et</button>
      </form>
    </div>
  );
}

export default CreateForm;
