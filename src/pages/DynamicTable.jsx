import { useEffect, useState } from "react";
import Table from "../components/management/Table";
import Layout from "../components/layout/Layout";
import InsertDataBtn from "../components/management/InsertDataBtn";
import axiosInstance from "../services/axiosConfig";

function DynamicTable({ config }) {
  const [data, setData] = useState([]);

  const getAllData = async () => {
    const response = await axiosInstance.get(config.endpoint);
    setData(response.data.data);
    
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <Layout>
      <InsertDataBtn newDataName={config.title} />
      <br />
      <Table
        columns={config.columns}
        data={data}
        renderActions={config.renderActions}
      />
    </Layout>
  );
}

export default DynamicTable;