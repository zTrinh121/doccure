import { Typography, Divider } from 'antd';
const { Title } = Typography;
import ContentLayout from '../../../../components/layouts/ContentLayout';
import AppointmentList from '../../../../features/appointment/components/AppointmentList';

import { memo } from 'react';

const AppointmentsPage = () => {
  return (
    <ContentLayout>
      <Title level={3}>Appointments</Title>
      <Divider />

      <AppointmentList></AppointmentList>
    </ContentLayout>
  );
};

export default memo(AppointmentsPage);
