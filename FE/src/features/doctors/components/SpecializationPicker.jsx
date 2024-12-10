import { Card, Button } from 'antd';
import PropTypes from 'prop-types';
import { memo } from 'react';
const SpecializationPicker = ({ specializations, spec, setSpec }) => {
  return (
    <Card>
      {specializations?.map((item, i) => (
        <Button
          className="mx-2"
          key={i}
          type={item.specialization_id === spec ? 'primary' : ''}
          onClick={() => {
            setSpec(item.specialization_id);
          }}
        >
          {item.specialization_name}
        </Button>
      ))}
    </Card>
  );
};
export default memo(SpecializationPicker);

SpecializationPicker.propTypes = {
  specializations: PropTypes.array,
  spec: PropTypes.number,
  setSpec: PropTypes.func,
};
