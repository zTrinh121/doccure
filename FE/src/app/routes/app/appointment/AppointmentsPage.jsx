import { Typography, Divider, Button, Switch, Spin } from 'antd';
const { Title } = Typography;
import ContentLayout from '../../../../components/layouts/ContentLayout';
import AppointmentList from '../../../../features/appointment/components/AppointmentList';

import { memo, Suspense } from 'react';
import { useState } from 'react';
import { startTransition } from 'react';
import AppointmentFeed from '../../../../features/appointment/components/AppointmentFeed';

const AppointmentsPage = () => {
  const [infinite, setInfinite] = useState(false);
  const onChangeSwitch = (checked) => {
    // startTransition(() => {
    setInfinite(checked);
    // });
  };
  return (
    <ContentLayout>
      <Title level={3}>Appointments</Title>
      <Switch
        checkedChildren="infinite"
        unCheckedChildren="paginated"
        onChange={onChangeSwitch}
      />

      <Divider />
      {/* <Suspense fallback={<Spin tip="Loading appointments..." />}> */}
      {infinite ? <AppointmentFeed /> : <AppointmentList />}
      {/* <div style={{ display: infinite ? 'block' : 'none' }}>
        <AppointmentFeed />
      </div>
      <div style={{ display: infinite ? 'none' : 'block' }}>
        <AppointmentList />
      </div> */}
      {/* </Suspense> */}
    </ContentLayout>
  );
};

export default memo(AppointmentsPage);
