import { useState, useDeferredValue } from 'react';
import { useSearchQuery } from '../../../hooks/useSearchQuery';
import { Form, Input, Flex, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import DoctorPanel from './../../../features/doctors/components/DoctorPanel';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../../hooks/useDebounce';

const SearchResultPage = () => {
  //todo:encode uri
  //todo: change search resutls without needing to enter
  const query = new URLSearchParams(location.search).get('query');
  const navigate = useNavigate();
  const [search, setSearch] = useState(query);
  const onFinish = async (values) => {
    setSearch(values.search);
    navigate(`/search?query=${encodeURIComponent(values.search)}`);
  };
  const [form] = Form.useForm();

  const {
    data = [],
    isSuccess,
    isPending,
    error,
  } = useSearchQuery(useDebounce(search));

  const onValuesChange = () => {
    form.submit();
  };

  return (
    <div>
      <Flex justify="center" align="center">
        <Row style={{ width: '100%' }}>
          <Col span={2}></Col>
          <Col span={20}>
            <Form
              form={form}
              onFinish={onFinish}
              autoComplete="off"
              onValuesChange={onValuesChange}
            >
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
