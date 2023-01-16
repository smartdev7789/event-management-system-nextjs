import { useRouter } from "next/router";
import { Button, Form, Input, message, Space } from "antd";

import { Layout } from "components/account";
import { userService } from "services";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const Login = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = ({ username, password }) => {
    return userService
      .login(username, password)
      .then(() => {
        // get return url from query parameters or default to '/'
        const returnUrl = router.query.returnUrl || "/";
        router.push(returnUrl);
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
        <h4 className="card-header">Login</h4>
        <div className="card-body">
          <Form
            name="components-form-login"
            {...layout}
            onFinish={onSubmit}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Space size="middle">
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
                <Button
                  htmlType="button"
                  onClick={() => router.push("register")}
                >
                  Register
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
