import { useState } from 'react';
import { useSearchQuery } from '../../../hooks/useSearchQuery';
import { Form, Input, Flex, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import DoctorPanel from './../../../features/doctors/components/DoctorPanel';

const SearchResultPage = () => {
  //todo:encode uri
  const query = new URLSearchParams(location.search).get('query');
  const [search, setSearch] = useState(query);
  const onFinish = async (values) => {
    setSearch(values.search);
  };
  const { data = [], isSuccess, isPending, error } = useSearchQuery(search);

  return (
    <div>
      <Flex justify="center" align="center">
        <Row style={{ width: '100%' }}>
          <Col span={2}></Col>
          <Col span={20}>
            <Form onFinish={onFinish} autoComplete="off">
              <Form.Item name="search">
                <Input prefix={<SearchOutlined />}></Input>
              </Form.Item>
            </Form>

            <div>
              {data.length > 0
                ? data.map((item) => (
                    <div key={item.doctor_id}>
                      <DoctorPanel
                        doctorId={item.doctor_id}
                        viewProfile={true}
                      />
                    </div>
                  ))
                : 'No results found.'}
            </div>
          </Col>

          <Col span={2}></Col>
        </Row>
      </Flex>
    </div>
  );
};

export default SearchResultPage;
