import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Space, Table, Button } from "antd";

import { Layout } from "components/users";
import { userService } from "services";

const Index = () => {
  const router = useRouter();
  const [users, setUsers] = useState(null);

  useEffect(() => {
    userService.getAll().then((x) =>
      setUsers(
        x.map((_x) => {
          return { ..._x, key: _x.id };
        })
      )
    );
  }, []);

  const deleteUser = (id) => {
    setUsers(
      users.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    userService.delete(id).then(() => {
      setUsers((users) => users.filter((x) => x.id !== id));
    });
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: "28%",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: "28%",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "29%",
    },
    {
      title: "Action",
      key: "action",
      width: "15%",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            htmlType="button"
            onClick={() => router.push(`users/edit/${record.id}`)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            htmlType="button"
            onClick={() => deleteUser(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <h1>Users</h1>
      <Button
        type="primary"
        htmlType="button"
        className="mb-2"
        onClick={() => router.push(`users/add`)}
      >
        Add User
      </Button>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default Index;
