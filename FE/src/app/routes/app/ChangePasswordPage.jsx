import { Form, Input, Button, Flex, Row, Col, Typography, Divider } from 'antd';
const { Title } = Typography;

import { useAccessToken } from 'src/stores/authStore';
import { changePassword, logout } from 'src/lib/auth';
import { useState } from 'react';
import { addNotificationSuccess } from 'src/utils/antDesignGlobals';

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
        <Flex justify="center" align="center" className="md:w-full">
          <Row className="w-full">
            <Col span={1}></Col>
            <Col span={22}>
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
                  validateDebounce={1000}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                    {
                      min: 6,
                      message: 'Password must be at least 6 characters!',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="New password"
                  name="new_password"
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
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="Confirm password"
                  name="confirm_password"
                  dependencies={['new_password']}
                  validateDebounce={1000}
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    {
                      min: 6,
                      message: 'Password must be at least 6 characters!',
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

            <Col span={1}></Col>
          </Row>
        </Flex>
      </div>
    </>
  );
};

export default ChangePasswordPage;
