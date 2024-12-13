import { Col, Button, Row, Flex } from 'antd';
import IsPendingSpin from 'src/components/ui/IsPendingSpin';
import DoctorPanel from 'src/features/doctors/components/DoctorPanel';
import SlotsTable from 'src/features/slots/components/SlotsTable';
import SpecializationPicker from 'src/features/doctors/components/SpecializationPicker';
import SlotDateRangePicker from 'src/features/doctors/components/SlotDateRangePicker';

import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { useDoctorSlotsQuery } from 'src/hooks/useDoctorSlotsQuery';
import { useCallback, useMemo, useState } from 'react';
import { postPayment } from 'src/lib/payment';
import { getDateArr, getKebabDateString } from 'src/utils/dateUtils';

const DoctorBookingPage = () => {
  const { doctorId } = useParams(); //for getting doctor id from url param

  //todo: handle both pending and error within the component rather than on the whole page
  // This arrangement can be altered based on how we want the date's format to appear.

  const minDate = useMemo(() => {
    return new dayjs();
  }, []);
  const [startDate, setStartDate] = useState(getKebabDateString(new Date()));
  const [endDate, setEndDate] = useState(getKebabDateString(new Date()));
  const [range, setRange] = useState([new dayjs(), new dayjs()]);
  const [dateArr, setDateArr] = useState([new Date()]);
  const [select, setSelect] = useState(0);
  const [spec, setSpec] = useState(0);

  const { isPending, isError, data, error } = useDoctorSlotsQuery({
    startDate: startDate,
    endDate: endDate,
    doctorId: doctorId,
  });

  const responseData = data?.data.data || {};
  const tempMap = new Map();
  responseData?.slots?.forEach((slot) => {
    let slots = tempMap.get(slot.date_slot) || [];
    tempMap.set(slot.date_slot, [...slots, slot]);
  });

  const onChange = useCallback((dates, dateString) => {
    setRange([dates[0], dates[1]]);
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
    setDateArr(getDateArr(new Date(dateString[0]), new Date(dateString[1])));
  }, []);

  const onClickPay = async () => {
    // navigate(`/slot/${select}`);
    const response = await postPayment({ slotId: select, specId: spec });
    window.location.href = response.data.data.slice(9);
  };

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

  return (
    <Flex justify="center" align="center">
      <Row className="w-full grid grid-cols-12 gap-4">
        <Col className="col-span-1"></Col>
        <Col className="col-span-10">
          <div className="flex flex-col gap-2">
            <DoctorPanel doctorId={doctorId} showBottomSection={false} />

            <SlotDateRangePicker
              onChange={onChange}
              range={range}
              minDate={minDate}
            />
            <SlotsTable
              startDate={startDate}
              endDate={endDate}
              doctorId={doctorId}
              select={select}
              setSelect={setSelect}
              dateArr={dateArr}
            />

            <SpecializationPicker
              specializations={responseData.specializations}
              spec={spec}
              setSpec={setSpec}
            />
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

        <Col className="col-span-1"></Col>
      </Row>
    </Flex>
  );
};

export default DoctorBookingPage;
