import { CloseCircleTwoTone } from '@ant-design/icons';
import { Card, Flex, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import IsPendingSpin from 'src/components/ui/IsPendingSpin';
import CenterLayout from 'src/components/layouts/CenterLayout';

import { useGetPaymentCancel } from 'src/hooks/useGetPaymentCancel';

const CancelPage = () => {
  const navigate = useNavigate();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const appointmentId = urlParams.get('appointment_id');
  const invoiceId = urlParams.get('invoice_id');

  // appointmentId, invoiceId, slotId, userId, paymentId, payerId

  // const [loading, setLoading] = useState('false');
  // useEffect(() => {
  //   const getPayment = async () => {
  //     setLoading(true);
  //     //todo: fix race condition:)
  //     try {
  //       return await getPaymentCancel({
  //         appointmentId,
  //         invoiceId,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       navigate('/pay/error');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //  getPayment();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const loading = useGetPaymentCancel({
    appointmentId,
    invoiceId,
  });

  if (loading) {
    return <IsPendingSpin />;
  }

  return (
    <CenterLayout>
      <Card>
        <Flex vertical align="center">
          <CloseCircleTwoTone
            twoToneColor={'#DD3B29'}
            className="text-[400%]"
          />
          <Typography.Title level={4} className="m-0">
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
