import { useState } from 'react';
import { useSearchQuery } from '../../../hooks/useSearchQuery';
import { Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const SearchResultPage = () => {
  const query = new URLSearchParams(location.search).get('query');
  const [search, setSearch] = useState(query);
  const onFinish = async (values) => {
    setSearch(values.search);
  };
  const { data = [], isSuccess, isPending, error } = useSearchQuery(search);
  //another useQuery for spec?
  console.log(data);
  return (
    <div>
      <Form onFinish={onFinish} autoComplete="off">
        <Form.Item name="search">
          <Input prefix={<SearchOutlined />}></Input>
        </Form.Item>
      </Form>
      {JSON.stringify(data)}
      Results
      <div>
        {data.length > 0
          ? data.map((item) => (
              <div key={item.doctor_id}>
                {/* <p>Name: {item.full_name}</p>
                <p>Experience: {item.experience} years</p>
                <p>Hospital: {item.hospital}</p>
                <p>
                  Price Range: ${item.min_price} - ${item.max_price}
                </p>
                <p>Specializations: {item.specializations.join(', ')}</p>
                Render other properties as needed */}
                <Link to={`/doctor/${item.doctor_id}`}>{item.doctor_id}</Link>
              </div>
            ))
          : 'No results found.'}
      </div>
    </div>
  );
};

export default SearchResultPage;
