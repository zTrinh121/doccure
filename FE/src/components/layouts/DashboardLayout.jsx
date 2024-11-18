import { Spin, Typography, Layout, Avatar, Card, Flex, Button } from 'antd';
const { Text, Link } = Typography;
const { Sider, Content } = Layout;
import { Outlet } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

import { useProfileQuery } from '../../hooks/useProfileQuery';
import { useNavigate } from 'react-router-dom';
import AvatarWithDefault from './../ui/AvatarWithDefault';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { data, isSuccess, isPending, error } = useProfileQuery();

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout>
      <Sider width="25%">
        <Card className="sticky top-16">
          <Flex justify="center" align="center" vertical>
            <Link>
              <AvatarWithDefault size={64} avatar={data.data.data.avatar} />
            </Link>

            <Typography.Title level={5} strong>
              {`${data.data.data.first_name} ${data.data.data.last_name}`}
            </Typography.Title>

            <Button
              block
              type="link"
              onClick={() => {
                navigate('/user/profile');
              }}
            >
              Change profile
            </Button>
            <Button
              block
              type="link"
              onClick={() => {
                navigate('/user/changePassword');
              }}
            >
              Change password
            </Button>
            <Button
              block
              type="link"
              onClick={() => {
                navigate('/user/appointment');
              }}
            >
              View appointments
            </Button>
            <Button
              block
              type="link"
              onClick={() => {
                navigate('/user/invoice');
              }}
            >
              View invoices
            </Button>
          </Flex>
        </Card>
      </Sider>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default DashboardLayout;
