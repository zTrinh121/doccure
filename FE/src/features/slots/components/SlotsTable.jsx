import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel, Card } from 'antd';
import IsPendingSpin from 'src/components/ui/IsPendingSpin';

import { useRef, memo } from 'react';
import { useDoctorSlotsQuery } from 'src/hooks/useDoctorSlotsQuery';
import { dayNames } from 'src/utils/constants';
import PropTypes from 'prop-types';
import SlotCol from 'src/features/slots/components/SlotCol';

const SlotsTable = ({
  startDate,
  endDate,
  doctorId,
  select,
  setSelect,
  dateArr,
}) => {
  const carouselRef = useRef(null);
  const { isPending, isError, data } = useDoctorSlotsQuery({
    startDate: startDate,
    endDate: endDate,
    doctorId: doctorId,
  });

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
                  <SlotCol
                    key={date.toString()}
                    date={date}
                    dayNames={dayNames}
                    tempMap={tempMap}
                    select={select}
                    setSelect={setSelect}
                  />
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
