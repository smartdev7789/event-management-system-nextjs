import { useState, useEffect } from "react";
import { message } from "antd";

import { Layout, AddEdit } from "components/users";
import { userService } from "services";

const Edit = ({ id }) => {
  const [user, setUser] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    // fetch user and set default form values if in edit mode
    userService
      .getById(id)
      .then((x) => setUser(x))
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: err,
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      {contextHolder}
      <h1>Edit User</h1>
      {user && <AddEdit user={user} />}
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  return {
    props: { id: params.id },
  };
}

export default Edit;
