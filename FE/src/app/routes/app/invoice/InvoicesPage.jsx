import { Suspense } from 'react';
import { Typography, Divider } from 'antd';
const { Title } = Typography;
import InvoicesTable from '../../../../features/invoices/components/InvoicesTable';
import ContentLayout from './../../../../components/layouts/ContentLayout';

const InvoicesPage = () => {
  return (
    <ContentLayout>
      <Title level={3}>Invoices</Title>
      <Divider />
      <Suspense fallback={<div>Loading</div>}>
        <InvoicesTable />
      </Suspense>
    </ContentLayout>
  );
};

export default InvoicesPage;
