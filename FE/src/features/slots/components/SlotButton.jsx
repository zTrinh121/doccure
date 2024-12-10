import { Button } from 'antd';
import PropTypes from 'prop-types';
import { memo } from 'react';

const SlotButton = ({ slot, isSelected, setSelect }) => {
  return (
    <Button
      disabled={!slot.status || slot.status === 'CANCELED' ? false : true}
      type={isSelected ? 'primary' : ''}
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
  );
};

export default memo(SlotButton);

SlotButton.propTypes = {
  slot: PropTypes.object,
  isSelected: PropTypes.bool,
  setSelect: PropTypes.func,
};
