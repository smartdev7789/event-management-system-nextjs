import { useRouter } from "next/router";
import { Button, Form, Input, message, Space } from "antd";

import { userService } from "services";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const validateMessages = {
  required: "${label} is required!",
};

export const AddEdit = (props) => {
  const user = props?.user;
  const isAddMode = !user;
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  // set default form values if in edit mode
  if (!isAddMode) {
    form.setFieldsValue(props.user);
  }

  const onSubmit = (data) => {
    return isAddMode ? createUser(data) : updateUser(user.id, data);
  };

  const createUser = (data) => {
    return userService
      .register(data)
      .then(() => {
        messageApi.open({
          type: "success",
          content: "User added",
        });
        router.push(".");
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: err,
        });
      });
  };

  const updateUser = (id, data) => {
    return userService
      .update(id, data)
      .then(() => {
        messageApi.open({
          type: "success",
          content: "User updated",
        });
        router.push("..");
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: err,
        });
      });
  };

  return (
    <>
      {contextHolder}
      <Form
        {...layout}
        form={form}
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
            <Button htmlType="button" onClick={() => router.push("..")}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};
