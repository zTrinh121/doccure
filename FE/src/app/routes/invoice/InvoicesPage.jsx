import { Suspense } from 'react';
import { Typography, Divider } from 'antd';
const { Title } = Typography;

import ContentLayout from 'src/components/layouts/ContentLayout';
import InvoicesTable from 'src/features/invoices/components/InvoicesTable';
const InvoicesPage = () => {
  return (
    <ContentLayout>
      <div>
        <Title level={3}>Invoices</Title>
        <Divider />
        <Suspense fallback={<div>Loading</div>}>
          <InvoicesTable />
        </Suspense>
      </div>
    </ContentLayout>
  );
};

export default InvoicesPage;
