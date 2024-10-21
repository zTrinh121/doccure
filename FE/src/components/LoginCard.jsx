import { Button, Card, Flex, Form, Input, Space } from "antd";
import FloatLabel from "./FloatLabel";
import { useState } from "react";
const { Meta } = Card;

const LoginCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onValuesChange = (_, allValues) => {
    console.log(_);
    console.log(allValues);
    setUsername(allValues.username);
    setPassword(allValues.password);
  };

  return (
    <Card>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Meta title="Login Doccure" />

        <Form
          onValuesChange={onValuesChange}
          name="basic"
          labelCol={{
            span: 0,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <FloatLabel label="Username" name="username" value={username}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </FloatLabel>
          <FloatLabel label="Password" name="password" value={password}>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>
          </FloatLabel>
          <Form.Item>
            <Flex justify="flex-end" align="center">
              <a href="">Forgot password</a>
            </Flex>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Card>
  );
};

export default LoginCard;
