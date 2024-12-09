import { UploadOutlined } from '@ant-design/icons';
import {
  Card,
  Form,
  Input,
  Button,
  Flex,
  Row,
  Col,
  Typography,
  Divider,
  Upload,
  Spin,
  Radio,
} from 'antd';
const { Title } = Typography;

import { useProfileQuery } from '../../../hooks/useProfileQuery';
import { changeAvatar } from '../../../lib/user';
import { useAccessToken } from '../../../stores/authStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useProfileMutation } from '../../../hooks/useProfileMutation';

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

  const profileMutation = useProfileMutation();

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
    <Flex justify="center" align="center">
      <Row className="w-full">
        <Col span={1}></Col>
        <Col span={15}>
          <Title level={3}>Change profile</Title>
          <Divider />
          <div className="flex flex-col justify-between gap-4">
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
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </Col>

        <Col span={8}></Col>
      </Row>
    </Flex>
  );
};

export default ChangeProfilePage;
