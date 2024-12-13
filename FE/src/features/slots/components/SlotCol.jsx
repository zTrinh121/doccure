import { Col } from 'antd';
import SlotButton from 'src/features/slots/components/SlotButton';
import { memo } from 'react';
import { getKebabDateString } from 'src/utils/dateUtils';
import SlotColHead from 'src/features/slots/components/SlotColHead';
import PropTypes from 'prop-types';

const SlotCol = ({ date, dayNames, tempMap, select, setSelect }) => {
  return (
    <Col className="text-center">
      <SlotColHead dayNames={dayNames} date={date} />
      {(tempMap.get(getKebabDateString(date)) || []).map((slot) => (
        <SlotButton
          key={slot.slot_id}
          slot={slot}
          isSelected={select === slot.slot_id}
          setSelect={setSelect}
        />
      ))}
    </Col>
  );
};

export default memo(SlotCol);

SlotCol.propTypes = {
  date: PropTypes.object,
  dayNames: PropTypes.array,
  tempMap: PropTypes.object,
  select: PropTypes.number,
  setSelect: PropTypes.func,
};
