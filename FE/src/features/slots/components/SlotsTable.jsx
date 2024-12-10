import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel, Card, Col, Typography } from 'antd';
const { Title } = Typography;
import IsPendingSpin from '../../../components/ui/IsPendingSpin';

import { useRef, memo } from 'react';
import { useDoctorSlotsQuery } from '../../../hooks/useDoctorSlotsQuery';
import { getKebabDateString } from './../../../utils/dateUtils';
import { dayNames } from '../../../utils/constants';
import PropTypes from 'prop-types';
import SlotButton from './SlotButton';

const SlotsTable = ({
  startDate,
  endDate,
  doctorId,
  select,
  setSelect,
  dateArr,
}) => {
  const carouselRef = useRef(null);
  const { isPending, isError, data, error } = useDoctorSlotsQuery({
    startDate: startDate,
    endDate: endDate,
    doctorId: doctorId,
  });

  // useEffect(() => {
  //   console.log(isError);
  //   if (isError) {
  //     notification.error({
  //       message: 'Error',
  //       style: {
  //         width: 300,
  //       },
  //     });
  //   }
  // }, [isError]);

  if (isPending) {
    return <IsPendingSpin />;
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
                        <SlotButton
                          key={slot.slot_id}
                          slot={slot}
                          isSelected={select === slot.slot_id}
                          setSelect={setSelect}
                        />
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

export default memo(SlotsTable);

SlotsTable.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  doctorId: PropTypes.string,
  select: PropTypes.number,
  setSelect: PropTypes.func,
  dateArr: PropTypes.array,
};
