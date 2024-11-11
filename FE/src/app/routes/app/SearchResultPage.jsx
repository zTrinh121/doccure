import { useState, useDeferredValue } from 'react';
import { useSearchQuery } from '../../../hooks/useSearchQuery';
import { Form, Input, Flex, Row, Col, Radio } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import DoctorPanel from './../../../features/doctors/components/DoctorPanel';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../../hooks/useDebounce';
import { Spin } from 'antd';
import { useSpecializationsQuery } from '../../../hooks/useSpecializationsQuery';
import IsPendingSpin from '../../../components/ui/IsPendingSpin';

const SearchResultPage = () => {
  //todo:encode uri
  //todo: change search resutls without needing to enter
  const query = new URLSearchParams(location.search).get('query');
  const navigate = useNavigate();
  const [search, setSearch] = useState(query);
  const [spec, setSpec] = useState('');
  const onFinish = async (values) => {
    setSearch(values.search);
    setSpec('');
    navigate(`/search?query=${encodeURIComponent(values.search)}`);
  };
  const [form] = Form.useForm();

  const {
    data = [],
    isSuccess,
    isPending,
    error,
  } = useSearchQuery({ input: useDebounce(search), spec });

  const {
    data: dataS,
    isSuccess: isSuccessS,
    isPending: isPendingS,
    error: errorS,
  } = useSpecializationsQuery();

  const onValuesChange = () => {
    form.submit();
  };

  if (isPending || isPendingS) {
    return <IsPendingSpin />;
  }

  const onChangeRadio = (e) => {
    console.log(e.target.value);
    setSearch('');
    setSpec(e.target.value);
  };

  console.log(dataS);

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
              Spec
              {/* {JSON.stringify(dataS.data.data)} */}
              <Radio.Group onChange={onChangeRadio} value={spec}>
                {dataS.data.data.map((spec) => (
                  <Radio
                    key={spec.specialization_id}
                    value={spec.specialization_id}
                  >
                    {spec.specialization_name}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
            <div>
              <Spin spinning={isPending}>
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
              </Spin>
            </div>
          </Col>

          <Col span={2}></Col>
        </Row>
      </Flex>
    </div>
  );
};

export default SearchResultPage;
