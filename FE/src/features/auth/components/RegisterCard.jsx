import { Button, Card, Form, Input, Space } from 'antd';
const { Meta } = Card;

import { notification } from 'antd';

import { registerWithEmailAndPassword } from '../../../lib/auth';
import { Radio } from 'antd';
import { useNavigate } from 'react-router-dom';

const RegisterCard = () => {
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (description) => {
    api.error({
      message: 'Notification Title',
      description: description,
      showProgress: true,
    });
  };

  const onFinish = async (values) => {
    console.log(values);
    // console.log(registerWithEmailAndPassword());
    try {
      const response = await registerWithEmailAndPassword(values);

      openNotification('Succesful');
      navigate('/login');
    } catch (error) {
      console.log('e');
      console.log(error);
      if (error.response) {
        // console.log(response);
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        openNotification(error.response.data.message);
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      console.error('Full error object:', error.config);
    }
  };

  return (
    <Card>
      {contextHolder}

      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Meta title="Register Doccure" />

        <Form
          layout="vertical"
          onFinish={onFinish}
          name="basic"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
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
                message: 'Please input your password!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Repeat password"
            name="repeatPassword"
            rules={[
              {
                required: true,
                message: 'Please repeat your password!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="First name"
            name="first_name"
            rules={[
              {
                required: true,
                message: 'Please input your first name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last name"
            name="last_name"
            rules={[
              {
                required: true,
                message: 'Please input your last name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: 'Please input your last gender!',
              },
            ]}
          >
            <Radio.Group>
              <Radio value={'m'}>Male</Radio>
              <Radio value={'f'}>Female</Radio>
            </Radio.Group>
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

export default RegisterCard;
