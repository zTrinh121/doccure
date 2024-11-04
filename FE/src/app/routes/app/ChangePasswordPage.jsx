import { Form, Input, Button, Flex, Row, Col } from 'antd';
import { useAccessToken } from '../../../stores/authStore';
import { changePassword, logout } from '../../../lib/auth';
//todos: extract component, check confirm password front end
const ChangePasswordPage = () => {
  const accessToken = useAccessToken();

  const onFinish = async (data) => {
    try {
      await changePassword(accessToken, data);

      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <Flex justify="center" align="center">
          <Row style={{ width: '100%' }}>
            <Col span={1}></Col>
            <Col span={15}>
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
            </Col>

            <Col span={8}></Col>
          </Row>
        </Flex>
      </div>
    </>
  );
};

export default ChangePasswordPage;
