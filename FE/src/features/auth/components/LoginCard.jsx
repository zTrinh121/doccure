import { Button, Card, Flex, Form, Input, Space, Spin } from 'antd';
const { Meta } = Card;
import FloatLabel from '../../../components/ui/float-lable/FloatLabel';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import { login } from '../../../lib/auth';
import { useNavigate } from 'react-router-dom';
import { getActions } from '../../../stores/authStore';
import { useQueryClient } from '@tanstack/react-query';
import { notification } from '../../../utils/antDesignGlobals';

const LoginCard = () => {
  const { setAccessToken, setResetStep, setResetEmail } = getActions();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const queryClient = useQueryClient();

  const openNotificationError = (description) => {
    notification.error({
      message: 'Error',
      description: 'Incorrect username or password',
      style: {
        width: 300,
      },
    });
  };

  const openNotificationSuccess = (description) => {
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

  return (
    <>
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
                <a onClick={onClickForgot}>Forgot Password</a>
                {/* <Link to="/forgotPassword">Forgot password</Link> */}
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
