import Layout from "../components/layout/Layout";
import EditForm from "../components/management/EditForm";

function EditPage({ config }) {
  return (
    <Layout>
      <EditForm config={config} />
    </Layout>
  );
}

export default EditPage;
