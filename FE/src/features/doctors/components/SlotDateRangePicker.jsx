import { DatePicker } from 'antd';
import { memo } from 'react';
import PropTypes from 'prop-types';
const { RangePicker } = DatePicker;

export const SlotDateRangePicker = ({ onChange, range, minDate }) => {
  return <RangePicker onChange={onChange} value={range} minDate={minDate} />;
};
export default memo(SlotDateRangePicker);

SlotDateRangePicker.propTypes = {
  onChange: PropTypes.func,
  range: PropTypes.array,
  minDate: PropTypes.object,
};
