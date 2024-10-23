import { Button, Card, Flex, Form, Input, Space } from 'antd';
import FloatLabel from '../../../components/ui/float-lable/FloatLabel';
import { useState } from 'react';
const { Meta } = Card;

const RegisterCard = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onValuesChange = (_, allValues) => {
    console.log(_);
    console.log(allValues);
    setUsername(allValues.username);
    setPassword(allValues.password);
  };

  return (
    <Card>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Meta title="Register Doccure" />

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
          <FloatLabel label="some field" name="username" value={username}>
            <Form.Item
              name="some field"
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
