import { Card } from 'antd';
import PropTypes from 'prop-types';

const AppointmentInfoPanel = ({ status, time, price, invoiceId }) => {
  return (
    <Card className="my-1 ">
      Information
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-between ">
          <p>Status</p>
          <div>{status}</div>
        </div>
        <div className="flex justify-between ">
          <p>Time</p>
          <div>{time}</div>
        </div>
        <div className="flex justify-between ">
          <p>Price</p>
          <div>{price}</div>
        </div>
        <div className="flex justify-between ">
          <p>Invoice</p>
          <div>{invoiceId}</div>
        </div>
      </div>
    </Card>
  );
};

export default AppointmentInfoPanel;

AppointmentInfoPanel.propTypes = {
  status: PropTypes.string,
  time: PropTypes.string,
  price: PropTypes.number,
  invoiceId: PropTypes.number,
};
