import { CheckCircleTwoTone } from '@ant-design/icons';
import { Button, Card, Flex, Typography } from 'antd';
const { Text } = Typography;
import IsPendingSpin from 'src/components/ui/IsPendingSpin';
import CenterLayout from 'src/components/layouts/CenterLayout';

import { useNavigate } from 'react-router-dom';
import { useAppointmentQuery } from 'src/hooks/useAppointmentQuery';
import { useGetPaymentSuccessful } from 'src/hooks/useGetPaymentSuccessful';

const SuccessPage = () => {
  const navigate = useNavigate();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const appointmentId = urlParams.get('appointment_id');
  const invoiceId = urlParams.get('invoice_id');
  const slotId = urlParams.get('slot_id');
  const paymentId = urlParams.get('paymentId');
  const userId = urlParams.get('user_id');
  const token = urlParams.get('token');
  const payerId = urlParams.get('PayerID');

  // appointmentId, invoiceId, slotId, userId, paymentId, payerId

  const loading = useGetPaymentSuccessful({
    appointmentId,
    invoiceId,
    slotId,
    userId,
    paymentId,
    token,
    payerId,
  });
  // const [loading, setLoading] = useState('false');
  // useEffect(() => {
  //   const getPayment = async () => {
  //     setLoading(true);
  //     //todo: fix race condition:)
  //     try {
  //       return await getPaymentSuccessful({
  //         appointmentId,
  //         invoiceId,
  //         slotId,
  //         userId,
  //         paymentId,
  //         token,
  //         payerId,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       navigate('/pay/error');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   console.log(getPayment());
  // }, []);

  const { isPending, data } = useAppointmentQuery(appointmentId);

  if (isPending || loading) {
    return <IsPendingSpin></IsPendingSpin>;
  }

  const onClickViewInvoice = () => {
    navigate(`/user/appointment/${appointmentId}`);
  };

  return (
    <CenterLayout>
      <Card>
        <Flex vertical align="center">
          <CheckCircleTwoTone
            twoToneColor={'#09E5AB'}
            className="text-[400%]"
          />
          <Typography.Title level={4} className="m-0">
            Appointment booked Successfully!
          </Typography.Title>
          <div>{paymentId.slice(6)}</div>
          <div>
            Appointment booked with Dr.{' '}
            <Text strong>{data.doctor.full_name}</Text>
          </div>{' '}
          <div>
            on{' '}
            <Text strong>
              {data.slot.date_slot} {data.slot.start_time} -{' '}
              {data.slot.end_time}
            </Text>
          </div>
          <Button className="mt-2">View Invoice</Button>
          <Button onClick={onClickViewInvoice} type="primary" className="mt-2">
            View appointment
          </Button>
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

export default SuccessPage;
