import { useEffect } from "react";
import axiosInstance from "../../services/axiosConfig";
import Swal from "sweetalert2";

function CreateForm({ config }) {
  useEffect(() => {
    config.inputs.forEach((element) => {
      if (element.type === "select") {
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
      const keys = key.split(".");
      let current = data;

      keys.forEach((k, index) => {
        if (index === keys.length - 1) {
          current[k] = value;
        } else {
          if (!current[k]) current[k] = {};
          current = current[k];
        }
      });
    });

    //console.log(data);

    try {
      const response = await axiosInstance.post(config.endpoint, data);
      console.log(response);
      
      if (response.data.statusCode === 201) {
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
        showErrors(response.data.errors);
      }
    } catch (error) {
      if (error.response) {
        showErrors(error.response.data.Message);
        
      } else {
        console.error("Xəta baş verdi:", error);
      }
    }

    function showErrors(errors) {
      const errorMessages = document.getElementById("errormessages");
      errorMessages.innerHTML = "";
      errorMessages.innerHTML += `<p style="color:red;">*${errors}</p>`;
      // errors.forEach((error) => {
      //   errorMessages.innerHTML += `<p style="color:red;">*${error}</p>`;
      // });
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
        <div id="errormessages"></div>
        <button type="button" onClick={InsertData()} className="primaryaction">
          Əlavə et
        </button>
      </form>
    </div>
  );
}

export default CreateForm;
