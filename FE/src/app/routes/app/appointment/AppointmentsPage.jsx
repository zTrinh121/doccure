import { Typography, Divider, Switch } from 'antd';
const { Title } = Typography;
import ContentLayout from '../../../../components/layouts/ContentLayout';
import AppointmentList from '../../../../features/appointment/components/AppointmentList';

import { memo } from 'react';
import { useState } from 'react';
import AppointmentFeed from '../../../../features/appointment/components/AppointmentFeed';

const AppointmentsPage = () => {
  const [infinite, setInfinite] = useState(false);
  const onChangeSwitch = (checked) => {
    setInfinite(checked);
  };
  return (
    <ContentLayout>
      <div>
        <div className="flex flex-row content-end gap-2">
          <Title level={3}>Appointments</Title>
          <Switch
            className="self-center"
            checkedChildren="infinite"
            unCheckedChildren="paginated"
            onChange={onChangeSwitch}
          />
        </div>

        <Divider />
        {/* <Suspense fallback={<Spin tip="Loading appointments..." />}> */}
        {infinite ? <AppointmentFeed /> : <AppointmentList />}

        {/* </Suspense> */}
      </div>
    </ContentLayout>
  );
};

export default memo(AppointmentsPage);
