import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPaymentSuccessful } from '../lib/payment';

export const useGetPaymentSuccessful = ({
  appointmentId,
  invoiceId,
  slotId,
  userId,
  paymentId,
  token,
  payerId,
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getPayment = async () => {
      setLoading(true);
      //todo: fix race condition:)
      try {
        return await getPaymentSuccessful({
          appointmentId,
          invoiceId,
          slotId,
          userId,
          paymentId,
          token,
          payerId,
        });
      } catch (error) {
        console.log(error);
        navigate('/pay/error');
      } finally {
        setLoading(false);
      }
    };

    getPayment();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return loading;
};
