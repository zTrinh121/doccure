import { Form, Input, Button, Flex, Row, Col, Typography, Divider } from 'antd';
const { Title } = Typography;

import { useAccessToken } from '../../../stores/authStore';
import { changePassword, logout } from '../../../lib/auth';
import { useState } from 'react';
import { addNotificationSuccess } from '../../../utils/antDesignGlobals';

const ChangePasswordPage = () => {
  const accessToken = useAccessToken();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (data) => {
    setIsLoading(true);
    try {
      await changePassword(accessToken, data);

      logout();
    } catch (error) {
      console.log(error);
    } finally {
      addNotificationSuccess(
        'Password changed successfully',
        'Please login again',
      );
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <Flex justify="center" align="center">
          <Row style={{ width: '100%' }}>
            <Col span={1}></Col>
            <Col span={15}>
              <Title level={3}>Change password</Title>
              <Divider />
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
                  dependencies={['new_password']}
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('new_password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            'The new password that you entered do not match!',
                          ),
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    disabled={isLoading}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>

            <Col span={8}></Col>
          </Row>
        </Flex>
      </div>
    </>
  );
};

export default ChangePasswordPage;
