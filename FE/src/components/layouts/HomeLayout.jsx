import doccure from '../../assets/doccure.png';
import {
  Button,
  Col,
  Layout,
  Menu,
  Row,
  Image,
  Divider,
  Space,
  Typography,
  Avatar,
} from 'antd';
const { Header, Content, Footer } = Layout;
const { Paragraph } = Typography;
import {
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { useLocation, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
// import { useAuthStore } from '../../stores/authStore';
import { Popover } from 'antd';
import { Outlet } from 'react-router-dom';

import { getUsernameFromToken, logout } from '../../lib/auth';
import { useAccessToken } from '../../stores/authStore';
import { useProfileQuery } from '../../hooks/useProfileQuery';
import AvatarWithDefault from '../ui/AvatarWithDefault';

const HomeLayout = ({ children }) => {
  const locationArr = useLocation().pathname.split('/');

  const location = locationArr[1];

  const accessToken = useAccessToken();
  const { data, isSuccess, isPending, error } = useProfileQuery();
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

  const onClick = ({ key }) => {
    navigate(`${key}`);
  };

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
        <Row
          align="center"
          style={{
            width: '100vw',
          }}
        >
          <Col span={4}>
            <Link to="/">
              <Image
                src={doccure}
                alt="Logo"
                style={{
                  height: '35px',
                }}
                preview={false}
              />
            </Link>
          </Col>
          <Col span={14}>
            <Menu
              onClick={onClick}
              style={{
                backgroundColor: '#E2E8F0',
                flex: 1,
                minWidth: 0,
              }}
              mode="horizontal"
              defaultSelectedKeys={['']}
              selectedKeys={[location]}
              items={[
                { key: '', label: 'Home' },
                { key: 'search', label: 'Search' },
                { key: 'user', label: 'User' },
              ]}
            />
          </Col>

          <Divider type="vertical" />
          <Col span={4}>
            <Space>
              {username}
              {!username ? ( // Only render if username is empty
                <>
                  {location.pathname === '/register' ? (
                    <></>
                  ) : (
                    <Button
                      onClick={() => {
                        navigate('/register');
                      }}
                    >
                      <UserAddOutlined />
                      Register
                    </Button>
                  )}

                  {location.pathname === '/login' ? (
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
                    src={data.data.data.avatar}
                  />
                </Popover>
              )}
            </Space>
          </Col>
        </Row>
      </Header>

      <Content
        style={{
          padding: '48px 0',
        }}
      >
        <Outlet />
      </Content>

      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        <Row>
          <Col span={6}>
            <Image
              preview={false}
              src={doccure}
              style={{
                height: '35px',
                // margin: "10px",
              }}
            />
            <Paragraph
              style={{
                textAlign: 'left',
                fontSize: '10px',
              }}
            >
              <p>We&apos;re no strangers to love</p>
              <p>You know the rules and so do I</p>
              <p>A full commitment&apos;s what I&apos;m thinking of</p>
              <p>You wouldn&apos;t get this from any other guy</p>
            </Paragraph>
          </Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={6}>col-6</Col>
        </Row>
      </Footer>
    </Layout>
  );
};

export default HomeLayout;
