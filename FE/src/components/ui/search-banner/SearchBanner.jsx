import { SearchOutlined } from '@ant-design/icons';
import { Space, Input, Flex } from 'antd';
import background from '../../../assets/background.png';

const SearchBanner = () => {
  return (
    <Flex
      justify="center"
      style={{
        width: '100vw',
        height: '200px',
        background: ` url(${background}) #f9f9f9`,
        backgroundSize: '100% ',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center bottom',
      }}
    >
      <Space>
        {/* <Input></Input> */}
        <Input prefix={<SearchOutlined />}></Input>
      </Space>
    </Flex>
  );
};

export default SearchBanner;
