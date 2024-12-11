import { Col, Typography } from 'antd';
import SlotButton from './SlotButton';
import { memo } from 'react';
import { getKebabDateString } from './../../../utils/dateUtils';
import SlotColHead from './SlotColHead';
import PropTypes from 'prop-types';
import { dayNames } from '../../../utils/constants';
const { Text, Title } = Typography;

const SlotCol = ({ date, dayNames, tempMap, select, setSelect }) => {
  return (
    <Col className="text-center">
      <SlotColHead dayNames={dayNames} date={date} />
      {/* <div className="hidden md:block">
        <Title level={5}>{dayNames[date.getDay()]}</Title>
        {date.toLocaleDateString('en-GB')}
      </div>
      <div className="block md:hidden">
        <Text strong>{dayNames[date.getDay()]}</Text>
        <br />
        {date.toLocaleDateString('en-AU', {
          day: '2-digit',
          month: '2-digit',
        })}
      </div> */}

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
