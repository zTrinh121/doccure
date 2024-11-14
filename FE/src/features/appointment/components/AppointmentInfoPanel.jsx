import React from 'react';
import { Card } from 'antd';

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
