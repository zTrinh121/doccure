import HomeLayout from "../layout/HomeLayout";
import background from "../assets/background.png";
import { Flex, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const HomePage = () => {
  return (
    <HomeLayout>
      <Flex
        justify="center"
        style={{
          width: "100vw",
          height: "200px",
          background: ` url(${background}) #f9f9f9`,
          backgroundSize: "100% ",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center bottom",
        }}
      >
        <Space>
          {/* <Input></Input> */}
          <Input prefix={<SearchOutlined />}></Input>
        </Space>
      </Flex>
    </HomeLayout>
  );
};

export default HomePage;
