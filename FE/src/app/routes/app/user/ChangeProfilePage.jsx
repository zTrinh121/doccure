import { UploadOutlined } from '@ant-design/icons';
import { Upload, Spin } from 'antd';
import { Card } from 'antd';
import { Form, Input, Button, Flex, Row, Col } from 'antd';
import { useProfileQuery } from '../../../../hooks/useProfileQuery';
import { changeAvatar, changeProfile } from '../../../../lib/user';
import { useAccessToken } from '../../../../stores/authStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Radio } from 'antd';

const ChangeProfilePage = () => {
  const accessToken = useAccessToken();
  const queryClient = useQueryClient();
  const { data, isSuccess, isPending, error } = useProfileQuery();
  let profileData = data.data.data;

  const avatarMutation = useMutation({
    mutationFn: async (file, userId, token) => {
      return changeAvatar(file, userId, token);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      });
    },
  });

  const profileMutation = useMutation({
    mutationFn: async ({ userId, values, token }) => {
      return changeProfile({ userId, values, token });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      });
    },
  });

  const onChange = async ({ file }) => {
    avatarMutation.mutate({
      file: file.originFileObj,
      userId: data.data.data.user_id,
      token: accessToken,
    });
  };

  const onFinish = (values) => {
    const mergedValues = { ...profileData, ...values };

    profileMutation.mutate({
      userId: data.data.data.user_id,
      values: mergedValues,
      token: accessToken,
    });
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div>
        <Flex justify="center" align="center">
          <Row style={{ width: '100%' }}>
            <Col span={1}></Col>
            <Col span={15}>
              <Card>
                <Upload fileList={[]} onChange={onChange}>
                  <Button icon={<UploadOutlined />}>
                    Click to upload Avatar
                  </Button>
                </Upload>
              </Card>
              <Card>
                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  name="basic"
                  initialValues={{
                    username: profileData.username,
                    first_name: profileData.first_name,
                    last_name: profileData.last_name,
                    gender: profileData.gender,
                  }}
                  autoComplete="off"
                >
                  <Form.Item label="Username" name="username">
                    <Input disabled />
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
                        message: 'Please input your gender!',
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value={'m'}>M</Radio>
                      <Radio value={'f'}>F</Radio>
                    </Radio.Group>
                  </Form.Item>

                  {/* <Form.Item
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
                  </Form.Item> */}

                  <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            <Col span={8}></Col>
          </Row>
        </Flex>
      </div>
    </>
  );
};

export default ChangeProfilePage;