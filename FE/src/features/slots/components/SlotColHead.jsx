import { Typography } from 'antd';
import PropTypes from 'prop-types';
import { memo } from 'react';

const { Text, Title } = Typography;

const SlotColHead = ({ dayNames, date }) => {
  return (
    <div>
      <div className="hidden md:block">
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
      </div>
    </div>
  );
};

export default memo(SlotColHead);

SlotColHead.propTypes = {
  date: PropTypes.object,
  dayNames: PropTypes.array,
};
