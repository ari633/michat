import React, { useContext, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socket";
import { AlertContext } from "../context/alert";

export default function Root() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { doConnect, errorMsg, isConnected } = useContext(SocketContext);
  const { setAlertMessage } = useContext(AlertContext);

  useEffect(() => {
    if (errorMsg) {
      setAlertMessage(errorMsg);
    }
  }, [errorMsg, setAlertMessage]);

  useEffect(() => {
    const { roomId } = form.getFieldsValue();
    const roomIdSession = localStorage.getItem("roomId");
    if (isConnected) {
      setAlertMessage("");
      navigate(`/room/${roomId || roomIdSession}`);
    }
  }, [isConnected, form, navigate, setAlertMessage]);

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      const user = { sessionId };
      doConnect(user);
    }
  }, [doConnect]);

  const handleOnFinishForm = () => {
    const { username, roomId } = form.getFieldsValue();
    doConnect({
      username: username,
      roomId: roomId,
    });
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      onFinish={handleOnFinishForm}
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
        label="Room ID"
        name="roomId"
        rules={[
          {
            required: true,
            message: "Please input room ID!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Enter
        </Button>
      </Form.Item>
    </Form>
  );
}
