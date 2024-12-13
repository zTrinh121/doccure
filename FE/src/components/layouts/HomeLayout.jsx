import {
  Button,
  Col,
  Layout,
  Row,
  Divider,
  Space,
  Avatar,
  Spin,
  Popover,
} from 'antd';
const { Header, Content } = Layout;
import {
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import LogoButton from 'src/components/ui/LogoButton';
import NavMenu from 'src/components/ui/NavMenu';
import HomeFooter from 'src/components/ui/HomeFooter';
import BasicErrorBoundary from 'src/components/errors/BasicErrorBoundary';
import { MainErrorFallback } from 'src/components/errors/MainErrorFallback';
import { Outlet } from 'react-router-dom';

import { useLocation, useNavigate } from 'react-router-dom';
import { getUsernameFromToken, logout } from 'src/lib/auth';
import { useAccessToken } from 'src/stores/authStore';
import { useProfileQuery } from 'src/hooks/useProfileQuery';
import { memo } from 'react';

const HomeLayout = () => {
  const locationArr = useLocation().pathname.split('/');

  const location = locationArr[1];

  const accessToken = useAccessToken();
  const { data, isPending } = useProfileQuery();
  const navigate = useNavigate();

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
        <Spin size="large" />
      </div>
    );
  }
  let username;
  if (accessToken) {
    username = getUsernameFromToken(accessToken);
  }

  const handleLogout = async () => {
    try {
      logout(accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          backgroundColor: '#E2E8F0',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Row align="center" className="w-[100vw]">
          <Col span={4} className="hidden md:block">
            <LogoButton />
          </Col>
          <Col span={14}>
            <NavMenu />
          </Col>

          <Divider type="vertical" />
          <Col span={4}>
            <Space>
              {username}
              {!username ? ( // Only render if username is empty
                <>
                  {location === 'register' ? (
                    <></>
                  ) : (
                    <Button
                      className="hidden sm:block"
                      onClick={() => {
                        navigate('/register');
                      }}
                    >
                      <UserAddOutlined />
                      Register
                    </Button>
                  )}

                  {location === 'login' ? (
                    <></>
                  ) : (
                    <Button
                      onClick={() => {
                        navigate('/login');
                      }}
                    >
                      <LoginOutlined />
                      Login
                    </Button>
                  )}
                </>
              ) : (
                <Popover
                  placement="bottom"
                  arrow={false}
                  content={
                    <>
                      <Button
                        block
                        size="small"
                        type="text"
                        onClick={() => {
                          navigate('/user/profile');
                        }}
                      >
                        Profile
                      </Button>
                      <Button
                        block
                        size="small"
                        type="text"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </>
                  }
                >
                  <Avatar
                    size={30}
                    icon={<UserOutlined />}
                    src={data?.data.data.avatar}
                  />
                </Popover>
              )}
            </Space>
          </Col>
        </Row>
      </Header>

      <Content className="py-[48px]">
        <BasicErrorBoundary fallback={<MainErrorFallback />}>
          <Outlet />
        </BasicErrorBoundary>
      </Content>

      <HomeFooter />
    </Layout>
  );
};

export default memo(HomeLayout);
