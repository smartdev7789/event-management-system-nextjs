import { Modal, message, Form, Button, Input, Space } from "antd";
import { useContext } from "react";
import { CalendarContext } from "context";
import { calendarService } from "services";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 16, span: 8 },
};

export const AddEvent = () => {
  const { isAddModalOpen, setIsAddModalOpen, info, events, setEvents } =
    useContext(CalendarContext);
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = ({ title }) => {
    return calendarService
      .register({ ...info, title })
      .then((newEvent) => {
        setEvents([...events, newEvent]);
        setIsAddModalOpen(false);
        messageApi.open({
          type: "success",
          content: "Event Added Successfully!",
        });
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: err,
        });
      });
  };
  const handleCancel = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Modal title="Add Event" open={isAddModalOpen} footer={null} onCancel={handleCancel}>
        <Form
          name="components-form-addevent"
          {...layout}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Event title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input event title!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space size="small">
              <Button type="primary" htmlType="submit">
                Add
              </Button>
              <Button htmlType="button" onClick={handleCancel}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
