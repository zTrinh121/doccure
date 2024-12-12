import { Spin, Typography, Layout, Card, Flex, Button } from 'antd';
const { Link } = Typography;
const { Sider, Content } = Layout;
import { Outlet } from 'react-router-dom';
import AvatarWithDefault from './../ui/AvatarWithDefault';
import background from '../../assets/background.jpg';

import { useProfileQuery } from '../../hooks/useProfileQuery';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import router from './../../app/router';

const DashboardLayout = () => {
  //todo:memo thisthing:)
  const navigate = useNavigate();
  const location = useLocation();

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
      <Sider width="25%" breakpoint="md" collapsedWidth="0" trigger={null}>
        <Card className="sticky top-16 mx-4 overflow-hidden rounded-[10px]">
          <Flex justify="center" align="center" vertical>
            <img
              src={background}
              className="absolute top-0 h-16 w-full object-cover"
            />

            <Link>
              <AvatarWithDefault size={64} avatar={data.data.data.avatar} />
            </Link>

            <Typography.Title level={5} strong>
              {`${data.data.data.first_name} ${data.data.data.last_name}`}
            </Typography.Title>

            <Button
              block
              type={location.pathname === '/user/profile' ? 'primary' : 'link'}
              onClick={() => {
                // navigate('/user/profile');
                router.navigate('/user/profile');
              }}
            >
              Change profile
            </Button>
            <Button
              block
              type={
                location.pathname === '/user/changePassword'
                  ? 'primary'
                  : 'link'
              }
              onClick={() => {
                navigate('/user/changePassword');
              }}
            >
              Change password
            </Button>
            <Button
              block
              type={
                location.pathname === '/user/appointment' ? 'primary' : 'link'
              }
              onClick={() => {
                navigate('/user/appointment');
              }}
            >
              View appointments
            </Button>
            <Button
              block
              type={location.pathname === '/user/invoice' ? 'primary' : 'link'}
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
        <Card className="block md:hidden  mx-4 overflow-hidden rounded-[10px]">
          <Flex justify="center" align="center" vertical>
            <img
              src={background}
              className="absolute top-0 h-16 w-full object-cover"
            />

            <Link>
              <AvatarWithDefault size={64} avatar={data.data.data.avatar} />
            </Link>

            <Typography.Title level={5} strong>
              {`${data.data.data.first_name} ${data.data.data.last_name}`}
            </Typography.Title>

            <Button
              block
              type={location.pathname === '/user/profile' ? 'primary' : 'link'}
              onClick={() => {
                navigate('/user/profile');
              }}
            >
              Change profile
            </Button>
            <Button
              block
              type={
                location.pathname === '/user/changePassword'
                  ? 'primary'
                  : 'link'
              }
              onClick={() => {
                navigate('/user/changePassword');
              }}
            >
              Change password
            </Button>
            <Button
              block
              type={
                location.pathname === '/user/appointment' ? 'primary' : 'link'
              }
              onClick={() => {
                navigate('/user/appointment');
              }}
            >
              View appointments
            </Button>
            <Button
              block
              type={location.pathname === '/user/invoice' ? 'primary' : 'link'}
              onClick={() => {
                navigate('/user/invoice');
              }}
            >
              View invoices
            </Button>
          </Flex>
        </Card>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default DashboardLayout;
