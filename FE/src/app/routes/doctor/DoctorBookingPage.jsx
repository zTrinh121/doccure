import { DatePicker, Col, Card, Button, Row, Flex } from 'antd';
const { RangePicker } = DatePicker;
import IsPendingSpin from '../../../components/ui/IsPendingSpin';
import DoctorPanel from '../../../features/doctors/components/DoctorPanel';
import SlotsTable from '../../../features/slots/components/SlotsTable';

import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { useDoctorSlotsQuery } from '../../../hooks/useDoctorSlotsQuery';
import { useState } from 'react';
import { postPayment } from '../../../lib/payment';
import { getDateArr, getKebabDateString } from '../../../utils/dateUtils';

const DoctorBookingPage = () => {
  const { doctorId } = useParams(); //for getting doctor id from url param

  //todo: handle both pending and error within the component rather than on the whole page
  // This arrangement can be altered based on how we want the date's format to appear.

  const minDate = new dayjs();
  const [startDate, setStartDate] = useState(getKebabDateString(new Date()));
  const [endDate, setEndDate] = useState(getKebabDateString(new Date()));
  const [range, setRange] = useState([new dayjs(), new dayjs()]);
  const [dateArr, setDateArr] = useState([new Date()]);
  const [select, setSelect] = useState('');
  const [spec, setSpec] = useState('');

  const { isPending, isError, data, error } = useDoctorSlotsQuery({
    startDate: startDate,
    endDate: endDate,
    doctorId: doctorId,
  });

  //todo: implement error screen for empty, loading screen
  if (isPending) {
    return <IsPendingSpin />;
  }
  if (isError) {
    console.log(error);
    if (error.status !== 404) {
      return (
        <div>
          Something went wrong!
          <p>{JSON.stringify(error.message)}</p>
        </div>
      );
    }
  }

  const responseData = data?.data.data || {};
  const tempMap = new Map();
  responseData?.slots?.forEach((slot) => {
    let slots = tempMap.get(slot.date_slot) || [];
    tempMap.set(slot.date_slot, [...slots, slot]);
  });

  const onChange = (dates, dateString) => {
    setRange([dates[0], dates[1]]);
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
    setDateArr(getDateArr(new Date(dateString[0]), new Date(dateString[1])));
  };

  const onClickPay = async () => {
    // navigate(`/slot/${select}`);
    const response = await postPayment({ slotId: select, specId: spec });
    window.location.href = response.data.data.slice(9);
  };

  return (
    <Flex justify="center" align="center">
      <Row className="w-full">
        <Col span={2}></Col>
        <Col span={20}>
          <div className="flex flex-col gap-2">
            <DoctorPanel doctorId={doctorId} showBottomSection={false} />

            <RangePicker onChange={onChange} value={range} minDate={minDate} />
            <SlotsTable
              startDate={startDate}
              endDate={endDate}
              doctorId={doctorId}
              select={select}
              setSelect={setSelect}
              dateArr={dateArr}
            />
            <Card>
              {responseData.specializations?.map((item) => (
                <Button
                  className="mx-2"
                  key={spec.specialization_id}
                  type={item.specialization_id === spec ? 'primary' : ''}
                  onClick={() => {
                    setSpec(item.specialization_id);
                  }}
                >
                  {item.specialization_name}
                </Button>
              ))}
            </Card>
            <div className="flex justify-end">
              <Button
                disabled={select && spec ? false : true}
                onClick={onClickPay}
                className="my-2"
              >
                Proceed to pay
              </Button>
            </div>
          </div>
        </Col>

        <Col span={2}></Col>
      </Row>
    </Flex>
  );
};

export default DoctorBookingPage;
