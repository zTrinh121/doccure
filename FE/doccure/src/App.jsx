import { useState } from "react";
import reactLogo from "./assets/react.svg";
import loginImage from "./assets/login.png";
import viteLogo from "/vite.svg";
import { Button, Col, Row } from "antd";
import { Image } from "antd";
import { Flex } from "antd";
import { Card } from "antd";
import { Form } from "antd";
import { Input } from "antd";
import { Checkbox } from "antd";
import { Space } from "antd";
import FloatLabel from "./components/FloatLabel";
const { Meta } = Card;
// import './App.css'

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onValuesChange = (_, allValues) => {
    console.log(_);
    console.log(allValues);
    setUsername(allValues.username);
    setPassword(allValues.password);
  };

  return (
    <>
      <div>
        <Flex justify="center" align="center" style={{ height: "100vh" }}>
          <Row>
            <Col span={4}></Col>
            <Col span={8}>
              <Image
                preview={false}
                // width={200}
                src={loginImage}
              />
            </Col>
            <Col span={8}>
              <Card
              // title="Login"
              // style={{
              //   width: 300,
              // }}
              >
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ display: "flex" }}
                >
                  <Meta title="Login Doccure" />
                  {/* //todos: Floating Label */}
                  <Form
                    onValuesChange={onValuesChange}
                    name="basic"
                    labelCol={{
                      span: 0,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    // style={{
                    //   maxWidth: 600,
                    // }}
                    initialValues={{
                      remember: true,
                    }}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <FloatLabel
                      label="Username"
                      name="username"
                      value={username}
                    >
                      <Form.Item
                        // label="Username"
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

                    <FloatLabel
                      label="Password"
                      name="password"
                      value={password}
                    >
                      <Form.Item
                        // label="Password"

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
                        {/* <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}
                        <a href="">Forgot password</a>
                      </Flex>
                    </Form.Item>
                    {/* <Form.Item
                      name="remember"
                      valuePropName="checked"
                      // wrapperCol={{
                      //   offset: 8,
                      //   span: 16,
                      // }}
                    >
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item> */}

                    <Form.Item
                    // wrapperCol={{
                    //   offset: 8,
                    //   span: 16,
                    // }}
                    >
                      <Button type="primary" htmlType="submit" block>
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </Space>
              </Card>
            </Col>
            <Col span={4}></Col>
          </Row>
        </Flex>
      </div>
    </>
  );
}

export default App;
