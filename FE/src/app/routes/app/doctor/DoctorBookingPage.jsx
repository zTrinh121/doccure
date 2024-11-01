import { useParams } from 'react-router-dom';
import { useDoctorSlotsQuery } from '../../../../hooks/useDoctorSlotsQuery';
import { useState } from 'react';
import {
  DatePicker,
  Col,
  Carousel,
  Typography,
  Card,
  Button,
  Row,
  Flex,
} from 'antd';
const { Title } = Typography;
import IsPendingSpin from '../../../../components/ui/IsPendingSpin';
import { dayNames } from '../../../../utils/constants';
import { getDateArr, getKebabDateString } from '../../../../utils/dateUtils';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import DoctorPanel from './../../../../features/doctors/components/DoctorPanel';
const { RangePicker } = DatePicker;

const DoctorBookingPage = () => {
  const { doctorId } = useParams(); //for getting doctor id from url param

  //todo: handle both pending and error within the component rather than on the whole page
  // This arrangement can be altered based on how we want the date's format to appear.

  const [startDate, setStartDate] = useState(getKebabDateString(new Date()));
  const [endDate, setEndDate] = useState(getKebabDateString(new Date()));
  const [range, setRange] = useState([new dayjs(), new dayjs()]);
  const [dateArr, setDateArr] = useState([new Date()]);
  const [select, setSelect] = useState('');
  const carouselRef = useRef(null);

  const onChange = (dates, dateString) => {
    console.log(dates);
    console.log(dates[0].$d, dateString);
    setRange([dates[0], dates[1]]);
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);

    setDateArr(getDateArr(new Date(dateString[0]), new Date(dateString[1])));
  };

  const { isPending, isError, data, error } = useDoctorSlotsQuery({
    startDate: startDate,
    endDate: endDate,
    doctorId: doctorId,
  });

  //todo: implement error screen, loading screen
  if (isPending) {
    return <IsPendingSpin />;
  }
  const responseData = data?.data.data;
  const tempMap = new Map();
  // var slots = [];
  responseData?.slots.forEach((slot) => {
    let slots = tempMap.get(slot.date_slot) || [];
    tempMap.set(slot.date_slot, [...slots, slot]);
  });

  return (
    <Flex justify="center" align="center">
      <Row style={{ width: '100%' }}>
        <Col span={2}></Col>
        <Col span={20}>
          <div>
            <DoctorPanel doctorId={doctorId} showBottomSection={false} />

            <div>
              <RangePicker className="my-5" onChange={onChange} value={range} />

              <Card>
                <div className="flex items-start justify-center max-w-full overflow-hidden">
                  {isError ? (
                    <>No slots available</>
                  ) : (
                    <>
                      <LeftOutlined
                        className="mt-5"
                        onClick={() => carouselRef.current.prev()}
                      />
                      <div className="w-[80%] max-w-[800px] mx-2">
                        {/* Width control */}
                        <Carousel
                          centerPadding="60px"
                          ref={carouselRef}
                          draggable
                          infinite={false}
                          slidesToShow={dateArr.length < 7 ? dateArr.length : 7}
                          arrows={false}
                          dots={false}
                        >
                          {dateArr.map((date) => (
                            <Col className="text-center" key={date.toString()}>
                              <Title level={5}>{dayNames[date.getDay()]}</Title>

                              {date.toLocaleDateString('en-GB')}
                              {(
                                tempMap.get(getKebabDateString(date)) || []
                              ).map((slot) => (
                                <Button
                                  type={
                                    select === slot.slot_id ? 'primary' : ''
                                  }
                                  block
                                  className=" my-1 "
                                  size="small"
                                  key={slot.slot_id}
                                  onClick={() => {
                                    setSelect(slot.slot_id);
                                  }}
                                >
                                  {slot.start_time}
                                </Button>
                              ))}
                            </Col>
                          ))}
                        </Carousel>
                      </div>
                      <RightOutlined
                        className="mt-5"
                        onClick={() => carouselRef.current.next()}
                      />
                    </>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </Col>

        <Col span={2}></Col>
      </Row>
    </Flex>
  );
};

export default DoctorBookingPage;
