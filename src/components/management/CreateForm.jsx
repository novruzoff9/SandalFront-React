import { useEffect } from "react";
import axiosInstance from "../../services/axiosConfig";


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
    
    if (response.ok) {
      alert("Məhsul uğurla əlavə olundu");
      form.reset();
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
