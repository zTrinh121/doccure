import { Suspense } from 'react';
import { useInvoicesQuery } from '../../../../hooks/useInvoicesQuery';
import IsPendingSpin from '../../../../components/ui/IsPendingSpin';
import { Spin } from 'antd';
import InvoicesList from '../../../../features/invoices/components/InvoicesList';

const InvoicesPage = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <InvoicesList />
    </Suspense>
  );
};

export default InvoicesPage;
