import { Suspense } from 'react';
import { useInvoicesQuery } from '../../../../hooks/useInvoicesQuery';
import IsPendingSpin from '../../../../components/ui/IsPendingSpin';
import { Spin } from 'antd';
import InvoicesTable from '../../../../features/invoices/components/InvoicesTable';

const InvoicesPage = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <InvoicesTable />
    </Suspense>
  );
};

export default InvoicesPage;
