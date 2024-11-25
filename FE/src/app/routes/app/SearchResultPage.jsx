import { useState } from 'react';
import { useSearchQuery } from '../../../hooks/useSearchQuery';
import { Form, Input, Flex, Row, Col, Radio, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import DoctorPanel from './../../../features/doctors/components/DoctorPanel';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../../hooks/useDebounce';
import { Spin } from 'antd';
import { useSpecializationsQuery } from '../../../hooks/useSpecializationsQuery';
import IsPendingSpin from '../../../components/ui/IsPendingSpin';

const SearchResultPage = () => {
  const query = new URLSearchParams(location.search).get('query');
  const [search, setSearch] = useState(query || '');

  const [spec, setSpec] = useState('');
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const searchQuery = useSearchQuery({ input: useDebounce(search), spec });

  const specializationQuery = useSpecializationsQuery();

  const onFinish = async (values) => {
    setSearch(values.search);
    setSpec('');
    navigate(`/search?query=${encodeURIComponent(values.search)}`);
  };

  const onValuesChange = () => {
    form.submit();
  };

  if (searchQuery.isPending || specializationQuery.isPending) {
    return <IsPendingSpin />;
  }

  const onChangeRadio = (e) => {
    setSearch('');
    setSpec(e.target.value);
  };

  return (
    <>
      <Row style={{ width: '100%' }}>
        <Col span={2}></Col>
        <Col span={20} className="grid grid-cols-3 gap-4">
          <Card className="col-span-1">
            <Form
              form={form}
              onFinish={onFinish}
              autoComplete="off"
              onValuesChange={onValuesChange}
            >
              <Form.Item name="search">
                <Input
                  prefix={<SearchOutlined />}
                  defaultValue={search}
                ></Input>
              </Form.Item>
            </Form>
            <div>
              Specialization
              <Radio.Group
                onChange={onChangeRadio}
                value={spec}
                className="flex flex-col"
              >
                <Radio key={''} value={''}>
                  All
                </Radio>
                {specializationQuery.data.data.data.map((spec) => (
                  <Radio
                    key={spec.specialization_id}
                    value={spec.specialization_id}
                  >
                    {spec.specialization_name}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          </Card>

          <div className="col-span-2">
            <Spin spinning={searchQuery.isPending}>
              <div className=" flex flex-col justify-between gap-3 ">
                {searchQuery.data.length > 0
                  ? searchQuery.data.map((item) => (
                      <div key={item.doctor_id}>
                        <DoctorPanel
                          doctorId={item.doctor_id}
                          viewProfile={true}
                        />
                      </div>
                    ))
                  : 'No results found.'}
              </div>
            </Spin>
          </div>
        </Col>

        <Col span={2}></Col>
      </Row>
    </>
  );
};

export default SearchResultPage;
