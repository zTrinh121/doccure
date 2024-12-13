import { Button, Card, Flex, Form, Input, Space, Spin } from 'antd';
const { Meta } = Card;
import FloatLabel from 'src/components/ui/float-lable/FloatLabel';

import { useState } from 'react';
import { login } from 'src/lib/auth';
import { useNavigate } from 'react-router-dom';
import { getActions } from 'src/stores/authStore';
import { useQueryClient } from '@tanstack/react-query';
import { notification } from 'src/utils/antDesignGlobals';

const LoginCard = () => {
  const { setAccessToken, setResetStep, setResetEmail } = getActions();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const queryClient = useQueryClient();

  const openNotificationError = () => {
    notification.error({
      message: 'Error',
      description: 'Incorrect username or password',
      style: {
        width: 300,
      },
    });
  };

  const openNotificationSuccess = () => {
    notification.success({
      message: 'Login Successful',
      // description: 'Incorrect username or password',
      style: {
        width: 300,
      },
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
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      openNotificationSuccess();
      navigate('/');
    } catch (error) {
      openNotificationError();
      console.log(error);

      console.error('Full error object:', error.config);
    } finally {
      setIsLoading(false);
    }
  };

  const onClickForgot = () => {
    setResetStep('');
    setResetEmail('');
    navigate('/forgotPassword');
  };

  // const onClickRegister = () => {
  //   navigate('/register');
  // };

  return (
    <>
      <Card>
        <Space direction="vertical" size="middle" className="flex">
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
                validateDebounce={1000}
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                  {
                    min: 6,
                    message: 'Username must be at least 6 characters!',
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
            </FloatLabel>
            <FloatLabel label="Password" name="password" value={password}>
              <Form.Item
                name="password"
                validateDebounce={1000}
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    min: 6,
                    message: 'Password must be at least 6 characters!',
                  },
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>
            </FloatLabel>
            <Form.Item>
              <Flex justify="flex-end" align="center">
                <a onClick={onClickForgot}>Forgot Password</a>
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
