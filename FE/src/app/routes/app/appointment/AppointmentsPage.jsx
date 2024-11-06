import { Pagination } from 'antd';
import ContentLayout from '../../../../components/layouts/ContentLayout';
import AppointmentItem from '../../../../features/appointment/components/AppointmentItem';
import AppointmentList from '../../../../features/appointment/components/AppointmentList';

const AppointmentsPage = () => {
  return (
    <ContentLayout>
      <AppointmentItem></AppointmentItem>
      <AppointmentList></AppointmentList>

    </ContentLayout>
  );
};

export default AppointmentsPage;
