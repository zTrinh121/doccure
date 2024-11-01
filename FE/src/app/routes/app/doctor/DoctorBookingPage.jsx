import { useParams } from 'react-router-dom';
import { useDoctorSlotsQuery } from '../../../../hooks/useSlotsQuery';
import { useState } from 'react';
import { DatePicker, Col, Carousel, Typography, Card } from 'antd';
const { Title } = Typography;
import IsPendingSpin from '../../../../components/ui/IsPendingSpin';
const { RangePicker } = DatePicker;

const DoctorBookingPage = () => {
  const { doctorId } = useParams(); //for getting doctor id from url param
  const date = new Date();
  console.log(date);
  let day = date.getDate().toString().padStart(2, '0');
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${year}-${month}-${day}`;

  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);
  const [dateArr, setDateArr] = useState([date]);
  const [map, setMap] = useState(new Map());
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const incrementDate = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  };

  const getDateArr = (start, end) => {
    console.log('start', start);
    let result = [];
    // result.push(start);
    let tempStart = start;
    do {
      console.log(1, tempStart);
      result.push(tempStart);
      tempStart = incrementDate(tempStart);
    } while (tempStart < end);
    return result;
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);

    setDateArr(getDateArr(new Date(dateString[0]), new Date(dateString[1])));
  };

  const addSlot = (slot) => {
    setMap((prevMap) => {
      const newMap = new Map(prevMap);
      const slots = newMap.get(date) || [];
      newMap.set(slot.date_slot, [...slots, slot]);
      return newMap;
    });
  };

  const { data, isSuccess, isPending, error } = useDoctorSlotsQuery({
    startDate: startDate,
    endDate: endDate,
    doctorId: doctorId,
  });
  //todo: implement error screen, loading screen
  if (isPending) {
    return <IsPendingSpin />;
  }
  const responseData = data.data.data;
  const tempMap = new Map();
  var slots = [];
  responseData.slots.forEach((slot) => {
    slots = tempMap.get(slot.date_slot) || [];
    tempMap.set(slot.date_slot, [...slots, slot]);
  });
  console.log(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);

  return (
    <div>
      DoctorBookingPage {doctorId}
      <div>
        <RangePicker onChange={onChange} />

        <Carousel
          infinite={false}
          slidesToShow={dateArr.length < 7 ? dateArr.length : 7}
          arrows
        >
          {dateArr.map((date) => (
            <Col className="text-center" key={date.toString()}>
              <Title level={5}>{dayNames[date.getDay()]}</Title>
              <div key={date.toString()}>
                {date.toLocaleDateString('en-GB')}
                {(
                  tempMap.get(
                    `${date.getFullYear()}-${date.getMonth() + 1}-${date
                      .getDate()
                      .toString()
                      .padStart(2, '0')}`,
                  ) || []
                ).map((slot) => (
                  <Card
                    className="mx-0.5 my-1 "
                    size="small"
                    key={slot.slot_id}
                  >
                    {slot.start_time}
                  </Card>
                ))}
              </div>
            </Col>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default DoctorBookingPage;
