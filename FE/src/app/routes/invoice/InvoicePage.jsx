import { useParams } from 'react-router-dom';
import IsPendingSpin from 'src/components/ui/IsPendingSpin';
import { useInvoiceQuery } from 'src/hooks/useInvoiceQuery';
import ContentLayout from 'src/components/layouts/ContentLayout';
import { Card } from 'antd';

const InvoicePage = () => {
  const { invoiceId } = useParams();
  const { isPending, data } = useInvoiceQuery(invoiceId);

  if (isPending) {
    //todo:replace with skeleton
    return <IsPendingSpin />;
  }
  return (
    <ContentLayout>
      <Card>
        <div className="flex flex-col sm:flex-row justify-end sm:w-auto">
          <div className="flex flex-col items-start sm:items-end">
            <p>Invoice ID No: {data?.invoice_id}</p>
            <p>Issued: {new Date(data?.created_at).toLocaleString('en-AU')}</p>
          </div>
        </div>
        <p>Invoice Details</p>
        <table className="w-full border-collapse border border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-600 px-4 py-2">Description</th>
              <th className="border border-slate-600 px-4 py-2">Quantity</th>
              <th className="border border-slate-600 px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-600 px-4 py-2">
                {data?.invoice_name}
              </td>
              <td className="border border-slate-600 px-4 py-2">1</td>
              <td className="border border-slate-600 px-4 py-2">
                {data?.slot.price}
              </td>
            </tr>
          </tbody>
        </table>
        <p>Total amount: {data?.slot.price}</p>
      </Card>
    </ContentLayout>
  );
};

export default InvoicePage;
