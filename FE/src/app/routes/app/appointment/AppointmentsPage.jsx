import { Pagination } from 'antd';
import ContentLayout from '../../../../components/layouts/ContentLayout';
import AppointmentList from '../../../../features/appointment/components/AppointmentList';

const AppointmentsPage = () => {
  return (
    <ContentLayout>
      <AppointmentList></AppointmentList>
    </ContentLayout>
  );
};

export default AppointmentsPage;
