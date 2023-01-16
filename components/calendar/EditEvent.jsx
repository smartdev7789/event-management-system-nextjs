import { Modal, message, Form, Button, Input, Space } from "antd";
import { useContext, useEffect } from "react";
import { CalendarContext } from "context";
import { calendarService } from "services";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 13, span: 12 },
};

export const EditEvent = () => {
  const { isEditModalOpen, setIsEditModalOpen, info, events, setEvents } =
    useContext(CalendarContext);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const onSubmit = (data) => {
    return calendarService
      .update(info.id, {
        ...data,
        userid: info.userid,
        dateCreated: info.dateCreated,
      })
      .then(() => {
        setEvents(
          events.map((event) => {
            return event.id == info.id
              ? { ...event, title: data.title }
              : event;
          })
        );
        setIsEditModalOpen(false);
        messageApi.open({
          type: "success",
          content: "Event Updated Successfully!",
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
    setIsEditModalOpen(false);
  };
  const handleDelete = () => {
    return calendarService
      .delete(info.id)
      .then(() => {
        setEvents(events.filter((event) => event.id != info.id));
        setIsEditModalOpen(false);
        messageApi.open({
          type: "success",
          content: "Event Deleted Successfully!",
        });
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: err,
        });
      });
  };

  useEffect(() => {
    if (info.title) {
      form.setFieldsValue({ title: info.title });
    }
  }, [info.title]);

  return (
    <>
      {contextHolder}
      <Modal
        title="Edit Event"
        open={isEditModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          name="components-form-editevent"
          form={form}
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
                Edit
              </Button>
              <Button
                type="primary"
                danger
                htmlType="button"
                onClick={handleDelete}
              >
                Delete
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
