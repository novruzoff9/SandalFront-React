import { useEffect } from "react";
import axiosInstance from "../../services/axiosConfig";


function CreateForm({ config }) {
  useEffect(() => {
    const form = document.getElementById("addDataForm");
    if (form) {
      form.addEventListener("submit", InsertData);
      form.reset();
    } else {
      console.error("Form element not found");
    }
  }, []);

  const InsertData = () => async (e) => {
    console.log(e.target);
    const formData = new FormData(form);

    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    const response = await axiosInstance.post(config.postEnpoint, data);

    if (response.ok) {
      alert("Yeni veri başarıyla eklendi");
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
        <button type="submit">Yarat</button>
      </form>
    </div>
  );
}

export default CreateForm;
