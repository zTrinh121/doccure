import { useState } from 'react';
import { useSearchQuery } from '../../../hooks/useSearchQuery';
import { Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchResultPage = () => {
  const [search, setSearch] = useState('');
  const onFinish = async (values) => {
    setSearch(values.search);
  };
  const { data, isSuccess, isPending, error } = useSearchQuery(search);
  //another useQuery for spec?
  return (
    <div>
      <Form onFinish={onFinish} autoComplete="off">
        <Form.Item name="search">
          <Input prefix={<SearchOutlined />}></Input>
        </Form.Item>
      </Form>
      {JSON.stringify(data)}
    </div>
  );
};

export default SearchResultPage;
