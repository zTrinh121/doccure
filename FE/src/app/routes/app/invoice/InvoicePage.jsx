import { useParams } from 'react-router-dom';
import IsPendingSpin from '../../../../components/ui/IsPendingSpin';
import { useInvoiceQuery } from '../../../../hooks/useInvoiceQuery';

const InvoicePage = () => {
  const { invoiceId } = useParams();
  const { isPending, isError, data, error } = useInvoiceQuery(invoiceId);

  if (isPending) {
    //todo:replace with skeleton
    return <IsPendingSpin />;
  }
  return <div>{JSON.stringify(data)}</div>;
};

export default InvoicePage;
