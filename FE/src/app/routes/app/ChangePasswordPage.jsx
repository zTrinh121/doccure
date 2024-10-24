import React from 'react';
import { Form, Input, Radio, Button } from 'antd';
import { useAuthStore } from '../../../stores/authStore';
import { changePassword, getNewAccessToken } from '../../../lib/auth';

const ChangePasswordPage = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const onFinish = (data) => {
    // console.log(data);
    changePassword(accessToken, data);
    setAccessToken('');
  };

  return (
    <>
      <Button onClick={() => console.log(getNewAccessToken())}>
        GET TOKEN
      </Button>
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
          label="Old Password"
          name="old_password"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="New password"
          name="new_password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm password"
          name="confirm_password"
          rules={[
            {
              required: true,
              message: 'Please repeat your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ChangePasswordPage;
