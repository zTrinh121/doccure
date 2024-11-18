import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel, Card, Col, Button, Typography } from 'antd';
const { Title } = Typography;
import IsPendingSpin from '../../../components/ui/IsPendingSpin';

import { useRef, useState } from 'react';
import { useDoctorSlotsQuery } from '../../../hooks/useDoctorSlotsQuery';
import { getKebabDateString } from './../../../utils/dateUtils';
import { dayNames } from '../../../utils/constants';
import { notification } from '../../../utils/antDesignGlobals';

const SlotsTable = ({ startDate, endDate, doctorId, select, setSelect,dateArr }) => {
  const carouselRef = useRef(null);
  const { isPending, isError, data, error } = useDoctorSlotsQuery({
    startDate: startDate,
    endDate: endDate,
    doctorId: doctorId,
  });

  if (isPending) {
    return <IsPendingSpin />;
  }
  if (isError) {
    notification.error({
      message: 'Error',
      // description: 'Incorrect username or password',
      style: {
        width: 300,
      },
    });
    // return (
    //   <div>
    //     Something went wrong!
    //     {JSON.stringify(error.message)}
    //   </div>
    // );
  }

  const responseData = data?.data.data;
  const tempMap = new Map();
  responseData?.slots.forEach((slot) => {
    let slots = tempMap.get(slot.date_slot) || [];
    tempMap.set(slot.date_slot, [...slots, slot]);
  });

  return (
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
                    {(tempMap.get(getKebabDateString(date)) || []).map(
                      (slot) => (
                        <Button
                          disabled={
                            !slot.status || slot.status === 'CANCELED'
                              ? false
                              : true
                          }
                          type={select === slot.slot_id ? 'primary' : ''}
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
                      ),
                    )}
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
  );
};

export default SlotsTable;
