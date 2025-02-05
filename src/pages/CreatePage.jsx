import Layout from "../components/layout/Layout";
import CreateForm from "../components/management/CreateForm";

function CreatePage({ config }) {
  return (
    <Layout>
      <CreateForm config={config} />
    </Layout>
  );
}

export default CreatePage;