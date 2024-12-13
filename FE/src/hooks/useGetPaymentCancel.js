import { useEffect, useState } from 'react';
import { getPaymentCancel } from 'src/lib/payment';
import { useNavigate } from 'react-router-dom';

export const useGetPaymentCancel = ({ appointmentId, invoiceId }) => {
  const [loading, setLoading] = useState('false');
  const navigate = useNavigate();
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

    getPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return loading;
};
