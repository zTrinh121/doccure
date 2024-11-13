import { Suspense } from 'react';
import { useInvoicesQuery } from '../../../../hooks/useInvoicesQuery';
import IsPendingSpin from '../../../../components/ui/IsPendingSpin';
import { Spin } from 'antd';
import InvoicesTable from '../../../../features/invoices/components/InvoicesTable';
import ContentLayout from './../../../../components/layouts/ContentLayout';

const InvoicesPage = () => {
  return (
    <ContentLayout>
      <Suspense fallback={<div>Loading</div>}>
        <InvoicesTable />
      </Suspense>
    </ContentLayout>
  );
};

export default InvoicesPage;
