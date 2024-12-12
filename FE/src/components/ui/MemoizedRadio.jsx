import { Radio } from 'antd';
import { memo } from 'react';

const MemoizedRadio = ({ spec }) => {
  return (
    <Radio value={spec.specialization_id}>{spec.specialization_name}</Radio>
  );
};

export default memo(MemoizedRadio);
