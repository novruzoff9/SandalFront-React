import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosConfig";
import Swal from "sweetalert2";

// Nested dəyərləri oxumaq üçün helper
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((o, p) => (o ? o[p] : ""), obj);
};

function EditForm({ config }) {
  const { id } = useParams();
  const [formData, setFormData] = useState({});

  // Məlumatları və select-ləri yükləmək
  useEffect(() => {
    axiosInstance.get(`${config.endpoint}/${id}`).then((response) => {
      setFormData(response.data.data);
    });

    config.inputs.forEach(element => {
      if (element.type === "select") {
        const select = document.getElementById(element.name + "inpt");
        if (select && select.children.length <= 1) { // təkrar option əlavə etməmək üçün
          axiosInstance.get(element.endpoint).then((response) => {
            response.data.data.forEach((data) => {
              const option = document.createElement("option");
              option.value = data.id;
              option.text = data.name;
              select.appendChild(option);
            });
          });
        }
      }
    });
  }, [id, config]);

  const UpdateData = () => async () => {
    const form = document.getElementById("editDataForm");
    const updatedData = new FormData(form);

    const data = {};

    // Nested JSON object qur
    updatedData.forEach((value, key) => {
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

    data.id = id;
    console.log(data);

    try {
      const response = await axiosInstance.put(`${config.endpoint}/${id}`, data);

      if (response.data.statusCode === 201) {
        await Swal.fire({
          title: "Uğurla yeniləndi",
          icon: "success",
          timer: 1000,
          timerProgressBar: true,
        });

        const currentUrl = window.location.href;
        window.location.href = `/${currentUrl.split("/")[3]}`;
      } else {
        showErrors(response);
      }
    } catch (error) {
      if (error.response) {
        showErrors(error.response.data.errors);
      } else {
        console.error("Xəta baş verdi:", error);
      }
    }

    function showErrors(errors) {
      const errorMessages = document.getElementById("errormessages");
      errorMessages.innerHTML = "";
      
      
      errors.forEach((error) => {
        errorMessages.innerHTML += `<p style="color:red;">*${error.ErrorMessage}</p>`;
      });
    }
  };

  return (
    <div id="editDataContainer">
      <h1>{config.title} Redaktə et</h1>
      <form id="editDataForm">
        {config.inputs.map((input) => (
          <div key={input.name} className="inputGroup">
            <label htmlFor={input.name + "inpt"}>{input.label}:</label>
            {input.type === "select" ? (
              <select
                id={input.name + "inpt"}
                name={input.name}
                defaultValue={getNestedValue(formData, input.name)}
              >
                <option value="">-- Seçin --</option>
              </select>
            ) : (
              <input
                id={input.name + "inpt"}
                type={input.type}
                name={input.name}
                step={input.step}
                defaultValue={getNestedValue(formData, input.name)}
              />
            )}
          </div>
        ))}
        <button type="button" onClick={UpdateData()} className="primaryaction">Yadda saxla</button>
        <div id="errormessages"></div>
      </form>
    </div>
  );
}

EditForm.propTypes = {
  config: PropTypes.shape({
    endpoint: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    inputs: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        step: PropTypes.string,
        endpoint: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
};

export default EditForm;
