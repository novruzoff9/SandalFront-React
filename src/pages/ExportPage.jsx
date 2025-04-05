import Layout from "../components/layout/Layout";
import axiosInstance from "../services/axiosConfig";

function ExportPage() {
  const dateNow = new Date().toISOString().slice(0, 16);
  const dateNowMinusOneMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 16);
  const ExportData = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const exportType = formData.get("export");
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    const exportFile = await axiosInstance.post(
      `/${exportType}/export-file`,
      data,
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(exportFile.data);

    const link = document.createElement("a");
    link.href;
    link.setAttribute("href", url);
    link.setAttribute("download", `${exportType}.xlsx`);
    document.body.appendChild(link);
    link.click();
  };
  return (
    <Layout>
      <form onSubmit={ExportData} className="form-container">
        <label htmlFor="exportSelect">Məlumat növünü seçin</label>
        <select name="export" id="exportSelect">
          <option value="product">Məhsullar</option>
          <option value="order">Sifarişlər</option>
        </select>
        <br />
        <div className="d-flex gap-3">
          <div className="inputGroup">
            <label htmlFor="StartDate">Başlanğıc Tarix</label>
            <input type="datetime-local" name="Start" id="StartDate" value={dateNowMinusOneMonth}/>
          </div>
          <div className="inputGroup">
            <label htmlFor="EndDate">Son Tarix</label>
            <input type="datetime-local" name="End" id="EndDate" value={dateNow}/>
          </div>
        </div>

        <button type="submit" className="primaryaction">Təsdiq</button>
      </form>
    </Layout>
  );
}

export default ExportPage;
