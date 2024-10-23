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
import { notification } from 'antd';
import { useAuthStore } from '../../stores/authStore';
import { Popover } from 'antd';
import { Outlet } from 'react-router-dom';

const HomeLayout = ({ children }) => {
  let location = useLocation();
  const username = useAuthStore((state) => state.username);

  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (description) => {
    api.error({
      message: 'Notification Title',
      description: description,
      showProgress: true,
    });
  };

  return (
    <Layout>
      {contextHolder}

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
          style={{
            width: '100vw',
          }}
        >
          <Col span={4}>
            <Link to="/">
              <Image
                onClick={console.log('a')}
                preview={false}
                src={doccure}
                style={{
                  height: '35px',
                  // margin: "10px",
                }}
              />
            </Link>
          </Col>
          <Col span={14}>
            <Menu
              style={{
                backgroundColor: '#E2E8F0',
                flex: 1,
                minWidth: 0,
              }}
              mode="horizontal"
              defaultSelectedKeys={['2']}
              items={[
                { key: 'home', label: 'Home' },
                { key: 'home2', label: 'Home2' },
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
                  placement="bottomLeft"
                  content={
                    <Col>
                      <Menu
                        // onClick={onClick}
                        // style={{
                        //   width: 256,
                        // }}
                        // defaultSelectedKeys={['1']}
                        // defaultOpenKeys={['sub1']}
                        mode="inline"
                        items={[
                          {
                            key: 'profile',
                            label: username,
                          },
                          {
                            key: 'logout',
                            label: 'Log out',
                          },
                        ]}
                      />
                    </Col>
                  }
                >
                  <Avatar size={30} icon={<UserOutlined />} />
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
