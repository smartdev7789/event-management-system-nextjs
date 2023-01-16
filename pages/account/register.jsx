import { useRouter } from "next/router";
import { Button, Form, Input, message, Space } from "antd";

import { Layout } from "components/account";
import { userService } from "services";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const validateMessages = {
  required: "${label} is required!",
};

const Register = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = (user) => {
    return userService
      .register(user)
      .then(() => {
        messageApi.open({
          type: "success",
          content: "Registration successful",
        });
        router.push("login");
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: err,
        });
      });
  };

  return (
    <Layout>
      {contextHolder}
      <div className="card">
        <h4 className="card-header">Register</h4>
        <div className="card-body">
          <Form
            {...layout}
            name="components-form-register"
            onFinish={onSubmit}
            validateMessages={validateMessages}
          >
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                ...layout.wrapperCol,
                offset: 4,
              }}
            >
              <Space size="middle">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="button" onClick={() => router.push("login")}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
