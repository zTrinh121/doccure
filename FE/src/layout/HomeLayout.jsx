// import React from "react";
import { Button, Col, Layout, Menu, Row, theme } from "antd";
const { Header, Content, Footer } = Layout;
import doccure from "../assets/doccure.png";
import { Image } from "antd";
import { Divider } from "antd";
import { Space } from "antd";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Paragraph } = Typography;

const HomeLayout = ({ children }) => {
  let location = useLocation();
  console.log(location);

  const navigate = useNavigate();
  // const items = new Array(15).fill(null).map((_, index) => ({
  //   key: index + 1,
  //   label: `nav ${index + 1}`,
  // }));
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          backgroundColor: "#E2E8F0",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Row
          style={{
            width: "100vw",
          }}
        >
          <Col span={4}>
            {" "}
            <Image
              preview={false}
              src={doccure}
              style={{
                height: "35px",
                // margin: "10px",
              }}
            />
          </Col>
          <Col span={14}>
            <Menu
              style={{
                backgroundColor: "#E2E8F0",
                flex: 1,
                minWidth: 0,
              }}
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              items={[
                { key: "home", label: "Home" },
                { key: "home2", label: "Home2" },
              ]}
            />
          </Col>

          <Divider type="vertical" />
          <Col span={4}>
            <Space>
              <Button
                onClick={() => {
                  navigate("/register");
                }}
              >
                <UserAddOutlined />
                Register
              </Button>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
              >
                <LoginOutlined />
                Login
              </Button>
            </Space>
          </Col>
        </Row>
      </Header>
      <Content
        style={{
          // padding: "0 48px",
        }}
      >
        {children}
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        <Row>
          <Col span={6}>
            <Image
              preview={false}
              src={doccure}
              style={{
                height: "35px",
                // margin: "10px",
              }}
            />
            <Paragraph
              style={{
                textAlign: "left",
                fontSize: "10px",
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
