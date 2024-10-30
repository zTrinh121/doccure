import { Button, Card, Flex, Form, Input, Space } from 'antd';
import FloatLabel from '../../../components/ui/float-lable/FloatLabel';
import { useState } from 'react';
import { login } from '../../../lib/auth';
import { useNavigate } from 'react-router-dom';
import { getActions } from '../../../stores/authStore';
import { notification } from 'antd';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
// import { useAuthStore } from '../../../stores/authStore';
const { Meta } = Card;

const LoginCard = () => {
  const { setAccessToken } = getActions();

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [api, contextHolder] = notification.useNotification();
  // const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const openNotification = (description) => {
    api.error({
      message: 'Notification Title',
      description: 'Incorrect username or password', //static value
      showProgress: true,
    });
  };

  const navigate = useNavigate();

  const onValuesChange = (_, allValues) => {
    setUsername(allValues.username);
    setPassword(allValues.password);
  };

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const response = await login(values);

      setAccessToken(response.data.data.access_token);

      navigate('/');
    } catch (error) {
      openNotification();
      console.log(error);

      console.error('Full error object:', error.config);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Card>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Meta title="Login Doccure" />

          <Form
            onFinish={onFinish}
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
                    message: 'Please input your username!',
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
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>
            </FloatLabel>
            <Form.Item>
              <Flex justify="flex-end" align="center">
                <Link to="/forgotPassword">Forgot password</Link>
              </Flex>
            </Form.Item>
            <Form.Item>
              <Spin spinning={isLoading}>
                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </Spin>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </>
  );
};

export default LoginCard;
