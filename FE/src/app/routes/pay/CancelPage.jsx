import { CloseCircleTwoTone } from '@ant-design/icons';
import { Card, Flex, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import IsPendingSpin from '../../../components/ui/IsPendingSpin';
import CenterLayout from '../../../components/layouts/CenterLayout';

import { getPaymentCancel } from '../../../lib/payment';
import { useState } from 'react';
import { useEffect } from 'react';

const CancelPage = () => {
  const navigate = useNavigate();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const appointmentId = urlParams.get('appointment_id');
  const invoiceId = urlParams.get('invoice_id');

  const [loading, setLoading] = useState('false');

  // appointmentId, invoiceId, slotId, userId, paymentId, payerId

  useEffect(() => {
    const getPayment = async () => {
      setLoading(true);
      //todo: fix race condition:)
      try {
        return await getPaymentCancel({
          appointmentId,
          invoiceId,
        });
      } catch (error) {
        console.log(error);
        navigate('/pay/error');
      } finally {
        setLoading(false);
      }
    };

    console.log(getPayment());
  }, []);

  if (loading) {
    return <IsPendingSpin />;
  }

  return (
    <CenterLayout>
      <Card>
        <Flex vertical align="center">
          <CloseCircleTwoTone
            twoToneColor={'#DD3B29'}
            style={{ fontSize: '400%' }}
          />
          <Typography.Title
            level={4}
            style={{
              margin: 0,
            }}
          >
            Appointment booking canceled!
          </Typography.Title>
          <Button
            onClick={() => {
              navigate('/');
            }}
            className="mt-2"
          >
            Return home
          </Button>
        </Flex>
      </Card>
    </CenterLayout>
  );
};

export default CancelPage;
