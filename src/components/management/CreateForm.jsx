import { useEffect } from "react";
import axiosInstance from "../../services/axiosConfig";
import Swal from "sweetalert2";


function CreateForm({ config }) {
  

  useEffect(() => {
    config.inputs.forEach(element => {
      if(element.type === "select"){
        const select = document.getElementById(element.name + "inpt");
        axiosInstance.get(element.endpoint).then((response) => {
          response.data.data.forEach((data) => {
            const option = document.createElement("option");
            option.value = data.id;
            option.text = data.name;
            select.appendChild(option);
          });
        });
      }
    });
  }, []);

  const InsertData = () => async () => {
    const form = document.getElementById("addDataForm");
    const formData = new FormData(form);

    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const response = await axiosInstance.post(config.endpoint, data);
    

    if (response.data.statusCode === 200) {
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
      const errorMessages = document.getElementById("errormessages");
      errorMessages.innerHTML = "";
      response.data.errors.forEach((error) => {
        errorMessages.innerHTML += `<p style="color:red;">*${error}</p>`;
      });
    }
  };
  return (
    <div id="addDataContainer">
      <h1>{config.title} Yarat</h1>
      <form id="addDataForm">
        {config.inputs.map((input) => (
          <div key={input.name} className="inputGroup">
            <label htmlFor={input.name + "inpt"}>{input.label}:</label>
            {input.type === "select" ? (
              <select id={input.name + "inpt"} name={input.name}>
                <option value="">-- Seçin --</option>
              </select>
            ) : (
              <input
                id={input.name + "inpt"}
                type={input.type}
                name={input.name}
                step={input.step}
              />
            )}
          </div>
        ))}
        <button type="button" onClick={InsertData()}>Əlavə et</button>
        <div id="errormessages"></div>
      </form>
    </div>
  );
}

export default CreateForm;
